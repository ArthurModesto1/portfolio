import './Sobre.css';
//import foto from '../assets/user.png';


function Sobre() {
  const skills = [
  ];

  return (
    <div className="sobre">
      <div className="container">
        <h1 className="page-title">Sobre Mim</h1>

        <div className="about-content">
          <div className="photo-section">
            <div className="photo-placeholder">
             {/* <img src={foto} alt="Foto do autor" className="photo" /> */}
             <span>Sua Foto</span>
            </div>
          </div>

          <div className="info-section">
            <div className="language-section">
              <h2>Português</h2>
              <p>
                Este espaço é destinado à apresentação do autor, incluindo sua formação,
    interesses na área de tecnologia e experiências adquiridas ao longo do curso.
              </p>
            </div>

            <div className="language-section">
              <h2>English</h2>
              <p>
                This section is intended to present the author, including their background,
    interests in technology, and experiences developed throughout the course.
              </p>
            </div>
          </div>
        </div>

        <div className="skills-section">
          <h2>Habilidades</h2>
          <p style={{ textAlign: 'center' }}>Lista de tecnologias, ferramentas e competências desenvolvidas durante a formação acadêmica e projetos realizados.

          </p>
          <div className="skills-grid">
            {skills.map((skill, index) => (
              <div key={index} className="skill-item">
                {skill}
                </div>
              ))}
              </div>
              </div>
              <div className="experience-section">
                <h2>Minhas Experiências</h2>
                <p className="experience-description">
                  Experiências profissionais e acadêmicas vividas pelo autor, incluindo projetos desenvolvidos, 
                  competições, hackathons e outras atividades relevantes que contribuíram para seu desenvolvimento
                  na área de tecnologia.</p> 
              </div>
      </div>
    </div>
  );
}

export default Sobre;
