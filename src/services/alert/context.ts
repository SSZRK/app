import {createContext} from "react";

interface AlertContextType {
}

export const AlertContext = createContext<AlertContextType | null>(null);