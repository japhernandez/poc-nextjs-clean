<?php

namespace App\Http\Infrastructure\EntryPoints\Controllers;

use App\Http\Domain\UseCase\Contracts\MovieServiceInterface;
use App\Http\Infrastructure\EntryPoints\traits\ApiResponse;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Response as ResponseAlias;

/**
 * Class that serves as an entry point to the application and communicates directly with
 * the use case in the Domain Layer.
 *
 * @autor John Alejandro Piedrahita
 */
class MovieController extends Controller
{
    /**
     * Trait for serializing the adapter response
     */
    use ApiResponse;

    /**
     * @var MovieServiceInterface
     */
    protected MovieServiceInterface $service;

    /**
     * We inject the abstraction as a dependency to make the communication with the use case
     *  which is in the Domain layer
     * @param MovieServiceInterface $service
     */
    public function __construct(MovieServiceInterface $service)
    {
        $this->service = $service;
    }

    /**
     * @return JsonResponse
     */
    public function getPopularMovies(): JsonResponse
    {
        try {
            return $this->successResponse($this->service->getPopularMovies());
        } catch (\Exception $exception) {
            return $this->errorResponse($exception, ResponseAlias::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function getSearchMovies(Request $request): JsonResponse
    {
        $query = $request->input('query', '');
        $includeAdult = $request->input('include_adult', false);
        $language = $request->input('language', 'us-US');
        $page = $request->input('page', 1);

        try {
            return $this->successResponse($this->service->getSearchMovies(
                $query,
                $includeAdult,
                $language,
                $page)
            );
        } catch (\Exception $exception) {
            return $this->errorResponse($exception, ResponseAlias::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * @return JsonResponse
     */
    public function getGuestSessionMovies(): JsonResponse
    {
        try {
            return $this->successResponse($this->service->getGuestSessionMovies());
        } catch (\Exception $exception) {
            return $this->errorResponse($exception, ResponseAlias::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function postRatingMovies(Request $request): JsonResponse
    {
        $rating = $request->input('rating');
        $movieId = $request->input('movieId');

        try {
            return $this->successResponse($this->service->postRatingMovie($rating, $movieId));
        } catch (\Exception $exception) {
            return $this->errorResponse($exception, ResponseAlias::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
