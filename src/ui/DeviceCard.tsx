import type { ReactNode } from 'react';
import { PairingHelp } from './PairingHelp';
import type { PairingContent } from './pairing';
import type { ConnectionState } from './useNano';

interface DeviceCardProps {
  title: string;
  subtitle: string;
  accent: string;
  state: ConnectionState;
  deviceName: string | null;
  canReconnect: boolean;
  error: string | null;
  pairing: PairingContent;
  onConnect: () => void;
  onReconnect: () => void;
  onDisconnect: () => void;
  onDismissError: () => void;
  children: ReactNode;
}

const STATE_LABEL: Record<ConnectionState, string> = {
  disconnected: 'Disconnected',
  connecting: 'Connecting…',
  connected: 'Connected',
};

export function DeviceCard({
  title,
  subtitle,
  accent,
  state,
  deviceName,
  canReconnect,
  error,
  pairing,
  onConnect,
  onReconnect,
  onDisconnect,
  onDismissError,
  children,
}: DeviceCardProps) {
  return (
    <section className="card" style={{ '--accent': accent } as React.CSSProperties}>
      <header className="card-header">
        <div>
          <h2>{title}</h2>
          <p className="subtitle">{deviceName ?? subtitle}</p>
        </div>
        <span className={`status-pill ${state}`}>
          <span className="dot" />
          {STATE_LABEL[state]}
        </span>
      </header>

      <div className="card-actions">
        {state === 'connected' ? (
          <button type="button" className="ghost" onClick={onDisconnect}>
            Disconnect
          </button>
        ) : (
          <>
            <button
              type="button"
              className="primary"
              onClick={onConnect}
              disabled={state === 'connecting'}
            >
              Connect
            </button>
            {canReconnect && (
              <button
                type="button"
                className="ghost"
                onClick={onReconnect}
                disabled={state === 'connecting'}
              >
                Reconnect
              </button>
            )}
          </>
        )}
      </div>

      {error && (
        <div className="error" role="alert">
          <span>{error}</span>
          <button type="button" onClick={onDismissError} aria-label="Dismiss error">
            ×
          </button>
        </div>
      )}

      {/* Only useful while there is nothing to connect to; hidden once live. */}
      {state !== 'connected' && (
        <PairingHelp content={pairing} startOpen={!canReconnect} error={error} />
      )}

      <div className={`card-body ${state === 'connected' ? '' : 'inactive'}`}>{children}</div>
    </section>
  );
}

export function Readout({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="readout">
      <span className="readout-label">{label}</span>
      <span className="readout-value">{value}</span>
      {hint && <span className="readout-hint">{hint}</span>}
    </div>
  );
}
