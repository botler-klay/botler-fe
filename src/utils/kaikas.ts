export function getKaikasProvider() {
  if (typeof window.klaytn !== "undefined") {
    return window.klaytn;
  }

  return undefined;
}
