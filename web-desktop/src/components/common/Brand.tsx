import { useNavigate } from "react-router-dom";
import { routeContants } from "../../utils/RouteConstants";
import { Logo } from "./Logo";

export type BrandProps = {
  className?: string;
}

export const Brand = (props: BrandProps) => {
  const navigate = useNavigate();

  return (
    <div className={`${props.className ? props.className : ""}`}>
      <a
        onClick={() => navigate(routeContants.DEFAULT)}
        className="logo-link"
      >
        <Logo />
      </a>
    </div>
  );
};
