import './App.css'

import {createBrowserRouter, RouterProvider} from "react-router-dom";

import HomePage from './pages/home.tsx';
import Movies from "./pages/movies.tsx";
import RootLayout from "./layout/root-layout.tsx";
import NotFound from './pages/not-found.tsx';
import MovieDetailPage from './pages/movieDetail.tsx';

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout/>,
        children: [
            {
                index: true,
                element: <HomePage/>,
                errorElement: <NotFound/>,
            },
            {
		            // /:을 활용해서, 동적으로 바뀌는 부분의 이름을 정의해줍시다.
                path: 'movies/:category',
                element: <Movies/>
            },
            {
            path: 'movies/:movieId',
            element: <MovieDetailPage/>
            }
        ]
    },

])

function App() {
  return <RouterProvider router={router}/>
}

export default App
