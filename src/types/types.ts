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
  feePerCall: BigNumber;
  accumFee: BigNumber;
  balance: BigNumber;
  status: string;
  owner: string;
  description: string;
  numOfRuns: number;
}
