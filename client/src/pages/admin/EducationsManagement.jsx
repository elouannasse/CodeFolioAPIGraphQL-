import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_EDUCATIONS } from "../../graphql/queries";
import {
  CREATE_EDUCATION,
  UPDATE_EDUCATION,
  DELETE_EDUCATION,
} from "../../graphql/mutations";

export default function EducationsManagement() {
  const { data, loading, refetch } = useQuery(GET_EDUCATIONS);
  const [createEdu] = useMutation(CREATE_EDUCATION);
  const [updateEdu] = useMutation(UPDATE_EDUCATION);
  const [deleteEdu] = useMutation(DELETE_EDUCATION);

  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    degree: "",
    institution: "",
    location: "",
    startDate: "",
    endDate: "",
    description: "",
    fieldOfStudy: "",
    isCurrent: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await updateEdu({ variables: { id: editing.id, input: form } });
      } else {
        await createEdu({ variables: { input: form } });
      }
      refetch();
      setShowModal(false);
      setEditing(null);
      setForm({
        degree: "",
        institution: "",
        location: "",
        startDate: "",
        endDate: "",
        description: "",
        fieldOfStudy: "",
        isCurrent: false,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (edu) => {
    setEditing(edu);
    setForm({
      degree: edu.degree || "",
      institution: edu.institution || "",
      location: edu.location || "",
      startDate: edu.startDate || "",
      endDate: edu.endDate || "",
      description: edu.description || "",
      fieldOfStudy: edu.fieldOfStudy || "",
      isCurrent: edu.isCurrent || false,
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (
      window.confirm("Êtes-vous sûr de vouloir supprimer cette formation ?")
    ) {
      try {
        await deleteEdu({ variables: { id } });
        refetch();
      } catch (err) {
        console.error(err);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const educations = data?.getEducations || [];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">
          Mon Parcours Académique ({educations.length})
        </h1>
        <button
          onClick={() => {
            setShowModal(true);
            setEditing(null);
            setForm({
              degree: "",
              institution: "",
              location: "",
              startDate: "",
              endDate: "",
              description: "",
              fieldOfStudy: "",
              isCurrent: false,
            });
          }}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold shadow-md transition"
        >
          🎓 Nouvelle Formation
        </button>
      </div>

      <div className="space-y-4">
        {educations.map((edu) => (
          <div
            key={edu.id}
            className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-600 hover:shadow-lg transition"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <span className="text-3xl">🎓</span>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">
                      {edu.degree}
                    </h3>
                    <p className="text-blue-600 font-semibold">
                      {edu.institution}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                  {edu.location && (
                    <span className="flex items-center">📍 {edu.location}</span>
                  )}
                  <span className="flex items-center">
                    📅{" "}
                    {new Date(edu.startDate).toLocaleDateString("fr-FR", {
                      month: "short",
                      year: "numeric",
                    })}{" "}
                    -{" "}
                    {edu.endDate
                      ? new Date(edu.endDate).toLocaleDateString("fr-FR", {
                          month: "short",
                          year: "numeric",
                        })
                      : "En cours"}
                  </span>
                </div>

                {edu.fieldOfStudy && (
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold mb-2">
                    {edu.fieldOfStudy}
                  </span>
                )}

                {edu.description && (
                  <p className="text-gray-700 mt-3 leading-relaxed">
                    {edu.description}
                  </p>
                )}
              </div>

              <div className="flex flex-col space-y-2 ml-4">
                <button
                  onClick={() => handleEdit(edu)}
                  className="px-4 py-2.5 bg-blue-600 text-white hover:bg-blue-700 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 whitespace-nowrap shadow-md hover:shadow-lg"
                >
                  <span>✏️</span>
                  <span>Modifier</span>
                </button>
                <button
                  onClick={() => handleDelete(edu.id)}
                  className="px-4 py-2.5 bg-red-600 text-white hover:bg-red-700 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 whitespace-nowrap shadow-md hover:shadow-lg"
                >
                  <span>🗑️</span>
                  <span>Supprimer</span>
                </button>
              </div>
            </div>
          </div>
        ))}

        {educations.length === 0 && (
          <div className="text-center py-12 bg-gray-50 rounded-xl">
            <p className="text-gray-500 text-lg">
              Aucune formation ajoutée pour le moment
            </p>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4 flex justify-between items-center rounded-t-xl sticky top-0">
              <h2 className="text-2xl font-bold">
                {editing ? "✏️ Modifier la Formation" : "🎓 Nouvelle Formation"}
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
                    Diplôme / Titre *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.degree}
                    onChange={(e) =>
                      setForm({ ...form, degree: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Master en Informatique"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Établissement *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.institution}
                    onChange={(e) =>
                      setForm({ ...form, institution: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Université de Paris"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Domaine d'études
                  </label>
                  <input
                    type="text"
                    value={form.fieldOfStudy}
                    onChange={(e) =>
                      setForm({ ...form, fieldOfStudy: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Informatique, Génie Logiciel..."
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Paris, France"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Date de début *
                  </label>
                  <input
                    type="date"
                    required
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
                    disabled={form.isCurrent}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.isCurrent}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          isCurrent: e.target.checked,
                          endDate: e.target.checked ? "" : form.endDate,
                        })
                      }
                      className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-sm font-semibold text-gray-700">
                      Formation en cours
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
                    placeholder="Cours principaux, projets, réalisations..."
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
