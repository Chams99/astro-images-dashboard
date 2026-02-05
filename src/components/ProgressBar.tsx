interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  showValue?: boolean;
}

export default function ProgressBar({ 
  value, 
  max = 100, 
  label,
  showValue = true 
}: ProgressBarProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div style={{ width: '100%' }}>
      {(label || showValue) && (
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          marginBottom: '0.5rem',
          fontSize: '0.9rem',
          color: 'var(--text-secondary)'
        }}>
          {label && <span>{label}</span>}
          {showValue && <span>{Math.round(percentage)}%</span>}
        </div>
      )}
      <div className="neumorph-progress">
        <div 
          className="neumorph-progress-bar"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
