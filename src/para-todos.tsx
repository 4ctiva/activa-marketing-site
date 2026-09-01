import { createRoot } from "react-dom/client";
import AptApp from "./app/AptApp.tsx";
import "./styles/index.css";

createRoot(document.getElementById("root")!).render(<AptApp />);
