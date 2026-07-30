/**
 * Pairing copy for each device.
 *
 * Everything in `steps` is sourced from the vendor specs or is generic Web
 * Bluetooth behaviour. Combustion documents its advertising rules explicitly
 * (continuous advertising whenever the probe is out of a charger, and a hard
 * limit of 3 simultaneous BLE connections after which it advertises
 * unconnectable). Anova publishes no advertising details at all, so the Nano's
 * notes stay on what's observable rather than asserting limits.
 */

export interface PairingContent {
  steps: string[];
  troubleshooting: string[];
}

export const NANO_PAIRING: PairingContent = {
  steps: [
    'Plug the cooker in. It powers up advertising — there is no pairing button, no PIN, and nothing to confirm on the device.',
    'Close the Anova app on any phone or tablet in range. A held Bluetooth connection is the usual reason the cooker never reaches the picker.',
    'Click Connect, then choose the cooker. The picker is filtered to Anova’s service UUID, so it should be the only thing offered.',
  ],
  troubleshooting: [
    'Nothing listed? Something else is almost certainly connected to it. Force-quit the Anova app rather than just backgrounding it.',
    'Unplugging the cooker for ten seconds resets its radio and clears a wedged connection.',
    'It should be within a few metres for the first connection; range improves once connected.',
  ],
};

export const PROBE_PAIRING: PairingContent = {
  steps: [
    'Take the probe out of its charger. It advertises continuously whenever it is out, and goes quiet the moment it is back in.',
    'Click Connect, then choose the probe. It advertises no name, so Chrome may list it as an unnamed device — the picker is filtered to Combustion’s Probe Status service, so anything offered is your probe.',
    'Keep it within a few metres while connecting. The probe negotiates a slow 400–500 ms connection interval in normal mode, so the first status can take a second to arrive.',
  ],
  troubleshooting: [
    'The probe accepts 3 simultaneous Bluetooth connections. At 3 it switches to unconnectable advertising and vanishes from the picker — disconnect a Display, a Booster, or the Combustion app to free a slot.',
    'A probe sitting in its charger does not advertise at all. That is the most common reason it never appears.',
    'Readings jumping around in single digits usually means the probe is in Instant Read mode, where only T1 reports and the other seven sensors read zero.',
  ],
};

/** Applies to both devices, and is the part people get wrong first. */
export const CHOOSER_NOTE =
  'Chrome’s picker is not system pairing — do not add these devices in your OS Bluetooth settings. Chrome connects to them directly.';
