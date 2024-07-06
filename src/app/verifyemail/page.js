'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function VerifyEmailPage() {
    //const router=useRouter();

    const [token,setToken] =useState("");
    const [verified,setVerified]=useState(false);
    const [error,setError]=useState(false);

    const verify=async()=>{
       try {
         await axios.post("/api/users/verifyemail",{token})
         setVerified(true);
         setError(false);
       } catch (error) {
        setError(true);
        console.log(error.response.data);
        //backend is throwing response 
       }
    }

    //take token from url as user has come to the page through url
    useEffect(()=>{
        setError(false);
     const urlToken=window.location.search.split("=")[1];
    setToken(urlToken || "");

    //const {query}=router;
    //const urlTokentwo =query.token

    //can add url in dependency array

    },[]);

    useEffect(()=>{
        setError(false);
      if(token.length >0){
        verify();
      }
    },[token])

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1 className='text-4xl'>
        Verify Email
      </h1>
      <h2 className='p-2 bg-orange-500 text-black'>{token ? `${token}`: "no token"}</h2>
      {verified && (
        <div>
            <h2>verified</h2>
            <Link href="/login">Login</Link>
            </div>

      )}
      {error && (
        <div>
            <h2>Error</h2>
            </div>
      )

      }
    </div>
  )
}
//token is sent to the backend along with request


