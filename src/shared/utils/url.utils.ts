import { paths } from "../config/paths";
import { matchPath } from "react-router-dom";

export function isActivePath(baseHref: string, pathname: string) {
  const normalize = (p: string) => (p !== "/" ? p.replace(/\/+$/, "") : p);

  const base = normalize(baseHref);
  const current = normalize(pathname);

  if (base === "/") return current === "/";

  return (
    !!matchPath({ path: `${base}/*`, end: false }, current) || current === base
  );
}

export function encodeReturnTo(pathname: string, search: string, hash: string) {
  const full = `${pathname}${search ?? ""}${hash ?? ""}`;
  return encodeURIComponent(full);
}

export function decodeReturnTo(value: string) {
  return decodeURIComponent(value);
}

export function safeReturnTo(
  value: string | null | undefined,
  fallback = paths.app.root,
) {
  if (!value) return fallback;

  const decoded = decodeReturnTo(value);
  if (decoded.startsWith("/")) return decoded;

  return fallback;
}
