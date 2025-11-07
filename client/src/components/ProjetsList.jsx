// interface ProjetsListProps {
  projets: Projet[];
}

export default function ProjetsList({ projets }: ProjetsListProps) {
  if (!projets || projets.length === 0) {
    return <p>No projets found.</p>;
  }

  return (
    <div className="grid">
      {projets.map((projet) => (
        <div key={projet.id} className="card">
          <h3>{projet.nom}</h3>
          {projet.description && <p>{projet.description}</p>}
          {projet.dateDebut && (
            <p>
              <strong>Period:</strong>{" "}
              {new Date(parseInt(projet.dateDebut)).toLocaleDateString()}
              {projet.dateFin &&
                ` - ${new Date(parseInt(projet.dateFin)).toLocaleDateString()}`}
            </p>
          )}
          <div style={{ marginTop: "1rem" }}>
            {projet.lienProjet && (
              <a
                href={projet.lienProjet}
                target="_blank"
                rel="noopener noreferrer"
                style={{ marginRight: "1rem" }}
              >
                View Project
              </a>
            )}
            {projet.lienGithub && (
              <a
                href={projet.lienGithub}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
