/**
 * Script pour ajouter des expériences de test dans la base de données
 * Usage: node seed-experiences.js
 */

const mongoose = require("mongoose");
require("dotenv").config();

const experienceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  company: { type: String, required: true },
  position: { type: String, required: true },
  description: { type: String, required: true },
  location: String,
  employmentType: {
    type: String,
    enum: ["full_time", "part_time", "contract", "freelance", "internship"],
    required: true,
  },
  startDate: { type: Date, required: true },
  endDate: Date,
  isCurrent: { type: Boolean, default: false },
  technologies: [String],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Experience = mongoose.model("Experience", experienceSchema);

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  role: String,
});

const User = mongoose.model("User", userSchema);

const sampleExperiences = [
  {
    company: "TechCorp Solutions",
    position: "Senior Full Stack Developer",
    description:
      "Développement et maintenance d'applications web complexes. Lead technique sur plusieurs projets critiques. Mise en place de l'architecture microservices et migration vers le cloud.",
    location: "Paris, France",
    employmentType: "full_time",
    startDate: new Date("2023-01-15"),
    isCurrent: true,
    technologies: [
      "React",
      "Node.js",
      "TypeScript",
      "MongoDB",
      "Docker",
      "Kubernetes",
      "AWS",
    ],
  },
  {
    company: "Digital Innovations Inc.",
    position: "Front-End Developer",
    description:
      "Développement d'interfaces utilisateur modernes et responsives. Collaboration étroite avec l'équipe UX/UI pour créer des expériences utilisateur exceptionnelles. Optimisation des performances et accessibilité.",
    location: "Lyon, France",
    employmentType: "full_time",
    startDate: new Date("2021-03-01"),
    endDate: new Date("2022-12-31"),
    isCurrent: false,
    technologies: [
      "React",
      "Vue.js",
      "Tailwind CSS",
      "JavaScript",
      "Git",
      "Figma",
    ],
  },
  {
    company: "StartupLab",
    position: "Full Stack Developer",
    description:
      "Développement complet d'une plateforme SaaS de gestion de projets. Participation active aux choix techniques et à l'architecture. Mentorat de développeurs juniors.",
    location: "Remote",
    employmentType: "contract",
    startDate: new Date("2020-06-01"),
    endDate: new Date("2021-02-28"),
    isCurrent: false,
    technologies: [
      "Angular",
      "Express.js",
      "PostgreSQL",
      "Redis",
      "GraphQL",
      "Jest",
    ],
  },
  {
    company: "Freelance",
    position: "Web Developer & Consultant",
    description:
      "Développement de sites web et applications pour divers clients. Consultation technique, audit de code, et formation. Gestion complète de projets de A à Z.",
    location: "Remote",
    employmentType: "freelance",
    startDate: new Date("2019-01-01"),
    endDate: new Date("2020-05-31"),
    isCurrent: false,
    technologies: [
      "WordPress",
      "PHP",
      "JavaScript",
      "MySQL",
      "HTML/CSS",
      "SEO",
    ],
  },
  {
    company: "WebAgency Pro",
    position: "Junior Web Developer",
    description:
      "Développement de sites web pour clients variés. Apprentissage des meilleures pratiques de développement. Participation aux réunions clients et estimation de projets.",
    location: "Marseille, France",
    employmentType: "internship",
    startDate: new Date("2018-06-01"),
    endDate: new Date("2018-12-31"),
    isCurrent: false,
    technologies: ["HTML", "CSS", "JavaScript", "jQuery", "Bootstrap", "Git"],
  },
];

async function seedExperiences() {
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

    // Supprimer les anciennes expériences (optionnel)
    const deleteResult = await Experience.deleteMany({ userId: adminUser._id });
    console.log(
      `🗑️  ${deleteResult.deletedCount} ancienne(s) expérience(s) supprimée(s)`
    );

    // Ajouter les nouvelles expériences
    const experiencesToInsert = sampleExperiences.map((experience) => ({
      ...experience,
      userId: adminUser._id,
    }));

    const insertedExperiences = await Experience.insertMany(
      experiencesToInsert
    );
    console.log(
      `✅ ${insertedExperiences.length} expériences ajoutées avec succès!`
    );

    insertedExperiences.forEach((experience, index) => {
      const period = experience.isCurrent
        ? `${experience.startDate.toISOString().split("T")[0]} - Présent`
        : `${experience.startDate.toISOString().split("T")[0]} - ${
            experience.endDate?.toISOString().split("T")[0] || "N/A"
          }`;
      console.log(
        `  ${index + 1}. ${experience.position} @ ${experience.company}`
      );
      console.log(`     ${experience.employmentType} | ${period}`);
    });

    console.log("\n🎉 Base de données peuplée avec succès!");
  } catch (error) {
    console.error("❌ Erreur:", error);
  } finally {
    await mongoose.disconnect();
    console.log("👋 Déconnecté de MongoDB");
    process.exit(0);
  }
}

// Exécuter le script
seedExperiences();
