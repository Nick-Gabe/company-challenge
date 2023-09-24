import compose from "compose-function";

import { withRouter } from "./router";
import { withThemeContext } from "./theme";

export const withProviders = compose(withRouter, withThemeContext);
