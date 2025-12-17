import { useEffect, useState } from "react";


function Profile(){

    const [name, setName]= useState("");
    const [email, setEmail]= useState("");
    const [balance, setBalance]= useState("");

    useEffect(()=>{
        const fetchProfile = ()=> {
            fetch("http://localhost:3000/auth/me",
                {
                    method:"GET",
                    headers:{
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                }
            )
            .then(res=>res.json())
            .then(data=> {
                setName(data.name),
                 setEmail(data.email),
                 setBalance(data.balance)
            }
        )

            .catch(err=>{console.log(err)})
        }

        fetchProfile();
    },[])

    


    return(
        <div className="h-full flex items-center justify-center ">
            <div className="flex flex-col gap-5 bg-white/30 backdrop-blur-lg shadow-xl rounded-2xl p-8 w-full max-w-md border border-white/40">
                <div className="text-3xl font-bold flex items-center justify-center">
                Profile Information
                </div>
            <div>
                <div className="text-lg font-medium">
                    {name}
                </div>
                <div className="text-lg font-light">
                    {email}
                </div>
            </div>
            <div className="text-lg font-medium flex gap-3">
                Available Balance: 
                <div>
                    ₹ {balance}
                </div>
            </div>
            </div>
        </div>
    )
}

export default Profile;