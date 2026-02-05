import { useState } from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary';
  onClick?: () => void;
  className?: string;
}

export default function Button({ 
  children, 
  variant = 'default', 
  onClick,
  className = '' 
}: ButtonProps) {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <button
      className={`neumorph-btn ${variant} ${isPressed ? 'pressed' : ''} ${className}`}
      onClick={onClick}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
    >
      {children}
    </button>
  );
}
