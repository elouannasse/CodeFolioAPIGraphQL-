// interface ProfilsListProps {
  profils: Profil[];
}

export default function ProfilsList({ profils }: ProfilsListProps) {
  if (!profils || profils.length === 0) {
    return <p>No profils found.</p>;
  }

  return (
    <div className="grid">
      {profils.map((profil) => (
        <div key={profil.id} className="card">
          <h3>
            {profil.prenom} {profil.nom}
          </h3>
          <p>
            <strong>Email:</strong> {profil.email}
          </p>
          {profil.description && <p>{profil.description}</p>}
          {profil.telephoneMobile && (
            <p>
              <strong>Mobile:</strong> {profil.telephoneMobile}
            </p>
          )}
          {profil.siteWeb && (
            <p>
              <strong>Website:</strong>{" "}
              <a href={profil.siteWeb}>{profil.siteWeb}</a>
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
