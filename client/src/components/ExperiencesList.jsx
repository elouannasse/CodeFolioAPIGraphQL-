// interface ExperiencesListProps {
  experiences: Experience[];
}

export default function ExperiencesList({ experiences }: ExperiencesListProps) {
  if (!experiences || experiences.length === 0) {
    return <p>No experiences found.</p>;
  }

  return (
    <div className="grid">
      {experiences.map((experience) => (
        <div key={experience.id} className="card">
          <h3>{experience.poste}</h3>
          <p>
            <strong>{experience.entreprise}</strong>
          </p>
          {experience.lieu && <p>📍 {experience.lieu}</p>}
          {experience.dateDebut && (
            <p>
              <strong>Period:</strong>{" "}
              {new Date(parseInt(experience.dateDebut)).toLocaleDateString()}
              {experience.dateFin &&
                ` - ${new Date(
                  parseInt(experience.dateFin)
                ).toLocaleDateString()}`}
            </p>
          )}
          {experience.description && <p>{experience.description}</p>}
        </div>
      ))}
    </div>
  );
}
