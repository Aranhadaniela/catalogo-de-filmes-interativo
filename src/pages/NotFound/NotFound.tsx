import { Link, useLocation } from "react-router-dom";
import NotFoundAnimation from "../../components/NotFoundAnimation/NotFoundAnimation";
import { routes } from "../../constants/routes";

const NotFound = () => {
  const { pathname } = useLocation();

  return (
    <div className="flex flex-col items-center justify-center gap-10 px-4 py-24 text-center">
      <NotFoundAnimation path={pathname} />
      <div>
        <h1 className="text-2xl font-extrabold">Página não encontrada</h1>
        <p className="mt-2 font-light">
          O endereço que você tentou acessar não existe.
        </p>
      </div>
      <Link
        to={routes.home}
        className="rounded-xl border border-white/40 px-5 py-2.5 text-sm transition-all duration-300 hover:border-white hover:shadow-[0_0_18px_rgba(255,255,255,0.45)]"
      >
        Voltar para o início
      </Link>
    </div>
  );
};

export default NotFound;
