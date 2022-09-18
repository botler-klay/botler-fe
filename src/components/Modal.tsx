import ReactModal from "react-modal";

export function Modal({ style, isOpen, children }: ReactModal.Props) {
  return (
    <ReactModal
      style={{
        content: {
          width: "fit-content",
          height: "fit-content",
          left: "50%",
          transform: "translate(-50%, 0)",
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
