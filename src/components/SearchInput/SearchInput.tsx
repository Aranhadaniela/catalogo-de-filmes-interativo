import { useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";

type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: (term: string) => void;
  placeholder?: string;
  requiredMessage?: string;
};

export default function SearchInput({
  value,
  onChange,
  onSubmit,
  placeholder = "Buscar filmes...",
  requiredMessage = "Digite algo para buscar.",
}: SearchInputProps) {
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const term = value.trim();
    if (!term) {
      setError(requiredMessage);
      return;
    }
    setError(null);
    onSubmit?.(term);
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="w-full max-w-md">
      <div
        className={`rounded-xl border bg-white/5 transition-all duration-300
          focus-within:border-white focus-within:shadow-[0_0_18px_rgba(255,255,255,0.45)]
          hover:border-white/70
          ${error ? "border-red-400 shadow-[0_0_14px_rgba(248,113,113,0.5)]" : "border-white/40"}`}
      >
        <label className="flex items-center gap-3 px-4 py-2.5">
          <Search className="h-4 w-4 shrink-0 text-white/70" />
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={(e) => {
              onChange(e.target.value);
              if (error) setError(null);
            }}
            placeholder={placeholder}
            aria-invalid={!!error}
            aria-describedby={error ? "search-error" : undefined}
            className="w-full bg-transparent text-sm text-white placeholder:text-white/50 outline-none"
          />
          <span className="flex shrink-0 items-center gap-1 text-[10px] text-white/60">
            <span className="rounded border border-white/20 px-1.5 py-0.5">
              Ctrl
            </span>
            <span>+</span>
            <span className="rounded border border-white/20 px-1.5 py-0.5">
              K
            </span>
          </span>
        </label>
      </div>

      {error && <p className="mt-2 text-xs text-red-400">{error}</p>}
    </form>
  );
}
