const Footer = () => (
  <footer className="fixed inset-x-0 bottom-0 z-50 bg-app-primary py-3 text-center text-sm text-neutral-400">
    <p className="text-xs">
      Dados fornecidos por{" "}
      <a
        href="https://www.themoviedb.org"
        target="_blank"
        rel="noreferrer"
        className="underline hover:text-white"
      >
        TMDB
      </a>
    </p>
  </footer>
);

export default Footer;
