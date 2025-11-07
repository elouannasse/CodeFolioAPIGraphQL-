import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_EXPERIENCES } from "../../graphql/queries";
import {
  CREATE_EXPERIENCE,
  UPDATE_EXPERIENCE,
  DELETE_EXPERIENCE,
} from "../../graphql/mutations";

export default function ExperiencesManagement() {
  const { data, loading, refetch } = useQuery(GET_EXPERIENCES);
  const [createExp] = useMutation(CREATE_EXPERIENCE);
  const [updateExp] = useMutation(UPDATE_EXPERIENCE);
  const [deleteExp] = useMutation(DELETE_EXPERIENCE);

  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    position: "",
    company: "",
    location: "",
    startDate: "",
    endDate: "",
    description: "",
    technologies: "",
    employmentType: "full_time",
    isCurrent: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const input = {
      position: form.position,
      company: form.company,
      location: form.location,
      startDate: form.startDate,
      endDate: form.endDate,
      description: form.description,
      technologies: form.technologies
        .split(",")
        .map((c) => c.trim())
        .filter(Boolean),
      employmentType: form.employmentType,
      isCurrent: form.isCurrent,
    };

    console.log("🚀 Envoi de l'expérience:", input);

    try {
      if (editing) {
        await updateExp({ variables: { id: editing.id, input } });
      } else {
        await createExp({ variables: { input } });
      }
      refetch();
      setShowModal(false);
      setEditing(null);
      setForm({
        position: "",
        company: "",
        location: "",
        startDate: "",
        endDate: "",
        description: "",
        technologies: "",
        employmentType: "full_time",
        isCurrent: false,
      });
    } catch (err) {
      console.error("❌ Erreur création expérience:", err);
    }
  };

  const handleEdit = (e) => {
    setEditing(e);
    setForm({
      position: e.position || "",
      company: e.company || "",
      location: e.location || "",
      startDate: e.startDate || "",
      endDate: e.endDate || "",
      description: e.description || "",
      technologies: e.technologies?.join(", ") || "",
      employmentType: e.employmentType || "full_time",
      isCurrent: e.isCurrent || false,
    });
    setShowModal(true);
  };

  if (loading)
    return (
      <div className="flex justify-center p-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );

  const experiences = data?.getExperiences || [];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">
          Mes Expériences ({experiences.length})
        </h1>
        <button
          onClick={() => {
            setShowModal(true);
            setEditing(null);
          }}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          ➕ Nouvelle Expérience
        </button>
      </div>

      <div className="space-y-4">
        {experiences.map((e) => (
          <div
            key={e.id}
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-xl font-bold text-gray-800">
                    {e.position}
                  </h3>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-semibold">
                    {e.employmentType?.replace("_", " ")}
                  </span>
                  {e.isCurrent && (
                    <span className="px-3 py-1 bg-green-100 text-green-800 text-xs rounded-full font-semibold">
                      ⚡ En cours
                    </span>
                  )}
                </div>
                <p className="text-lg text-gray-700 font-medium">{e.company}</p>
                {e.location && <p className="text-gray-600">📍 {e.location}</p>}
                <p className="text-gray-500 text-sm mt-1">
                  📅 {e.startDate} - {e.isCurrent ? "Aujourd'hui" : e.endDate}
                </p>
                {e.description && (
                  <p className="text-gray-600 mt-3">{e.description}</p>
                )}
                {e.technologies && e.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {e.technologies.map((c, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-md"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex flex-col space-y-2 ml-4">
                <button
                  onClick={() => handleEdit(e)}
                  className="px-4 py-2.5 bg-blue-600 text-white hover:bg-blue-700 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 whitespace-nowrap shadow-md hover:shadow-lg"
                >
                  <span>✏️</span>
                  <span>Modifier</span>
                </button>
                <button
                  onClick={async () => {
                    if (window.confirm("Supprimer cette expérience ?")) {
                      await deleteExp({ variables: { id: e.id } });
                      refetch();
                    }
                  }}
                  className="px-4 py-2.5 bg-red-600 text-white hover:bg-red-700 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 whitespace-nowrap shadow-md hover:shadow-lg"
                >
                  <span>🗑️</span>
                  <span>Supprimer</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold">
                {editing ? "✏️ Modifier" : "➕ Nouvelle"} Expérience
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
                  Poste *
                </label>
                <input
                  type="text"
                  required
                  value={form.position}
                  onChange={(e) =>
                    setForm({ ...form, position: e.target.value })
                  }
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Développeur Full Stack"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Entreprise *
                </label>
                <input
                  type="text"
                  required
                  value={form.company}
                  onChange={(e) =>
                    setForm({ ...form, company: e.target.value })
                  }
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Google"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Lieu
                </label>
                <input
                  type="text"
                  value={form.location}
                  onChange={(e) =>
                    setForm({ ...form, location: e.target.value })
                  }
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Paris, France"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Date début *
                  </label>
                  <input
                    type="date"
                    required
                    value={form.startDate}
                    onChange={(e) =>
                      setForm({ ...form, startDate: e.target.value })
                    }
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Date fin
                  </label>
                  <input
                    type="date"
                    value={form.endDate}
                    disabled={form.isCurrent}
                    onChange={(e) =>
                      setForm({ ...form, endDate: e.target.value })
                    }
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                  />
                </div>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="actuel"
                  checked={form.isCurrent}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      isCurrent: e.target.checked,
                      endDate: "",
                    })
                  }
                  className="w-4 h-4 text-blue-600 rounded"
                />
                <label
                  htmlFor="actuel"
                  className="ml-2 text-sm font-medium text-gray-700"
                >
                  ⚡ Poste actuel
                </label>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Type d'emploi *
                </label>
                <select
                  value={form.employmentType}
                  onChange={(e) =>
                    setForm({ ...form, employmentType: e.target.value })
                  }
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="full_time">CDI / Temps plein</option>
                  <option value="part_time">Temps partiel</option>
                  <option value="contract">CDD / Contrat</option>
                  <option value="freelance">Freelance</option>
                  <option value="internship">Stage / Alternance</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  rows={4}
                  required
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Missions..."
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Technologies (séparées par virgules)
                </label>
                <input
                  type="text"
                  value={form.technologies}
                  onChange={(e) =>
                    setForm({ ...form, technologies: e.target.value })
                  }
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="React, Node.js, MongoDB"
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
