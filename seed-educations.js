/**
 * Script pour ajouter des éducations de test dans la base de données
 * Usage: node seed-educations.js
 */

const mongoose = require("mongoose");
require("dotenv").config();

const educationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  institution: { type: String, required: true },
  degree: { type: String, required: true },
  fieldOfStudy: { type: String, required: true },
  description: String,
  startDate: { type: Date, required: true },
  endDate: Date,
  isCurrent: { type: Boolean, default: false },
  grade: String,
  location: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Education = mongoose.model("Education", educationSchema);

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  role: String,
});

const User = mongoose.model("User", userSchema);

const sampleEducations = [
  {
    degree: "Doctorat en Informatique",
    fieldOfStudy: "Intelligence Artificielle et Apprentissage Automatique",
    institution: "Université Paris-Saclay",
    location: "Paris, France",
    description:
      "Recherche approfondie sur les réseaux de neurones profonds et leur application à la vision par ordinateur. Thèse sur l'optimisation des architectures CNN pour la classification d'images médicales.",
    startDate: new Date("2020-09-01"),
    endDate: new Date("2023-06-30"),
    isCurrent: false,
    grade: "Mention Très Honorable avec Félicitations du Jury",
  },
  {
    degree: "Master en Informatique",
    fieldOfStudy: "Génie Logiciel et Systèmes Distribués",
    institution: "École Polytechnique",
    location: "Palaiseau, France",
    description:
      "Formation avancée en architecture logicielle, systèmes distribués, cloud computing et DevOps. Projet de fin d'études sur la conception d'une plateforme microservices scalable.",
    startDate: new Date("2018-09-01"),
    endDate: new Date("2020-06-30"),
    isCurrent: false,
    grade: "17.5/20 - Mention Très Bien",
  },
  {
    degree: "Licence en Informatique",
    fieldOfStudy: "Informatique Fondamentale",
    institution: "Université de Technologie de Compiègne",
    location: "Compiègne, France",
    description:
      "Formation complète couvrant les fondamentaux de l'informatique : algorithmique, structures de données, programmation orientée objet, bases de données, réseaux et systèmes d'exploitation.",
    startDate: new Date("2015-09-01"),
    endDate: new Date("2018-06-30"),
    isCurrent: false,
    grade: "15.8/20 - Mention Bien",
  },
  {
    degree: "Certification AWS Solutions Architect",
    fieldOfStudy: "Cloud Computing et Architecture AWS",
    institution: "Amazon Web Services",
    location: "En ligne",
    description:
      "Certification professionnelle couvrant la conception d'architectures cloud sécurisées, scalables et résilientes sur AWS. Maîtrise des services EC2, S3, RDS, Lambda, CloudFront et IAM.",
    startDate: new Date("2023-01-15"),
    endDate: new Date("2023-03-20"),
    isCurrent: false,
    grade: "Score: 890/1000",
  },
];

async function seedEducations() {
  try {
    // Connexion à MongoDB
    const mongoUri =
      process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/portfolio";
    console.log("🔌 Connexion à MongoDB:", mongoUri);
    await mongoose.connect(mongoUri);
    console.log("✅ Connecté à MongoDB");

    // Trouver l'utilisateur admin
    const adminUser = await User.findOne({ email: "admin@portfolio.com" });

    if (!adminUser) {
      console.error(
        "❌ Utilisateur admin non trouvé. Créez d'abord un compte admin avec: node create-admin.js"
      );
      process.exit(1);
    }

    console.log("👤 Admin trouvé:", adminUser.email, "- ID:", adminUser._id);

    // Supprimer les anciennes éducations (optionnel)
    const deleteResult = await Education.deleteMany({ userId: adminUser._id });
    console.log(
      `🗑️  ${deleteResult.deletedCount} ancienne(s) éducation(s) supprimée(s)`
    );

    // Ajouter les nouvelles éducations
    const educationsToInsert = sampleEducations.map((education) => ({
      ...education,
      userId: adminUser._id,
    }));

    const insertedEducations = await Education.insertMany(educationsToInsert);
    console.log(
      `✅ ${insertedEducations.length} éducations ajoutées avec succès!\n`
    );

    insertedEducations.forEach((education, index) => {
      const period = education.isCurrent
        ? `${education.startDate.toISOString().split("T")[0]} - En cours`
        : `${education.startDate.toISOString().split("T")[0]} - ${
            education.endDate?.toISOString().split("T")[0] || "N/A"
          }`;
      console.log(`  ${index + 1}. ${education.degree}`);
      console.log(`     ${education.fieldOfStudy}`);
      console.log(`     ${education.institution}, ${education.location}`);
      console.log(`     ${period}`);
      if (education.grade) {
        console.log(`     Note: ${education.grade}`);
      }
      console.log("");
    });

    console.log("🎉 Base de données peuplée avec succès!");
  } catch (error) {
    console.error("❌ Erreur:", error);
  } finally {
    await mongoose.disconnect();
    console.log("👋 Déconnecté de MongoDB");
    process.exit(0);
  }
}

// Exécuter le script
seedEducations();
