import { Outlet } from "react-router-dom";

const HomeLayout = () => {
    return <div className="h-dvh flex flex-col">HomePage
    <nav></nav>
    <main className="flex-1">
        <Outlet/>
    </main>
    <footer></footer>
    </div>
};

export default HomeLayout;