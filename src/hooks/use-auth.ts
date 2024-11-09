import {useContext} from "react";
import AuthContext from "../context/auth-provider.tsx";

export type AuthModel = {
    jwt: string;
    id: string;
    email: string;
    exp: number;
}

const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
}

export default useAuth;