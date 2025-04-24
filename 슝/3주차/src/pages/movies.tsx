import { useEffect, useState } from 'react';
import { Movie, MovieResponse } from '../types/movie';

import axios from 'axios';
import MovieCard from '../components/MovieCard';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { useParams } from 'react-router-dom';

const MoviesPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  //1. 로딩 상태
  const [isPending, setIsPending] = useState(false);
  //2. 에러 상태
  const [isError, setIsError] = useState(false);
  //3. 페이지 처리
  const [page, setPage] = useState(1);

  const {category} = useParams<{category: string;}>();

  useEffect(() => {
    const fetchMovies = async () : Promise<void> => {
      setIsPending(true);

      try{
        const { data } = await axios.get<MovieResponse>( 
          `https://api.themoviedb.org/3/movie/${category}?language=ko-KR&page=${page}`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
              // axios 사용해서 'accept: application/json' 안 써도 됨
            },
          }
        );
      setMovies(data.results);
      
      } catch{
        setIsError(true);
      } finally{
        setIsPending(false);
      }
    };

    fetchMovies();
  }, [page, category]);

  if(isError){
    return(
      <div>
        <span className='text-red-500 text-2xl'>에러가 발생했습니다.</span>
      </div>
    );
  }

  return (
  <>
    <div className='flex items-center justify-center gap-6 mt-5'>
      <button className='bg-[#dda5e3] text-white px-6 py-3 rounded-lg shadow-md hover:bg-[#b2dab1] transition-all duration-200 disabled:bg-gray-300 cursor-point disabled:cursor-not-allowed'
        disabled={page===1}
        onClick={(): void => setPage((prev):number => prev-1)}>
        {'<'}
      </button>
      <span>{page} 페이지</span>
      <button className='bg-[#dda5e3] text-white px-6 py-3 rounded-lg shadow-md hover:bg-[#b2dab1] transition-all duration-200 cursor-point'
        onClick={(): void => setPage((prev):number => prev+1)}>
        {'>'}
      </button>
    </div>

    {isPending && ( //아직 로딩상태일 때
      <div className='flex items-center justify-center h-dvh'>
        <LoadingSpinner/>
      </div>
    )}

    {!isPending && ( //로딩이 아닐 때 = 로딩 끝난 경우
    <div className='p-10 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'>
      {movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
    </div> //grid로 moviecard들을 보여줌
    )}
  </>)
  ;
};

export default MoviesPage;