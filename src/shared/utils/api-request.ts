// Кастомные классы ошибок
export class HttpError extends Error {
  constructor(public status: number, message: string, public data?: any) {
    super(message);
    this.name = 'HttpError';
  }
}

export class NetworkError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NetworkError';
  }
}

export class TimeoutError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'TimeoutError';
  }
}

export class ParsingError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ParsingError';
  }
}

// Типы и интерфейсы
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
export type ResponseType = 'json' | 'text' | 'blob' | 'arrayBuffer' | 'formData';

// Базовый URL API
export const BASE_URL = typeof window !== 'undefined' && import.meta?.env
  ? import.meta.env.VITE_API_URL 
  : '';

export const API_TOKEN = typeof window !== 'undefined' && import.meta?.env
  ? import.meta.env.VITE_API_TOKEN
  : '';

// Получение токена авторизации
export const getAuthToken = (): string | null => {
  const isServer = typeof window === 'undefined';
  if (isServer) return null;
  
  // Для простоты используем localStorage
  return localStorage.getItem('authToken');
};

export interface ApiRequestOptions extends RequestInit {
  // Базовые настройки запроса
  url: string;
  data?: unknown;
  params?: Record<string, string | number | boolean | undefined | null>;
  
  // Настройки авторизации
  withAuth?: boolean;
  
  // Дополнительные параметры
  timeout?: number;
  retries?: number;
  retryDelay?: number;
  responseType?: ResponseType;
  
  // Параметры для построения URL
  slug?: string;
  baseUrl?: string;
}

export interface ApiResponse<T> {
  data: T | null;
  error: boolean;
  status: number;
  message?: string;
}

// Функция для построения URL с параметрами
export const buildUrl = (
  url: string, 
  params?: Record<string, string | number | boolean | undefined | null>,
  slug?: string,
  baseUrl?: string
): string => {
  // Используем переданный baseUrl или дефолтный BASE_URL
  const base = baseUrl || BASE_URL || '';
  
  // Добавляем слаг, если передан
  const urlWithSlug = slug ? `${url}/${slug}` : url;
  
  // Полный URL
  const fullUrl = urlWithSlug.startsWith('http') ? urlWithSlug : `${base}${urlWithSlug}`;
  
  // Если нет параметров, возвращаем URL
  if (!params) return fullUrl;
  
  // Создаем объект URLSearchParams
  const searchParams = new URLSearchParams();
  
  // Добавляем параметры
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.append(key, String(value));
    }
  });
  
  const queryString = searchParams.toString();
  if (!queryString) return fullUrl;
  
  // Добавляем параметры к URL
  return `${fullUrl}${fullUrl.includes('?') ? '&' : '?'}${queryString}`;
};

