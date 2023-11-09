import {FC} from "react";
import {EntityMovieType} from "@/domain/entities/movies";

type ImageProps = {
    movie: EntityMovieType | null
}

const Image: FC<ImageProps> = ({movie}) => {
    return (
        <img
            src={`https://image.tmdb.org/t/p/w200/${movie?.poster_path}`}
            alt={movie?.original_title}
            className="w-full h-36 object-cover object-center mb-4"
        />
    )
}

export default Image;