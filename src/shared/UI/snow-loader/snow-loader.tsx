export const SnowLoader = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-blue-50 z-50">
      <div className="w-full h-full absolute overflow-hidden">
        {Array.from({ length: 30 }).map((_, index) => (
          <div
            key={index}
            className="absolute bg-white rounded-full"
            style={{
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.7 + 0.3,
              animation: `fall ${Math.random() * 10 + 5}s linear infinite`,
            }}
          />
        ))}
      </div>
    </div>
  );
};
