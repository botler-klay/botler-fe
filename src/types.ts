declare global {
  interface Window {
    klaytn: any;
  }
}

export interface Wallet {
  address: string;
  networkVersion: number;
}
