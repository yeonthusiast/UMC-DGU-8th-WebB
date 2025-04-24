import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { DetailResponse } from "../types/detail";
import { LoadingSpinner } from "../components/LoadingSpinner";
import MovieDetail from "../components/MovieDetail";
import { Credit } from "../types/credit";

const MovieDetailPage = () =>{
    const [details, setDetails] = useState<DetailResponse>();
    const [credits, setCredits] = useState<Credit>();
      //1. 로딩 상태
      const [isPending, setIsPending] = useState(false);
      //2. 에러 상태
      const [isError, setIsError] = useState(false);
    
    const {movieId} = useParams<{movieId : string;}>();
    
    useEffect(() => {
        const fetchMovies = async () : Promise<void> => {
          setIsPending(true);
    
          try{
            const { data } = await axios.get<DetailResponse>( 
              `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`,
              {
                headers: {
                  Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
                  // axios 사용해서 'accept: application/json' 안 써도 됨
                },
              }
            );
            const { data:data2 } = await axios.get<Credit>( 
              `https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko-KR`,
              {
                headers: {
                  Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
                },
              }
            );
          setDetails(data);
          setCredits(data2);
          } catch{
            setIsError(true);
          } finally{
            setIsPending(false);
          }
        };
    
        fetchMovies();
      }, [movieId]);
    
      if(isError){
        return(
          <div>
            <span className='text-red-500 text-2xl'>에러가 발생했습니다.</span>
          </div>
        );
      }

  return(
  <>
    {isPending && (
      <div className='flex items-center justify-center h-dvh'>
        <LoadingSpinner/>
      </div>
    )}
  
    {!isPending && (
      <div>
        {details && credits && <MovieDetail key={details.id} detail={details} credit={credits} />}
      </div>
    )}
  </>
  )
}

export default MovieDetailPage;