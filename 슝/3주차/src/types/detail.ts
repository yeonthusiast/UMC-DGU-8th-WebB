export type Genres = {
    id:number;
    name:string;
}

export type Production_companies = {
    id:number;
    logo_path:string;
    name:string;
    origin_country:string;
}

export type Production_countries = {
    iso_3166_1: string;
    name:string;
}

export type Spoken_languages = {
    english_name: string;
    iso_639_1: string;
    name:string;
}

export type Belongs_to_collection = {
    id:string;
    name:string;
    poster_path:string;
    backdrop_path:string;
}

export type DetailResponse = {
    adult: boolean;
    backdrop_path: string;
    belongs_to_collection: Belongs_to_collection[];
    budget: number;
    genres: Genres[];
    homepage: string;
    id: string;
    imdb_id: string;
    origin_country: string[];
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    production_companies: Production_companies[];
    production_countries: Production_countries[];
    release_date: string;
    revenue: number;
    runtime: number;
    spoken_languages: Spoken_languages[];
    status: string;
    tagline: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}