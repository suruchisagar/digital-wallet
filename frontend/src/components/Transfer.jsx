function Transfer(){



    return(
        <div className="h-full flex items-center justify-center">
            <div className="flex flex-col gap-5 bg-white/30 backdrop-blur-lg shadow-xl rounded-2xl p-8 w-full max-w-md border border-white/40">
                <div className="text-3xl font-bold flex items-center justify-center">
                Transfer Money
            </div>
            <div>
                <label className="text-lg font-semibold">Recipient Email:</label>
                <input type="email" placeholder="Enter recipient email" className="border-2 border-black px-4 py-2 rounded-lg w-full mt-1"/>
            </div>
            
            <div>
                <label className="text-lg font-semibold">Amount:</label>
                <input type="number" placeholder="₹ 0.00" className="border-2 border-black px-4 py-2 rounded-lg w-full mt-1"/>
            </div>
            <div className="text-lg font-medium flex gap-3">
                Available Balance: 
                <div>
                    ₹ 0.00
                </div>
            </div>
                
            <div>
                <button className="border-2 px-4 py-2 rounded-lg w-full mt-6 bg-slate-700 text-white hover:bg-slate-500">Transfer Money</button>
            </div>
            </div>
        </div>
    )
}

export default Transfer;