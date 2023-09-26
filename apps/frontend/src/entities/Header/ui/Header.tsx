import { ThemeContext } from "contexts";
import { DiagramImperativeHandle } from "entities";
import { DiagramsMenu } from "features";
import { FC, RefObject, useContext } from "react";

type HeaderProps = {
  diagramRef: RefObject<DiagramImperativeHandle>;
};

export const Header: FC<HeaderProps> = ({ diagramRef }) => {
  const { theme, switchTheme, isDark } = useContext(ThemeContext);

  return (
    <div
      className={`navbar fixed top-0 z-10 ${
        isDark ? "bg-slate-800 text-white" : "bg-gray-300 text-black"
      } grid grid-cols-1 sm:grid-cols-3 w-full align-middle px-6 gap-4`}
    >
      <div className="flex gap-2 justify-center sm:justify-start">
        <img className="h-10" src="logo.svg" alt="Logo of a diagram" />
        <h1>Diagram Decision Maker</h1>
      </div>
      <div className="flex justify-center text-center row-start-3 sm:row-auto">
        <p>Untitled</p>
      </div>
      <div className="flex gap-2 justify-center sm:justify-end">
        <button
          className={`btn ${isDark ? "bg-gray-500" : "bg-gray-400"} p-1`}
          onClick={switchTheme}
        >
          <img className="w-full h-full" src={theme.icon} />
        </button>
        <DiagramsMenu />
        <button
          className="btn bg-green-300 text-black z-10"
          onClick={() => console.debug("🚀 ", diagramRef.current?.export())}
        >
          Save
        </button>
      </div>
    </div>
  );
};
