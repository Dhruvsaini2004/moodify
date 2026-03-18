import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context";
import { login,register,getMe,logout } from "../services/auth.api";

export const useAuth = ()=>{
    const context = useContext(AuthContext);
    const {loading,setLoading,user,setUser} = context;

    const handelLogin = async ({email,password})=>{
        setLoading(true);
        const data = await login({email,password})
        setUser(data.user);
        setLoading(false);
    }
    const handelRegister = async ({email,username,password})=>{
        setLoading(true);
        const data = await register({email,username,password})
        setUser(data.user);
        setLoading(false);
    }
    const handelGetMe = async ()=>{
        setLoading(true);
        const data = await getMe()
        setUser(data.user);
        setLoading(false);
    }
    const handelLogout = async ()=>{
        setLoading(true);
        const data = await logout();
        setUser(null);
        setLoading(false);
    }

    useEffect(()=>{
        handelGetMe();
    },[])

    return ({handelGetMe,handelLogin,handelLogout,handelRegister})
}

