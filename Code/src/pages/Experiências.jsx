import '../assets/css/Experiencias.css';
import { useTranslation } from "react-i18next";

function Experiencias() {
  const { t } = useTranslation();
  const experiencias = [
    {
      id: 1,
      empresa: t("empresa-experiencias"),
      cargo: t("cargo-experiencias"),
      periodo: t("periodo-experiencias"),
      descricao: t("descricao-experiencia"),
    },
    {
      id: 2,
      empresa: t("empresa-experiencias2"),
      cargo: t("cargo-experiencias2"),
      periodo: t("periodo-experiencias2"),
      descricao: t("descricao-experiencia2"),
    },
    {
      id: 3,
      empresa: t("empresa-experiencias3"),
      cargo: t("cargo-experiencias3"),
      periodo: t("periodo-experiencias3"),
      descricao: t("descricao-experiencia3"),
    },
  ];

  return (
    <div className="experiencias">
      <div className="container">
        <h1 className="page-title">{t("experiencias")}</h1>

        <div className="experience-grid">
          {experiencias.map((exp) => (
            <div key={exp.id} className="experience-card">
              <div className="experience-header">
                <h3 className="experience-company">{exp.empresa}</h3>
                <span className="experience-period">{exp.periodo}</span>
              </div>

              <h4 className="experience-role">{exp.cargo}</h4>

              <p className="experience-description">
                {exp.descricao}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Experiencias;