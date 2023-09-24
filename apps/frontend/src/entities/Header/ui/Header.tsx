import { ThemeContext } from "contexts";
import { DiagramImperativeHandle } from "entities";
import { FC, RefObject, useContext } from "react";

type HeaderProps = {
  diagramRef: RefObject<DiagramImperativeHandle>;
};

export const Header: FC<HeaderProps> = ({ diagramRef }) => {
  const { theme, switchTheme } = useContext(ThemeContext);

  return (
    <div className="navbar fixed top-0 z-10 bg-slate-800 flex justify-between px-6">
      <h1>Diagram Decision Maker</h1>
      <div className="flex gap-2">
        <button className="btn bg-gray-600 p-1" onClick={switchTheme}>
          <img className="w-full h-full" src={theme.icon} />
        </button>
        <button
          className="btn bg-blue-300 text-black z-10"
          onClick={() => console.debug("🚀 ", diagramRef.current?.export())}
        >
          Save
        </button>
      </div>
    </div>
  );
};
