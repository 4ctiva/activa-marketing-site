import { createRoot } from "react-dom/client";
import LegalPage from "./app/legal/LegalPage.tsx";
import { LanguageProvider, STORAGE_KEY } from "./app/i18n.tsx";
import type { LegalDocId } from "./app/legal/model.ts";
import "./styles/index.css";
import "./styles/legal.css";

// One entry for every legal page; each page's HTML names its document.
const root = document.getElementById("root")!;
const doc = root.dataset.doc as LegalDocId;

// Arriving from the site (footer links pass ?lang=) keeps the visitor's language,
// and it sticks like a toggle choice; a stored choice always wins. Direct visits
// default to Spanish, the language of the documents.
const fromLink = new URLSearchParams(window.location.search).get("lang");
if (fromLink === "en" || fromLink === "es") {
  try {
    if (!localStorage.getItem(STORAGE_KEY)) localStorage.setItem(STORAGE_KEY, fromLink);
  } catch {
    // storage blocked: the page just uses the default below
  }
}

createRoot(root).render(
  <LanguageProvider defaultLang={fromLink === "en" ? "en" : "es"}>
    <LegalPage doc={doc} />
  </LanguageProvider>,
);
