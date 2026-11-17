import { Link, generatePath } from 'react-router-dom';
import { routes } from '../../constants/routes';
import type { ReactNode } from 'react';
type CardProps = {
    id: number;
    name?: string;
    posterPath?: string;
    children?: ReactNode;
}

const Card = ({
    id,
    name,
    posterPath,
    children
}: CardProps) => {
    return (
        <Link to={generatePath(routes.movieDetails, { id: String(id) })} className="group relative w-80 h-55 p-2 cursor-pointer">
            <div className="absolute inset-2 rounded-2xl bg-white/20 opacity-0 blur-xs transition-all duration-300 group-hover:opacity-100 group-hover:-translate-y-1 group-hover:blur-xl" />
            <div className="relative z-10 w-full h-full overflow-hidden rounded-xl shadow-2xs transition-all duration-300 group-hover:translate-y-[1.5px] ">
                {posterPath ? (
                    <img
                        className="w-full h-full object-cover"
                        src={posterPath}
                        alt={name}
                    />
                ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center gap-1 bg-app-terciary">
                        <span className="text-center">:(</span>
                        <span>Nao conseguimos buscar o poster...</span>
                    </div>
                )}
                <div className="absolute inset-x-0 -bottom-1 h-15 bg-linear-to-t from-app-terciary to-transparent"></div>

                <span className="absolute inset-x-2 bottom-1.5 text-sm text-white truncate drop-shadow-md">
                    {name}
                </span>
                {children}
            </div>
        </Link>
    )
}

export default Card;