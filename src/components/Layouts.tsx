import { ComponentProps } from "../types/types";

export function Row({ style, children }: ComponentProps) {
  return (
    <div
      style={{ display: "flex", flexDirection: "row", width: "100%", ...style }}
    >
      {children}
    </div>
  );
}

export function Column({ style, children }: ComponentProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
