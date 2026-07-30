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
    'Plug the cooker in and leave it alone. It advertises on its own — you do not need the button-hold sequence here.',
    'Close the Anova app on any phone or tablet in range. A held Bluetooth connection is the usual reason the cooker never reaches the picker.',
    'Click Connect, then choose the cooker. The picker matches on Anova’s service UUID or a name starting with “Anova”.',
  ],
  troubleshooting: [
    'Holding minus + timer for 10 seconds is Anova’s clear-credentials reset, not a pairing mode. It wipes the cooker’s stored pairing and reboots it, and Anova says to unplug and replug afterwards — until you do, it may not be advertising at all.',
    'If you just ran that reset: unplug the cooker, wait ten seconds, plug it back in, then try Connect again.',
    'Nothing listed at all? Use “Show every Bluetooth device” below. The Nano may not put its service UUID in its advertisement, which would filter it out of the normal picker even though it is right there.',
    'macOS asks each browser for Bluetooth permission separately. If Chrome was ever denied, every chooser comes up empty and silently — check System Settings › Privacy & Security › Bluetooth.',
    'If your macOS asks you to confirm a Bluetooth pairing, accept it. Anova\u2019s Gen 3 cookers (Mini, Nano 3.0) drop the connection if pairing is declined.',
    'A Gen 3 cooker that will not pair can be reset by holding its top button for about 10 seconds until the light goes out.',
    'Force-quit the Anova app rather than just backgrounding it, and keep the cooker within a few metres for the first connection.',
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
    'macOS asks each browser for Bluetooth permission separately. If Chrome was ever denied, every chooser comes up empty and silently — check System Settings › Privacy & Security › Bluetooth.',
  ],
};

/** Applies to both devices, and is the part people get wrong first. */
export const CHOOSER_NOTE =
  'Chrome’s picker is not system pairing — do not add these devices in your OS Bluetooth settings. Chrome connects to them directly.';
