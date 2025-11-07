const mongoose = require("mongoose");

const MONGO_URI = "mongodb://127.0.0.1:27017/portfolio?authSource=admin";

// Définir le schéma Profil
const profilSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  fullName: String,
  title: String,
  bio: String,
  avatar: String,
  email: String,
  phone: String,
  address: String,
  city: String,
  postalCode: String,
  country: String,
  linkedin: String,
  github: String,
  website: String,
  resume: String,
  socials: [
    {
      platform: String,
      url: String,
      icon: String,
    },
  ],
  createdAt: Date,
  updatedAt: Date,
});

const Profil = mongoose.model("Profil", profilSchema);

async function checkProfils() {
  let connection = null;

  try {
    console.log("📡 Connexion à MongoDB...");
    await mongoose.connect(MONGO_URI);
    connection = mongoose.connection;

    console.log("✅ Connecté à la base de données portfolio\n");

    // Définir le schéma User
    const UserSchema = new mongoose.Schema({
      email: String,
      role: String,
    });
    const User = mongoose.model("User", UserSchema);

    // Récupérer tous les profils
    const profils = await Profil.find().populate("userId").lean();

    console.log(`📊 TOTAL DE PROFILS: ${profils.length}\n`);

    if (profils.length === 0) {
      console.log("⚠️  Aucun profil trouvé dans la base de données");
      console.log("💡 Exécutez: node seed-profil.js pour créer un profil\n");
      return;
    }

    // Afficher chaque profil
    profils.forEach((profil, index) => {
      console.log(`═══════════════════════════════════════════════════════`);
      console.log(`PROFIL #${index + 1}`);
      console.log(`═══════════════════════════════════════════════════════`);
      console.log(`ID:              ${profil._id}`);
      console.log(
        `User ID:         ${profil.userId?._id || profil.userId || "null"}`
      );
      console.log(`User Email:      ${profil.userId?.email || "N/A"}`);
      console.log(`User Role:       ${profil.userId?.role || "N/A"}`);
      console.log(`─────────────────────────────────────────────────────`);
      console.log(`Nom complet:     ${profil.fullName || "N/A"}`);
      console.log(`Titre:           ${profil.title || "N/A"}`);
      console.log(`Email:           ${profil.email || "N/A"}`);
      console.log(`Téléphone:       ${profil.phone || "N/A"}`);
      console.log(`─────────────────────────────────────────────────────`);
      console.log(`Adresse:         ${profil.address || "N/A"}`);
      console.log(`Ville:           ${profil.city || "N/A"}`);
      console.log(`Code Postal:     ${profil.postalCode || "N/A"}`);
      console.log(`Pays:            ${profil.country || "N/A"}`);
      console.log(`─────────────────────────────────────────────────────`);
      console.log(`LinkedIn:        ${profil.linkedin || "N/A"}`);
      console.log(`GitHub:          ${profil.github || "N/A"}`);
      console.log(`Website:         ${profil.website || "N/A"}`);
      console.log(`CV/Resume:       ${profil.resume || "N/A"}`);
      console.log(`─────────────────────────────────────────────────────`);

      if (profil.bio) {
        const shortBio =
          profil.bio.length > 100
            ? profil.bio.substring(0, 100) + "..."
            : profil.bio;
        console.log(`Bio:             ${shortBio}`);
      } else {
        console.log(`Bio:             N/A`);
      }

      if (profil.avatar) {
        console.log(`Avatar:          ${profil.avatar}`);
      }

      if (profil.socials && profil.socials.length > 0) {
        console.log(`─────────────────────────────────────────────────────`);
        console.log(`Réseaux sociaux: ${profil.socials.length} réseaux`);
        profil.socials.forEach((social, idx) => {
          console.log(`  ${idx + 1}. ${social.platform}: ${social.url}`);
        });
      }

      console.log(`─────────────────────────────────────────────────────`);
      console.log(`Créé le:         ${profil.createdAt}`);
      console.log(`Modifié le:      ${profil.updatedAt}`);
      console.log(`═══════════════════════════════════════════════════════\n`);
    });

    // Statistiques
    console.log("📈 STATISTIQUES");
    console.log("─────────────────────────────────────────────────────");
    const withUserId = profils.filter((p) => p.userId).length;
    const withoutUserId = profils.length - withUserId;
    const withEmail = profils.filter((p) => p.email).length;
    const withPhone = profils.filter((p) => p.phone).length;
    const withAddress = profils.filter((p) => p.address).length;
    const withLinkedIn = profils.filter((p) => p.linkedin).length;
    const withGitHub = profils.filter((p) => p.github).length;
    const withWebsite = profils.filter((p) => p.website).length;
    const withResume = profils.filter((p) => p.resume).length;

    console.log(`Profils avec userId:      ${withUserId}`);
    console.log(`Profils sans userId:      ${withoutUserId}`);
    console.log(`Profils avec email:       ${withEmail}`);
    console.log(`Profils avec téléphone:   ${withPhone}`);
    console.log(`Profils avec adresse:     ${withAddress}`);
    console.log(`Profils avec LinkedIn:    ${withLinkedIn}`);
    console.log(`Profils avec GitHub:      ${withGitHub}`);
    console.log(`Profils avec Website:     ${withWebsite}`);
    console.log(`Profils avec CV:          ${withResume}`);
    console.log("─────────────────────────────────────────────────────\n");
  } catch (error) {
    console.error("❌ Erreur lors de la vérification:", error.message);
    console.error(error);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.close();
      console.log("🔌 Connexion fermée");
    }
  }
}

// Exécuter la vérification
checkProfils();
