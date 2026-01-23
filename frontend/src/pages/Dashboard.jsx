import Deposit from "../components/Deposit";
import Profile from "../components/Profile";
import Transfer from "../components/Transfer";
import Withdraw from "../components/Withdraw";
import { Link, Outlet, useNavigate } from 'react-router-dom';
import bgimage from "../assets/bgimage.jpg";


function Dashboard(){

    const navigate= useNavigate();

    function withdraw(){
        navigate("/dashboard/withdraw");
    }

    function transfer(){
        navigate("/dashboard/transfer");
    }

    function profile(){
        navigate("/dashboard/profile");
    }

    function deposit(){
        navigate("/dashboard/deposit");
    }
            function handleLogout() {
            // clear auth data
            localStorage.removeItem("token");
            localStorage.removeItem("name");
            localStorage.removeItem("email");

            // redirect to landing page
            navigate("/");
        }

    return(
        <div className="flex gap-4 h-screen items-center justify-center bg-no-repeat bg-cover bg-center" style={{ backgroundImage: `url(${bgimage})` }}>
          {/*sidebar */}
          <div className="h-full w-1/4 p-4 border bg-white/30 backdrop-blur-lg shadow-xl rounded-2xl rounded-lg border-white/40  flex flex-col justify-between ">
             
            <div>
                <h1 className="text-3xl font-bold text-slate-800 ">Dashboard</h1>
           <div className="flex flex-col gap-4 mt-6  p-8 w-full max-w-md">
            <button onClick={deposit} className="w-full px-4 py-3 bg-slate-600 text-white font-semibold rounded-lg hover:bg-slate-700 transition">
                Deposit
           </button>
           <button onClick={withdraw} className="w-full px-4 py-3 bg-slate-600 text-white font-semibold rounded-lg hover:bg-slate-700 transition">
                Withdraw
           </button>
           <button onClick={transfer} className="w-full px-4 py-3 bg-slate-600 text-white font-semibold rounded-lg hover:bg-slate-700 transition">
                Transfer
           </button>
           <button onClick={profile} className="w-full px-4 py-3 bg-slate-600 text-white font-semibold rounded-lg hover:bg-slate-700 transition">
                Profile
           </button>
           </div>
            </div>
            


           <div className=" p-8 w-full max-w-md">
                <button className="w-full px-4 py-3 bg-slate-600 text-white font-semibold rounded-lg hover:bg-slate-700 transition" onClick={handleLogout}>Logout</button>
           </div>
           

          </div>

          {/*non-side bar */}
          <div className="w-3/4 p-4 rounded-lg">
            <Outlet/>
          </div>
        </div>
    )
}
export default Dashboard;