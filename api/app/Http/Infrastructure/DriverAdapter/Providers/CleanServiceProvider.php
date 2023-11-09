<?php

namespace App\Http\Infrastructure\DriverAdapter\Providers;

use App\Http\Domain\Entities\Contracts\MovieRepositoryInterface;
use App\Http\Domain\UseCase\Contracts\MovieServiceInterface;
use App\Http\Domain\UseCase\Services\MovieServiceImpl;
use App\Http\Infrastructure\DriverAdapter\Adapters\TheMovieDBAdapter;
use Illuminate\Support\ServiceProvider;

/**
 * Class to manage the dependencies of each object that is built.
 *
 * @author John Alejandro Piedrahita
 */
class CleanServiceProvider extends ServiceProvider
{
    public function  register(): void
    {
        /**
         * Use case
         */
        $this->app->bind(
            MovieServiceInterface::class,
            MovieServiceImpl::class
        );

        /**
         * Adapters
         */
        $this->app->bind(
            MovieRepositoryInterface::class,
            TheMovieDBAdapter::class
        );
    }
}
