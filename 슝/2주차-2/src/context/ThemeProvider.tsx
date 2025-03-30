import { JSX, PropsWithChildren, createContext, useContext, useState } from "react";

export enum THEME{
    LIGHT = 'LIGHT',
    DARK = 'DARK',
}

type TTheme = THEME.LIGHT | THEME.DARK;

interface IThemeContext{
    theme: TTheme; 
    toggleTheme: () => void;
}

export const ThemeContext = createContext<IThemeContext | undefined>(undefined);

export const ThemeProvider = ({children}: PropsWithChildren) : JSX.Element =>{
    const [theme, setTheme] = useState<TTheme>(THEME.LIGHT);

    const toggleTheme = () : void => {
        setTheme((prevTheme):THEME => prevTheme === THEME.LIGHT ? THEME.DARK : THEME.LIGHT);
    }
    return <ThemeContext.Provider value={{theme, toggleTheme}}>{children}</ThemeContext.Provider>
}

export const useTheme = (): IThemeContext =>{
    const context = useContext(ThemeContext);

    if(!context){
        throw new Error('useTheme은 ThemeProvider로 반드시 감싸져야 합니다.');
    }

    return context;
}