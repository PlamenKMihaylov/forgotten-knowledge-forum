import type { User } from './../types/user';
import { createContext } from "react";

export interface UserContextValue {
    user: User | null;
    loading: boolean;
    setUser: (user: User | null) => void;
}

export const UserContext = createContext<UserContextValue | undefined>(undefined);