const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");

const MONGO_URI = "mongodb://127.0.0.1:27017/portfolio?authSource=admin";

// Définir le schéma Profil (copié depuis profil.model.ts)
const profilSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  fullName: { type: String, required: true, trim: true },
  title: { type: String, trim: true },
  bio: { type: String, trim: true },
  avatar: { type: String, trim: true },
  email: { type: String, trim: true },
  phone: { type: String, trim: true },
  address: { type: String, trim: true },
  city: { type: String, trim: true },
  postalCode: { type: String, trim: true },
  country: { type: String, trim: true },
  linkedin: { type: String, trim: true },
  github: { type: String, trim: true },
  website: { type: String, trim: true },
  resume: { type: String, trim: true },
  socials: [
    {
      platform: { type: String, required: true, trim: true },
      url: { type: String, required: true, trim: true },
      icon: { type: String, trim: true },
    },
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Profil = mongoose.model("Profil", profilSchema);

// Données du profil admin
const adminProfil = {
  fullName: "Ahmed El Fassi",
  title: "Full Stack Developer & Software Architect",
  bio: "Développeur full-stack passionné avec plus de 5 ans d'expérience dans la conception et le développement d'applications web modernes. Expert en JavaScript/TypeScript, React, Node.js et MongoDB. J'aime créer des solutions élégantes et performantes qui résolvent de vrais problèmes. Toujours à la recherche de nouveaux défis techniques et de nouvelles technologies à maîtriser.",
  avatar: "https://i.pravatar.cc/300?img=12",
  email: "ahmed.elfassi@portfolio.com",
  phone: "+212 6 12 34 56 78",
  address: "123 Boulevard Hassan II",
  city: "Casablanca",
  postalCode: "20000",
  country: "Maroc",
  linkedin: "https://linkedin.com/in/ahmed-elfassi",
  github: "https://github.com/ahmed-elfassi",
  website: "https://ahmed-elfassi.dev",
  resume: "https://drive.google.com/file/d/example-cv-ahmed-elfassi/view",
  socials: [
    {
      platform: "Twitter",
      url: "https://twitter.com/ahmedelfassi",
      icon: "twitter",
    },
    {
      platform: "Stack Overflow",
      url: "https://stackoverflow.com/users/12345/ahmed",
      icon: "stackoverflow",
    },
  ],
};

async function seedProfil() {
  let connection = null;

  try {
    console.log("📡 Connexion à MongoDB...");
    await mongoose.connect(MONGO_URI);
    connection = mongoose.connection;

    console.log("✅ Connecté à la base de données portfolio\n");

    // 1. Trouver l'utilisateur admin
    const User = mongoose.model(
      "User",
      new mongoose.Schema({
        email: String,
        role: String,
      }),
      "users"
    );

    const adminUser = await User.findOne({ email: "admin@portfolio.com" });

    if (!adminUser) {
      console.log("❌ Utilisateur admin@portfolio.com non trouvé!");
      console.log("💡 Exécutez d'abord: node create-admin.js");
      process.exit(1);
    }

    console.log(
      `✅ Utilisateur admin trouvé: ${adminUser.email} (ID: ${adminUser._id})\n`
    );

    // 2. Vérifier si un profil existe déjà
    const existingProfil = await Profil.findOne({ userId: adminUser._id });

    if (existingProfil) {
      console.log("⚠️  Un profil existe déjà pour cet utilisateur");
      console.log(`   ID: ${existingProfil._id}`);
      console.log(`   Nom: ${existingProfil.fullName}`);
      console.log(`   Email: ${existingProfil.email}\n`);

      // Mettre à jour le profil existant
      console.log("🔄 Mise à jour du profil existant...");
      Object.assign(existingProfil, adminProfil);
      existingProfil.userId = adminUser._id;
      existingProfil.updatedAt = new Date();
      await existingProfil.save();
      console.log("✅ Profil mis à jour avec succès!\n");
    } else {
      // 3. Créer un nouveau profil
      console.log("➕ Création du profil admin...");
      const newProfil = new Profil({
        ...adminProfil,
        userId: adminUser._id,
      });

      await newProfil.save();
      console.log("✅ Profil créé avec succès!\n");
    }

    // 4. Afficher le résumé
    const profil = await Profil.findOne({ userId: adminUser._id });
    console.log("📋 RÉSUMÉ DU PROFIL");
    console.log("═══════════════════════════════════════════════════════");
    console.log(`   ID:           ${profil._id}`);
    console.log(`   User ID:      ${profil.userId}`);
    console.log(`   Nom complet:  ${profil.fullName}`);
    console.log(`   Titre:        ${profil.title}`);
    console.log(`   Email:        ${profil.email}`);
    console.log(`   Téléphone:    ${profil.phone}`);
    console.log(`   Adresse:      ${profil.address}`);
    console.log(`   Ville:        ${profil.city} ${profil.postalCode}`);
    console.log(`   Pays:         ${profil.country}`);
    console.log(`   LinkedIn:     ${profil.linkedin}`);
    console.log(`   GitHub:       ${profil.github}`);
    console.log(`   Website:      ${profil.website}`);
    console.log(`   CV:           ${profil.resume}`);
    console.log(`   Socials:      ${profil.socials.length} réseaux`);
    console.log(`   Créé le:      ${profil.createdAt}`);
    console.log(`   Modifié le:   ${profil.updatedAt}`);
    console.log("═══════════════════════════════════════════════════════\n");

    console.log("✨ Seeding du profil terminé avec succès!");
    console.log(
      "💡 Vous pouvez maintenant vous connecter et voir votre profil\n"
    );
  } catch (error) {
    console.error("❌ Erreur lors du seeding:", error.message);
    console.error(error);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.close();
      console.log("🔌 Connexion fermée");
    }
  }
}

// Exécuter le seeding
seedProfil();
