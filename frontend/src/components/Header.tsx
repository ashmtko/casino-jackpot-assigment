interface HeaderProps {
  user: string
  credits: number;
}

export function Header({ user, credits }: HeaderProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: user ? 'space-between' : 'flex-end', width: '100%' }}>
      {user && <div style={{ fontSize: '0.875rem' }}>
        <span style={{ fontWeight: '500', color: '#64748b' }}>User:</span>
        <span style={{ marginLeft: '0.5rem', color: '#334155', fontFamily: 'monospace', fontSize: '0.75rem' }}>
          {user}
        </span>
      </div>
      }
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem' }}>
        <span style={{ fontSize: '0.875rem', fontWeight: '500', color: '#64748b' }}>Credits</span>
        <div style={{
          padding: '0.5rem 1rem',
          background: 'linear-gradient(90deg, #6366f1 0%, #8b5cf6 100%)',
          color: 'white',
          borderRadius: '9999px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}>
          <span style={{ fontSize: '1.125rem', fontWeight: 'bold' }}>{credits}</span>
        </div>
      </div>
    </div>
  );
}
