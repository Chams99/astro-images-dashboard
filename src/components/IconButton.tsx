import React from 'react';

interface IconButtonProps {
  icon: React.ReactNode;
  title?: string;
  onClick?: () => void;
  className?: string;
}

export default function IconButton({ icon, title, onClick, className = '' }: IconButtonProps) {
  return (
    <button
      type="button"
      className={`top-icon ${className}`}
      title={title}
      onClick={onClick}
      aria-label={title}
    >
      {icon}
    </button>
  );
}
