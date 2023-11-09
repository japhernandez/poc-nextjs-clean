<?php

namespace App\Http\Domain\UseCase\Services;

use App\Http\Domain\Entities\Contracts\MovieRepositoryInterface;
use App\Http\Domain\UseCase\Contracts\MovieServiceInterface;

/**
 * Class to communicate the entry point in the infrastructure layer with the adapter.
 * Class that consumes the external API, by means of abstractions.
 *
 * @autor John Alejandro Piedrahita
 */
class MovieServiceImpl implements MovieServiceInterface
{
    /**
     * @var MovieRepositoryInterface
     */
    protected MovieRepositoryInterface $repository;

    /**
     * We inject the abstraction in the constructor and the Laravel IoC is in charge of
     * to make the communication by means of the binding
     * @param MovieRepositoryInterface $repository
     */
    public function __construct(MovieRepositoryInterface $repository)
    {
        $this->repository = $repository;
    }

    /**
     * @return array | string
     */
    public function getPopularMovies(): array|string
    {
        return $this->repository->getPopularMovies();
    }

    /**
     * @param string $query
     * @param bool $include_adult
     * @param string $language
     * @param int $page
     * @return array|string
     */
    public function getSearchMovies(
        string $query,
        bool $include_adult,
        string $language,
        int $page
    ): array|string
    {
        return $this->repository->getSearchMovies($query, $include_adult, $language, $page);
    }

    /**
     * @return array|string
     */
    public function getGuestSessionMovies(): array|string
    {
        return $this->repository->getGuestSessionMovies();
    }

    /**
     * @param int $ratingValue
     * @param int $movieId
     * @return array|string
     */
    public function postRatingMovie(int $ratingValue, int $movieId): array|string
    {
        return $this->repository->postRatingMovie($ratingValue, $movieId);
    }
}
