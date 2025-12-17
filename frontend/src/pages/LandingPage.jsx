import Deposit from "../components/Deposit";

import {useNavigate } from 'react-router-dom';
import bg1 from "../assets/bg1.jpg";
import bgimage from "../assets/bgimage.jpg"


function LandingPage(){

    const navigate= useNavigate();

     function gotoSignUp(){
        navigate("/signup");
    }
    function gotoSignin(){
        navigate("/signin");
    }


    return(
        <div className="min-h-screen flex items-center justify-center bg-no-repeat bg-cover bg-center" style={{ backgroundImage: `url(${bgimage})` }}>
            <div className="w-11/12 max-w-5xl gap-5 bg-white/30 backdrop-blur-lg shadow-xl border border-white/40 rounded-2xl shadow-2xl p-6 flex flex-col">
                {/*Navbar */}
            <div className="flex justify-between shadow-2xl shadow-gray-200">
                <div className="flex items-center text-black font-bold text-2xl">
                    Wallet App
                </div>

                <div className="flex space-x-3 items-center">
                    <button onClick={gotoSignin} className=" px-4 py-2 rounded-lg bg-slate-700 text-white hover:bg-slate-500">
                    Sign In
                    </button>
            
                    <button onClick={gotoSignUp} className="px-4 py-2 rounded-lg bg-slate-700 text-white hover:bg-slate-500">
                        Sign Up
                    </button>
                </div>
            </div>

            {/*hero section */}
            <div className="flex w-full flex-1 "> 
                <div className="w-1/2 flex items-center">
                    <div className="px-16 max-w-xl">
                        <h1 className="text-6xl font-light leading-tight text-black">
                    Manage your <br />
                    money, <span className="italic">simplified</span>
                    </h1>
                    {/* Sub text */}
                    <p className="mt-6 text-gray-700 text-lg leading-relaxed">
                    Take control of your finances with our intuitive digital wallet.
                    Send money, track expenses, and save smarter—all in one place.
                    </p>
                    <div>
                        <div className="mt-8 flex gap-4">
                            <button onClick={gotoSignUp} className="px-4 py-2 rounded-lg bg-slate-700 text-white hover:bg-slate-500">
                                Get Started Free →
                            </button>
                            <button>

                            </button>
                        </div>

                    </div>
                    </div>
                </div>
                <div className="w-1/2 shadow-2xl flex items-center justify-center overflow-hidden">
                  <img src={bg1} className="max-w-full max-h-full object-cover"/>
                </div>
            </div>
            </div>
            
        </div>
    )
}

export default LandingPage;