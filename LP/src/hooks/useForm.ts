import {ChangeEvent, useEffect, useState} from "react";

interface UseFormProps<T>{
    initialValue:T,
    validate: (values:T) => Record<keyof T, string>;
}

function useForm<T>({initialValue, validate}: UseFormProps<T>){
    const [values, setValues] = useState(initialValue);
    const [touched, setTouched] = useState<Record<string, boolean>>();
    const [errors, setErrors] = useState<Record<string, string>>();

    // 사용자가 입력값을 바꿀 때 실행되는 함수
    const handleChange = (name: keyof T, text:string) => {
        setValues({
            ...values,
            [name]:text,
        });
    };

    const handleBlur = (name: keyof T) => {
        setTouched({
            ...touched,
            [name]:true,
        });
    };

    //이메일과 패스워드 인풋, 속성들을 가져옴
    const getInputProps = (name: keyof T)=>{
        const value = values[name];
        const onChange = (e: ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => handleChange(name, e.target.value);
        const onBlur = () => handleBlur(name);

        return {value, onChange, onBlur};
    }

    //values가 변경될 때마다 에러 검증 로직 실행
    useEffect( ()=>{
        const newErrors = validate(values);
        setErrors(newErrors);
    }, [validate, values]);

    return{values, errors, touched, getInputProps};
}

export default useForm;