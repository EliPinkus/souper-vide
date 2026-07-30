import { useEffect, useState } from 'react';
import type { TempUnit } from './anova/constants';
import { NanoCard } from './ui/NanoCard';
import { ProbeCard } from './ui/ProbeCard';
import { formatAge } from './ui/format';
import { useNano } from './ui/useNano';
import { useProbe } from './ui/useProbe';
import './App.css';

const supportsWebBluetooth = typeof navigator !== 'undefined' && 'bluetooth' in navigator;

export default function App() {
  const nano = useNano();
  const probe = useProbe();
  const [displayUnit, setDisplayUnit] = useState<TempUnit>('F');

  // Re-render once a second so the "updated Ns ago" stamp stays honest.
  const [, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((n) => n + 1), 1000);
    return () => clearInterval(id);
  }, []);

  const lastUpdate = Math.max(nano.status.updatedAt, probe.status?.updatedAt ?? 0);

  return (
    <div className="app">
      <header className="app-header">
        <div className="brand">
          <h1>SouperVide</h1>
          <p>Anova Nano and Combustion probe, on one screen.</p>
        </div>
        <div className="header-controls">
          <div className="segmented">
            {(['C', 'F'] as TempUnit[]).map((unit) => (
              <button
                key={unit}
                type="button"
                className={displayUnit === unit ? 'active' : ''}
                onClick={() => setDisplayUnit(unit)}
              >
                °{unit}
              </button>
            ))}
          </div>
          {lastUpdate > 0 && <span className="timestamp">Updated {formatAge(lastUpdate)}</span>}
        </div>
      </header>

      {!supportsWebBluetooth && (
        <div className="banner" role="alert">
          <strong>This browser can't talk to Bluetooth devices.</strong> SouperVide needs Web
          Bluetooth, which means desktop Chrome or Edge, or Chrome on Android. It will never work on
          iOS — Apple has declined to implement Web Bluetooth, and every iOS browser uses Safari's
          engine.
        </div>
      )}

      {supportsWebBluetooth && !window.isSecureContext && (
        <div className="banner" role="alert">
          <strong>Insecure context.</strong> Web Bluetooth requires HTTPS or localhost.
        </div>
      )}

      <main className="grid">
        <NanoCard nano={nano} displayUnit={displayUnit} />
        <ProbeCard probe={probe} displayUnit={displayUnit} />
      </main>

      <footer className="app-footer">
        Each device needs its own Connect click — Chrome only opens its device chooser from a user
        gesture, and it can only offer one device per prompt.
      </footer>
    </div>
  );
}
