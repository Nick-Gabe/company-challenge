/* eslint-disable react-refresh/only-export-components */
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import Routing from "pages";
import { ToastContainer } from "react-toastify";

import { withProviders } from "./providers";

const App = () => (
  <>
    <Routing />
    <ToastContainer />
  </>
);

const appWithProviders = withProviders(App);

export default appWithProviders;
