import { css } from "@emotion/css";
import { InputHTMLAttributes } from "react";

export function CheckBox(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div
      className={css`
        position: relative;
        input[id="checkbox"]:checked + label::after {
          content: "✔";
          font-size: 6px;
          width: 12px;
          height: 12px;
          text-align: center;
          position: absolute;
          left: 0;
          top: 3px;
          color: #a7a7a7;
        }
      `}
    >
      <input
        id="checkbox"
        className={css`
          display: none;
        `}
        type="checkbox"
        checked={props.checked}
        onChange={props.onChange}
      />
      <label
        htmlFor="checkbox"
        className={css`
          display: inline-block;
          width: 12px;
          height: 12px;
          border: 1px solid #a7a7a7;
          background-color: transparent;
        `}
      />
    </div>
  );
}
