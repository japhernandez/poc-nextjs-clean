import React, { FC, useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";

import { EntityMovieType } from "@/domain/entities/movies";
import { IMoviesService } from "@/domain/use-cases/contracts/movies-service";
import { HttpStatusCode } from "@/domain/entities/contracts/http-client-repository";

import Card from "@/application/UI/components/molecules/Card";
import Modal from "@/application/UI/components/organisms/Modal";
import Button from "@/application/UI/components/atoms/Button";

import {
  makeMoviesPopularApi,
  makeRateMovieApi,
  makeSearchMovieApi
} from "@/infrastructure/entry-points/api/movies-api";
import Notification from "@/application/UI/components/molecules/Notification";

/**
 * Initialize the factory that does the Dependency Injection with the MoviesServiceImpl use case
 * @implements movieService: IMoviesService
 * @class MoviesServiceImpl
 */
let movieService: IMoviesService = makeRateMovieApi();

const MyListTemplate: FC<{}> = () => {
  const queryClient = useQueryClient();

  const [notificationRate, setNotificationRate] = useState(0);
  const [isNotificationVisible, setNotificationVisible] = useState(false);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedMovie, setSelectedMovie] = useState<EntityMovieType | null>(
    null
  );
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [rate, setRate] = useState(0);
  const [movieId, setMovieId] = useState(0);
  const [notificationDuration, setNotificationDuration] = useState(0);

  const { data, isFetching } = useQuery(
    ["moviesList", searchQuery],
    async () => {
      if (searchQuery) {
        const searchMoviesList: IMoviesService =
          makeSearchMovieApi(searchQuery);
        return searchMoviesList.searchMoviesList(searchQuery);
      } else {
        const moviesPopularList: IMoviesService = makeMoviesPopularApi();
        return moviesPopularList.getMoviesPopularList();
      }
    },
    {
      enabled: true,
      onError: () => HttpStatusCode.serverError
    }
  );

  function openModal(row: EntityMovieType): void {
    setSelectedMovie(row);
    setModalOpen(true);
  }

  function closeModal(): void {
    setTimeout(() => {
      setModalOpen(false);
    }, 1000);
  }

  const postRateMovie = async () => {
    await movieService.postRateMovie({
      rating: rate,
      movieId: movieId
    });
  };

  const mutation = useMutation(postRateMovie, {
    onSuccess: () => {
      queryClient.invalidateQueries("moviesList").then(() => closeModal());
    }
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSuccess(true);
    try {
      await mutation.mutateAsync();
      setNotificationRate(rate);
      setNotificationVisible(true);
      setNotificationDuration(2000);
      setRate(0);
    } catch (error) {
      throw error;
    } finally {
      setIsSuccess(false);
      setNotificationDuration(2000);
    }
  };

  useEffect(() => {
    if (notificationDuration > 0) {
      const timer = setTimeout(() => {
        setNotificationVisible(false);
      }, notificationDuration);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [notificationDuration]);

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchQuery(event.target.value);
  };

  const handleRating = (rate: number, movieId?: number) => {
    setRate(rate);
    if (movieId) setMovieId(movieId);
  };

  return (
    <div className="p-4 bg-opacity-25">
      <h1 className="text-2xl font-bold mb-4">Mi lista de favoritos</h1>
      <hr className="mb-4" />
      {isNotificationVisible && (
        <Notification>
          <div className="bg-green-100 text-green-900 p-4 rounded-md shadow-lg">
            ¡Haz hecho una puntuación de {notificationRate}! ¡Enhorabuena!
          </div>
        </Notification>
      )}
      <Modal
        movie={selectedMovie}
        isOpen={isModalOpen}
        closeModal={closeModal}
        handleSubmit={handleSubmit}
        isSuccess={isSuccess}
        handleRating={handleRating}
      />
      <br />
      <input
        type="search"
        className="border border-gray-300 px-4 py-5 rounded w-full text-black"
        placeholder="Buscar..."
        onChange={handleSearchInputChange}
        value={searchQuery}
      />

      <div className="px-4 md:px-12 mt-4 space-y-8 bg-opacity-25">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {isFetching ? (
            <>
              <h1>Loading...</h1>
            </>
          ) : (
            data &&
            data?.map((movie: EntityMovieType, index: number) => (
              <Card key={index} index={index} movie={movie}>
                <Button onClick={openModal} data={movie}>
                  <span>button</span>
                </Button>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MyListTemplate;
