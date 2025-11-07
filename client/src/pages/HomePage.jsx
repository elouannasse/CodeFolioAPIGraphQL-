import { useQuery } from "@apollo/client";
import { GET_PORTFOLIO } from "../graphql/queries";
import Hero from "../components/Hero";
import ProjectsSection from "../components/ProjectsSection";
import ExperiencesSection from "../components/ExperiencesSection";
import CompetencesSection from "../components/CompetencesSection";
import ContactSection from "../components/ContactSection";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";

export default function HomePage() {
  const { data, loading, error } = useQuery(GET_PORTFOLIO, {
    fetchPolicy: "network-only",
  });

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error.message} />;

  const portfolio = data?.getPortfolio;

  if (!portfolio) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Portfolio non trouvé
          </h2>
          <p className="text-gray-600">
            Aucune donnée de portfolio n'est disponible pour le moment.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Hero profil={portfolio.profil} />
      <ProjectsSection projets={portfolio.projets} />
      <ExperiencesSection experiences={portfolio.experiences} />
      <CompetencesSection competences={portfolio.competences} />
      <ContactSection profil={portfolio.profil} />
    </div>
  );
}
