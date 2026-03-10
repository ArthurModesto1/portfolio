import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../assets/css/Home.css";

function Home() {
  const { t } = useTranslation();
  return (
    <div className="home">
      <div className="hero-section">
        <h1 className="hero-title">{t("titulo-home")}</h1>
        <p className="hero-description">
          {t("assunto-home")}
        </p>
        <Link to="/sobre" className="cta-button">
          {t("butao-sobremim")}
        </Link>
      </div>
    </div>
  );
}

export default Home;
