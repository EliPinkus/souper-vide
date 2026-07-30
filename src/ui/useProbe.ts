import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ProbeClient, type ProbeInfo } from '../combustion/probe-client';
import type { ProbeStatus } from '../combustion/probe-status';
import { describeError } from './format';
import type { ConnectionState } from './useNano';

export interface ProbeController {
  state: ConnectionState;
  status: ProbeStatus | null;
  info: ProbeInfo;
  deviceName: string | null;
  error: string | null;
  busy: boolean;
  canReconnect: boolean;
  connect: () => Promise<void>;
  /** Opens an unfiltered chooser, for when the filtered one comes up empty. */
  connectAny: () => Promise<void>;
  reconnect: () => Promise<void>;
  disconnect: () => void;
  /** Removal target, in °C — the probe's native unit. */
  setRemovalTarget: (celsius: number) => Promise<void>;
  clearPrediction: () => Promise<void>;
  clearError: () => void;
}

export function useProbe(): ProbeController {
  const [state, setState] = useState<ConnectionState>('disconnected');
  const [status, setStatus] = useState<ProbeStatus | null>(null);
  const [info, setInfo] = useState<ProbeInfo>({ serialNumber: null, firmwareRevision: null });
  const [deviceName, setDeviceName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [canReconnect, setCanReconnect] = useState(false);

  const clientRef = useRef<ProbeClient | null>(null);

  const client = useMemo(() => {
    const instance = new ProbeClient({
      onStatus: setStatus,
      onDisconnect: () => setState('disconnected'),
      onError: (err) => setError(describeError(err)),
    });
    clientRef.current = instance;
    return instance;
  }, []);

  useEffect(() => () => client.disconnect(), [client]);

  const run = useCallback(async (action: () => Promise<void>) => {
    setBusy(true);
    setError(null);
    try {
      await action();
    } catch (err) {
      setError(describeError(err));
    } finally {
      setBusy(false);
    }
  }, []);

  const connect = useCallback(
    async (acceptAllDevices = false) => {
      setState('connecting');
      setError(null);
      try {
        await client.connect({ acceptAllDevices });
        setDeviceName(client.deviceName);
        setInfo(client.deviceInfo);
        setCanReconnect(true);
        setState('connected');
      } catch (err) {
        setError(describeError(err));
        setState('disconnected');
      }
    },
    [client],
  );

  const reconnect = useCallback(async () => {
    setState('connecting');
    setError(null);
    try {
      await client.reconnect();
      setInfo(client.deviceInfo);
      setState('connected');
    } catch (err) {
      setError(describeError(err));
      setState('disconnected');
    }
  }, [client]);

  const disconnect = useCallback(() => {
    client.disconnect();
    setState('disconnected');
  }, [client]);

  return {
    state,
    status,
    info,
    deviceName,
    error,
    busy,
    canReconnect,
    connect: () => connect(false),
    connectAny: () => connect(true),
    reconnect,
    disconnect,
    setRemovalTarget: (celsius) => run(() => client.setRemovalTarget(celsius)),
    clearPrediction: () => run(() => client.clearPrediction()),
    clearError: () => setError(null),
  };
}
