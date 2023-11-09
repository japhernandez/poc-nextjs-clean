<?php

namespace App\Http\Infrastructure\DriverAdapter\Adapters;

use App\Http\Domain\Entities\Contracts\MovieRepositoryInterface;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Config;

/**
 * TheMovieDBAdapter class provides access to The Movie Database (TMDb) API for movie-related operations.
 *
 * @class TheMovieDBAdapter
 * @implements MovieRepositoryInterface
 * @autor John Alejandro Piedrahita
 * @version 1.0.0
 */
class TheMovieDBAdapter implements MovieRepositoryInterface
{
    private Client $client;
    private mixed $apiKey;
    private mixed $baseUrl;

    /**
     * Create a new instance of TheMovieDBAdapter.
     */
    public function __construct()
    {
        $this->client = new Client();
        $this->apiKey = Config::get('services.external.key');
        $this->baseUrl = Config::get('services.external');
    }

    /**
     * Retrieve a list of popular movies from an external API.
     *
     * @return array|string An array of popular movies or an error message as a string.
     */
    public function getPopularMovies(): array|string
    {
        return $this->getData('popular');
    }

    /**
     * Retrieve a list of movies based on a search query.
     *
     * @param string $query The search query.
     * @param bool $include_adult Include adult content.
     * @param string $language Language preference.
     * @param int $page Page number.
     *
     * @return array|string An array of search results or an error message as a string.
     */
    public function getSearchMovies(
        string $query,
        bool   $include_adult,
        string $language,
        int    $page
    ): array|string
    {
        $queryParams = [
            'query' => $query,
            'include_adult' => $include_adult,
            'language' => $language,
            'page' => $page,
        ];

        return $this->getData('search', $queryParams);
    }

    /**
     * @return array|string
     */
    public function getGuestSessionMovies(): array|string
    {
        return $this->getData('session');
    }


    /**
     * Send a movie rating via a POST request.
     *
     * @param int $ratingValue The rating value.
     * @param int $movieId The ID of the movie to rate.
     * @return array|string An associative array with the response or an error message as a string.
     */
    public function postRatingMovie(int $ratingValue, int $movieId): array|string
    {
        try {
            /**
             * Create a new instance of the HTTP client.
             */
            $client = new Client();

            /**
             * Get the API key and URL from the configuration.
             */
            $apiKey = Config::get('services.external.key');
            $link = Config::get('services.external.rating');

            /**
             * Build the complete URL by concatenating the link and API key.
             */
            $url = "{$link}/{$movieId}/rating";

            /**
             * Get the guest session ID
             */
            $guestSessionId = $this->getGuestSessionMovies();
            $guestSessionId = $guestSessionId['guest_session_id'];

            /**
             * Prepare JSON data for the rating.
             */
            $data = [
                'value' => $ratingValue
            ];

            /**
             * Define the request headers.
             */
            $headers = [
                'Content-Type' => 'application/json',
            ];

            /**
             * Define query parameters.
             */
            $queryParams = [
                'api_key' => $apiKey,
                'guest_session_id' => $guestSessionId,
            ];

            /**
             * Send an HTTP POST request to the specified URL with JSON data, headers, and query parameters.
             */
            $response = $client->request('POST', $url, [
                'query' => $queryParams,
                'json' => $data,
                'headers' => $headers,
            ]);

            /**
             * Get the response body and its contents.
             */
            $responseBody = $response->getBody()->getContents();

            /**
             * Parse the JSON response data and return it as an associative array.
             */
            return json_decode($responseBody, true);
        } catch (\Throwable $exception) {
            /**
             * Handle any exceptions and return an error message.
             */
            return $exception->getMessage();
        }
    }


    /**
     * Perform an HTTP GET request to fetch data from an external API.
     *
     * @param string $endpoint The endpoint to access.
     * @param array $queryParams Optional query parameters.
     *
     * @return array|string An array of response data or an error message as a string.
     */
    private function getData(string $endpoint, array $queryParams = []): array|string
    {
        /**
         * Build the full URL using the provided endpoint and query parameters.
         */
        $url = $this->buildUrl($endpoint, $queryParams);

        try {
            /**
             * Send an HTTP GET request to the URL with 'accept' header set to JSON.
             */
            $response = $this->client->request('GET', $url, ['headers' => ['accept' => 'application/json']]);

            /**
             * Get the response body and its contents.
             */
            $data = $response->getBody()->getContents();

            /**
             * Parse the JSON response data and return it as an associative array.
             */
            return json_decode($data, true);
        } catch (\Throwable $exception) {
            /**
             * If an exception is caught, return the exception message as an error.
             */
            return $exception->getMessage();
        }
    }

    /**
     * Build a complete URL with optional query parameters.
     *
     * @param string $endpoint The endpoint to access.
     *
     * @return string The complete URL.
     */
    private function buildUrl(string $endpoint, array $queryParams = []): string
    {
        /**
         * Initialize the URL with the base URL and API key.
         */
        $url = $this->baseUrl[$endpoint] . '?api_key=' . $this->apiKey;

        /**
         * If there are additional query parameters, append them to the URL.
         */
        if (!empty($queryParams)) {
            $url .= '&' . http_build_query($queryParams);
        }
        return $url;
    }
}

