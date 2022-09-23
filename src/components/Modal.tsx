import ReactModal from "react-modal";

export function Modal({ style, isOpen, children }: ReactModal.Props) {
  return (
    <ReactModal
      style={{
        content: {
          width: "fit-content",
          height: "fit-content",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "#282A34",
          border: "unset",
          borderRadius: "0",
          padding: "40px",
          ...style?.content,
        },
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.75)",
          ...style?.overlay,
        },
      }}
      isOpen={isOpen}
    >
      {children}
    </ReactModal>
  );
}
