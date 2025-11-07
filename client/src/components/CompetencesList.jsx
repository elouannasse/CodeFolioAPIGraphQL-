export default function CompetencesList({ competences }) {
  if (!competences || competences.length === 0) {
    return <p>No competences found.</p>;
  }

  const groupedCompetences = competences.reduce((acc, competence) => {
    const category = competence.categorie || "Other";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(competence);
    return acc;
  }, {});

  return (
    <div>
      {Object.entries(groupedCompetences).map(([category, skills]) => (
        <div key={category} style={{ marginBottom: "2rem" }}>
          <h3>{category}</h3>
          <div className="grid">
            {skills.map((competence) => (
              <div key={competence.id} className="card">
                <h4>{competence.nom}</h4>
                {competence.niveau && (
                  <p>
                    <strong>Level:</strong> {competence.niveau}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
