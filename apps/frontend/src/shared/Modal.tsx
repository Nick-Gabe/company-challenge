import { FC, PropsWithChildren, useRef } from "react";

type ModalProps = {
  onCloseModal: () => void;
};

export const Modal: FC<ModalProps & PropsWithChildren> = ({
  onCloseModal,
  children,
}) => {
  const containerRef = useRef<HTMLDialogElement>(null);

  return (
    <dialog
      className="modal modal-open"
      ref={containerRef}
      onClick={function (event) {
        event.target === containerRef.current && onCloseModal();
      }}
    >
      <div className="modal-box w-[90vw] max-w-3xl">
        {children}
        <div className="modal-action">
          <button className="btn z-10" onClick={onCloseModal}>
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
};
