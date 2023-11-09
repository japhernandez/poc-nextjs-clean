import {IMoviesService} from "@/domain/use-cases/contracts/movies-service";
import {MoviesServiceImpl} from "@/domain/use-cases/impl/movies-service-impl";
import {makeApiUrl} from "@/infrastructure/entry-points/factories/http/api-url-factory";
import {makeHttpClientFactory} from "@/infrastructure/entry-points/factories/http/http-client-factory";
import {MOVIE_POPULAR_LIST, MOVIE_RATING, MOVIE_SEARCH} from "@/infrastructure/entry-points/helpers/constants";

export const makeMoviesPopularApi = (): IMoviesService => {
    return new MoviesServiceImpl(makeApiUrl(MOVIE_POPULAR_LIST), makeHttpClientFactory());
}

export const makeRateMovieApi = (): IMoviesService => {
    return new MoviesServiceImpl(makeApiUrl(MOVIE_RATING), makeHttpClientFactory())
}

export const makeSearchMovieApi = (params: string): IMoviesService | any => {
    return new MoviesServiceImpl(makeApiUrl(MOVIE_SEARCH, params), makeHttpClientFactory())
}
