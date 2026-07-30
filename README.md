# SouperVide

One screen for an **Anova Precision Cooker Nano** and a **Combustion Inc Predictive
Thermometer**, talking to both over Web Bluetooth straight from the browser. No backend,
no vendor cloud.

```bash
npm install
npm run dev      # http://localhost:5173
```

## Requirements

- **Chromium only** — desktop Chrome/Edge on macOS, Windows, or Linux, or Chrome on
  Android. Web Bluetooth will never work on iPhone: Apple has declined to implement it and
  every iOS browser is required to use Safari's engine.
- **HTTPS or localhost.** `localhost` counts as a secure context, so local dev needs no
  certificate.
- **One click per device.** Chrome only opens its device chooser from a user gesture, and
  it offers one device per prompt — hence two Connect buttons. Pairing does not persist in
  any way worth relying on, so there is a Reconnect button rather than a fight with the
  flag-gated `getDevices()`.

## Why Bluetooth and not the vendor clouds

Anova publishes a real cloud API (websocket, personal access token), but it covers the
A3–A8 and the Precision Oven. The Nano has no Wi-Fi radio and is explicitly unsupported.
Combustion's MeatNet Cloud is a consumer feature that needs a Wi-Fi Display or Booster to
bridge, with no published developer API — every developer resource they ship is Bluetooth.

## Layout

```
proto/nano.proto              vendored from anova-culinary/developer-project-nano
src/
  ble/cobs.ts                 COBS encode/decode + a streaming frame splitter
  ble/crc16.ts                CRC-16/CCITT-FALSE
  ble/bits.ts                 LSB-first packed-field reader/writer
  ble/bytes.ts                Uint8Array<ArrayBuffer> alias for GATT writes
  anova/constants.ts          lowercased UUIDs, unit tables, setpoint limits
  anova/generated/nano.*      protobufjs static output — regenerate, don't edit
  anova/nano-client.ts        GATT, framing, serial command queue, poll loop
  combustion/constants.ts     lowercased UUIDs, wire enums
  combustion/probe-status.ts  the packed status parser
  combustion/uart.ts          request/response framing + CRC
  combustion/probe-client.ts  GATT, status notifications, UART writes
  ui/                         hooks and cards
```

Regenerate the protobuf bindings after touching `proto/nano.proto`:

```bash
npm run proto:gen
```

## Protocol notes

Everything below comes from Anova's published BLE spec plus their Python reference
implementation, and from Combustion's `probe_ble_specification.rst`. Nothing was reverse
engineered. A few details differ from what the docs' prose implies, and each one silently
produces wrong behaviour rather than a clean error:

**Web Bluetooth requires lowercase UUIDs.** Both vendors print theirs uppercase and Chrome
throws on them. Normalized once in each `constants.ts`.

**Anova's message-type numbers are not sequential from 1**, and the CONFIG domain byte is
`0x00`, not `0x01`. The authoritative values are the `ConfigDomainMessageType` enum in
`nano.proto`:

| Command | Value | Command | Value |
| --- | --- | --- | --- |
| `SET_TEMP_SETPOINT` | 3 | `START_COOKING` | 10 |
| `GET_TEMP_SETPOINT` | 4 | `STOP_COOKING` | 11 |
| `GET_SENSORS` | 5 | `SET_COOKING_TIMER` | 16 |
| `SET_TEMP_UNITS` | 6 | `GET_COOKING_TIMER` | 18 |
| `GET_TEMP_UNITS` | 7 | `GET_FIRMWARE_INFO` | 26 |

Also worth knowing: the cooking timer is in **minutes**, not seconds; setpoints scale ×10
on the wire and are expressed in whatever unit the cooker itself is set to; and responses
echo the two-byte `[domain][message type]` header before their protobuf payload.

**Combustion packs bits LSB-first.** The spec numbers bits from 1, and bit 1 is the *least*
significant bit of byte 0. The Mode/ID byte makes this checkable: mode is `raw & 0x03`,
colour `(raw >> 2) & 0x07`, probe ID `(raw >> 5) & 0x07`. Reading these fields MSB-first
yields plausible-looking but wrong numbers, so every packed field goes through
`ble/bits.ts`.

The probe status payload is **94 bytes** on current firmware, not the 61 that older
revisions of the spec describe — the alarm-status arrays and food-safe blocks were appended
over time. The parser reads what it needs by fixed offset and treats everything past the
prediction status as optional, so an older probe degrades to fewer fields instead of
throwing.

## Scope

In: live status for both devices, connect/disconnect/reconnect, Anova target temperature,
timer, start/stop and °C/°F, Combustion removal-temperature target.

Out (v1): charts, cook sessions, notifications, temperature logs.

## Deploying

It's a static site, and Vercel auto-detects Vite:

```bash
vercel deploy          # preview
vercel deploy --prod   # production
```

Any static host works as long as it serves over HTTPS.
