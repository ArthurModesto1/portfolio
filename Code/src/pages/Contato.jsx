import { useState } from "react";
import emailjs from "@emailjs/browser";
import EMAILJS_CONFIG from "../config/emailJsConfig";
import { useTranslation } from "react-i18next";
import '../assets/css/Contato.css';

function Contato() {
  const { t } = useTranslation();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const time = new Date().toLocaleString("pt-BR");

    // Email para você
    emailjs
      .send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID_FOR_ME,
        {
          name: nome,
          email: email,
          message: mensagem,
          title: `Nova mensagem do site de: ${nome}`,
          time: time,
        },
        EMAILJS_CONFIG.PUBLIC_KEY
      )
      .then(
        () => {
          console.log("Email para você enviado!");
        },
        (err) => {
          console.error("Erro ao enviar para você:", err);
          setStatus(t("Erro ao enviar mensagem"));
        }
      );

    // Email de confirmação para o remetente
    emailjs
      .send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID_FOR_SENDER,
        {
          name: nome,
          email: email,
          message: mensagem,
          title: "Recebemos sua mensagem!",
          time: time,
        },
        EMAILJS_CONFIG.PUBLIC_KEY
      )
      .then(
        () => {
          console.log("Email de confirmação enviado ao remetente!");
          setStatus(t("Sucesso! Sua mensagem foi enviada."));

          setNome("");
          setEmail("");
          setMensagem("");
        },
        (err) => {
          console.error("Erro ao enviar confirmação:", err);
          setStatus(t("Erro ao enviar mensagem"));
        }
      );
  };

  return (
    <div className="contato">
      <div className="container">
        <h1 className="page-title">{t("contato")}</h1>

        <div className="contact-card">
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label>{t("nome-contato")}</label>
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>{t("email-contato")}</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>{t("mensagem-contato")}</label>
              <textarea
                rows="5"
                value={mensagem}
                onChange={(e) => setMensagem(e.target.value)}
                required
              ></textarea>
            </div>

            <button type="submit" className="submit-button">
              {t("enviar-contato")}
            </button>

            {status && <p className="form-status">{status}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contato;