import camino from "../../assets/img/camino.png";
import logo from "../../assets/img/logo.png";
import bg from "../../assets/img/removeBg.png";

export const Logo = () => {
  return (
    <a href="/">
      <img
        className="logo-img"
        src={bg}
        style={{ maxWidth: "100vw", objectFit: 'cover' }}
        alt="logo"
      />
    </a>
  );
};
