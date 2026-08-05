import { createRoot } from "react-dom/client";
import { Suspense } from "react";
import App from "./App.tsx";
import { ErrorBoundary } from "./components/ErrorBoundary";
import "./lib/i18n";
import "./index.css";

const rootEl = document.getElementById("root");
if (!rootEl) throw new Error("Root element #root not found");

// Wrapper with inline styles so something is always visible (avoids pure white screen)
const Root = () => (
  <div style={{ minHeight: "100vh", backgroundColor: "hsl(210 20% 98%)", color: "hsl(210 50% 14%)" }}>
    <ErrorBoundary>
      <Suspense fallback={null}>
        <App />
      </Suspense>
    </ErrorBoundary>
  </div>
);

createRoot(rootEl).render(<Root />);
