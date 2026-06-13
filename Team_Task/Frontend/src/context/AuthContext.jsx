import { createContext, useState } from "react";
import { GETME } from "../query/query";
import { useQuery } from "@apollo/client/react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const {loading, data, refetch} = useQuery(GETME,
        {
            fetchPolicy:'network-only'
        }
    );
   
    const [theme, setTheme] = useState(false);
    const userAuth=data?.getMe || {};

    return (
        <AuthContext.Provider value={{ theme, setTheme, userAuth, refetch, loading}}>
            {children}
        </AuthContext.Provider>
    );
};