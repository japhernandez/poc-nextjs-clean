<?php

namespace App\Http\Domain\UseCase\Contracts;

/**
 * Abstraction to make communication between domain layer and infrastructure layer,
 * guaranteed high cohesion and low component coupling.
 *
 * @autor John Alejandro Piedrahita
 */
interface MovieServiceInterface
{
    /**
     * Retrieve a list of popular movies.
     *
     * @return array|string An array of popular movies or an error message as a string.
     */
    public function getPopularMovies(): array | string;

    /**
     * Retrieve a list of movies based on a search query.
     *
     * @param string $query        The search query.
     * @param bool   $include_adult Whether to include adult content.
     * @param string $language      The language for the results.
     * @param int    $page         The page number.
     *
     * @return array|string An array of search results or an error message as a string.
     */
    public function getSearchMovies(
        string $query,
        bool $include_adult,
        string $language,
        int $page
    ): array|string;

    /**
     * Create a new guest session for accessing movie-related data from The Movie Database (TMDb) API.
     *
     * @return array|string An array containing the guest session ID and other session-related information.
     */
    public function getGuestSessionMovies(): array|string;

    /**
     * Rate or post a movie rating.
     *
     * @param int $ratingValue
     * @param int $movieId
     * @return array|string An array of data related to the movie rating or an error message as a string.
     */
    public function postRatingMovie(int $ratingValue, int $movieId): array|string;
}
