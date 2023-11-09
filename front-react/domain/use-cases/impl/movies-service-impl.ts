import { EntityMovieType } from "@/domain/entities/movies";
import { ServerErrorImpl } from "@/domain/use-cases/impl/server-error-impl";
import { IMoviesService, RateType } from "@/domain/use-cases/contracts/movies-service";
import { HttpClientRepository, HttpResponse, HttpStatusCode } from "@/domain/entities/contracts/http-client-repository";

/**
 * MoviesServiceImpl class is part of the domain layer in a clean architecture.
 * It implements the IMoviesService interface and communicates with external services
 * through abstractions to handle movie-related operations.
 *
 * @class MoviesServiceImpl
 * @implements IMoviesService
 * @author John Piedrahita
 * @version 1.0.0
 * @licence MIT
 */
export class MoviesServiceImpl implements IMoviesService {
    /**
     * Constructor for MoviesServiceImpl.
     * @param url The base URL for movie-related API endpoints.
     * @param httpClient The HTTP client repository used for making HTTP requests.
     */
    constructor(
        private readonly url: string,
        private readonly httpClient: HttpClientRepository
    ) {}

    /**
     * Posts a movie rating to the API.
     * @param data The rating data to be posted.
     * @returns An object representing the response from the API.
     */
    async postRateMovie(data: RateType): Promise<Object> {
        const httpResponse: HttpResponse = await this.httpClient.request({
            url: this.url,
            method: 'post',
            body: data
        });

        const result: Object = httpResponse.body?.data || {};

        switch (httpResponse.statusCode) {
            case HttpStatusCode.ok:
                return result;
            default:
                throw new ServerErrorImpl();
        }
    }

    /**
     * Retrieves a list of popular movies from the API.
     * @returns An array of EntityMovieType objects representing popular movies.
     */
    async getMoviesPopularList(): Promise<EntityMovieType[]> {
        return this.fetchMovies();
    }

    /**
     * Searches for movies based on the specified parameters.
     * @param params The search parameters.
     * @returns An array of EntityMovieType objects representing search results.
     */
    async searchMoviesList(params: string): Promise<EntityMovieType[]> {
        return this.fetchMovies(params)
    }

    /**
     * Fetches a list of movies from a remote API based on the specified parameters.
     * @param params (optional) Parameters for the movie search.
     * @returns An array of EntityMovieType objects representing the fetched movies.
     */
    private async fetchMovies(params?: string): Promise<EntityMovieType[]> {
        /**
         * Send an HTTP GET request to the API to fetch movies.
         */
        const httpResponse: HttpResponse = await this.httpClient.request({
            url: this.url, // The URL for the API endpoint.
            method: 'get', // The HTTP method for the request (GET).
            params, // Optional parameters for the search query.
        });

        /**
         * Extract the list of movies from the API response or use an empty array if no data is available.
         */
        const movies: EntityMovieType[] = httpResponse.body?.data.results || [];

        /**
         * Check the HTTP response status code to handle success or errors.
         */
        switch (httpResponse.statusCode) {
            case HttpStatusCode.ok:
                /**
                 * If the response status is OK (200), return a new array of movies to avoid direct mutation.
                 */
                return movies?.map((movie: EntityMovieType) => ({ ...movie }));
            default:
                /**
                 * If there is an error, throw a custom ServerErrorImpl exception.
                 */
                throw new ServerErrorImpl();
        }
    }

}
