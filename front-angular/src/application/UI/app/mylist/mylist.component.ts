import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesService } from './movies.service';
import { EntityMovieType } from '@/domain/entities/movies';

@Component({
  selector: 'app-mylist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mylist.component.html',
  styleUrl: './mylist.component.css',
})
export class MylistComponent implements OnInit {

  public movies: EntityMovieType[] = [];

  constructor(
    private movieService: MoviesService
  ) {}

  ngOnInit(): void {
    this.getMoviesPopularList()
  }

  async getMoviesPopularList() {
    const movies = await this.movieService.getMoviesPopularList();
    this.movies = movies;
  }
}
