import { createRoot } from "react-dom/client";
import Component from "./main";
import "./index.css";

const root = document.getElementById("root");
if (root) createRoot(root).render(<Component />);
