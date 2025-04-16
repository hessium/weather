import { useEffect, useState, ReactElement } from 'react';
import { useAppSelector } from '../../shared/hooks/store.ts';

import './weather-effects.css';

export const WeatherEffects = () => {
  const { weather, base: theme } = useAppSelector((state) => state.theme);
  
  // Рендер эффекта тумана
  if (weather === 'fog') {
    return (
      <div className="weather-effects-container">
        {Array.from({ length: 10 }).map((_, index) => (
          <div
            key={index}
            className="fog-layer"
            style={{
              opacity: 0.05 + (index % 3) * 0.05,
              top: `${5 + (index * 8)}%`,
              height: `${40 + (index % 4) * 20}px`,
              background: theme === 'dark' ? 
                'rgba(100, 116, 139, 0.2)' : 
                'rgba(226, 232, 240, 0.3)',
              filter: `blur(${10 + index * 2}px)`
            }}
          />
        ))}
        {Array.from({ length: 20 }).map((_, index) => (
          <div
            key={`particle-${index}`}
            className="fog-particle"
            style={{
              opacity: 0.1,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${30 + Math.random() * 70}px`,
              height: `${30 + Math.random() * 70}px`,
              borderRadius: '50%',
              background: theme === 'dark' ? 
                'rgba(100, 116, 139, 0.15)' : 
                'rgba(226, 232, 240, 0.2)',
              filter: 'blur(15px)'
            }}
          />
        ))}
      </div>
    );
  }

  // Рендер эффекта облаков
  if (weather === 'cloudy') {
    return (
      <div className="weather-effects-container">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="cloud"
            style={{
              opacity: 0.4 + (index % 3) * 0.15,
              top: `${(index * 10) + Math.random() * 5}%`,
              left: `${10 + (index * 10)}%`,
              width: `${100 + Math.random() * 150}px`,
              height: `${60 + Math.random() * 40}px`,
              background: theme === 'dark' ? 
                'rgba(71, 85, 105, 0.4)' : 
                'rgba(255, 255, 255, 0.7)',
              filter: `blur(${8 + Math.random() * 7}px)`
            }}
          />
        ))}
      </div>
    );
  }

  // Рендер эффекта ясной погоды
  if (weather === 'clear' && theme !== 'dark') {
    return (
      <div className="weather-effects-container">
        <div className="sun-wrapper">
          <div className="sun-container">
            <div
              className="sun-circle"
              style={{
                background: 'rgba(250, 204, 21, 0.9)',
                boxShadow: '0 0 60px rgba(253, 224, 71, 0.6)'
              }}
            />
            
            {/* Лучи солнца */}
            <div className="sun-rays-container">
              {Array.from({ length: 12 }).map((_, index) => (
                <div
                  key={index}
                  className="sun-ray"
                  style={{
                    transform: `rotate(${index * 30}deg)`,
                    background: 'rgba(250, 204, 21, 0.8)',
                    boxShadow: '0 0 15px rgba(253, 224, 71, 0.5)'
                  }}
                />
              ))}
            </div>
          </div>
        </div>
        
        {/* Световые блики */}
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={`light-${index}`}
            className="light-particle"
            style={{
              opacity: 0.2,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${20 + Math.random() * 40}px`,
              height: `${20 + Math.random() * 40}px`,
              borderRadius: '50%',
              background: 'rgba(250, 204, 21, 0.3)',
              filter: 'blur(10px)'
            }}
          />
        ))}
      </div>
    );
  }

  // Рендер эффекта ночи
  if (theme === 'dark' && (!weather || weather === 'clear')) {
    return (
      <div className="weather-effects-container">
        {/* Луна */}
        <div className="moon-wrapper">
          <div className="moon">
            <div className="moon-crater crater-1" />
            <div className="moon-crater crater-2" />
            <div className="moon-crater crater-3" />
          </div>
        </div>
        
        {/* Звезды */}
        {Array.from({ length: 50 }).map((_, index) => {
          const size = Math.random() * 3 + 1;
          
          return (
            <div
              key={`star-${index}`}
              className="star"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 70}%`,
                opacity: 0.5 + Math.random() * 0.5,
                boxShadow: `0 0 ${size + 2}px rgba(255, 255, 255, 0.8)`
              }}
            />
          );
        })}
        
        {/* Падающие звезды (убраны, так как должны быть статичными) */}
      </div>
    );
  }

  // Рендер эффектов дождя и снега
  if (weather === 'rain') {
    return (
      <div className="weather-effects-container">
        {Array.from({ length: 80 }).map((_, i) => {
          const size = Math.random() * 1.5 + 0.5;
          return (
            <div
              key={i}
              className="particle rain"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${size * 0.5}px`,
                height: `${size * 15}px`,
                opacity: 0.4 + Math.random() * 0.4,
                background: theme === 'dark' ? 
                  `rgba(161, 161, 170, ${0.4 + Math.random() * 0.4})` : 
                  `rgba(59, 130, 246, ${0.4 + Math.random() * 0.4})`,
                boxShadow: theme === 'dark' ? 
                  '0 0 2px rgba(255, 255, 255, 0.3)' : 
                  '0 0 2px rgba(59, 130, 246, 0.5)',
                transform: 'rotate(15deg)'
              }}
            />
          );
        })}
      </div>
    );
  }
  
  if (weather === 'snow') {
    return (
      <div className="weather-effects-container">
        {Array.from({ length: 40 }).map((_, i) => {
          const size = Math.random() * 4 + 2;
          return (
            <div
              key={i}
              className="particle snow"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${size}px`,
                height: `${size}px`,
                opacity: 0.4 + Math.random() * 0.5,
                background: theme === 'dark' ? 
                  `rgba(226, 232, 240, ${0.6 + Math.random() * 0.4})` : 
                  `rgba(248, 250, 252, ${0.6 + Math.random() * 0.4})`,
                boxShadow: '0 0 4px rgba(255, 255, 255, 0.8)'
              }}
            />
          );
        })}
      </div>
    );
  }

  return null;
}; 