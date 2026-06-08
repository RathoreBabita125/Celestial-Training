import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {

    const [loginUserData, setLoginUserData] = useState({});
    const [signupData, setSignupData] = useState({});
    const [theme, setTheme]=useState(false);

    return (
        <AuthContext.Provider value={{ loginUserData, setLoginUserData, signupData, setSignupData, theme, setTheme}}>
            {children}
        </AuthContext.Provider>
    )
};