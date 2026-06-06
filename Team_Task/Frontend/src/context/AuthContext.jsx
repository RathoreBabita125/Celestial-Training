import { useQuery } from "@apollo/client/react";
import { createContext, useEffect, useState } from "react";
import { GETPROJECTS, GETTASKS } from "../query/query";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {

    const [loginUserData, setLoginUserData] = useState({});
    const [signupData, setSignupData] = useState({});
    const [allProjects, setAllProjects] = useState([]);
    const [allTasks, setAllTasks] = useState([]);

    const { data: projectsData } = useQuery(GETPROJECTS);
    const { data: tasksData } = useQuery(GETTASKS);

    useEffect(() => {
        if (projectsData?.projects) {
            setAllProjects(projectsData.projects);
        }
    }, [projectsData]);

    useEffect(() => {
        if (tasksData?.projects) {
            setAllProjects(tasksData.projects);
        }
    }, [tasksData]);

    return (
        <AuthContext.Provider value={{ loginUserData, setLoginUserData, signupData, setSignupData, allProjects, setAllProjects, allTasks, setAllTasks }}>
            {children}
        </AuthContext.Provider>
    )
};