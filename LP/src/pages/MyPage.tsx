import { useEffect, useState } from "react";
import { getMyInfo } from "../apis/auth";
import { ResponseMyInfoDto } from "../types/auth";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const MyPage = () => {
    const navigate = useNavigate();
    const {logout} = useAuth();
    const [data, setData] = useState<ResponseMyInfoDto>();

    useEffect( () =>{
        const getData = async() => {
            const response = await getMyInfo();
            console.log(response);

            setData(response);
        }

        getData();
    }, []);

    const handleLogout = async() => {
        await logout();
        navigate('/');
    }

    return(
        <div className="flex flex-col items-center justify-center h-full gap-4 text-white">
            <h1 className="text-lg font-bold">{data?.data.name}님 환영합니다.</h1>
            <img src={data?.data.avatar as string} alt={"프로필 이미지"}/>
            <h1>{data?.data.email}</h1>

            <button className="w-3xs bg-fuchsia-500 text-white py-3 rounded-md text-lg font-medium hover:bg-fuchsia-700 transition-colors cursor-pointer disabled:bg-gray-800"
                onClick={handleLogout}>
                로그아웃
            </button>
        </div>
    );
};

export default MyPage;