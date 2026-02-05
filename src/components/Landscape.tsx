import { useEffect, useState } from 'react';

interface LandscapeProps {
  imageUrl?: string;
  alt?: string;
}

export default function Landscape({ imageUrl, alt }: LandscapeProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const resolvedImageUrl =
    imageUrl ??
    'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1800&q=80';
  const resolvedAlt = alt ?? 'Mountain lake at sunset';

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      className="landscape-container"
      style={{
        '--parallax-x': `${mousePosition.x * 0.3}px`,
        '--parallax-y': `${mousePosition.y * 0.3}px`
      } as React.CSSProperties}
    >
      <img
        className="landscape-photo"
        src={resolvedImageUrl}
        alt={resolvedAlt}
        loading="lazy"
      />
      <div className="landscape-overlay"></div>
      <div className="landscape-flash" aria-hidden="true"></div>
    </div>
  );
}
