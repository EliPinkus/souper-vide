import { useEffect, useState } from 'react';
import type { TempUnit } from '../anova/constants';
import { fToC } from '../anova/constants';
import {
  PREDICTION_STATE_LABELS,
  PROBE_COLORS,
  ProbeMode,
  SET_POINT_LIMITS_C,
} from '../combustion/constants';
import { DeviceCard, Readout } from './DeviceCard';
import { displayFromC, formatCelsius, formatDuration } from './format';
import { PROBE_PAIRING } from './pairing';
import type { ProbeController } from './useProbe';

interface ProbeCardProps {
  probe: ProbeController;
  displayUnit: TempUnit;
}

export function ProbeCard({ probe, displayUnit }: ProbeCardProps) {
  const { status, state, busy } = probe;
  const connected = state === 'connected';

  const [targetDraft, setTargetDraft] = useState('');
  const [editing, setEditing] = useState(false);

  const setPointC = status?.prediction.setPointC ?? null;
  const setPointDisplay = setPointC === null ? null : displayFromC(setPointC, displayUnit);

  useEffect(() => {
    if (!editing && setPointDisplay !== null) setTargetDraft(setPointDisplay.toFixed(1));
  }, [setPointDisplay, editing]);

  // The probe's 10-bit set point field maxes out at 102.3 °C regardless of the
  // unit the app happens to be displaying.
  const limits =
    displayUnit === 'C'
      ? SET_POINT_LIMITS_C
      : { min: displayFromC(SET_POINT_LIMITS_C.min, 'F'), max: displayFromC(SET_POINT_LIMITS_C.max, 'F') };

  const submitTarget = async () => {
    setEditing(false);
    const parsed = Number(targetDraft);
    if (!Number.isFinite(parsed)) return;
    const clamped = Math.min(limits.max, Math.max(limits.min, parsed));
    await probe.setRemovalTarget(displayUnit === 'C' ? clamped : fToC(clamped));
  };

  const prediction = status?.prediction;
  const instantRead = status?.mode === ProbeMode.InstantRead;

  return (
    <DeviceCard
      title="Combustion Predictive Thermometer"
      subtitle="Wireless meat probe"
      accent="#4f8ef7"
      state={state}
      deviceName={probe.deviceName}
      canReconnect={probe.canReconnect}
      error={probe.error}
      pairing={PROBE_PAIRING}
      onConnect={probe.connect}
      onReconnect={probe.reconnect}
      onDisconnect={probe.disconnect}
      onDismissError={probe.clearError}
    >
      <div className="hero">
        <div className="hero-main">
          <span className="hero-value">{formatCelsius(status?.coreC, displayUnit)}</span>
          <span className="hero-label">{instantRead ? 'Instant read' : 'Core temperature'}</span>
        </div>
        <div className="hero-side">
          <span className={`run-state ${prediction?.state === 4 ? 'on' : 'off'}`}>
            {prediction ? (PREDICTION_STATE_LABELS[prediction.state] ?? 'Unknown') : '—'}
          </span>
          {prediction?.secondsRemaining !== null && prediction?.secondsRemaining !== undefined && (
            <span className="hero-delta">{formatDuration(prediction.secondsRemaining)} to removal</span>
          )}
        </div>
      </div>

      {prediction?.percentToRemoval !== null && prediction?.percentToRemoval !== undefined && (
        <div className="progress" role="progressbar" aria-valuenow={Math.round(prediction.percentToRemoval * 100)}>
          <div className="progress-fill" style={{ width: `${prediction.percentToRemoval * 100}%` }} />
        </div>
      )}

      <div className="readouts">
        <Readout label="Surface" value={formatCelsius(status?.surfaceC, displayUnit)} />
        <Readout label="Ambient" value={formatCelsius(status?.ambientC, displayUnit)} />
        <Readout
          label="Est. core"
          value={formatCelsius(prediction?.estimatedCoreC, displayUnit)}
          hint="probe's own estimate"
        />
      </div>

      {status && (
        <details className="sensors">
          <summary>All eight thermistors</summary>
          <div className="sensor-grid">
            {status.temperaturesC.map((temp, index) => {
              const roles = [
                index === status.virtualSensors.core ? 'core' : null,
                index === status.virtualSensors.surface ? 'surface' : null,
                index === status.virtualSensors.ambient ? 'ambient' : null,
              ].filter(Boolean);
              return (
                <div key={index} className={`sensor ${status.overheatingSensors.includes(index) ? 'hot' : ''}`}>
                  <span className="sensor-name">T{index + 1}</span>
                  <span className="sensor-value">{formatCelsius(temp, displayUnit)}</span>
                  {roles.length > 0 && <span className="sensor-role">{roles.join(' · ')}</span>}
                </div>
              );
            })}
          </div>
        </details>
      )}

      {status && (status.batteryLow || status.overheatingSensors.length > 0) && (
        <div className="alerts">
          {status.batteryLow && <span className="alert warn">Battery low</span>}
          {status.overheatingSensors.length > 0 && (
            <span className="alert danger">
              Overheating: {status.overheatingSensors.map((i) => `T${i + 1}`).join(', ')}
            </span>
          )}
        </div>
      )}

      <div className="controls">
        <label className="field">
          <span>Removal target (°{displayUnit})</span>
          <div className="field-row">
            <input
              id="probe-target"
              name="probe-target"
              type="number"
              step="0.5"
              min={limits.min}
              max={limits.max}
              value={targetDraft}
              disabled={!connected || busy}
              onFocus={() => setEditing(true)}
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
            {limits.min.toFixed(0)}–{limits.max.toFixed(0)}°{displayUnit}
          </small>
        </label>

        <div className="field">
          <span>Prediction</span>
          <button
            type="button"
            className="ghost wide"
            disabled={!connected || busy}
            onClick={() => void probe.clearPrediction()}
          >
            Clear prediction
          </button>
          <small>Stops the removal countdown without disconnecting</small>
        </div>
      </div>

      {status && (
        <footer className="card-footer">
          <span>
            Probe {status.probeId + 1} · {PROBE_COLORS[status.colorId] ?? `Color ${status.colorId}`}
          </span>
          {probe.info.serialNumber && <span>SN {probe.info.serialNumber}</span>}
          {probe.info.firmwareRevision && <span>FW {probe.info.firmwareRevision}</span>}
        </footer>
      )}
    </DeviceCard>
  );
}
