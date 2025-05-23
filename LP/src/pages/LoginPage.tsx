import { UserSigninInformation, validateSignin } from "../utils/validate";
import useForm from "../hooks/useForm";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const LoginPage = () => {
    const {login, accessToken} = useAuth();
    const navigate = useNavigate();

    useEffect(()=>{
        if(accessToken){
            navigate("/");
        }
    })

    const {values, errors, touched, getInputProps} = useForm<UserSigninInformation>({
        initialValue:{
            email:"",
            password:"",
        },
        validate:validateSignin,

    });

    const handleSubmit = async() => {
       await login(values);
    };

    const handleGoogleLogin = () => {
        window.location.href = import.meta.env.VITE_SERVER_API_URL + "/v1/auth/google/login";
    }

    // 오류가 하나라도 있거나 입력값이 비어있으면 버튼 비활성화
    const isDisabled =
        Object.values(errors||{}).some((error)=>error.length>0)|| //오류가 있으면 true
        Object.values(values).some((value)=>value===""); //입력값이 없으면 true

    return (
        <div className='flex flex-col items-center justify-center h-full gap-4 text-white'>
            <p className="text-2xl font-bold">로그인</p>
            <div className='flex flex-col gap-3'>
                <input
                    {...getInputProps('email')}
                    name="email"
                    type={'email'}
                    className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm
                        ${errors?.email && touched?.email ? "border-red-500 bg-red-200" : "border-gray-300"}`}
                    placeholder={"이메일"}
                />
                {errors?.email && touched?.email && (
                    <div className="text-red-500 text-sm">{errors.email}</div>
                )}
                <input
                    {...getInputProps('password')}                
                    type={'password'}
                    className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm
                        ${errors?.password && touched?.password ? "border-red-500 bg-red-200" : "border-gray-300"}`}
                    placeholder={"비밀번호"}
                />
                {errors?.password && touched?.password && (
                    <div className="text-red-500 text-sm">{errors.password}</div>
                )}
                <button
                    type="button" onClick={handleSubmit}
                    disabled={isDisabled}
                    className="w-full bg-fuchsia-500 text-white py-3 rounded-md text-lg font-medium hover:bg-fuchsia-700 transition-colors cursor-pointer disabled:bg-gray-800">
                    로그인
                </button>
                <button
                    type="button" onClick={handleGoogleLogin}
                    className="w-full bg-white text-black py-3 rounded-md text-lg font-medium hover:bg-stone-200 transition-colors cursor-pointer disabled:bg-gray-800">
                        <div className="flex items-center justify-center gap-4">
                            <img src={"/google.svg"} alt="Google Logo image"/>
                            <span>Google 로그인</span>
                        </div>
                </button>
            </div>
            
        </div>
    );
}

export default LoginPage;