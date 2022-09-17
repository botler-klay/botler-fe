import { ComponentProps } from "../types";

export function Section({ style, children }: ComponentProps) {
  return (
    <section
      style={{
        display: "flex",
        width: "100%",
        padding: "0 64px",
        ...style,
      }}
    >
      {children}
    </section>
  );
}
