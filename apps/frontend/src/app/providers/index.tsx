import compose from "compose-function";

import { withRouter } from "./router";

export const withProviders = compose(withRouter);
