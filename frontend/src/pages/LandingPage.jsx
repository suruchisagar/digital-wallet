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
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 shadow-2xl shadow-gray-200">
                <div className="text-black font-bold text-xl sm:text-2xl text-center sm:text-left">
                    Wallet App
                </div>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center w-full sm:w-auto">
                    <button onClick={gotoSignin} className=" w-full sm:w-auto px-4 py-2 text-sm sm:text-base rounded-lg bg-slate-700 text-white hover:bg-slate-500 transition">
                    Sign In
                    </button>
            
                    <button onClick={gotoSignUp} className="w-full sm:w-auto px-4 py-2 text-sm sm:text-base rounded-lg bg-slate-700 text-white hover:bg-slate-500 transition">
                        Sign Up
                    </button>
                </div>
            </div>

            {/*hero section */}
            <div className="flex flex-col md:flex-row w-full flex-1"> 
                <div className="w-full md:w-1/2 flex items-center justify-center">
                    <div className="px-6 sm:px-10 md:px-16 max-w-xl">
                        <h1 className="text-3xl sm:text-4xl md:text-6xl font-light leading-tight text-black text-center md:text-left">
                    Manage your <br />
                    money, <span className="italic">simplified</span>
                    </h1>
                    {/* Sub text */}
                    <p className="mt-4 md:mt-6 text-gray-700 text-base md:text-lg leading-relaxed text-center md:text-left">
                    Take control of your finances with our intuitive digital wallet.
                    Send money, track expenses, and save smarter—all in one place.
                    </p>
                    <div>
                        <div className="mt-6 md:mt-8 flex gap-4 justify-center md:justify-start">
                            <button onClick={gotoSignUp} className="px-4 py-2 rounded-lg bg-slate-700 text-white hover:bg-slate-500">
                                Get Started Free →
                            </button>
                            <button>

                            </button>
                        </div>

                    </div>
                    </div>
                </div>
                <div className="w-full md:w-1/2 shadow-2xl flex items-center justify-center">
                  <img src={bg1} className="w-full h-64 md:h-full object-cover rounded-xl"/>
                </div>
            </div>
            </div>
            
        </div>
    )
}

export default LandingPage;