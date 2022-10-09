import BigNumber from "bignumber.js";
import { CSSProperties, ReactNode } from "react";

declare global {
  interface Window {
    klaytn: any;
  }
}

export interface Wallet {
  address: string;
  networkVersion: number;
  isValid: boolean;
}

export interface ComponentProps {
  style?: CSSProperties;
  className?: string;
  children: ReactNode;
}

export interface Job {
  jid: string;
  name: string;
  address: string;
  botlerFee: BigNumber;
  accumulatedFee: BigNumber;
  balance: BigNumber;
  active: boolean;
  jobOwner: string;
  description: string;
  callCount: number;
}
