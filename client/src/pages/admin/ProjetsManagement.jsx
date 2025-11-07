import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_PROJETS } from "../../graphql/queries";
import {
  CREATE_PROJET,
  UPDATE_PROJET,
  DELETE_PROJET,
} from "../../graphql/mutations";

export default function ProjetsManagement() {
  const { data, loading, error, refetch } = useQuery(GET_PROJETS, {
    onCompleted: (data) => {
      console.log("✅ GET_PROJETS query completed");
      console.log("📊 Data received:", data);
      console.log("📝 Projets count:", data?.getProjets?.length || 0);
      console.log("📋 Projets:", data?.getProjets);
    },
    onError: (error) => {
      console.error("❌ GET_PROJETS query error:");
      console.error("Error message:", error.message);
      console.error("GraphQL errors:", error.graphQLErrors);
      console.error("Network error:", error.networkError);
      console.error("Full error:", error);
    },
  });

  const [createProjet] = useMutation(CREATE_PROJET, {
    onCompleted: (data) => {
      console.log("✅ Projet created:", data);
    },
    onError: (error) => {
      console.error("❌ Create projet error:", error);
      alert(`Erreur création: ${error.message}`);
    },
  });
  const [updateProjet] = useMutation(UPDATE_PROJET);
  const [deleteProjet] = useMutation(DELETE_PROJET);

  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    technologies: "",
    startDate: "",
    endDate: "",
    githubUrl: "",
    demoUrl: "",
    image: "",
    category: "web",
    status: "in_progress",
    featured: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const input = {
        title: form.title,
        description: form.description,
        technologies: form.technologies
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        startDate: form.startDate,
        endDate: form.endDate,
        githubUrl: form.githubUrl,
        demoUrl: form.demoUrl,
        image: form.image,
        category: form.category,
        status: form.status,
        featured: form.featured,
      };

      if (editing) {
        await updateProjet({ variables: { id: editing.id, input } });
      } else {
        await createProjet({ variables: { input } });
      }
      refetch();
      setShowModal(false);
      setEditing(null);
      setForm({
        title: "",
        description: "",
        technologies: "",
        startDate: "",
        endDate: "",
        githubUrl: "",
        demoUrl: "",
        image: "",
        category: "web",
        status: "in_progress",
        featured: false,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (projet) => {
    setEditing(projet);
    setForm({
      title: projet.title || "",
      description: projet.description || "",
      technologies: projet.technologies?.join(", ") || "",
      startDate: projet.startDate || "",
      endDate: projet.endDate || "",
      githubUrl: projet.githubUrl || "",
      demoUrl: projet.demoUrl || "",
      image: projet.image || "",
      category: projet.category || "web",
      status: projet.status || "in_progress",
      featured: projet.featured || false,
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce projet ?")) {
      try {
        await deleteProjet({ variables: { id } });
        refetch();
      } catch (err) {
        console.error(err);
      }
    }
  };

  console.log(
    "🔍 ProjetsManagement render - loading:",
    loading,
    "error:",
    error,
    "data:",
    data
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center p-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <p className="ml-4 text-gray-600">Chargement des projets...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center p-12">
        <div className="text-red-600 text-xl mb-4">❌ Erreur de chargement</div>
        <p className="text-gray-600 mb-2">{error.message}</p>
        <button
          onClick={() => refetch()}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Réessayer
        </button>
        <details className="mt-4 text-sm text-gray-500">
          <summary className="cursor-pointer">Détails techniques</summary>
          <pre className="mt-2 p-4 bg-gray-100 rounded overflow-auto max-w-2xl">
            {JSON.stringify(error, null, 2)}
          </pre>
        </details>
      </div>
    );
  }

  const projets = data?.getProjets || [];
  console.log("📊 Final projets to display:", projets);

  const statusLabels = {
    completed: "✅ Terminé",
    in_progress: "🔄 En cours",
    planned: "📋 Planifié",
  };

  const categoryLabels = {
    web: "🌐 Web",
    mobile: "📱 Mobile",
    desktop: "💻 Desktop",
    backend: "⚙️ Backend",
    fullstack: "🚀 Full Stack",
    other: "📦 Autre",
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Mes Projets ({projets.length})
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {loading
              ? "Chargement..."
              : error
              ? "Erreur de chargement"
              : `${projets.length} projet(s) trouvé(s)`}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => {
              console.log("🔄 Manual refetch triggered");
              refetch();
            }}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 font-semibold shadow-md transition"
            title="Rafraîchir les données"
          >
            🔄 Actualiser
          </button>
          <button
            onClick={() => {
              setShowModal(true);
              setEditing(null);
              setForm({
                title: "",
                description: "",
                technologies: "",
                startDate: "",
                endDate: "",
                githubUrl: "",
                demoUrl: "",
                image: "",
                category: "web",
                status: "in_progress",
                featured: false,
              });
            }}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold shadow-md transition"
          >
            🚀 Nouveau Projet
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {projets.map((projet) => (
          <div
            key={projet.id}
            className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-600 hover:shadow-lg transition"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <span className="text-3xl">💼</span>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">
                      {projet.title}
                    </h3>
                    {projet.featured && (
                      <span className="inline-block px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-bold rounded mt-1">
                        ⭐ Projet vedette
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center flex-wrap gap-3 text-sm text-gray-600 mb-3">
                  <span className="flex items-center px-2 py-1 bg-gray-100 rounded">
                    {categoryLabels[projet.category] || projet.category}
                  </span>
                  <span className="flex items-center px-2 py-1 bg-gray-100 rounded">
                    {statusLabels[projet.status] || projet.status}
                  </span>
                  {projet.startDate && (
                    <span className="flex items-center">
                      📅{" "}
                      {new Date(projet.startDate).toLocaleDateString("fr-FR", {
                        month: "short",
                        year: "numeric",
                      })}{" "}
                      -{" "}
                      {projet.endDate
                        ? new Date(projet.endDate).toLocaleDateString("fr-FR", {
                            month: "short",
                            year: "numeric",
                          })
                        : "En cours"}
                    </span>
                  )}
                </div>

                {projet.technologies && projet.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {projet.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                {projet.description && (
                  <p className="text-gray-700 mt-3 leading-relaxed mb-3">
                    {projet.description}
                  </p>
                )}

                <div className="flex gap-3 text-sm">
                  {projet.githubUrl && (
                    <a
                      href={projet.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      💻 GitHub
                    </a>
                  )}
                  {projet.demoUrl && (
                    <a
                      href={projet.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      🌐 Démo
                    </a>
                  )}
                </div>
              </div>

              <div className="flex flex-col space-y-2 ml-4">
                <button
                  onClick={() => handleEdit(projet)}
                  className="px-4 py-2.5 bg-blue-600 text-white hover:bg-blue-700 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 whitespace-nowrap shadow-md hover:shadow-lg"
                >
                  <span>✏️</span>
                  <span>Modifier</span>
                </button>
                <button
                  onClick={() => handleDelete(projet.id)}
                  className="px-4 py-2.5 bg-red-600 text-white hover:bg-red-700 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 whitespace-nowrap shadow-md hover:shadow-lg"
                >
                  <span>🗑️</span>
                  <span>Supprimer</span>
                </button>
              </div>
            </div>
          </div>
        ))}

        {projets.length === 0 && (
          <div className="text-center py-12 bg-gray-50 rounded-xl">
            <p className="text-gray-500 text-lg">
              Aucun projet ajouté pour le moment
            </p>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4 flex justify-between items-center rounded-t-xl sticky top-0">
              <h2 className="text-2xl font-bold">
                {editing ? "✏️ Modifier le Projet" : "🚀 Nouveau Projet"}
              </h2>
              <button
                onClick={() => {
                  setShowModal(false);
                  setEditing(null);
                }}
                className="text-white hover:text-gray-200 text-3xl font-bold"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Titre du projet *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.title}
                    onChange={(e) =>
                      setForm({ ...form, title: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Mon Super Projet"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Catégorie *
                  </label>
                  <select
                    required
                    value={form.category}
                    onChange={(e) =>
                      setForm({ ...form, category: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="web">🌐 Web</option>
                    <option value="mobile">📱 Mobile</option>
                    <option value="desktop">💻 Desktop</option>
                    <option value="backend">⚙️ Backend</option>
                    <option value="fullstack">🚀 Full Stack</option>
                    <option value="other">📦 Autre</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Statut *
                  </label>
                  <select
                    required
                    value={form.status}
                    onChange={(e) =>
                      setForm({ ...form, status: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="completed">✅ Terminé</option>
                    <option value="in_progress">🔄 En cours</option>
                    <option value="planned">📋 Planifié</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Date de début
                  </label>
                  <input
                    type="date"
                    value={form.startDate}
                    onChange={(e) =>
                      setForm({ ...form, startDate: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Date de fin
                  </label>
                  <input
                    type="date"
                    value={form.endDate}
                    onChange={(e) =>
                      setForm({ ...form, endDate: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Technologies (séparées par des virgules)
                  </label>
                  <input
                    type="text"
                    value={form.technologies}
                    onChange={(e) =>
                      setForm({ ...form, technologies: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="React, Node.js, MongoDB"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    URL GitHub
                  </label>
                  <input
                    type="url"
                    value={form.githubUrl}
                    onChange={(e) =>
                      setForm({ ...form, githubUrl: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://github.com/..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    URL Démo
                  </label>
                  <input
                    type="url"
                    value={form.demoUrl}
                    onChange={(e) =>
                      setForm({ ...form, demoUrl: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://demo.com"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    URL de l'image
                  </label>
                  <input
                    type="url"
                    value={form.image}
                    onChange={(e) =>
                      setForm({ ...form, image: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.featured}
                      onChange={(e) =>
                        setForm({ ...form, featured: e.target.checked })
                      }
                      className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-sm font-semibold text-gray-700">
                      ⭐ Projet vedette (mis en avant sur le portfolio)
                    </span>
                  </label>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    rows={4}
                    value={form.description}
                    onChange={(e) =>
                      setForm({ ...form, description: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Description détaillée du projet..."
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-4 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditing(null);
                  }}
                  className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-semibold transition"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold shadow-md transition"
                >
                  {editing ? "💾 Mettre à jour" : "➕ Créer"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
