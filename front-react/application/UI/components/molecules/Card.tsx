import {FC, ReactNode} from "react";
import {EntityMovieType} from "@/domain/entities/movies";
import Image from "@/application/UI/components/atoms/Image";
import CardBody from "@/application/UI/components/molecules/CardBody";
import Button from "@/application/UI/components/atoms/Button";

type CardProps = {
    index: number | undefined;
    movie: EntityMovieType | null
    children: ReactNode;
}

const Card: FC<CardProps> = ({index, movie, children}) => {
    return (
        <div key={index} className="bg-white" style={{height:"21.5rem"}}>
            <Image movie={movie}/>
            <CardBody movie={movie}>
                <div className='flex flex-col mt-2'>
                    {children}
                </div>
            </CardBody>
        </div>
    )
}

export default Card;