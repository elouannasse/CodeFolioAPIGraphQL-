export default function ContactSection({ profil }) {
  return (
    <section className="py-20 bg-gray-50" id="contact">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">
          Me Contacter
        </h2>
        <p className="text-center text-gray-600 mb-12">
          N'hésitez pas à me contacter pour discuter de vos projets
        </p>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start">
                <svg
                  className="w-6 h-6 text-primary-600 mr-4 mt-1"
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
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Email</h3>
                  <a
                    href={`mailto:${profil.email}`}
                    className="text-primary-600 hover:text-primary-800"
                  >
                    {profil.email}
                  </a>
                </div>
              </div>

              {profil.phone && (
                <div className="flex items-start">
                  <svg
                    className="w-6 h-6 text-primary-600 mr-4 mt-1"
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
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">
                      Téléphone
                    </h3>
                    <a
                      href={`tel:${profil.phone}`}
                      className="text-primary-600 hover:text-primary-800"
                    >
                      {profil.phone}
                    </a>
                  </div>
                </div>
              )}

              {profil.location && (
                <div className="flex items-start">
                  <svg
                    className="w-6 h-6 text-primary-600 mr-4 mt-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">
                      Localisation
                    </h3>
                    <p className="text-gray-600">{profil.location}</p>
                  </div>
                </div>
              )}
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-4">
                Réseaux sociaux
              </h3>
              <div className="space-y-3">
                {profil.socials.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-gray-700 hover:text-primary-600 transition-colors"
                  >
                    <span className="text-2xl mr-3">🔗</span>
                    <span className="capitalize">{social.platform}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
