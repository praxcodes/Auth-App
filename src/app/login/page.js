"use client";
import Link from "next/link";
import React, { useState, useEffect} from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import {toast} from 'react-hot-toast'

//we want the user to redirect after he has signed up using router

export default function LoginPage(){
    const router=useRouter();
    const [user,setUser]= useState({
        email:"",
        password:"",
       
    })
    const [buttonDisabled, setButtonDisabled]=useState(false);
    const [loading, setLoading]=useState(false);

    //method that will fire on submitting the details
    //talk to database therfore async

    const validateEmail=(email)=>{
      
        return  email.includes("thapar.edu") ;
      }
      const validatePassword=(password)=>{
        return password.length >=8 &&
        /[A-Z]/.test(password) &&
        /[a-z]/.test(password) &&
        /[0-9]/.test(password) &&
        /[^A-Za-z0-9]/.test(password);
      }

    const onLogin=async() =>{
      try {
        setLoading(true);
        setButtonDisabled(true);
        const res=await axios.post("/api/users/login",user)
        console.log("login success",res.data);
        router.push('/profile');
        
      } catch (error) {
        console.log("login failed")
        toast.error(error.message)
      } finally{
        setLoading(false);
        setButtonDisabled(false);
      }
    }


    useEffect(()=>{
     if(validateEmail(user.email) && validatePassword(user.password)){
        setButtonDisabled(false);
     }else{
        setButtonDisabled(true);
     }
    },[user])
return(
   <div className="flex flex-col items-center justify-center min-h-screen py-2">
    <h1>
       {loading ? "Processing...": "Login"} 
    </h1>

    <hr />
    
        <label htmlFor="email">email</label>
    <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="email"
        type="text"
        value={user.email}
        onChange={(e)=>setUser({...user,email: e.target.value})}
        placeholder="email"
        />
        <label htmlFor="password">password</label>
    <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="password"
        type="password"
        value={user.password}
        onChange={(e)=>setUser({...user,password: e.target.value})}
        placeholder="password"
        />
        <button onClick={buttonDisabled? null : onLogin}
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        >{buttonDisabled ? "no login" :"login here "} </button>
        <Link href="/signup">visit login page</Link>
   </div> 
)
}