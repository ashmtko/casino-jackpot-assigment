interface ControlsProps {
  canSpin: boolean;
  canCashOut: boolean;
  onSpin: () => void;
  onCashOut: () => void;
  isSessionActive: boolean;
  onStartNewSession: () => void;
}

export function Controls({ canSpin, canCashOut, onSpin, onCashOut, isSessionActive, onStartNewSession }: ControlsProps) {
  return (
    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
      {isSessionActive ? (
        <>
          <button
            onClick={onSpin}
            disabled={!canSpin}
            style={{
              padding: '1rem 2rem',
              borderRadius: '12px',
              background: canSpin ? 'linear-gradient(90deg, #6366f1 0%, #8b5cf6 100%)' : '#9ca3af',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '1.125rem',
              boxShadow: canSpin ? '0 4px 6px rgba(0,0,0,0.1)' : 'none',
              border: 'none',
              cursor: canSpin ? 'pointer' : 'not-allowed',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'all 0.2s ease',
              opacity: canSpin ? 1 : 0.5
            }}
            onMouseEnter={(e) => {
              if (canSpin) {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 8px 15px rgba(0,0,0,0.2)';
              }
            }}
            onMouseLeave={(e) => {
              if (canSpin) {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
              }
            }}
          >
            <span>🎰</span>
            Spin
          </button>
          <button
            onClick={onCashOut}
            disabled={!canCashOut}
            style={{
              padding: '1rem 2rem',
              borderRadius: '12px',
              background: canCashOut ? 'linear-gradient(90deg, #10b981 0%, #14b8a6 100%)' : '#9ca3af',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '1.125rem',
              boxShadow: canCashOut ? '0 4px 6px rgba(0,0,0,0.1)' : 'none',
              border: 'none',
              cursor: canCashOut ? 'pointer' : 'not-allowed',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'all 0.2s ease',
              opacity: canCashOut ? 1 : 0.5
            }}
            onMouseEnter={(e) => {
              if (canCashOut) {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 8px 15px rgba(0,0,0,0.2)';
              }
            }}
            onMouseLeave={(e) => {
              if (canCashOut) {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
              }
            }}
          >
            <span>💰</span>
            Cash Out
          </button>
        </>
      ) : (
        <button
          onClick={onStartNewSession}
          style={{
            padding: '1rem 2rem',
            borderRadius: '12px',
            background: 'linear-gradient(90deg, #f59e0b 0%, #f97316 100%)',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '1.125rem',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.boxShadow = '0 8px 15px rgba(0,0,0,0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
          }}
        >
          <span>🚀</span>
          Start New Session
        </button>
      )}
    </div>
  );
}


