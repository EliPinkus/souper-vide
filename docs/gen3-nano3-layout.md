# Undocumented Gen 3 layout (Anova Precision Cooker Nano 3.0, 800 W)

Findings from a live unit. **None of this is published by Anova** — it was
obtained by enumerating characteristics and writing inert payloads to a
connected cooker. Treat every inference here as provisional.

## How this device differs from the documented Mini

Anova's [developer-project-mini](https://github.com/anova-culinary/developer-project-mini)
reference describes service `910772a8-a5e7-49a7-bc6d-701e9a783a5c` with six
characteristics, most of them **readable**: you poll STATE, CURRENT_TEMPERATURE
and TIMER and get JSON back.

This unit exposes the same service UUID and **none of those six
characteristics**. Instead it has seven, only one of which is readable. The
other six are `write` + `writeWithoutResponse` + `notify`: you write a command
and the reply arrives as a notification on the same characteristic.

A polling design cannot work here. That difference — not a wrong UUID, not a
firmware quirk — is why a client built to the published Mini docs reads nothing
at all from this cooker.

## Characteristics

| UUID | Properties | Notes |
| --- | --- | --- |
| `c7a9a65b-1e5b-4387-9c0d-d3f1f7e2e254` | read | Returns `{"pin":"6111"}` — the pairing PIN, served to any connected client without authentication |
| `1877e8fa-abed-437c-8ae5-f4ec89daa1c2` | write, writeWithoutResponse, notify | Replies in the `result` dialect |
| `511232d6-594e-4f90-8c57-c67b28505c6c` | write, writeWithoutResponse, notify | Replies in the `result` dialect |
| `7e29a154-3eae-4ba8-90c3-d0763d57baf5` | write, writeWithoutResponse, notify | Replies in the `status` dialect |
| `9596bdb9-c194-4aa2-b226-2e10b8d901dc` | write, writeWithoutResponse, notify | Accepted the write, sent nothing back |
| `c6537d1c-e23b-48b6-8fa6-b0e544561810` | write, writeWithoutResponse, notify | Replies in the `status` dialect |
| `dca82f2c-9406-11ec-b909-0242ac120002` | write, writeWithoutResponse, notify | Replies in the `status` dialect, distinct error code |

## Encoding

Unchanged from the documented protocol: a JSON object, UTF-8 encoded, then
base64 encoded, with the base64 **text** as the characteristic value. Replies
come back the same way.

## Responses to an inert `{}` probe

Writing `btoa("{}")` to each writable characteristic:

| UUID | Reply |
| --- | --- |
| `1877e8fa…` | `{"result":"error","ERROR_CODE":1}` |
| `511232d6…` | `{"result":"error","ERROR_CODE":1}` |
| `7e29a154…` | `{"status":"error","ERROR_CODE":1}` |
| `9596bdb9…` | *(silent)* |
| `c6537d1c…` | `{"status":"error","ERROR_CODE":1}` |
| `dca82f2c…` | `{"status":"error","ERROR_CODE":3}` |

### What this establishes

- The envelope is confirmed: base64-wrapped JSON, request and response, on the
  same characteristic.
- There are **two response dialects** — two channels key the outcome as
  `result`, three as `status`. That suggests two separate command handlers
  rather than one uniform interface.
- `dca82f2c…` rejects an empty object with a **different code (3)** than the
  others (1), so it validates against a different schema.
- `9596bdb9…` accepts writes silently. Either it needs a well-formed command
  before it will answer, or it is fire-and-forget.

### What this does not establish

Nothing here identifies which channel carries temperature, state, or timer, and
no command vocabulary has been confirmed. Six channels against the six
documented functions is suggestive and no more than that. `ERROR_CODE` values
are uninterpreted.

## Write probes: everything is rejected identically

Each writable channel was sent, in turn: an empty object, zero bytes,
unparseable text, four different command-envelope keys (`command`, `cmd`,
`type`, `method`), the published PIN in six shapes, and the documented
payloads `{"currentTime":…}` and `{"setpoint":50}`. Both base64-wrapped and raw.

**Every write returned that channel's fixed error, byte for byte.** Zero bytes
and valid JSON are indistinguishable to it.

### What that rules out

The firmware is not parsing the payload at all — it rejects before looking. So:

- It is not a JSON schema problem. No key name or nesting will help.
- It is not an encoding problem. Raw and base64 fare identically.
- It is not the command vocabulary. An unknown verb and a documented one get
  the same answer.
- The published PIN is not a session credential, in any field name or type
  tried, on any channel including the silent one.

Responses are also strictly same-channel: writing to one never produces a
notification on another, so these are six independent endpoints, not a
write-here/read-there pair.

### The one relevant line in Anova's docs

The Nano pages say nothing about authorization — they document the protobuf
protocol this hardware does not speak. The **Mini** pages, which cover this
service, contain exactly one auth-adjacent statement, on the BLE protocol page:

> The Mini requires explicit pairing acceptance on the host device. Watch for
> and accept the pairing prompt to maintain connection.

and, in the reference implementation's README:

> When prompted during connection, please accept pairing on your host computer.
> Otherwise, the Anova Precision® Cooker Mini will disconnect.

This fits the observations. During probing the cooker **dropped the link
unprompted**, which is precisely the documented consequence of pairing not being
accepted. A device that requires a bonded link, and is not bonded, would reject
every command identically regardless of content and eventually hang up — which
is exactly the behaviour recorded above.

The published `{"pin":"6111"}` is then not an application credential at all. It
is the passkey for host-level BLE bonding, which is why sending it as a payload
in any shape changed nothing.

### The Web Bluetooth problem this creates

Bonding is initiated by the OS, normally when something accesses a
characteristic that demands encryption. Every write here **succeeds** at the
GATT layer and is refused at the application layer, so nothing ever demands
encryption and macOS is never given a reason to bond. Web Bluetooth exposes no
API to request bonding explicitly.

If that reading is right, the browser cannot get there on its own, and the bond
has to be established at the OS level first — after which Chrome would reuse it.

### What remains

An authorization gate ahead of the command handler, whose credential is not
derivable from anything the device exposes over BLE. Anova's app presumably
establishes it — plausibly bound to an account, a cloud-issued token, or a
bonding state a browser cannot reach.

Blind payload search is exhausted. Confirming this needs a capture of the real
app talking to the cooker: an Android HCI snoop log, or macOS PacketLogger from
Apple's Additional Tools for Xcode, recorded while the Anova app drives it.
That yields the exact handshake instead of another guess.

## Method notes

- Characteristics of an already-permitted service can be enumerated from Web
  Bluetooth, which is what made any of this visible.
- Every probe so far has been inert: an empty object carries no command verb and
  no setpoint, so it cannot start a cook.
- Editing source triggers HMR, which drops the BLE connection and needs a user
  gesture to restore. `window.__souperVideGen3` is exposed in dev builds so
  experiments can run from the console instead.
