import { useEffect, useState } from 'react';
import { CHOOSER_NOTE, type PairingContent } from './pairing';

interface PairingHelpProps {
  content: PairingContent;
  /** Whether to start expanded — true until the device has connected once. */
  startOpen: boolean;
  /** Expands the panel automatically when a connection attempt fails. */
  error: string | null;
  /** Opens an unfiltered chooser listing every advertising device. */
  onConnectAny: () => void;
  disabled: boolean;
}

export function PairingHelp({ content, startOpen, error, onConnectAny, disabled }: PairingHelpProps) {
  const [open, setOpen] = useState(startOpen);

  // A failed connection is exactly when these steps become worth reading.
  useEffect(() => {
    if (error) setOpen(true);
  }, [error]);

  return (
    <details className="pairing" open={open} onToggle={(event) => setOpen(event.currentTarget.open)}>
      <summary>How to connect</summary>

      <ol className="pairing-steps">
        {content.steps.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>

      <p className="pairing-note">{CHOOSER_NOTE}</p>

      <p className="pairing-subhead">If it doesn’t show up</p>
      <ul className="pairing-tips">
        {content.troubleshooting.map((tip) => (
          <li key={tip}>{tip}</li>
        ))}
      </ul>

      <div className="pairing-escape">
        <button type="button" className="ghost wide" onClick={onConnectAny} disabled={disabled}>
          Show every Bluetooth device
        </button>
        <small>
          Chrome can only filter on what a device puts in its advertisement, not on the services it
          turns out to have once connected. If the filtered list is empty, this unfiltered one will
          still find it — you just have to spot it yourself.
        </small>
      </div>
    </details>
  );
}
