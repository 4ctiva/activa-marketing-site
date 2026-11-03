/**
 * Visitor's self-selected audience and pilot areas of interest.
 * Kept only in this tab (sessionStorage) and only used to prefill the email /
 * WhatsApp messages the visitor sends themselves: the Google Form cannot
 * receive it (its fields are not publicly readable, see ContactDialog).
 */
import { useEffect, useState } from "react";

export type Audience = "companies" | "gyms" | "users";
export const AUDIENCES: Audience[] = ["companies", "gyms", "users"];

export const CONTACT = {
  email: "estebanbaltodano@4ctiva.com",
  whatsapp: "16073196214",
  whatsappLabel: "+1 (607) 319-6214",
  instagram: "https://www.instagram.com/activawellnesscr/",
  instagramHandle: "@activawellnesscr",
  form: "https://docs.google.com/forms/d/e/1FAIpQLSf4GeBCFGcsHa3XpXcrZQVP70hvqwa9TQ0XhCx8ZHf2R-Dznw/viewform",
};

/** Member app sign-in ("Already a member? Sign in" in the header). */
export const MEMBER_APP_URL = "https://app.4ctiva.com";
/**
 * The app is not in production yet (app.4ctiva.com did not resolve on
 * 2026-11-03), so the link stays hidden. Flip to true at launch.
 */
export const MEMBER_APP_LIVE = false;

function useSessionState<T>(key: string, initial: T, valid: (v: unknown) => v is T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const raw = window.sessionStorage.getItem(key);
      const parsed: unknown = raw ? JSON.parse(raw) : null;
      return valid(parsed) ? parsed : initial;
    } catch {
      return initial;
    }
  });
  useEffect(() => {
    try {
      window.sessionStorage.setItem(key, JSON.stringify(value));
    } catch {
      // storage blocked: the choice just lasts for this page view
    }
  }, [key, value]);
  return [value, setValue] as const;
}

const isAudience = (v: unknown): v is Audience | null => v === null || AUDIENCES.includes(v as Audience);
const isStringList = (v: unknown): v is string[] => Array.isArray(v) && v.every((s) => typeof s === "string");

export const useAudience = () => useSessionState<Audience | null>("activa-audience", null, isAudience);
export const useAreas = () => useSessionState<string[]>("activa-areas", [], isStringList);

export const mailtoHref = (subject: string, body: string) =>
  `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

export const whatsappHref = (text: string) => `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(text)}`;
