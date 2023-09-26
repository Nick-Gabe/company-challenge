import { FC, PropsWithChildren, useRef } from "react";

type ModalProps = {
  onCloseModal: () => void;
  boxClass?: string;
  title: string;
  confirmButtonLabel?: string;
  onConfirm?: () => void;
  confirmButtonDisabled?: boolean;
};

export const Modal: FC<ModalProps & PropsWithChildren> = ({
  onCloseModal,
  children,
  boxClass,
  title,
  confirmButtonLabel,
  onConfirm,
  confirmButtonDisabled,
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
      <div className={"modal-box w-[90vw] max-w-3xl " + boxClass}>
        {title ? (
          <h2 className="font-bold text-lg border-b-1 border-b-slate-700 pb-4 w-full">
            {title}
          </h2>
        ) : null}
        {children}
        <div className="modal-action">
          <button className="btn z-10" onClick={onCloseModal}>
            Close
          </button>
          {confirmButtonLabel ? (
            <button
              className={`btn btn-success z-10 ${
                confirmButtonDisabled ? "btn-disabled" : ""
              } `}
              onClick={onConfirm}
            >
              {confirmButtonLabel}
            </button>
          ) : null}
        </div>
      </div>
    </dialog>
  );
};
