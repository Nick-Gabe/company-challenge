import { ReactNode, Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import { Loading } from "shared";

export const withRouter = (component: () => ReactNode) => () => (
  <BrowserRouter>
    <Suspense fallback={<Loading />}>{component()}</Suspense>
  </BrowserRouter>
);
