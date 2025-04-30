import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import {z} from "zod";
import { postSignup } from "../apis/auth";
import { useNavigate } from "react-router-dom";

const schema = z.object({
    email: z.string().email({message:"올바른 이메일 형식이 아닙니다."}),
    password: z
        .string()
        .min(8, {message:"비밀번호는 8자 이상이어야 합니다."})
        .max(20, {message:"비밀번호는 20자 이하여여야 합니다."}),
    passwordCheck: z
    .string()
    .min(8, {message:"비밀번호는 8자 이상이어야 합니다."})
    .max(20, {message:"비밀번호는 20자 이하여여야 합니다."}),
    name: z.string()
    .min(2, {message:"이름을 입력해주세요."})
    })
    .refine((data)=>data.password === data.passwordCheck, {
        message:"비밀번호가 일치하지 않습니다.",
        path:['passwordCheck']
});

type FormFields = z.infer<typeof schema>;

const SignupPage = () => {
    const navigate = useNavigate();
    const {register, handleSubmit, formState:{errors, isValid}} = useForm<FormFields>({
        defaultValues:{
            name:"",
            email:"",
            password:"",
            passwordCheck:"",
        },
        resolver: zodResolver(schema),
        mode:"onBlur",
    })

    const onSubmit:SubmitHandler<FormFields> = async(data) => {
        const {passwordCheck, ...rest} = data;
        const response = await postSignup(rest);
        console.log(response);
        navigate('/');
    };
    
    return(
        <div className='flex flex-col items-center justify-center h-full text-white gap-4'>
            <p className="text-2xl font-bold">회원가입</p>            
            <div className='flex flex-col gap-3'>
                <input
                    {...register('email')}
                    type={'email'}
                    className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm
                        ${errors?.email ? "border-red-500 bg-red-200" : "border-gray-300"}`}
                    placeholder={"이메일"}
                />
                {errors.email && (
                    <div className={"text-red-500 text-sm"}>{errors.email.message}</div>
                )}

                <input
                    {...register('password')}                
                    type={'password'}
                    className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm
                        ${errors?.password ? "border-red-500 bg-red-200" : "border-gray-300"}`}
                    placeholder={"비밀번호"}
                />
                {errors.password && (
                    <div className={"text-red-500 text-sm"}>{errors.password.message}</div>
                )}

                <input
                    {...register('passwordCheck')}                
                    type={'password'}
                    className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm
                        ${errors?.password ? "border-red-500 bg-red-200" : "border-gray-300"}`}
                    placeholder={"비밀번호 확인"}
                />
                {errors.passwordCheck && (
                    <div className={"text-red-500 text-sm"}>{errors.passwordCheck.message}</div>
                )}

                <input
                    {...register('name')}
                    type={'name'}
                    className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm
                        ${errors?.name ? "border-red-500 bg-red-200" : "border-gray-300"}`}
                    placeholder={"이름"}
                />
                {errors.name && (
                    <div className={"text-red-500 text-sm"}>{errors.name.message}</div>
                )}
                
                <button
                    type="button" onClick={handleSubmit(onSubmit)}
                    disabled={!isValid}
                    className={`w-full py-3 rounded-md text-lg font-medium hover:bg-fuchsia-700 transition-colors cursor-pointer ${isValid ? "bg-fuchsia-500" : "bg-gray-800"}`}>
                    회원가입
                </button>
            </div>
        </div>
    )
}

export default SignupPage;