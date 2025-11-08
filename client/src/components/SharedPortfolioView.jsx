import { useQuery } from "@apollo/client";
import {
  GET_PROFIL,
  GET_PROJETS,
  GET_EXPERIENCES,
  GET_COMPETENCES,
  GET_EDUCATIONS,
} from "../graphql/queries";
import LoadingSpinner from "./LoadingSpinner";
import ErrorMessage from "./ErrorMessage";
import { Link } from "react-router-dom";

export default function SharedPortfolioView({ showAdminBanner = false }) {
  const {
    data: profilData,
    loading: profilLoading,
    error: profilError,
  } = useQuery(GET_PROFIL, {
    fetchPolicy: "network-only",
  });
  const { data: projetsData, loading: projetsLoading } = useQuery(GET_PROJETS, {
    fetchPolicy: "network-only",
  });
  const { data: experiencesData, loading: experiencesLoading } = useQuery(
    GET_EXPERIENCES,
    {
      fetchPolicy: "network-only",
    }
  );
  const { data: competencesData, loading: competencesLoading } = useQuery(
    GET_COMPETENCES,
    {
      fetchPolicy: "network-only",
    }
  );
  const { data: educationsData, loading: educationsLoading } = useQuery(
    GET_EDUCATIONS,
    {
      fetchPolicy: "network-only",
    }
  );

  if (
    profilLoading ||
    projetsLoading ||
    experiencesLoading ||
    competencesLoading ||
    educationsLoading
  ) {
    return <LoadingSpinner />;
  }

  if (profilError) {
    return <ErrorMessage message={profilError.message} />;
  }

  const profil = profilData?.getProfil;
  const projets = projetsData?.getProjets || [];
  const experiences = experiencesData?.getExperiences || [];
  const competences = competencesData?.getCompetences || [];
  const educations = educationsData?.getEducations || [];

  return (
    <div className="bg-warm-50 min-h-screen">
      {showAdminBanner && (
        <div className="bg-gradient-to-r from-warm-700 via-warm-600 to-amber-600 text-white py-4 px-6 sticky top-0 z-10 shadow-lg">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <h1 className="text-2xl font-bold">👁️ Aperçu Portfolio Visiteur</h1>
            <span className="text-warm-100 text-sm">
              Ce que les visiteurs voient
            </span>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto p-6">
        <section className="bg-gradient-to-br from-warm-800 via-warm-700 to-amber-700 text-white rounded-2xl shadow-2xl p-12 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <h1 className="text-5xl font-bold mb-3">
                {profil?.fullName || "Portfolio"}
              </h1>
              <h2 className="text-2xl text-warm-100 mb-4">
                {profil?.title || "Professional Portfolio"}
              </h2>
              <p className="text-warm-50 text-lg leading-relaxed">
                {profil?.bio || "Welcome to my portfolio"}
              </p>

              {profil?.socialLinks &&
                Array.isArray(profil.socialLinks) &&
                profil.socialLinks.length > 0 && (
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

              {(!profil?.socialLinks ||
                !Array.isArray(profil.socialLinks) ||
                profil.socialLinks.length === 0) && (
                <div className="flex gap-3 mt-6">
                  {profil?.github && (
                    <a
                      href={profil.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-warm-900/50 hover:bg-warm-900 px-4 py-2 rounded-lg transition-all duration-200 text-sm font-medium"
                    >
                      GitHub
                    </a>
                  )}
                  {profil?.linkedin && (
                    <a
                      href={profil.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-warm-900/50 hover:bg-warm-900 px-4 py-2 rounded-lg transition-all duration-200 text-sm font-medium"
                    >
                      LinkedIn
                    </a>
                  )}
                  {profil?.website && (
                    <a
                      href={profil.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-warm-900/50 hover:bg-warm-900 px-4 py-2 rounded-lg transition-all duration-200 text-sm font-medium"
                    >
                      Website
                    </a>
                  )}
                </div>
              )}
            </div>

            {profil?.avatar && (
              <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-warm-300 shadow-xl">
                <img
                  src={profil.avatar}
                  alt={profil?.fullName || "Profile"}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </section>

        <section className="bg-white rounded-xl shadow-lg p-8 mb-8 border-l-4 border-warm-600">
          <h2 className="text-3xl font-bold text-warm-900 mb-4 flex items-center gap-3">
            <span className="text-warm-600">📋</span>À Propos
          </h2>
          <p className="text-gray-700 leading-relaxed text-lg">
            {profil?.bio || "Welcome to my portfolio"}
          </p>

          <div className="mt-6 flex flex-wrap gap-6 text-sm text-gray-600">
            {profil?.email && (
              <div className="flex items-center gap-2">
                <span className="text-warm-600">📧</span>
                <a
                  href={`mailto:${profil.email}`}
                  className="hover:text-warm-700 font-medium"
                >
                  {profil.email}
                </a>
              </div>
            )}
            {profil?.phone && (
              <div className="flex items-center gap-2">
                <span className="text-warm-600">📞</span>
                <span>{profil.phone}</span>
              </div>
            )}
            {profil?.city && profil?.country && (
              <div className="flex items-center gap-2">
                <span className="text-warm-600">📍</span>
                <span>
                  {profil.city}, {profil.country}
                </span>
              </div>
            )}
          </div>
        </section>

        <section className="bg-white rounded-xl shadow-lg p-8 mb-8 border-l-4 border-amber-600">
          <h2 className="text-3xl font-bold text-warm-900 mb-6 flex items-center gap-3">
            <span className="text-amber-600">🎯</span>
            Compétences
          </h2>

          {competences.length === 0 ? (
            <p className="text-gray-600">
              Aucune compétence listée pour le moment.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(
                competences.reduce((acc, comp) => {
                  const category = comp.category || "other";
                  if (!acc[category]) acc[category] = [];
                  acc[category].push(comp);
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
                        {comp.level && (
                          <span className="text-xs px-2 py-1 rounded-full bg-warm-200 text-warm-800">
                            {comp.level}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="bg-white rounded-xl shadow-lg p-8 mb-8 border-l-4 border-warm-700">
          <h2 className="text-3xl font-bold text-warm-900 mb-6 flex items-center gap-3">
            <span className="text-warm-700">💼</span>
            Mes Projets
          </h2>

          {projets.length === 0 ? (
            <p className="text-gray-600">
              Aucun projet disponible pour le moment.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projets.map((projet) => (
                <div
                  key={projet.id}
                  className="bg-gradient-to-br from-warm-50 to-amber-50 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-warm-200"
                >
                  {projet.image ? (
                    <img
                      src={projet.image}
                      alt={projet.title}
                      className="w-full h-48 object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "https://via.placeholder.com/400x300/92400E/FFFFFF?text=" +
                          encodeURIComponent(projet.title || "Project");
                      }}
                    />
                  ) : (
                    <div className="w-full h-48 bg-gradient-to-br from-warm-700 to-amber-700 flex items-center justify-center">
                      <span className="text-white text-2xl font-bold">
                        {projet.title?.substring(0, 2).toUpperCase() || "PR"}
                      </span>
                    </div>
                  )}
                  <div className="p-5">
                    <h3 className="text-xl font-bold text-warm-900 mb-2">
                      {projet.title || "Untitled Project"}
                    </h3>
                    <p className="text-gray-600 mb-3 line-clamp-2">
                      {projet.description || "No description"}
                    </p>

                    {projet.technologies &&
                      Array.isArray(projet.technologies) &&
                      projet.technologies.length > 0 && (
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

                    <div className="flex gap-3">
                      {projet.demoUrl && (
                        <a
                          href={projet.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-warm-700 hover:text-warm-900 font-medium text-sm"
                        >
                          Demo →
                        </a>
                      )}
                      {projet.githubUrl && (
                        <a
                          href={projet.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-warm-700 hover:text-warm-900 font-medium text-sm"
                        >
                          Code →
                        </a>
                      )}
                      {projet.link && (
                        <a
                          href={projet.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-warm-700 hover:text-warm-900 font-medium text-sm"
                        >
                          Voir le projet →
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="bg-white rounded-xl shadow-lg p-8 mb-8 border-l-4 border-amber-700">
          <h2 className="text-3xl font-bold text-warm-900 mb-6 flex items-center gap-3">
            <span className="text-amber-700">🏢</span>
            Expériences Professionnelles
          </h2>

          {experiences.length === 0 ? (
            <p className="text-gray-600">
              Aucune expérience listée pour le moment.
            </p>
          ) : (
            <div className="space-y-6">
              {experiences.map((exp) => (
                <div
                  key={exp.id}
                  className="bg-warm-50 rounded-lg p-6 border-l-4 border-warm-600 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-warm-900">
                        {exp.position || "Position"}
                      </h3>
                      <p className="text-warm-700 font-medium">
                        {exp.company || "Company"}
                      </p>
                    </div>
                    {exp.employmentType && (
                      <span className="text-sm px-3 py-1 bg-warm-200 text-warm-800 rounded-full">
                        {exp.employmentType}
                      </span>
                    )}
                  </div>

                  <p className="text-gray-600 text-sm mb-2">
                    {exp.startDate
                      ? new Date(parseInt(exp.startDate)).toLocaleDateString(
                          "fr-FR",
                          {
                            month: "long",
                            year: "numeric",
                          }
                        )
                      : "Date de début"}
                    {" - "}
                    {exp.isCurrent
                      ? "Présent"
                      : exp.endDate
                      ? new Date(parseInt(exp.endDate)).toLocaleDateString(
                          "fr-FR",
                          {
                            month: "long",
                            year: "numeric",
                          }
                        )
                      : "Date de fin"}
                  </p>

                  <p className="text-gray-700 leading-relaxed">
                    {exp.description || "No description"}
                  </p>

                  {exp.location && (
                    <p className="text-gray-500 text-sm mt-2">
                      📍 {exp.location}
                    </p>
                  )}

                  {exp.technologies &&
                    Array.isArray(exp.technologies) &&
                    exp.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {exp.technologies.map((tech, idx) => (
                          <span
                            key={idx}
                            className="text-xs px-2 py-1 bg-warm-200 text-warm-800 rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="bg-white rounded-xl shadow-lg p-8 mb-8 border-l-4 border-warm-500">
          <h2 className="text-3xl font-bold text-warm-900 mb-6 flex items-center gap-3">
            <span className="text-warm-500">🎓</span>
            Éducations
          </h2>

          {educations.length === 0 ? (
            <p className="text-gray-600">
              Aucune formation listée pour le moment.
            </p>
          ) : (
            <div className="space-y-6">
              {educations.map((edu) => (
                <div
                  key={edu.id}
                  className="bg-warm-50 rounded-lg p-6 border-l-4 border-warm-500 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-warm-900">
                        {edu.degree || "Degree"}
                      </h3>
                      <p className="text-warm-700 font-medium">
                        {edu.institution || "Institution"}
                      </p>
                      {edu.fieldOfStudy && (
                        <p className="text-gray-600">{edu.fieldOfStudy}</p>
                      )}
                    </div>
                    <span className="text-sm text-gray-500">
                      {edu.startDate
                        ? new Date(parseInt(edu.startDate)).getFullYear()
                        : ""}
                      {" - "}
                      {edu.isCurrent
                        ? "Présent"
                        : edu.endDate
                        ? new Date(parseInt(edu.endDate)).getFullYear()
                        : ""}
                    </span>
                  </div>

                  {edu.description && (
                    <p className="text-gray-700 leading-relaxed">
                      {edu.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>

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
                  href={`mailto:${profil?.email || "contact@example.com"}`}
                  className="text-white font-medium hover:text-warm-200"
                >
                  {profil?.email || "contact@example.com"}
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
                    href={`tel:${profil.phone}`}
                    className="text-white font-medium hover:text-warm-200"
                  >
                    {profil.phone}
                  </a>
                </div>
              </div>
            )}
          </div>

          {!showAdminBanner && (
            <div className="mt-8 text-center">
              <Link
                to="/login"
                className="inline-block bg-warm-900/50 hover:bg-warm-900 px-6 py-3 rounded-lg transition-all duration-200 text-sm font-medium"
              >
                🔐 Admin Login
              </Link>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
