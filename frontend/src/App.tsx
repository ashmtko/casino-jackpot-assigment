import { Header } from './components/Header';
import { Controls } from './components/Controls';
import { useGame } from './hooks/useGame';
import { Slots } from './components/Slots';
import { useSession } from './hooks/useSession';

function App() {
  const game = useGame()
  const session = useSession();

  const enabled = !game.store.pending && game.store.credits > 0

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem'
    }}>
      <div style={{ width: '100%', maxWidth: '500px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ 
            fontSize: '2.5rem', 
            fontWeight: 'bold', 
            color: 'white',
            marginBottom: '0.5rem',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
          }}>
            🎰 Casino Jackpot
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.1rem' }}>
            Spin to win! House always has the edge.
          </p>
        </div>

        {/* Game Card */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '20px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
          border: '1px solid rgba(255,255,255,0.2)',
          overflow: 'hidden'
        }}>
          {/* Session Info */}
          <div style={{
            background: 'linear-gradient(90deg, #f8fafc 0%, #e2e8f0 100%)',
            padding: '1.5rem',
            borderBottom: '1px solid #e2e8f0'
          }}>
            <Header credits={game.store.credits} user={game.store.user} />
          </div>

          {/* Slots */}
          <div style={{ padding: '2rem' }}>
            <Slots reels={game.store.reels} pending={game.store.pending} />
          </div>

          {/* Controls */}
          <div style={{ padding: '0 1.5rem 1.5rem 1.5rem' }}>
          <Controls
            canSpin={enabled}
            canCashOut={enabled}
            onSpin={game.spin}
            onCashOut={game.cashout}
            isSessionActive={session.isActiveSession}
            onStartNewSession={session.startSession}
          />
          </div>
        </div>

        {/* Messages */}
        {game.store.message && (
          <div style={{
            marginTop: '1.5rem',
            padding: '1rem',
            backgroundColor: '#dbeafe',
            border: '1px solid #93c5fd',
            borderRadius: '12px',
            textAlign: 'center'
          }}>
            <p style={{ color: '#1e40af', fontWeight: '500', margin: 0 }}>{game.store.message}</p>
          </div>
        )}

        {/* Legend */}
        <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
          <div style={{ 
            display: 'inline-flex', 
            flexWrap: 'wrap', 
            gap: '1rem', 
            justifyContent: 'center',
            fontSize: '0.875rem',
            color: 'rgba(255,255,255,0.9)'
          }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{
                width: '24px',
                height: '24px',
                backgroundColor: '#fef2f2',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#dc2626',
                fontWeight: 'bold'
              }}>C</span>
              Cherry (10)
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{
                width: '24px',
                height: '24px',
                backgroundColor: '#fefce8',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#d97706',
                fontWeight: 'bold'
              }}>L</span>
              Lemon (20)
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{
                width: '24px',
                height: '24px',
                backgroundColor: '#fff7ed',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ea580c',
                fontWeight: 'bold'
              }}>O</span>
              Orange (30)
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{
                width: '24px',
                height: '24px',
                backgroundColor: '#f0fdf4',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#16a34a',
                fontWeight: 'bold'
              }}>W</span>
              Watermelon (40)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App
