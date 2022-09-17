import { CSSProperties, ReactNode } from "react";

declare global {
  interface Window {
    klaytn: any;
  }
}

export interface Wallet {
  address: string;
  networkVersion: number;
}

export interface ComponentProps {
  style?: CSSProperties;
  children: ReactNode;
}
