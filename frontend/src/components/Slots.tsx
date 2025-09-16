import { useEffect, useState } from 'react';
import { SYMBOLS } from '../consts';

interface SlotsProps {
  reels: string[];
  pending: boolean
}

export function Slots({ reels, pending }: SlotsProps) {
  const [spinning, setSpinning] = useState<boolean[]>([false, false, false]);


  useEffect(() => {
    const timers: number[] = [];

    if (pending) {
      // start spinning
      setSpinning([true, true, true]);
    } 
    
    if (!pending && spinning.some(s => s)) {
      timers.push(window.setTimeout(() => {
        setSpinning([false, true, true])
      }, 400));
      timers.push(window.setTimeout(() => {
        setSpinning([false, false, true])
      }, 800));
      timers.push(window.setTimeout(() => {
        setSpinning([false, false, false])
      }, 1200));
    }

    return () => {
      timers.forEach(t => clearTimeout(t));
    };
  }, [pending]);


  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      gap: '3rem',
      justifyContent: 'center',
      alignItems: 'center',
      margin: '1.5rem 0'
    }}>
      {reels.map((value, i) => {
        return (
          <div key={i} style={{
            width: '72px',
            height: '72px',
            border: '2px solid #1e293b',
            borderRadius: '12px',
            overflow: 'hidden',
            background: 'white',
            position: 'relative',
            boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)'
          }}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                ...(spinning[i] && {
                  animation: 'reel-spin 0.1s linear infinite',
                  animationDuration: '80ms'
                }),
              }}  >
              {SYMBOLS.map((s, idx) => (
                <div key={idx} style={{
                  height: '72px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '28px',
                  fontWeight: 800,
                  color: '#1e293b'
                }}>{spinning[i] ? s : value}</div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}


