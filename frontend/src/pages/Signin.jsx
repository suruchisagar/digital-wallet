
import { useState } from 'react';
import {useNavigate } from 'react-router-dom';
import Signup from './Signup';
import bgimage from "../assets/bgimage.jpg";
import dashboard from "./Dashboard"



function Signin(){

    const [email, setEmail]= useState("");
    const [password, setPassword]= useState("");


    //normal way to create function
    function handleEmail(e){
        setEmail(e.target.value);
    }

    //we can also use arrow funtion here
    const handlePassword=(e)=>{
        setPassword(e.target.value);
    }

    function handleSignin(){
        fetch("http://localhost:3000/auth/signin",
            {
                method:"POST",
                headers:{
                     "Content-Type": "application/json"
                },
                body: JSON.stringify({
                            email: email,
                            password: password
                })
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
            if (data.token) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("name", data.name);
            localStorage.setItem("email", data.email);

                navigate("/dashboard");
            } else {
                alert(data.message || "Signin failed");
            }
        })
        .catch(err=>console.log(err))
    }

    const navigate = useNavigate();
    function gotoSignUp(){
        navigate("/signup");
    }

    function gotoSignin(){
        navigate("/signin");
    }




    return(
        <div className="min-h-screen flex items-center justify-center bg-no-repeat bg-cover bg-center bg-gray-100" style={{ backgroundImage: `url(${bgimage})` }}>
            <div className="bg-white/30 backdrop-blur-lg shadow-xl rounded-2xl p-8 w-full max-w-md border border-white/40">
               {/*Navbar */}
                <div>
                    <h1 className="text-3xl font-bold flex items-center justify-center">Welcome back</h1>
                <h1 className='flex items-center justify-center font-light'>Enter your credentials to access your account</h1>
            <div className='mt-6'>
                <label className="text-lg font-semibold">Email:</label>
            <input onChange={(e)=>handleEmail(e)} type="email" placeholder="Enter your email here" className="border-2 border-black px-4 py-2 rounded-lg w-full mt-1"/>
            </div>
            <div className='mt-6'>
                <label className="text-lg font-semibold">Password:</label>
                <input onChange={(e)=>handlePassword(e)} type="password" placeholder="Enter your password here" className="border-2 border-black px-4 py-2 rounded-lg w-full mt-1"/>
            </div>

            <button onClick={()=>handleSignin()} className="border-2 px-4 py-2 rounded-lg w-full mt-6 bg-slate-700 text-white hover:bg-slate-500">Sign In</button>

            <div className="text-center mt-4">
                <label>Don't have an account? <button className="text-blue-800" onClick={gotoSignUp}>Sign Up</button></label>
            </div> 
                </div>

            </div>
        </div>
    )
}

export default Signin;