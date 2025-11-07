import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_MY_PROFIL } from "../../graphql/queries";
import { UPDATE_PROFIL } from "../../graphql/mutations";

export default function ProfilManagement() {
  const { data, loading, error, refetch } = useQuery(GET_MY_PROFIL);
  const [updateProfil] = useMutation(UPDATE_PROFIL);
  const [isEditing, setIsEditing] = useState(false);
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    title: "",
    bio: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    avatar: "",
    linkedin: "",
    github: "",
    website: "",
    resume: "",
  });

  useEffect(() => {
    if (data?.getMyProfil) {
      setFormData({
        fullName: data.getMyProfil.fullName || "",
        title: data.getMyProfil.title || "",
        bio: data.getMyProfil.bio || "",
        email: data.getMyProfil.email || "",
        phone: data.getMyProfil.phone || "",
        address: data.getMyProfil.address || "",
        city: data.getMyProfil.city || "",
        postalCode: data.getMyProfil.postalCode || "",
        country: data.getMyProfil.country || "",
        avatar: data.getMyProfil.avatar || "",
        linkedin: data.getMyProfil.linkedin || "",
        github: data.getMyProfil.github || "",
        website: data.getMyProfil.website || "",
        resume: data.getMyProfil.resume || "",
      });
    }
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    try {
      await updateProfil({
        variables: { id: data.getMyProfil.id, input: formData },
      });
      setSuccess(" Profil mis à jour avec succès!");
      setIsEditing(false);
      refetch();
    } catch (err) {
      console.error("Erreur mise à jour profil:", err);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center p-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  if (error && !error.message.includes("Profil not found")) {
    return <div className="text-red-600 p-4">Erreur: {error.message}</div>;
  }

  const profil = data?.getMyProfil;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Mon Profil</h1>
          <p className="text-gray-600 mt-1">
            Gérez vos informations personnelles
          </p>
        </div>
        {profil && (
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            {isEditing ? " Annuler" : " Modifier"}
          </button>
        )}
      </div>

      {success && (
        <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
          <p className="text-green-700 font-medium">{success}</p>
        </div>
      )}

      {!profil ? (
        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
          <p className="text-yellow-700">
            {" "}
            Aucun profil trouvé. Exécutez:{" "}
            <code className="bg-yellow-100 px-2 py-1 rounded">
              node seed-profil.js
            </code>
          </p>
        </div>
      ) : isEditing ? (
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-md p-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Nom complet *
              </label>
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="John Doe"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Titre Professionnel *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Développeur Full Stack"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Biographie *
              </label>
              <textarea
                rows={4}
                required
                value={formData.bio}
                onChange={(e) =>
                  setFormData({ ...formData, bio: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Parlez de vous..."
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="email@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Téléphone
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="+212 6 00 00 00 00"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Adresse
              </label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Rue, Quartier"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Ville
              </label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) =>
                  setFormData({ ...formData, city: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Casablanca"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Code Postal
              </label>
              <input
                type="text"
                value={formData.postalCode}
                onChange={(e) =>
                  setFormData({ ...formData, postalCode: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="20000"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Pays
              </label>
              <input
                type="text"
                value={formData.country}
                onChange={(e) =>
                  setFormData({ ...formData, country: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Maroc"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                URL Avatar
              </label>
              <input
                type="url"
                value={formData.avatar}
                onChange={(e) =>
                  setFormData({ ...formData, avatar: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="https://example.com/photo.jpg"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                LinkedIn
              </label>
              <input
                type="url"
                value={formData.linkedin}
                onChange={(e) =>
                  setFormData({ ...formData, linkedin: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="https://linkedin.com/in/..."
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                GitHub
              </label>
              <input
                type="url"
                value={formData.github}
                onChange={(e) =>
                  setFormData({ ...formData, github: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="https://github.com/..."
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Site Web
              </label>
              <input
                type="url"
                value={formData.website}
                onChange={(e) =>
                  setFormData({ ...formData, website: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="https://monsite.com"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                CV / Resume (URL)
              </label>
              <input
                type="url"
                value={formData.resume}
                onChange={(e) =>
                  setFormData({ ...formData, resume: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="https://drive.google.com/file/..."
              />
            </div>
          </div>
          <div className="mt-8 flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {" "}
              Enregistrer
            </button>
          </div>
        </form>
      ) : (
        <div className="bg-white rounded-xl shadow-md p-8">
          <div className="flex items-start space-x-8">
            <div className="flex-shrink-0">
              <img
                src={profil?.avatar || "https://via.placeholder.com/200"}
                alt={profil?.fullName}
                className="w-32 h-32 rounded-full object-cover border-4 border-blue-200"
              />
            </div>
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase">
                  Nom Complet
                </h3>
                <p className="text-lg font-bold text-gray-800 mt-1">
                  {profil?.fullName}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase">
                  Titre
                </h3>
                <p className="text-lg text-gray-800 mt-1">{profil?.title}</p>
              </div>
              <div className="md:col-span-2">
                <h3 className="text-sm font-semibold text-gray-500 uppercase">
                  Biographie
                </h3>
                <p className="text-gray-700 mt-1">{profil?.bio}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase">
                  Email
                </h3>
                <p className="text-gray-800 mt-1">{profil?.email}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase">
                  Téléphone
                </h3>
                <p className="text-gray-800 mt-1">
                  {profil?.phone || "Non défini"}
                </p>
              </div>
              <div className="md:col-span-2">
                <h3 className="text-sm font-semibold text-gray-500 uppercase">
                  Adresse
                </h3>
                <p className="text-gray-800 mt-1">
                  {profil?.address && `${profil.address}, `}
                  {profil?.city && `${profil.city} `}
                  {profil?.postalCode && `${profil.postalCode}, `}
                  {profil?.country || "Non définie"}
                </p>
              </div>
              {profil?.resume && (
                <div className="md:col-span-2">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase">
                    CV
                  </h3>
                  <a
                    href={profil.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    {" "}
                    Télécharger
                  </a>
                </div>
              )}
              <div className="md:col-span-2">
                <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">
                  Réseaux Sociaux
                </h3>
                <div className="flex space-x-4">
                  {profil?.linkedin && (
                    <a
                      href={profil.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      LinkedIn
                    </a>
                  )}
                  {profil?.github && (
                    <a
                      href={profil.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-800 hover:text-black"
                    >
                      GitHub
                    </a>
                  )}
                  {profil?.website && (
                    <a
                      href={profil.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Website
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
