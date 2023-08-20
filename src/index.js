import React from "react";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import { createRoot } from "react-dom/client";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);

serviceWorkerRegistration.register();
