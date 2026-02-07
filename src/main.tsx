import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initTracking } from "./lib/tracking-init";

// Initialize GTM and Meta Pixel from environment variables
initTracking();

createRoot(document.getElementById("root")!).render(<App />);
