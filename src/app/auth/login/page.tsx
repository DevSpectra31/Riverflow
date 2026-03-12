"use client";
import { useAuthStore } from "@/store/Auth";
import React from "react";
import { useState } from "react";
function LoginPage() {
    const {login} = useAuthStore();
    const [loading, setloading] =useState(false);
    const [error, seterror] = useState("");
    const handlesubmit = async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        //collect data
        const formData=new FormData(e.currentTarget)
        const email =  formData.get("email")
        const password = formData.get("password")
        //validation
        if(!email || !password){
            seterror(()=>"please fill all fields")
            return ;
        }
        //handle loading and error
        setloading(()=>true)
        seterror(()=>"")
        //login=>store
        const loginresponse=await login(email?.toString(),password?.toString())
        if(loginresponse){
            seterror(()=>loginresponse.error!.message)
        }
        setloading(()=>false)
    }
  return (
    <div>LoginPage</div>
  )
}

export default LoginPage;