import { useContext } from "react";
import type { UserContext } from "../state/app.context";

export function useUser() {
  const ctx = useContext(UserContext);

  if (!ctx) {
    throw new Error("useUser must be used inside <UserProvider>");
  }

  return ctx;
}
