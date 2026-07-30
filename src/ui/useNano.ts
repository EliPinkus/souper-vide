import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { EMPTY_NANO_STATUS, NanoClient, type NanoStatus } from '../anova/nano-client';
import type { TempUnit } from '../anova/constants';
import { describeError } from './format';

export type ConnectionState = 'disconnected' | 'connecting' | 'connected';

export interface NanoController {
  state: ConnectionState;
  status: NanoStatus;
  deviceName: string | null;
  error: string | null;
  /** True while a settings write is in flight, so the UI can disable inputs. */
  busy: boolean;
  /** A device has been chosen at least once, so Reconnect is meaningful. */
  canReconnect: boolean;
  connect: () => Promise<void>;
  /** Opens an unfiltered chooser, for when the filtered one comes up empty. */
  connectAny: () => Promise<void>;
  reconnect: () => Promise<void>;
  disconnect: () => void;
  setTargetTemp: (temp: number) => Promise<void>;
  setTimer: (minutes: number) => Promise<void>;
  setUnit: (unit: TempUnit) => Promise<void>;
  start: () => Promise<void>;
  stop: () => Promise<void>;
  clearError: () => void;
}

export function useNano(): NanoController {
  const [state, setState] = useState<ConnectionState>('disconnected');
  const [status, setStatus] = useState<NanoStatus>(EMPTY_NANO_STATUS);
  const [deviceName, setDeviceName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [canReconnect, setCanReconnect] = useState(false);

  const clientRef = useRef<NanoClient | null>(null);

  const client = useMemo(() => {
    const instance = new NanoClient({
      onStatus: setStatus,
      onDisconnect: () => setState('disconnected'),
      onError: (err) => setError(describeError(err)),
    });
    clientRef.current = instance;
    return instance;
  }, []);

  useEffect(() => () => client.disconnect(), [client]);

  /** Wraps an action so every path reports errors and clears `busy`. */
  const run = useCallback(
    async (action: () => Promise<void>) => {
      setBusy(true);
      setError(null);
      try {
        await action();
      } catch (err) {
        setError(describeError(err));
      } finally {
        setBusy(false);
      }
    },
    [],
  );

  const connect = useCallback(
    async (acceptAllDevices = false) => {
      setState('connecting');
      setError(null);
      try {
        await client.connect({ acceptAllDevices });
        setDeviceName(client.deviceName);
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
    deviceName,
    error,
    busy,
    canReconnect,
    connect: () => connect(false),
    connectAny: () => connect(true),
    reconnect,
    disconnect,
    setTargetTemp: (temp) => run(() => client.setTargetTemp(temp)),
    setTimer: (minutes) => run(() => client.setTimer(minutes)),
    setUnit: (unit) => run(() => client.setTempUnit(unit)),
    start: () => run(() => client.startCooking()),
    stop: () => run(() => client.stopCooking()),
    clearError: () => setError(null),
  };
}
