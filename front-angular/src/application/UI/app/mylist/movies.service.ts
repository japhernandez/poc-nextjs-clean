import { HttpClientRepository } from '@/domain/entities/contracts/http-client-repository';
import { EntityMovieType } from '@/domain/entities/movies';
import { IMoviesService, RateType } from '@/domain/use-cases/contracts/movies-service';
import { makeMoviesPopularApi } from '@/infrastructure/entry-points/api/movies-api';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MoviesService implements IMoviesService {

  async getMoviesPopularList (): Promise<EntityMovieType[]> {
    const moviesApi = makeMoviesPopularApi();
    const movies =  moviesApi.getMoviesPopularList()
    return movies;
  }

  async postRateMovie (data: RateType): Promise<Object> {
    return {}
  }

  async searchMoviesList(params: string): Promise<EntityMovieType[]> {
    return []
  }
}
