// src/pages/index.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function Home() {
  const [step, setStep] = useState<'select' | 'result'>('select');
  const [guess, setGuess] = useState<'heads' | 'tails' | null>(null);
  const [result, setResult] = useState<'heads' | 'tails' | null>(null);
  const [history, setHistory] = useState<Array<{ guess: 'heads' | 'tails'; result: 'heads' | 'tails' }>>([]);

  const handleFlip = () => {
    if (!guess) return;
    const outcome: 'heads' | 'tails' = Math.random() < 0.5 ? 'heads' : 'tails';
    setResult(outcome);
    setStep('result');
    setHistory((prev) => [{ guess, result: outcome }, ...prev].slice(0, 10));
  };

  const playAgain = () => {
    setStep('select');
    setGuess(null);
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center relative overflow-hidden">
      {/* Arka plan yıldızlar */}
      <div className="stars fixed top-0 left-0 w-full h-full z-0" />

      {/* Oyun geçmişi */}
      <div className="absolute top-4 right-4 flex gap-2 z-10">
        {history.map((h, i) => (
          <div key={i} className="flex flex-col items-center">
            <Image
              src={h.result === 'heads' ? '/coin-head.png' : '/coin-tail.png'}
              alt={h.result}
              width={32}
              height={32}
              className="rounded-full"
            />
            <span className={`text-xs ${h.guess === h.result ? 'text-green-400' : 'text-red-400'}`}>
              {h.guess === h.result ? 'WIN' : 'LOSE'}
            </span>
          </div>
        ))}
      </div>

      {/* Logo + Başlık */}
      <div className="z-10 flex flex-col items-center mb-6">
        <Image src="/logo.png" alt="Logo" width={96} height={96} className="mb-2" />
        <h1 className="text-4xl font-bold">Eth OS Flip</h1>
      </div>

      {step === 'select' && (
        <div className="z-10 flex flex-col items-center gap-6">
          <div className="flex gap-6">
            <button onClick={() => setGuess('heads')} className={`px-6 py-4 rounded-xl flex flex-col items-center ${guess === 'heads' ? 'bg-green-500' : 'bg-gray-800'}`}>
              <Image src="/coin-head.png" alt="head" width={64} height={64} className="mb-2" />
              HEAD
            </button>
            <button onClick={() => setGuess('tails')} className={`px-6 py-4 rounded-xl flex flex-col items-center ${guess === 'tails' ? 'bg-red-500' : 'bg-gray-800'}`}>
              <Image src="/coin-tail.png" alt="tail" width={64} height={64} className="mb-2" />
              TAIL
            </button>
          </div>
          <button onClick={handleFlip} disabled={!guess} className="border border-white px-6 py-3 mt-4">
            FLIP OS!
          </button>
        </div>
      )}

      {step === 'result' && result && (
        <div className="z-10 flex flex-col items-center gap-4">
          <Image
            src={result === 'heads' ? '/coin-head.png' : '/coin-tail.png'}
            alt={result}
            width={128}
            height={128}
            className="rounded-full"
          />
          <h2 className="text-2xl">
            {guess === result ? '🎉 Congrats! WIN' : '😢 Unlucky! LOSE'}
          </h2>
          <button onClick={playAgain} className="mt-2 px-4 py-2 bg-white text-black rounded">
            Play Again
          </button>
        </div>
      )}
    </div>
  );
}
