import { useEffect, useState } from 'react';
import { Movie, MovieResponse } from '../types/movie';

import axios from 'axios';
import MovieCard from '../components/movieCard';

const MoviesPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMovies = async () : Promise<void> => {
      // 응답에 대한 타입을 정의해줍니다.
      const { data } = await axios.get<MovieResponse>( 
        `https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1`,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
            // axios 사용해서 'accept: application/json' 안 써도 됨
          },
        }
      );

      setMovies(data.results);
    };

    fetchMovies();
  }, []);

  return (
    <div className='p-10 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'>
      {movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
    </div>
  );
};

export default MoviesPage;