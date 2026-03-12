"use client";
import { useAuthStore } from "@/store/Auth";
import React from "react";
import { useState } from "react";
function RegisterPage() {
    const {createAccount,login} = useAuthStore();
    const [loading, setloading] =useState(false);
    const [error, seterror] = useState("");
    const handleSubmit = async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()

        //collect data
        const formData = new FormData(e.currentTarget)
        const firstName = formData.get("firstname")
        const lastName = formData.get("lastName")
        const email = formData.get("email")
        const password = formData.get("password")
        //validate
        if(!firstName || !lastName || !email || !password){
            seterror(()=>"fill out missing fields")
            return
        }
        //call the store
        setloading(true)
        seterror("")


        const response = await createAccount(
            `${firstName} ${lastName}`,email?.toString(),password?.toString()
        )
        if(response.error){
            seterror(()=>response.error!.message)
        }
        else{
            const loginresponse=await login(email?.toString(),password?.toString())
            if(loginresponse.error){
                seterror(()=>loginresponse.error!.message)
            }
        }
    }
    setloading(false)
  return (
    <div>
        {error && (
            <p>{error}</p>
        )}
        <form onSubmit={handleSubmit}>

        </form>
    </div>
  )
}

export default RegisterPage;