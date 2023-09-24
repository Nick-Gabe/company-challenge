import { MouseEventHandler } from "react";

import { useAddSubNodeButtonModel } from "../model";

export type AddNodeSubButtonProps = {
  imageSrc: `assets/${string}`;
  nodeName: string;
  backgroundColor: string;
  position: number;
  isMenuOpen: boolean;
  onMouseDown?: MouseEventHandler<HTMLButtonElement>;
  onMouseUp?: MouseEventHandler<HTMLButtonElement>;
};

export const AddNodeSubButton = ({
  imageSrc,
  nodeName,
  backgroundColor,
  position,
  isMenuOpen,
  onMouseDown,
  onMouseUp,
}: AddNodeSubButtonProps) => {
  const [subNodeState, subNodeModel] = useAddSubNodeButtonModel();

  return (
    <div
      className={`absolute transition-transform right-2 ${
        isMenuOpen ? "group" : ""
      }`}
      style={{
        transform: `translateY(${isMenuOpen ? -position * 60 : 10}px)`,
      }}
      onClick={subNodeModel.showDragTip}
    >
      <button
        className={`btn w-12 group-hover:w-max h-12 ${backgroundColor} rounded-full text-black font-bold text-4xl border-2 flex flex-nowrap p-0 group-hover:pl-3 group-hover:pr-2 justify-center  cursor-grab transition-all z-10`}
        disabled={!isMenuOpen}
        onMouseDown={onMouseDown}
        onDragEnd={onMouseUp}
        draggable
      >
        <p className="text-xs hidden max-w-0 group-hover:max-w-none group-hover:inline transition-all overflow-hidden">
          {nodeName}
        </p>
        <img
          className="w-8 pointer-events-none"
          src={imageSrc}
          alt={`Adds new ${nodeName} node`}
        />
      </button>
      <p
        className={`absolute text-xs ${
          subNodeState.dragTip ? "group-hover:-translate-y-8" : ""
        } opacity-0 group-hover:opacity-100 top-1 left-4 -z-10 transition-transform pointer-events-none bg-slate-700 text-white p-1 rounded-full`}
      >
        Drag & Drop
      </p>
      <div
        className={`absolute w-10 h-10 left-0 ${
          subNodeState.dragTip ? "group-hover:-translate-x-7" : ""
        } top-0 -z-10 transition-transform`}
        style={{
          backgroundImage: "url(assets/curved-arrow.svg)",
        }}
      />
    </div>
  );
};
