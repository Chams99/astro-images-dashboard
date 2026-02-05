import { useState } from 'react';

interface ToggleProps {
  initialValue?: boolean;
  onChange?: (value: boolean) => void;
  label?: string;
}

export default function Toggle({ 
  initialValue = false, 
  onChange,
  label 
}: ToggleProps) {
  const [isActive, setIsActive] = useState(initialValue);

  const handleToggle = () => {
    const newValue = !isActive;
    setIsActive(newValue);
    onChange?.(newValue);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      {label && <label style={{ cursor: 'pointer', userSelect: 'none' }}>{label}</label>}
      <div 
        className={`neumorph-toggle ${isActive ? 'active' : ''}`}
        onClick={handleToggle}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleToggle();
          }
        }}
      />
    </div>
  );
}
