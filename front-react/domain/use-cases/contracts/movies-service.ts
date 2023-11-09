import {EntityMovieType} from "../../entities/movies";

export interface IMoviesService {
    getMoviesPopularList:() => Promise<EntityMovieType[]>
    postRateMovie: (data: RateType) => Promise<Object>
    searchMoviesList: (params: string) => Promise<EntityMovieType[]>
}

export type RateType = {
    rating: number;
    movieId?: number;
}