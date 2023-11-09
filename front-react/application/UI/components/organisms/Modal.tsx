import React, { FC, Fragment, useState } from "react";
import ReactModal from "react-modal";
import { Dialog, Transition } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import { EntityMovieType } from "@/domain/entities/movies";
import Card from "@/application/UI/components/molecules/Card";
import Button from "@/application/UI/components/atoms/Button";
import Input from "@/application/UI/components/atoms/Input";

type RatingModalProps = {
  movie: EntityMovieType | null;
  isOpen: boolean;
  closeModal: () => void;
  handleSubmit?: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  isSuccess?: boolean;
  handleRating?: (value: number, movieId?: number) => void;
};

ReactModal.setAppElement("#__next");

const Modal: FC<RatingModalProps> = ({
  movie,
  isOpen,
  closeModal,
  handleSubmit,
  isSuccess,
  handleRating
}) => {
  const [rate, setRate] = useState(0);

  const handleRateChange = (event: { target: { value: any } }) => {
    setRate(Number(event.target.value));
    if (handleRating) {
      handleRating(event.target.value, movie?.id);
    }
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-100 mt-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto z-30">
            <div className="flex mt-12 min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  className="w-full max-w-md transform overflow-x-hidden rounded-2xl bg-white p-6 text-left align-middle transition-all relative overflow-y-scroll"
                  style={{ minHeight: "500px", maxHeight: "800px" }}
                >
                  <button
                    className="absolute top-4 right-4 p-1 hover:bg-gray-200 rounded"
                    onClick={() => {}}
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 mb-4"
                  >
                    {movie?.original_title}
                  </Dialog.Title>
                  <hr className="mb-4" />
                  <form onSubmit={handleSubmit}>
                    <Card index={movie?.id} movie={movie}>
                      <div className="flex justify-around">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <Input
                            key={`rate-${i}-${i}`}
                            id="rating"
                            name="rating"
                            value={i}
                            checked={rate === i}
                            onChange={handleRateChange}
                          />
                        ))}
                      </div>
                      <hr className="my-3" />
                      <Button
                        isLoading={isSuccess}
                        onClick={closeModal}
                        data={movie}
                      >
                        <span>Rate Movie</span>
                      </Button>
                    </Card>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Modal;
