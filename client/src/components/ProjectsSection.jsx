export default function ProjectsSection({ projets }) {
  const getStatusBadge = (status) => {
    const colors = {
      completed: "bg-green-100 text-green-800",
      in_progress: "bg-yellow-100 text-yellow-800",
      planned: "bg-blue-100 text-blue-800",
    };
    const labels = {
      completed: "Terminé",
      in_progress: "En cours",
      planned: "Planifié",
    };
    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-semibold ${
          colors[status] || "bg-gray-100 text-gray-800"
        }`}
      >
        {labels[status] || status}
      </span>
    );
  };

  return (
    <section className="py-20 bg-white" id="projets">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">
          Mes Projets
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Découvrez une sélection de mes réalisations et projets récents
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projets.map((projet) => (
            <div
              key={projet.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-200"
            >
              {projet.image && (
                <img
                  src={projet.image}
                  alt={projet.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-gray-800">
                    {projet.title}
                  </h3>
                  {getStatusBadge(projet.status)}
                </div>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {projet.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {projet.technologies.slice(0, 3).map((tech, index) => (
                    <span
                      key={index}
                      className="bg-primary-100 text-primary-800 text-xs px-2 py-1 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                  {projet.technologies.length > 3 && (
                    <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                      +{projet.technologies.length - 3}
                    </span>
                  )}
                </div>
                <div className="flex space-x-4">
                  {projet.demoUrl && (
                    <a
                      href={projet.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 hover:text-primary-800 font-medium flex items-center"
                    >
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
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                      Demo
                    </a>
                  )}
                  {projet.githubUrl && (
                    <a
                      href={projet.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-700 hover:text-gray-900 font-medium flex items-center"
                    >
                      🐙 GitHub
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {projets.length === 0 && (
          <div className="text-center text-gray-500 py-12">
            Aucun projet disponible pour le moment.
          </div>
        )}
      </div>
    </section>
  );
}
