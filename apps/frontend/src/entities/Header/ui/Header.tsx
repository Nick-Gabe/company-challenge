import { PolicyContext, ThemeContext } from "contexts";
import { PolicyImperativeHandle } from "entities";
import { PoliciesMenu } from "features";
import { SavePolicy } from "features/SavePolicy";
import { FC, RefObject, useContext } from "react";

type HeaderProps = {
  policyRef: RefObject<PolicyImperativeHandle>;
};

export const Header: FC<HeaderProps> = ({ policyRef }) => {
  const { theme, switchTheme, isDark } = useContext(ThemeContext);
  const { title } = useContext(PolicyContext);

  return (
    <div
      className={`navbar fixed top-0 z-10 ${
        isDark ? "bg-slate-800 text-white" : "bg-gray-300 text-black"
      } grid grid-cols-1 sm:grid-cols-3 w-full align-middle px-6 gap-4`}
    >
      <div className="flex gap-2 justify-center sm:justify-start">
        <img className="h-10" src="logo.svg" alt="Logo of a policy" />
        <h1>Policy Decision Maker</h1>
      </div>
      <div className="flex justify-center text-center row-start-3 sm:row-auto">
        <p>{title}</p>
      </div>
      <div className="flex gap-2 justify-center sm:justify-end">
        <button
          className={`btn ${isDark ? "bg-gray-500" : "bg-gray-400"} p-1`}
          onClick={switchTheme}
        >
          <img className="w-full h-full" src={theme.icon} />
        </button>
        <PoliciesMenu />
        <SavePolicy policyRef={policyRef} />
      </div>
    </div>
  );
};