// Основная функция запроса
export const apiRequest = async <T = any>({
  url,
  params,
  data,
  slug,
  baseUrl,
  withAuth = true,
  headers = {},
  timeout = 10000,
  retries = 0,
  retryDelay = 300,
  responseType = 'json',
  ...options
}: ApiRequestOptions): Promise<ApiResponse<T>> => {
  let attemptCount = 0;
  const maxAttempts = retries + 1;
  
  while (attemptCount < maxAttempts) {
    attemptCount++;
    
    try {
      // Настраиваем timeout с помощью AbortController
      const controller = new AbortController();
      const existingSignal = options.signal;
      
      // Если передан внешний signal, синхронизируем его с нашим
      if (existingSignal) {
        existingSignal.addEventListener('abort', () => controller.abort());
      }
      
      const timeoutId = setTimeout(() => controller.abort(), timeout);
      
      // Получаем токен авторизации, если нужен
      const authToken = withAuth ? getAuthToken() : null;
      
      // Строим полный URL
      const fullUrl = buildUrl(url, params, slug, baseUrl);
      
      // Определяем, является ли тело FormData
      const isFormData = data instanceof FormData;
      
      // Подготавливаем тело запроса
      const body = data && (isFormData ? data : JSON.stringify(data));
      
      // Опции запроса
      const fetchOptions: RequestInit = {
        ...options,
        headers: {
          ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
          ...(!isFormData && data ? { 'Content-Type': 'application/json' } : {}),
          ...(API_TOKEN ? { 'X-API-KEY': API_TOKEN } : {}),
        },
        signal: controller.signal,
      };
      
      // Добавляем заголовки из параметров
      if (headers && typeof headers === 'object') {
        fetchOptions.headers = { ...fetchOptions.headers, ...headers };
      }
      
      // Добавляем тело запроса, если оно есть
      if (body) {
        fetchOptions.body = body as BodyInit;
      }
      
      const response = await fetch(fullUrl, fetchOptions);
      clearTimeout(timeoutId);
      
     
      if (!response.ok) {
        return {
          data: null,
          error: true,
          status: response.status,
          message: `HTTP Error: ${response.status} ${response.statusText}`
        };
      }
      
      // Обработка разных типов ответов
      let responseData: any;
      try {
        switch (responseType) {
          case 'json':
            responseData = await response.json();
            break;
          case 'text':
            responseData = await response.text();
            break;
          case 'blob':
            responseData = await response.blob();
            break;
          case 'arrayBuffer':
            responseData = await response.arrayBuffer();
            break;
          case 'formData':
            responseData = await response.formData();
            break;
          default:
            responseData = await response.json();
        }
      } catch (parseError) {
        return {
          data: null,
          error: true,
          status: response.status,
          message: 'Failed to parse response'
        };
      }
      
      // Успешный ответ
      return {
        data: responseData,
        error: false,
        status: response.status
      };
      
    } catch (error) {
      // Проверяем, нужно ли повторить запрос
      const isRetryable = 
        (error instanceof NetworkError || 
         (error instanceof HttpError && [408, 429, 500, 502, 503, 504].includes(error.status))) &&
        attemptCount < maxAttempts;
      
      if (isRetryable) {
        await new Promise(resolve => setTimeout(resolve, retryDelay * attemptCount));
        continue;
      }
      
      // Возвращаем структурированную ошибку
      return {
        data: null,
        error: true,
        status: error instanceof HttpError ? error.status : 500,
        message: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }
  
  // Если все попытки исчерпаны, возвращаем ошибку
  return {
    data: null,
    error: true,
    status: 500,
    message: 'Maximum number of retry attempts reached'
  };
};

// Удобные обертки для HTTP методов
export const api = {
  request: apiRequest,
  
  get<T = any>(
    url: string, 
    options: Omit<ApiRequestOptions, 'url' | 'method' | 'data'> = {}
  ): Promise<ApiResponse<T>> {
    return apiRequest<T>({ ...options, url, method: 'GET' });
  },
  
  post<T = any>(
    url: string, 
    data?: any, 
    options: Omit<ApiRequestOptions, 'url' | 'method'> = {}
  ): Promise<ApiResponse<T>> {
    return apiRequest<T>({ ...options, url, method: 'POST', data });
  },
  
  put<T = any>(
    url: string, 
    data?: any, 
    options: Omit<ApiRequestOptions, 'url' | 'method'> = {}
  ): Promise<ApiResponse<T>> {
    return apiRequest<T>({ ...options, url, method: 'PUT', data });
  },
  
  patch<T = any>(
    url: string, 
    data?: any, 
    options: Omit<ApiRequestOptions, 'url' | 'method'> = {}
  ): Promise<ApiResponse<T>> {
    return apiRequest<T>({ ...options, url, method: 'PATCH', data });
  },
  
  delete<T = any>(
    url: string, 
    options: Omit<ApiRequestOptions, 'url' | 'method' | 'data'> = {}
  ): Promise<ApiResponse<T>> {
    return apiRequest<T>({ ...options, url, method: 'DELETE' });
  }
};
