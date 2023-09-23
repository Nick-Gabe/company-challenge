/* eslint-disable react-refresh/only-export-components */
import "./index.css";
import Routing from "pages";

import { withProviders } from "./providers";

const App = () => <Routing />;

const appWithProviders = withProviders(App);

export default appWithProviders;
