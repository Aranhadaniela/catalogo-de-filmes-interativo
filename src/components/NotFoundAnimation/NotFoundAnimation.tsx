import type { CSSProperties } from "react";
import "./NotFoundAnimation.css";

const dots = [0, 1, 2];

type NotFoundAnimationProps = {
  path?: string;
};

const NotFoundAnimation = ({ path = "/page" }: NotFoundAnimationProps) => {
  return (
    <div className="ct-404" role="img">
      <div className="ct-thread">
        <span className="ct-bubble ct-out" title={path}>
          GET {path}
        </span>
        <span className="ct-receipt text-xs">Lida às 4:04</span>
        <span className="ct-bubble ct-in">
          {dots.map((i) => (
            <i
              key={i}
              className="ct-dot"
              style={{ "--i": i } as CSSProperties}
            />
          ))}
        </span>
      </div>
      <span className="ct-cap">404 · LEFT ON READ</span>
    </div>
  );
};

export default NotFoundAnimation;
