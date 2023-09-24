import { DiagramImperativeHandle } from "entities";
import { FC, RefObject } from "react";

type HeaderProps = {
  diagramRef: RefObject<DiagramImperativeHandle>;
};

export const Header: FC<HeaderProps> = ({ diagramRef }) => {
  return (
    <div className="navbar fixed top-0 z-10 bg-slate-800 flex justify-between px-6">
      <h1>Diagram Decision Maker</h1>
      <button
        className="btn btn-primary z-10"
        onClick={() => console.debug("🚀 ", diagramRef.current?.export())}
      >
        Save
      </button>
    </div>
  );
};
