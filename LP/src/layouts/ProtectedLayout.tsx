import { Link, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedLayout = () => {
    const {accessToken} = useAuth();
    if(!accessToken){
        return <Navigate to ={'/login'} replace/>;
    }

    return (
    <div className="h-dvh flex flex-col bg-black">
        <nav className="flex flex-row items-center justify-between h-[60px] bg-gray-800 p-4">
            <Link to="/">
                <p className="text-lg font-bold text-fuchsia-500 cursor-pointer">돌려돌려 LP판</p>
            </Link>
        </nav>

        <main className="flex-1">
            <Outlet/>
        </main>
        <footer></footer>
    </div>
)};

export default ProtectedLayout;