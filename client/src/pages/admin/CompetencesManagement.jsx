import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_COMPETENCES } from "../../graphql/queries";
import {
  CREATE_COMPETENCE,
  UPDATE_COMPETENCE,
  DELETE_COMPETENCE,
} from "../../graphql/mutations";

export default function CompetencesManagement() {
  const { data, loading, refetch } = useQuery(GET_COMPETENCES);
  const [createComp] = useMutation(CREATE_COMPETENCE);
  const [updateComp] = useMutation(UPDATE_COMPETENCE);
  const [deleteComp] = useMutation(DELETE_COMPETENCE);

  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    name: "",
    category: "programming_language",
    level: "intermediate",
    description: "",
    icon: "",
    yearsOfExperience: 0,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const input = {
      name: form.name,
      category: form.category,
      level: form.level,
      icon: form.icon,
      yearsOfExperience: parseInt(form.yearsOfExperience) || 0,
      description: form.description,
    };

    console.log("🚀 Envoi de la compétence:", input);

    try {
      if (editing) {
        await updateComp({ variables: { id: editing.id, input } });
      } else {
        await createComp({ variables: { input } });
      }
      refetch();
      setShowModal(false);
      setEditing(null);
      setForm({
        name: "",
        category: "programming_language",
        level: "intermediate",
        description: "",
        icon: "",
        yearsOfExperience: 0,
      });
    } catch (err) {
      console.error("❌ Erreur création compétence:", err);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center p-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );

  const competences = data?.getCompetences || [];
  const byCategory = competences.reduce((acc, c) => {
    const cat = c.category || "other";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(c);
    return acc;
  }, {});

  const categoryLabels = {
    programming_language: "Langages de programmation",
    framework: "Frameworks",
    database: "Bases de données",
    tool: "Outils",
    soft_skill: "Soft Skills",
    methodology: "Méthodologies",
    cloud: "Cloud",
    devops: "DevOps",
    design: "Design",
    other: "Autre",
  };

  const levelColor = (n) =>
    ({
      expert: "bg-green-100 text-green-800",
      advanced: "bg-blue-100 text-blue-800",
      intermediate: "bg-yellow-100 text-yellow-800",
      beginner: "bg-gray-100 text-gray-800",
    }[n] || "bg-gray-100 text-gray-800");

  const levelPct = (n) =>
    ({ expert: 100, advanced: 75, intermediate: 50, beginner: 25 }[n] || 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">
          Mes Compétences ({competences.length})
        </h1>
        <button
          onClick={() => {
            setShowModal(true);
            setEditing(null);
          }}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          ➕ Nouvelle Compétence
        </button>
      </div>

      <div className="space-y-6">
        {Object.entries(byCategory).map(([cat, comps]) => (
          <div key={cat} className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b border-blue-200">
              📌 {categoryLabels[cat] || cat}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {comps.map((c) => (
                <div
                  key={c.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center space-x-2">
                      {c.icon && <span className="text-2xl">{c.icon}</span>}
                      <h3 className="font-bold text-gray-800">{c.name}</h3>
                    </div>
                  </div>
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-xs font-semibold mb-2 ${levelColor(
                      c.level
                    )}`}
                  >
                    {c.level}
                  </span>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all"
                      style={{ width: `${levelPct(c.level)}%` }}
                    />
                  </div>
                  {c.description && (
                    <p className="text-gray-600 text-sm mb-3">
                      {c.description}
                    </p>
                  )}
                  {c.yearsOfExperience > 0 && (
                    <p className="text-gray-500 text-xs mb-3">
                      📅 {c.yearsOfExperience} an
                      {c.yearsOfExperience > 1 ? "s" : ""} d'expérience
                    </p>
                  )}
                  <div className="flex gap-2 pt-3 border-t border-gray-200">
                    <button
                      onClick={() => {
                        setEditing(c);
                        setForm({
                          name: c.name || "",
                          category: c.category || "programming_language",
                          level: c.level || "intermediate",
                          description: c.description || "",
                          icon: c.icon || "",
                          yearsOfExperience: c.yearsOfExperience || 0,
                        });
                        setShowModal(true);
                      }}
                      className="flex-1 px-3 py-2.5 bg-blue-600 text-white hover:bg-blue-700 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 text-sm shadow-md hover:shadow-lg"
                    >
                      <span>✏️</span>
                      <span>Modifier</span>
                    </button>
                    <button
                      onClick={async () => {
                        if (window.confirm("Supprimer cette compétence ?")) {
                          await deleteComp({ variables: { id: c.id } });
                          refetch();
                        }
                      }}
                      className="flex-1 px-3 py-2.5 bg-red-600 text-white hover:bg-red-700 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 text-sm shadow-md hover:shadow-lg"
                    >
                      <span>🗑️</span>
                      <span>Supprimer</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full">
            <div className="bg-white border-b px-6 py-4 flex justify-between items-center rounded-t-xl">
              <h2 className="text-2xl font-bold">
                {editing ? "✏️ Modifier" : "➕ Nouvelle"} Compétence
              </h2>
              <button
                onClick={() => {
                  setShowModal(false);
                  setEditing(null);
                }}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nom *
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="React.js, Node.js, MongoDB..."
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
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="programming_language">
                    Langage de programmation
                  </option>
                  <option value="framework">Framework</option>
                  <option value="database">Base de données</option>
                  <option value="tool">Outil</option>
                  <option value="soft_skill">Compétence comportementale</option>
                  <option value="methodology">Méthodologie</option>
                  <option value="cloud">Cloud</option>
                  <option value="devops">DevOps</option>
                  <option value="design">Design</option>
                  <option value="other">Autre</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Niveau *
                </label>
                <select
                  required
                  value={form.level}
                  onChange={(e) => setForm({ ...form, level: e.target.value })}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="beginner">Débutant (25%)</option>
                  <option value="intermediate">Intermédiaire (50%)</option>
                  <option value="advanced">Avancé (75%)</option>
                  <option value="expert">Expert (100%)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Années d'expérience
                </label>
                <input
                  type="number"
                  min="0"
                  max="50"
                  value={form.yearsOfExperience}
                  onChange={(e) =>
                    setForm({ ...form, yearsOfExperience: e.target.value })
                  }
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Icône (emoji)
                </label>
                <input
                  type="text"
                  value={form.icon}
                  maxLength={2}
                  onChange={(e) => setForm({ ...form, icon: e.target.value })}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="⚛️ 🔥 💻"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Brève description..."
                />
              </div>
              <div className="flex justify-end space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditing(null);
                  }}
                  className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
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
