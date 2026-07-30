import { useEffect, useState } from 'react';
import { TEMP_LIMITS, type TempUnit } from '../anova/constants';
import { DeviceCard, Readout } from './DeviceCard';
import { convertTemp, formatMinutes, formatTemp } from './format';
import { NANO_PAIRING } from './pairing';
import type { NanoController } from './useNano';

interface NanoCardProps {
  nano: NanoController;
  /** App-wide display unit, which may differ from the cooker's own setting. */
  displayUnit: TempUnit;
}

export function NanoCard({ nano, displayUnit }: NanoCardProps) {
  const { status, state, busy } = nano;
  const connected = state === 'connected';
  const deviceUnit = status.unit;

  // Draft values so typing in the inputs doesn't fight the 5-second poll.
  const [targetDraft, setTargetDraft] = useState('');
  const [timerDraft, setTimerDraft] = useState('');
  const [editingTarget, setEditingTarget] = useState(false);
  const [editingTimer, setEditingTimer] = useState(false);

  const targetInDisplayUnit =
    status.targetTemp === null ? null : convertTemp(status.targetTemp, deviceUnit, displayUnit);

  useEffect(() => {
    if (!editingTarget && targetInDisplayUnit !== null) setTargetDraft(targetInDisplayUnit.toFixed(1));
  }, [targetInDisplayUnit, editingTarget]);

  useEffect(() => {
    if (!editingTimer && status.timerMinutes !== null) setTimerDraft(String(status.timerMinutes));
  }, [status.timerMinutes, editingTimer]);

  const limits = TEMP_LIMITS[displayUnit];

  const submitTarget = async () => {
    setEditingTarget(false);
    const parsed = Number(targetDraft);
    if (!Number.isFinite(parsed)) return;
    const clamped = Math.min(limits.max, Math.max(limits.min, parsed));
    // The cooker interprets the setpoint in its own display unit, so convert
    // back out of whatever the app is currently showing.
    await nano.setTargetTemp(convertTemp(clamped, displayUnit, deviceUnit ?? displayUnit));
  };

  const submitTimer = async () => {
    setEditingTimer(false);
    const parsed = Number(timerDraft);
    if (!Number.isFinite(parsed) || parsed < 0) return;
    await nano.setTimer(Math.round(parsed));
  };

  const waterTemp =
    status.waterTemp === null ? null : convertTemp(status.waterTemp, deviceUnit, displayUnit);

  return (
    <DeviceCard
      title="Anova Precision Cooker Nano"
      subtitle="Sous vide circulator"
      accent="#f0713a"
      state={state}
      deviceName={nano.deviceName}
      canReconnect={nano.canReconnect}
      error={nano.error}
      pairing={NANO_PAIRING}
      onConnect={nano.connect}
      onConnectAny={nano.connectAny}
      onReconnect={nano.reconnect}
      onDisconnect={nano.disconnect}
      onDismissError={nano.clearError}
    >
      <div className="hero">
        <div className="hero-main">
          <span className="hero-value">{formatTemp(waterTemp, displayUnit)}</span>
          <span className="hero-label">Water temperature</span>
        </div>
        <div className="hero-side">
          <span className={`run-state ${status.isCooking ? 'on' : 'off'}`}>
            {status.isCooking ? 'Running' : 'Idle'}
          </span>
          {status.targetTemp !== null && waterTemp !== null && (
            <span className="hero-delta">
              {formatTemp(Math.abs((targetInDisplayUnit ?? 0) - waterTemp), displayUnit)} to target
            </span>
          )}
        </div>
      </div>

      <div className="readouts">
        <Readout label="Target" value={formatTemp(targetInDisplayUnit, displayUnit)} />
        <Readout label="Timer" value={formatMinutes(status.timerMinutes)} />
        <Readout
          label="Cooker display"
          value={deviceUnit ? `°${deviceUnit}` : '—'}
          hint={deviceUnit && deviceUnit !== displayUnit ? 'differs from app' : undefined}
        />
      </div>

      {(status.waterLow || status.waterLeak || status.alerts.length > 0) && (
        <div className="alerts">
          {status.waterLow && <span className="alert warn">Water level low</span>}
          {status.waterLeak && <span className="alert danger">Water leak detected</span>}
          {status.alerts
            .filter((name) => name !== 'WATER_LOW' && name !== 'WATER_LEAK')
            .map((name) => (
              <span key={name} className="alert">
                {name.toLowerCase().replace(/_/g, ' ')}
              </span>
            ))}
        </div>
      )}

      <div className="controls">
        <label className="field">
          <span>Target temperature (°{displayUnit})</span>
          <div className="field-row">
            <input
              id="nano-target"
              name="nano-target"
              type="number"
              step="0.5"
              min={limits.min}
              max={limits.max}
              value={targetDraft}
              disabled={!connected || busy}
              onFocus={() => setEditingTarget(true)}
              onChange={(event) => setTargetDraft(event.target.value)}
              onBlur={submitTarget}
              onKeyDown={(event) => {
                if (event.key === 'Enter') void submitTarget();
              }}
            />
            <button type="button" onClick={submitTarget} disabled={!connected || busy}>
              Set
            </button>
          </div>
          <small>
            {limits.min}–{limits.max}°{displayUnit}
          </small>
        </label>

        <label className="field">
          <span>Timer (minutes)</span>
          <div className="field-row">
            <input
              id="nano-timer"
              name="nano-timer"
              type="number"
              step="1"
              min={0}
              value={timerDraft}
              disabled={!connected || busy}
              onFocus={() => setEditingTimer(true)}
              onChange={(event) => setTimerDraft(event.target.value)}
              onBlur={submitTimer}
              onKeyDown={(event) => {
                if (event.key === 'Enter') void submitTimer();
              }}
            />
            <button type="button" onClick={submitTimer} disabled={!connected || busy}>
              Set
            </button>
          </div>
          <small>0 turns the timer off</small>
        </label>

        <div className="field">
          <span>Cooker display unit</span>
          <div className="segmented">
            {(['C', 'F'] as TempUnit[]).map((unit) => (
              <button
                key={unit}
                type="button"
                className={deviceUnit === unit ? 'active' : ''}
                disabled={!connected || busy}
                onClick={() => void nano.setUnit(unit)}
              >
                °{unit}
              </button>
            ))}
          </div>
          <small>Changes the unit shown on the cooker itself</small>
        </div>
      </div>

      <div className="run-controls">
        <button
          type="button"
          className="primary wide"
          disabled={!connected || busy || status.isCooking}
          onClick={() => void nano.start()}
        >
          Start cooking
        </button>
        <button
          type="button"
          className="ghost wide"
          disabled={!connected || busy || !status.isCooking}
          onClick={() => void nano.stop()}
        >
          Stop
        </button>
      </div>

      {status.protocol && (
        <footer className="card-footer">
          <span>Speaking {status.protocol}</span>
        </footer>
      )}
    </DeviceCard>
  );
}
