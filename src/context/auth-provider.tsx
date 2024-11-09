import {createContext, Dispatch, PropsWithChildren, SetStateAction, useState} from "react";
import {AuthModel} from "../hooks/use-auth.ts";

interface IAuthContext {
    auth: AuthModel | null;
    setAuth: Dispatch<
        SetStateAction<AuthModel | null>
    >;
}

const AuthContext = createContext<IAuthContext | null>(null);

export const AuthProvider = ({children}: PropsWithChildren<{}>) => {
    const [auth, setAuth] = useState<AuthModel | null>(null);

    return (
        <AuthContext.Provider value={{auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;