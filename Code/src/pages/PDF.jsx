import { useState } from 'react';
import { jsPDF } from 'jspdf';
import { useTranslation } from 'react-i18next';
import '../assets/css/PDF.css';
import { portfolioData } from "../data/portfolioData";
import foto from '../assets/img/user.png';

function PDF() {
  const [isGenerating, setIsGenerating] = useState(false);
  const { t } = useTranslation();

  const generatePDF = (language = 'pt') => {
    setIsGenerating(true);

    try {
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();
      const marginLeft = 20;
      const marginRight = 20;
      const contentWidth = pageWidth - marginLeft - marginRight;
      let yPosition = 20;

      doc.setFontSize(24);
      doc.setFont(undefined, 'bold');
      doc.text(portfolioData.name, pageWidth / 2, yPosition, { align: 'center' });
      yPosition += 15;

      doc.addImage(foto, 'PNG', pageWidth / 2 - 20, yPosition, 40, 40);
      yPosition += 50;

      doc.setFontSize(12);
      doc.setFont(undefined, 'normal');
      const subtitle = language === 'en' ? 'Professional Portfolio' : 'Portfólio Profissional';
      doc.text(subtitle, pageWidth / 2, yPosition, { align: 'center' });
      yPosition += 20;

      doc.setFontSize(16);
      doc.setFont(undefined, 'bold');
      const aboutTitle = language === 'en' ? 'About Me' : 'Sobre Mim';
      doc.text(aboutTitle, marginLeft, yPosition);
      yPosition += 10;

      doc.setFontSize(11);
      doc.setFont(undefined, 'normal');
      const aboutText = portfolioData.about[language];
      const aboutLines = doc.splitTextToSize(aboutText, contentWidth);
      doc.text(aboutLines, marginLeft, yPosition);
      yPosition += aboutLines.length * 7 + 15;

      if (yPosition > 250) {
        doc.addPage();
        yPosition = 20;
      }

      doc.setFontSize(16);
      doc.setFont(undefined, 'bold');
      const skillsTitle = language === 'en' ? 'Skills' : 'Habilidades';
      doc.text(skillsTitle, marginLeft, yPosition);
      yPosition += 10;

      doc.setFontSize(11);
      doc.setFont(undefined, 'normal');
      const skillsText = portfolioData.skills.join(', ');
      const skillsLines = doc.splitTextToSize(skillsText, contentWidth);
      doc.text(skillsLines, marginLeft, yPosition);
      yPosition += skillsLines.length * 7 + 15;

      if (yPosition > 250) {
        doc.addPage();
        yPosition = 20;
      }

      doc.setFontSize(16);
      doc.setFont(undefined, 'bold');
      const experienceTitle = language === 'en' ? 'Experiences' : 'Experiências';
      doc.text(experienceTitle, marginLeft, yPosition);
      yPosition += 10;

      doc.setFontSize(11);
      doc.setFont(undefined, 'normal');
      const experienceText = portfolioData.experiences[language];
      const experienceLines = doc.splitTextToSize(experienceText, contentWidth);
      doc.text(experienceLines, marginLeft, yPosition);
      yPosition += experienceLines.length * 7 + 20;

      if (yPosition > 240) {
        doc.addPage();
        yPosition = 20;
      }

      doc.setFontSize(18);
      doc.setFont(undefined, 'bold');
      const projectsTitle = language === 'en' ? 'Projects' : 'Projetos';
      doc.text(projectsTitle, marginLeft, yPosition);
      yPosition += 12;

      

      const projects = portfolioData.projects;

      projects.forEach((project, index) => {
        if (yPosition > 230) {
          doc.addPage();
          yPosition = 20;
        }

        doc.setFontSize(14);
        doc.setFont(undefined, 'bold');
        doc.text(`${index + 1}. ${project.name[language]}`, marginLeft, yPosition);
        yPosition += 8;

        doc.setFontSize(10);
        doc.setFont(undefined, 'normal');
        const descLines = doc.splitTextToSize(
          project.description[language],
          contentWidth
        );
        doc.text(descLines, marginLeft, yPosition);
        yPosition += descLines.length * 6 + 5;

        doc.setFont(undefined, 'italic');
        const techLabel = language === 'en' ? 'Technologies:' : 'Tecnologias:'; 
        doc.text(`${techLabel} ${project.technologies.join(', ')}`, marginLeft, yPosition);
        yPosition += 6;

        doc.setTextColor(0, 100, 200);
        doc.textWithLink('GitHub', marginLeft, yPosition, { url: project.github });
        doc.setTextColor(0, 0, 0);
        yPosition += 12;
      });

      const today = new Date();
      const formattedDate = language === 'en' ? today.toLocaleDateString('en-US') : today.toLocaleDateString('pt-BR');
      doc.setFontSize(8);
      doc.setFont(undefined, 'italic');
      const generatedLabel = language === 'en' ? 'Generated on:' : 'Gerado em:';
      doc.text(`${generatedLabel} ${formattedDate}`, pageWidth / 2, doc.internal.pageSize.getHeight() - 10, { align: 'center' });

      const filename = language === 'en' ? 'portfolio-en.pdf' : 'portfolio-pt.pdf';
      doc.save(filename);
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      alert('Erro ao gerar o PDF. Por favor, tente novamente.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="pdf">
      <div className="container">
        <h1 className="page-title">Download do Portfólio</h1>

        <div className="pdf-preview-card">
          <div className="pdf-icon">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
          </div>

          <h2 className="pdf-subtitle">Baixe seu Portfólio em PDF</h2>

          <p className="pdf-description">
            Este documento contém todas as informações do seu portfólio, incluindo:
          </p>

          <ul className="pdf-features">
            <li>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span>Informações pessoais e descrição</span>
            </li>
            <li>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span>Lista de habilidades técnicas</span>
            </li>
            <li>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span>Experiências profissionais e acadêmicas</span>
            </li>
            <li>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span>Projetos com descrições e links</span>
            </li>
          </ul>

          <div className="pdf-buttons">
            <button
              onClick={() => generatePDF('pt')}
              disabled={isGenerating}
              className="download-button"
            >
              {isGenerating ? (
                <>
                  <svg className="spinner" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <circle cx="12" cy="12" r="10" strokeWidth="3" strokeDasharray="31.4" strokeDashoffset="10"></circle>
                  </svg>
                  <span>Gerando PDF...</span>
                </>
              ) : (
                <>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                  <span>Download PDF (Português)</span>
                </>
              )}
            </button>

            <button
              onClick={() => generatePDF('en')}
              disabled={isGenerating}
              className="download-button download-button-secondary"
            >
              {isGenerating ? (
                <>
                  <svg className="spinner" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <circle cx="12" cy="12" r="10" strokeWidth="3" strokeDasharray="31.4" strokeDashoffset="10"></circle>
                  </svg>
                  <span>Generating PDF...</span>
                </>
              ) : (
                <>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                  <span>Download PDF (English)</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PDF;
