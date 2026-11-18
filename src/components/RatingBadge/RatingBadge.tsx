import { Star } from "lucide-react";

export default function RatingBadge({
  rating,
  className = "",
}: {
  rating: number;
  className?: string;
}) {
  return (
    <div
      className={`absolute top-2 right-2 z-20 flex items-center gap-1 rounded-full bg-black/60 px-2 py-1 text-sm font-semibold text-white shadow-md backdrop-blur-sm ${className}`}
    >
      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
      {rating.toFixed(1)}
    </div>
  );
}
