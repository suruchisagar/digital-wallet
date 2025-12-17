import { useState } from "react";
import {useNavigate } from 'react-router-dom';
import bgimage from "../assets/bgimage.jpg";



function Signup(){

    const [name, setName]= useState("");
    const [email, setEmail]= useState("");
    const [password, setPassword]= useState("");


    function handleName(e){
        
        setName(e.target.value);

    }

    function handleEmail(e){

        setEmail(e.target.value);

    }
    function handlePassword(e){
        
        setPassword(e.target.value);

    }

    function handleSignup(){
       fetch("http://localhost:3000/auth/signup", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            name: name,
                            email: email,
                            password: password
                        })
                        })
                        .then(res => res.json())
                        .then(data => {
                            console.log(data);
                            alert("Signup successful! Please login.");
                            navigate("/signin");
                        })
                        .catch(err => console.error(err));

    }

    const navigate= useNavigate();

    function gotoSignin(){
        navigate("/signin");
    }


    return(
        <div className="min-h-screen flex items-center justify-center bg-no-repeat bg-cover bg-center bg-gray-100" style={{ backgroundImage: `url(${bgimage})` }}>
            <div className="bg-white/30 backdrop-blur-lg shadow-xl rounded-2xl p-8 w-full max-w-md border border-white/40">
                <h1 className="text-3xl font-bold">Create Account</h1>
            
            <div className="mt-6">
                <label className="text-lg font-semibold">Name:</label>
                <input onChange={(e)=>handleName(e)} type="text" placeholder="Enter your name here" className="border-2 border-black px-4 py-2 rounded-lg w-full mt-1"/>
            
            </div>
            
            <div className="mt-6">
                <label className="text-lg font-semibold">Email:</label>
                <input onChange={(e)=>handleEmail(e)} type="email" placeholder="Enter your email here" className="border-2 border-black px-4 py-2 rounded-lg w-full mt-1"/>
            </div>
            
            <div className="mt-6">
                <label className="text-lg font-semibold">Password:</label>
                <input onChange={(e)=>handlePassword(e)} type="password" placeholder="Enter your password here" className="border-2 border-black px-4 py-2 rounded-lg w-full mt-1"/>
            </div>
            
            
             <button onClick={()=>handleSignup()} className=" px-4 py-2 rounded-lg w-full mt-6 bg-slate-700 text-white hover:bg-slate-500">Sign Up</button>
             
             <div className="text-center mt-4">
                <label>Already have an account? <button className="text-blue-800" onClick={gotoSignin}>Sign In</button></label>
             </div>
            
            </div>
        </div>
    )
}

export default Signup;