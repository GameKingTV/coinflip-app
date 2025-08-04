'use client';

import { useState } from 'react';

export default function Home() {
    const [result, setResult] = useState<'heads' | 'tails' | null>(null);

    const flipCoin = () => {
        const outcome = Math.random() < 0.5 ? 'heads' : 'tails';
        setResult(outcome);
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(to bottom, #667eea, #764ba2)',
            color: 'white'
        }}>
            <h1 style={{ fontSize: '3rem', marginBottom: '2rem' }}>🪙 Coin Flip Game</h1>
            <button
                onClick={flipCoin}
                style={{
                    padding: '1rem 2rem',
                    backgroundColor: 'black',
                    borderRadius: '1rem',
                    cursor: 'pointer'
                }}
            >
                Flip Coin
            </button>
            {result && (
                <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                    <img
                        src={result === 'heads' ? '/coin-head.png' : '/coin-tail.png'}
                        alt={result}
                        width={128}
                        height={128}
                    />
                    <p style={{ marginTop: '1rem', fontSize: '1.5rem' }}>Result: <strong>{result.toUpperCase()}</strong></p>
                </div>
            )}
        </div>
    );
}
