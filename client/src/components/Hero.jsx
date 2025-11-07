export default function Hero({ profil }) {
  const getSocialIcon = (platform) => {
    const icons = {
      github: "🐙",
      linkedin: "💼",
      twitter: "🐦",
      website: "🌐",
      instagram: "📷",
      facebook: "👥",
      youtube: "📺",
    };
    return icons[platform.toLowerCase()] || "🔗";
  };

  return (
    <section className="bg-gradient-to-br from-warm-800 via-warm-700 to-amber-700 text-white py-20 shadow-2xl">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto gap-8">
          <div className="md:w-2/3 mb-8 md:mb-0">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 drop-shadow-lg">
              {profil.fullName}
            </h1>
            <h2 className="text-2xl md:text-3xl font-light mb-6 text-warm-100">
              {profil.title}
            </h2>
            <p className="text-lg md:text-xl text-warm-50 mb-6 leading-relaxed">
              {profil.bio}
            </p>
            {profil.location && (
              <p className="text-warm-200 mb-6 flex items-center">
                <svg
                  className="w-5 h-5 mr-2"
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
                {profil.location}
              </p>
            )}
            <div className="flex space-x-4">
              {profil.socials.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-3xl hover:scale-110 transform transition-transform drop-shadow-lg bg-warm-900/30 p-3 rounded-full hover:bg-warm-900/50"
                  title={social.platform}
                >
                  {getSocialIcon(social.platform)}
                </a>
              ))}
            </div>
          </div>
          <div className="md:w-1/3 flex justify-center">
            {profil.avatar && (
              <img
                src={profil.avatar}
                alt={profil.fullName}
                className="w-64 h-64 rounded-full border-8 border-warm-300 shadow-2xl object-cover"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
