/**
 * Pre-flight checks that turn the two most common "the chooser was empty"
 * causes into an error message that says what to do, instead of letting the
 * user cancel an empty picker and get a bare `NotFoundError`.
 */
export async function assertBluetoothAvailable(): Promise<void> {
  if (!navigator.bluetooth) {
    throw new Error(
      'Web Bluetooth is not available in this browser. Use desktop Chrome or Edge, or Chrome on Android.',
    );
  }

  // getAvailability() reports on the adapter, and also returns false when the
  // OS has denied the browser Bluetooth permission — which on macOS is a
  // silent, empty device chooser rather than any kind of error.
  if (typeof navigator.bluetooth.getAvailability === 'function') {
    const available = await navigator.bluetooth.getAvailability();
    if (!available) {
      throw new Error(
        'No Bluetooth adapter is available. Check that Bluetooth is switched on, and that your browser is allowed to use Bluetooth in your operating system’s privacy settings.',
      );
    }
  }
}

/** How a device chooser should be scoped. */
export interface ConnectOptions {
  /**
   * Bypass the service/name filters and list every advertising device.
   *
   * Web Bluetooth's `filters` match only against what a device puts in its
   * *advertisement*. A device whose custom service UUID appears solely in its
   * GATT table — never in its advertising data — is filtered out of existence
   * and the chooser comes up empty even though the device is sitting right
   * there. This is the escape hatch for that case.
   */
  acceptAllDevices?: boolean;
}
