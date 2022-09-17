import { atom } from "recoil";
import { Wallet } from "../types/types";

export const walletAtom = atom<Wallet | undefined>({
  key: "wallet",
  default: undefined,
});
