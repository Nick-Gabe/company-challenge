import { PolicyImperativeHandle } from "entities";
import { FC, RefObject } from "react";

import { useAddNodeButtonModel } from "../model";
import { AddNodeSubButton, AddNodeSubButtonProps } from "./AddNodeSubButton";

const subButtons: Pick<
  AddNodeSubButtonProps,
  "nodeName" | "imageSrc" | "backgroundColor"
>[] = [
  {
    nodeName: "comparison",
    imageSrc: "assets/code.svg",
    backgroundColor: "bg-blue-300",
  },
  {
    nodeName: "decision",
    imageSrc: "assets/flag.svg",
    backgroundColor: "bg-gray-300",
  },
  {
    nodeName: "text",
    imageSrc: "assets/text.svg",
    backgroundColor: "bg-white",
  },
];

type AddNodeButtonProps = {
  policyRef: RefObject<PolicyImperativeHandle>;
};

export const AddNodeButton: FC<AddNodeButtonProps> = ({ policyRef }) => {
  const [addNodeButtonState, addNodeButtonModel] = useAddNodeButtonModel();

  return (
    <div className="fixed right-4 bottom-44 flex justify-end align-middle">
      <button
        className="btn z-10 w-16 h-16 bg-green-200 rounded-full text-black font-bold text-4xl border-2"
        onClick={addNodeButtonModel.toggleMenu}
      >
        <img
          className={`pointer-events-none transition-transform ${
            addNodeButtonState.isMenuOpen ? "rotate-45 scale-150" : ""
          }`}
          src="assets/plus.svg"
          alt="Add new node"
        />
      </button>

      {subButtons.map((btn, i) => (
        <AddNodeSubButton
          {...btn}
          key={btn.nodeName}
          position={i + 1}
          isMenuOpen={addNodeButtonState.isMenuOpen}
          onMouseDown={() => {
            addNodeButtonModel.toggleMenu;
          }}
          onMouseUp={(e) => {
            policyRef.current?.createNode(e, btn.nodeName);
          }}
        />
      ))}
    </div>
  );
};
