import {createContext, useEffect, useState} from "react";
import {useNavigate} from "react-router";

export const AccountContext = createContext();

const UserContext = ({children}) => {
    const [user, setUser] = useState({loggedIn: null});

    const navigate = useNavigate();

    // console.log(process.env.REACT_APP_SERVER_URL)

    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/auth/login`, {
            credentials: "include",
        }).catch(err => {
            setUser({loggedIn: false});
            return;
        }).then(res => {
            if (!res || !res.ok || res.status >= 400) {
                setUser({loggedIn: false});
                return;
            }
            return res.json();
        }).then(data => {
            if (!data) {
                setUser({loggedIn: false});
                return;
            }
            navigate("/home");
            setUser({...data});
        });
    }, [])

    return <AccountContext.Provider value={{user, setUser}}>{children}</AccountContext.Provider>
}

export default UserContext;