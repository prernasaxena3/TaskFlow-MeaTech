import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

async function enableMocking() {
  if (import.meta.env.DEV) {
    const { worker } = await import("./mocks/browser");
    await worker.start({
      onUnhandledRequest: "bypass", // logs unhandled requests
    });
  }
}

// Start mocking in dev, then render the app
enableMocking().finally(() => {
  createRoot(document.getElementById("root")!).render(<App />);
});
