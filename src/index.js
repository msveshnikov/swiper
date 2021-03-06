import React from "react";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import { createRoot } from "react-dom/client";

Sentry.init({
    environment: process.env.NODE_ENV,
    dsn: "https://505a033cd95c41eda67fac2ce3e9a9aa@o383246.ingest.sentry.io/6324817",
    integrations: [new BrowserTracing()],
    tracesSampleRate: 1.0,
});

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);

serviceWorkerRegistration.register();
