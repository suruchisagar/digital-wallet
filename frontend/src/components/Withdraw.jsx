import { useState } from "react";

function Withdraw(){

    // const [balance, setBalance]= useState(0);
    const [amount, setAmount]= useState("");
    
        function handleAmount(e){
            setAmount(e.target.value)
        }
    
        // function handleBalance(){
        //     setBalance(prev=>prev-amount);
        //     setAmount("");
        // }

        function handleWithdraw(){
       fetch("http://localhost:3000/dashboard/withdraw", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${localStorage.getItem("token")}`
                        },
                        body: JSON.stringify({
                            amount: Number(amount)
                        })
                        })
                        .then(res => res.json())
                        .then(data=>{
                            console.log(data);
                            setAmount("");
                            setMessage("Money Withdrawn!");
                            setTimeout(() => {
                            setMessage("");
                            }, 5000);
                        })
                        .catch(err => console.error(err));

    }

    const [message, setMessage] = useState("");

    return(
        <div className="h-full flex items-center justify-center">
            <div className="flex flex-col gap-5 bg-white/30 backdrop-blur-md shadow-xl rounded-2xl p-8 w-full max-w-md border border-white/40">
                <div className="text-3xl font-bold flex items-center justify-center">
                Withdraw Money
            </div>
            <div>
                <div className="text-lg font-semibold">
                <p>Enter amount to Withdraw:</p>
                <input type="number" value={amount}  onChange={(e)=>handleAmount(e)} placeholder=" ₹ 0.00" className="border-2 border-black px-4 py-2 rounded-lg w-full mt-1"/>
            </div>
            {/* <div>
                Available balance:{balance.toFixed(2)}
            </div> */}
            <div>
                <button onClick={()=>handleWithdraw()} className="border-2 px-4 py-2 rounded-lg w-full mt-6 bg-slate-700 text-white hover:bg-slate-500">Withdraw Money</button>
                
            </div>
            </div>
            <div>
                {message && (
                <p className="text-green-600 font-semibold mt-2">{message}</p>
                )}
            </div>
            </div>
        </div>
    )
}

export default Withdraw;