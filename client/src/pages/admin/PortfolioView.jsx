import { useQuery } from "@apollo/client";
import {
  GET_PROFIL,
  GET_PROJETS,
  GET_EXPERIENCES,
  GET_COMPETENCES,
} from "../../graphql/queries";
import LoadingSpinner from "../../components/LoadingSpinner";
import ErrorMessage from "../../components/ErrorMessage";

export default function PortfolioView() {
  const { data: profilData, loading: profilLoading } = useQuery(GET_PROFIL);
  const { data: projetsData, loading: projetsLoading } = useQuery(GET_PROJETS);
  const { data: experiencesData, loading: experiencesLoading } =
    useQuery(GET_EXPERIENCES);
  const { data: competencesData, loading: competencesLoading } =
    useQuery(GET_COMPETENCES);

  if (
    profilLoading ||
    projetsLoading ||
    experiencesLoading ||
    competencesLoading
  ) {
    return <LoadingSpinner />;
  }

  const profil = profilData?.getProfil;
  const projets = projetsData?.getProjets || [];
  const experiences = experiencesData?.getExperiences || [];
  const competences = competencesData?.getCompetences || [];

  return (
    <div className="bg-warm-50 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-warm-700 via-warm-600 to-amber-600 text-white py-4 px-6 sticky top-0 z-10 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold">👁️ Aperçu Portfolio Visiteur</h1>
          <span className="text-warm-100 text-sm">
            Ce que les visiteurs voient
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Hero Section - Marron */}
        <section className="bg-gradient-to-br from-warm-800 via-warm-700 to-amber-700 text-white rounded-2xl shadow-2xl p-12 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <h1 className="text-5xl font-bold mb-3">{profil?.fullName}</h1>
              <h2 className="text-2xl text-warm-100 mb-4">{profil?.title}</h2>
              <p className="text-warm-50 text-lg leading-relaxed">
                {profil?.bio}
              </p>

              {/* Social Links */}
              {profil?.socialLinks && profil.socialLinks.length > 0 && (
                <div className="flex gap-3 mt-6">
                  {profil.socialLinks.map((link, idx) => (
                    <a
                      key={idx}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-warm-900/50 hover:bg-warm-900 px-4 py-2 rounded-lg transition-all duration-200 text-sm font-medium"
                    >
                      {link.platform}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {profil?.avatar && (
              <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-warm-300 shadow-xl">
                <img
                  src={profil.avatar}
                  alt={profil.fullName}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </section>

        {/* About Me */}
        <section className="bg-white rounded-xl shadow-lg p-8 mb-8 border-l-4 border-warm-600">
          <h2 className="text-3xl font-bold text-warm-900 mb-4 flex items-center gap-3">
            <span className="text-warm-600">📋</span>À Propos
          </h2>
          <p className="text-gray-700 leading-relaxed text-lg">{profil?.bio}</p>
        </section>

        {/* Compétences - Marron */}
        <section className="bg-white rounded-xl shadow-lg p-8 mb-8 border-l-4 border-amber-600">
          <h2 className="text-3xl font-bold text-warm-900 mb-6 flex items-center gap-3">
            <span className="text-amber-600">🎯</span>
            Compétences
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(
              competences.reduce((acc, comp) => {
                if (!acc[comp.category]) acc[comp.category] = [];
                acc[comp.category].push(comp);
                return acc;
              }, {})
            ).map(([category, comps]) => (
              <div
                key={category}
                className="bg-warm-50 rounded-lg p-4 border border-warm-200"
              >
                <h3 className="font-bold text-warm-800 mb-3 text-lg capitalize">
                  {category.replace(/_/g, " ")}
                </h3>
                <div className="space-y-2">
                  {comps.map((comp) => (
                    <div
                      key={comp.id}
                      className="flex items-center justify-between"
                    >
                      <span className="text-gray-700 font-medium">
                        {comp.name}
                      </span>
                      <span className="text-xs px-2 py-1 rounded-full bg-warm-200 text-warm-800">
                        {comp.level}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Projets - Marron */}
        <section className="bg-white rounded-xl shadow-lg p-8 mb-8 border-l-4 border-warm-700">
          <h2 className="text-3xl font-bold text-warm-900 mb-6 flex items-center gap-3">
            <span className="text-warm-700">💼</span>
            Mes Projets
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projets.map((projet) => (
              <div
                key={projet.id}
                className="bg-gradient-to-br from-warm-50 to-amber-50 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-warm-200"
              >
                {projet.image && (
                  <img
                    src={projet.image}
                    alt={projet.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-5">
                  <h3 className="text-xl font-bold text-warm-900 mb-2">
                    {projet.title}
                  </h3>
                  <p className="text-gray-600 mb-3 line-clamp-2">
                    {projet.description}
                  </p>

                  {projet.technologies && projet.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {projet.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="text-xs px-2 py-1 bg-warm-200 text-warm-800 rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  {projet.link && (
                    <a
                      href={projet.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block text-warm-700 hover:text-warm-900 font-medium"
                    >
                      Voir le projet →
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Expériences - Marron */}
        <section className="bg-white rounded-xl shadow-lg p-8 mb-8 border-l-4 border-amber-700">
          <h2 className="text-3xl font-bold text-warm-900 mb-6 flex items-center gap-3">
            <span className="text-amber-700">🏢</span>
            Expériences Professionnelles
          </h2>

          <div className="space-y-6">
            {experiences.map((exp) => (
              <div
                key={exp.id}
                className="bg-warm-50 rounded-lg p-6 border-l-4 border-warm-600 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-warm-900">
                      {exp.position}
                    </h3>
                    <p className="text-warm-700 font-medium">{exp.company}</p>
                  </div>
                  <span className="text-sm px-3 py-1 bg-warm-200 text-warm-800 rounded-full">
                    {exp.employmentType}
                  </span>
                </div>

                <p className="text-gray-600 text-sm mb-2">
                  {new Date(parseInt(exp.startDate)).toLocaleDateString(
                    "fr-FR",
                    { month: "long", year: "numeric" }
                  )}{" "}
                  -
                  {exp.isCurrent
                    ? " Présent"
                    : new Date(parseInt(exp.endDate)).toLocaleDateString(
                        "fr-FR",
                        { month: "long", year: "numeric" }
                      )}
                </p>

                <p className="text-gray-700 leading-relaxed">
                  {exp.description}
                </p>

                {exp.location && (
                  <p className="text-gray-500 text-sm mt-2">
                    📍 {exp.location}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Contact - Marron */}
        <section className="bg-gradient-to-br from-warm-800 to-amber-800 rounded-xl shadow-2xl p-8 text-white">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <span>📧</span>
            Me Contacter
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center gap-4">
              <div className="bg-warm-700 p-3 rounded-lg">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-warm-100 text-sm">Email</p>
                <a
                  href={`mailto:${profil?.email}`}
                  className="text-white font-medium hover:text-warm-200"
                >
                  {profil?.email}
                </a>
              </div>
            </div>

            {profil?.phone && (
              <div className="flex items-center gap-4">
                <div className="bg-warm-700 p-3 rounded-lg">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-warm-100 text-sm">Téléphone</p>
                  <a
                    href={`tel:${profil?.phone}`}
                    className="text-white font-medium hover:text-warm-200"
                  >
                    {profil?.phone}
                  </a>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
