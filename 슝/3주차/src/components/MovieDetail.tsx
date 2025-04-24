import { Credit } from "../types/credit";
import { DetailResponse } from "../types/detail";

interface MovieDetailProps{
    detail:DetailResponse;
    credit:Credit;
}

export default function MovieDetail({detail, credit}:MovieDetailProps){

    return (
    <>
    <div className='relative rounded-lg m-2 overflow-hidden h-[500px]'>
        
        <img src={`https://image.tmdb.org/t/p/original/${detail.backdrop_path}`}
        alt={`${detail.title} 영화의 이미지`}
        className="w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-black opacity-40"></div>
        
        <div className='absolute inset-0 flex flex-col justify-center items-left text-white p-4 w-1/2 text-left pr-4'>
            <h2 className='text-2xl font-bold leading-snug'>{detail.title}</h2>
            <div className='text-sm text-gray-300 leading-relaxed mt-2'>
                <p>{detail.release_date.slice(0,4)}</p>
                <p>{detail.runtime}분</p>
                <p>평점 {detail.vote_average.toFixed(1)}</p>
                <p className='mt-2'>{detail.overview}</p>
                </div>
        </div>
    </div>
    <h2 className='m-5 text-2xl font-bold leading-snug'>감독/출연</h2>
    <div className='p-10 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-10'>
        {credit.cast.slice(0,10).map((Cast) => (
            <div key={Cast.id} className="flex flex-col items-center">
                <img src={`https://image.tmdb.org/t/p/original/${Cast.profile_path}`}
                alt={`${Cast.name}의 이미지`}
                className='w-24 h-24 object-cover rounded-full shadow-md'/>
                <p className='mt-2 text-center font-semibold'>{Cast.name}</p>
                <p className='text-center text-sm text-gray-600'>{Cast.character}</p>
            </div>
        ))}
        {credit.crew.slice(0,10).map((Crew) => (
            <div key={Crew.id} className="flex flex-col items-center">
                <img src={`https://image.tmdb.org/t/p/original/${Crew.profile_path}`}
                alt={`${Crew.name}의 이미지`}
                className='w-24 h-24 object-cover rounded-full shadow-md'/>
                <p className='mt-2 text-center font-semibold'>{Crew.name}</p>
                <p className='text-center text-sm text-gray-600'>{Crew.job}</p>
            </div>
        ))}
    </div>
    </>
    )
}