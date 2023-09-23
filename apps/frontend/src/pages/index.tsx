import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const HomePage = lazy(() => import("./home"));

const Routing = () => (
  <Routes>
    <Route path="/" Component={HomePage} />
  </Routes>
);

export default Routing;
