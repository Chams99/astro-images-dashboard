interface StatCardProps {
  title: string;
  value: string | number;
  icon?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export default function StatCard({ title, value, icon, trend }: StatCardProps) {
  return (
    <div className="neumorph-card" style={{ textAlign: 'center' }}>
      {icon && (
        <div style={{ 
          fontSize: '2.5rem', 
          marginBottom: '1rem',
          display: 'inline-block'
        }}>
          {icon}
        </div>
      )}
      <div style={{ 
        fontSize: '2rem', 
        fontWeight: '700', 
        color: 'var(--accent)',
        marginBottom: '0.5rem'
      }}>
        {value}
      </div>
      <div style={{ 
        color: 'var(--text-secondary)', 
        fontSize: '0.9rem',
        marginBottom: trend ? '0.5rem' : '0'
      }}>
        {title}
      </div>
      {trend && (
        <div style={{ 
          fontSize: '0.85rem',
          color: trend.isPositive ? 'var(--success)' : 'var(--danger)',
          marginTop: '0.5rem'
        }}>
          {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
        </div>
      )}
    </div>
  );
}
