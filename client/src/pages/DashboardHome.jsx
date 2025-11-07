import { useQuery } from "@apollo/client";
import { 
  GET_MY_PROFIL, 
  GET_PROJETS, 
  GET_EXPERIENCES, 
  GET_COMPETENCES, 
  GET_EDUCATIONS 
} from "../graphql/queries";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import { Link } from "react-router-dom";

export default function DashboardHome() {
  const { data: profilData, loading: profilLoading } = useQuery(GET_MY_PROFIL);
  const { data: projetsData, loading: projetsLoading } = useQuery(GET_PROJETS);
  const { data: experiencesData, loading: experiencesLoading } = useQuery(GET_EXPERIENCES);
  const { data: competencesData, loading: competencesLoading } = useQuery(GET_COMPETENCES);
  const { data: educationsData, loading: educationsLoading } = useQuery(GET_EDUCATIONS);

  const loading = profilLoading || projetsLoading || experiencesLoading || competencesLoading || educationsLoading;

  const profil = profilData?.getMyProfil;
  const projets = projetsData?.getProjets || [];
  const experiences = experiencesData?.getExperiences || [];
  const competences = competencesData?.getCompetences || [];
  const educations = educationsData?.getEducations || [];

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl shadow-lg p-8 text-white">
        <h1 className="text-4xl font-bold mb-2">
          Bienvenue, {profil?.fullName || "Admin"} 👋
        </h1>
        <p className="text-blue-100 text-lg">
          {profil?.title || "Gérez votre portfolio professionnel"}
        </p>
        {profil?.email && (
          <p className="text-blue-200 mt-2 flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            {profil.email}
          </p>
        )}
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Projects Card */}
        <Link to="/admin/projets" className="block">
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium uppercase tracking-wide">Projets</p>
                <p className="text-4xl font-bold text-gray-800 mt-2">
                  {projets.length}
                </p>
                <p className="text-gray-500 text-xs mt-1">
                  {projets.filter(p => p.featured).length} en vedette
                </p>
              </div>
              <div className="bg-blue-100 rounded-full p-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
            </div>
          </div>
        </Link>

        {/* Experiences Card */}
        <Link to="/admin/experiences" className="block">
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium uppercase tracking-wide">Expériences</p>
                <p className="text-4xl font-bold text-gray-800 mt-2">
                  {experiences.length}
                </p>
                <p className="text-gray-500 text-xs mt-1">
                  {experiences.filter(e => e.isCurrent).length} en cours
                </p>
              </div>
              <div className="bg-green-100 rounded-full p-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>
        </Link>

        {/* Competences Card */}
        <Link to="/admin/competences" className="block">
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow border-l-4 border-yellow-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium uppercase tracking-wide">Compétences</p>
                <p className="text-4xl font-bold text-gray-800 mt-2">
                  {competences.length}
                </p>
                <p className="text-gray-500 text-xs mt-1">
                  {competences.filter(c => c.level === 'expert').length} expert
                </p>
              </div>
              <div className="bg-yellow-100 rounded-full p-4">
                <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
            </div>
          </div>
        </Link>

        {/* Educations Card */}
        <Link to="/admin/educations" className="block">
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium uppercase tracking-wide">Formations</p>
                <p className="text-4xl font-bold text-gray-800 mt-2">
                  {educations.length}
                </p>
                <p className="text-gray-500 text-xs mt-1">
                  {educations.filter(e => e.isCurrent).length} en cours
                </p>
              </div>
              <div className="bg-purple-100 rounded-full p-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
            </div>
          </div>
        </Link>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Projects */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-800">Projets récents</h3>
            <Link to="/admin/projets" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              Voir tout →
            </Link>
          </div>
          {projets.length === 0 ? (
            <p className="text-gray-500 text-center py-8">Aucun projet</p>
          ) : (
            <div className="space-y-3">
              {projets.slice(0, 3).map((projet) => (
                <div key={projet.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800">{projet.title}</h4>
                    <p className="text-sm text-gray-600 truncate">{projet.description}</p>
                    {projet.featured && (
                      <span className="inline-block mt-1 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">⭐ En vedette</span>
                    )}
                  </div>
                  <Link to="/admin/projets" className="ml-4 text-blue-600 hover:text-blue-800">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Experiences */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-800">Expériences récentes</h3>
            <Link to="/admin/experiences" className="text-green-600 hover:text-green-800 text-sm font-medium">
              Voir tout →
            </Link>
          </div>
          {experiences.length === 0 ? (
            <p className="text-gray-500 text-center py-8">Aucune expérience</p>
          ) : (
            <div className="space-y-3">
              {experiences.slice(0, 3).map((exp) => (
                <div key={exp.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800">{exp.position}</h4>
                    <p className="text-sm text-gray-600">{exp.company}</p>
                    {exp.isCurrent && (
                      <span className="inline-block mt-1 text-xs bg-green-100 text-green-800 px-2 py-1 rounded">En cours</span>
                    )}
                  </div>
                  <Link to="/admin/experiences" className="ml-4 text-green-600 hover:text-green-800">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-6">Actions rapides</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            to="/admin/projets"
            className="flex items-center justify-center bg-blue-600 text-white px-6 py-4 rounded-lg hover:bg-blue-700 transition font-medium shadow-md hover:shadow-lg"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Nouveau projet
          </Link>
          <Link
            to="/admin/experiences"
            className="flex items-center justify-center bg-green-600 text-white px-6 py-4 rounded-lg hover:bg-green-700 transition font-medium shadow-md hover:shadow-lg"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Nouvelle expérience
          </Link>
          <Link
            to="/admin/competences"
            className="flex items-center justify-center bg-yellow-600 text-white px-6 py-4 rounded-lg hover:bg-yellow-700 transition font-medium shadow-md hover:shadow-lg"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Nouvelle compétence
          </Link>
          <Link
            to="/admin/profil"
            className="flex items-center justify-center bg-purple-600 text-white px-6 py-4 rounded-lg hover:bg-purple-700 transition font-medium shadow-md hover:shadow-lg"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Modifier profil
          </Link>
        </div>
      </div>
    </div>
  );
}
