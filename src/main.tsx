import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

async function enableMocking() {
  if (import.meta.env.DEV) {
    const { worker } = await import("./mocks/browser");
    await worker.start({
      onUnhandledRequest: "bypass", // logs unhandled requests
      // serviceWorker: { url: '/mockServiceWorker.js' } // optional
    });
  }
}

enableMocking()
  .then(() => {
    createRoot(document.getElementById("root")!).render(<App />);
  })
  .catch(console.error);
