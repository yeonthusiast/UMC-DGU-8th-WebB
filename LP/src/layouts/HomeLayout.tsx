import { Link, Outlet } from "react-router-dom";

const HomeLayout = () => {
    return (
    <div className="h-dvh flex flex-col bg-black">
        <nav className="flex flex-row items-center justify-between h-[60px] bg-gray-800 p-4">
            <Link to="/">
                <p className="text-lg font-bold text-fuchsia-500 cursor-pointer">돌려돌려 LP판</p>
            </Link>

            <div className="flex flex-row items-center justify-center gap-3">
                <Link to="/login">
                    <button className="w-[70px] h-[35px] bg-black text-white rounded-md text-sm font-medium hover:bg-fuchsia-700 transition-colors cursor-pointer">
                    로그인
                    </button>
                </Link>

                <Link to="/signup">
                    <button className="w-[70px] h-[35px] bg-fuchsia-500 text-white rounded-md text-sm font-medium hover:bg-fuchsia-700 transition-colors cursor-pointer">
                    회원가입
                    </button>
                </Link>
            </div>
        </nav>

        <main className="flex-1">
            <Outlet/>
        </main>
        <footer></footer>
    </div>
)};

export default HomeLayout;