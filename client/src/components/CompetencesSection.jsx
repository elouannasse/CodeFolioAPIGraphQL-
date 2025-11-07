export default function CompetencesSection({ competences }) {
  const getCategoryLabel = (category) => {
    const labels = {
      programming_language: "Langages de programmation",
      framework: "Frameworks",
      database: "Bases de données",
      tool: "Outils",
      soft_skill: "Compétences transversales",
      methodology: "Méthodologies",
      cloud: "Cloud",
      devops: "DevOps",
      design: "Design",
      other: "Autres",
    };
    return labels[category] || category;
  };

  const getLevelColor = (level) => {
    const colors = {
      beginner: "bg-blue-100 text-blue-800",
      intermediate: "bg-yellow-100 text-yellow-800",
      advanced: "bg-orange-100 text-orange-800",
      expert: "bg-green-100 text-green-800",
    };
    return colors[level] || "bg-gray-100 text-gray-800";
  };

  const getLevelLabel = (level) => {
    const labels = {
      beginner: "Débutant",
      intermediate: "Intermédiaire",
      advanced: "Avancé",
      expert: "Expert",
    };
    return labels[level] || level;
  };

  const groupedCompetences = competences.reduce((acc, comp) => {
    const category = comp.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(comp);
    return acc;
  }, {});

  return (
    <section className="py-20 bg-white" id="competences">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">
          Compétences
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Technologies et outils que je maîtrise
        </p>

        <div className="space-y-12">
          {Object.entries(groupedCompetences).map(([category, skills]) => (
            <div key={category}>
              <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-primary-600 inline-block pb-2">
                {getCategoryLabel(category)}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {skills.map((skill) => (
                  <div
                    key={skill.id}
                    className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors duration-200 border border-gray-200"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-lg font-semibold text-gray-800 flex-1">
                        {skill.icon && (
                          <span className="mr-2">{skill.icon}</span>
                        )}
                        {skill.name}
                      </h4>
                      <span
                        className={`px-2 py-1 rounded text-xs font-semibold ${getLevelColor(
                          skill.level
                        )}`}
                      >
                        {getLevelLabel(skill.level)}
                      </span>
                    </div>
                    {skill.yearsOfExperience !== undefined &&
                      skill.yearsOfExperience > 0 && (
                        <p className="text-sm text-gray-600">
                          {skill.yearsOfExperience}{" "}
                          {skill.yearsOfExperience > 1 ? "ans" : "an"}{" "}
                          d'expérience
                        </p>
                      )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {competences.length === 0 && (
          <div className="text-center text-gray-500 py-12">
            Aucune compétence disponible pour le moment.
          </div>
        )}
      </div>
    </section>
  );
}
