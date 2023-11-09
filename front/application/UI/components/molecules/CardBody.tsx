import {FC, ReactNode} from "react";
import {EntityMovieType} from "@/domain/entities/movies";

type CardBodyProps = {
    movie: EntityMovieType | null
    children: ReactNode
}

const CardBody: FC<CardBodyProps> = ({movie, children}) => {
    return (
        <div className="p-2">
            <h2 className="text-sm font-semibold mb-2 text-gray-600 line-clamp-1">{movie?.original_title}</h2>
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">{movie?.overview}</p>
            <div className="flex items-center justify-around mt-2">
                <p className="text-lg font-semibold text-blue-500">{movie?.vote_average}</p>
                <p className="text-sm text-gray-500">{movie?.vote_count} votes</p>
            </div>
            {children}
        </div>
    )
}

export default CardBody;