import clsx from "clsx";
import { THEME, useTheme } from "../context/ThemeProvider";

export default function ThemeContent() {
    const {theme} = useTheme();
    const isLightMode = theme === THEME.LIGHT;
  return (
    <div className={clsx('p-4 h-dvh w-full', isLightMode ? 'bg-white' : 'bg-gray-800')}>
      ThemeContent
        <h1 className={clsx('text-wxl font-bold', isLightMode ? 'text-black' : 'text-white')}>
            Theme Content
        </h1>
        <p className={clsx('mt-2', isLightMode ? 'text-black' : 'text-white')}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae ratione, velit voluptatem error eligendi voluptatibus at hic harum. Temporibus laborum impedit nostrum nulla amet ducimus nobis repellat repellendus quaerat soluta?
        </p>
    </div>
  )
}
