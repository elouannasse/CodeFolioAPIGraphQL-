export default function ExperiencesSection({ experiences }) {
  const formatDate = (date) => {
    return new Date(parseInt(date)).toLocaleDateString("fr-FR", {
      month: "long",
      year: "numeric",
    });
  };

  const getEmploymentTypeLabel = (type) => {
    const labels = {
      full_time: "Temps plein",
      part_time: "Temps partiel",
      contract: "Contrat",
      freelance: "Freelance",
      internship: "Stage",
    };
    return labels[type] || type;
  };

  return (
    <section className="py-20 bg-gray-50" id="experiences">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">
          Expériences Professionnelles
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Mon parcours professionnel et mes réalisations
        </p>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <div
              key={exp.id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300 border-l-4 border-primary-600"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-800 mb-1">
                    {exp.position}
                  </h3>
                  <h4 className="text-xl text-primary-600 font-semibold mb-2">
                    {exp.company}
                  </h4>
                  <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                    {exp.location && (
                      <span className="flex items-center">
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                        </svg>
                        {exp.location}
                      </span>
                    )}
                    <span className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      {getEmploymentTypeLabel(exp.employmentType)}
                    </span>
                  </div>
                </div>
                <div className="mt-4 md:mt-0 text-sm text-gray-600">
                  <span className="font-semibold">
                    {formatDate(exp.startDate)} -{" "}
                    {exp.isCurrent ? "Présent" : formatDate(exp.endDate)}
                  </span>
                </div>
              </div>

              <p className="text-gray-700 mb-4 leading-relaxed">
                {exp.description}
              </p>

              {exp.technologies.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="bg-primary-50 text-primary-700 text-xs px-3 py-1 rounded-full font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {experiences.length === 0 && (
          <div className="text-center text-gray-500 py-12">
            Aucune expérience disponible pour le moment.
          </div>
        )}
      </div>
    </section>
  );
}
