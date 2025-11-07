/**
 * Script pour ajouter des projets de test dans la base de données
 * Usage: node seed-projets.js
 */

const mongoose = require("mongoose");
require("dotenv").config();

const projetSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  description: String,
  image: String,
  technologies: [String],
  demoUrl: String,
  githubUrl: String,
  category: {
    type: String,
    enum: ["web", "mobile", "desktop", "backend", "fullstack", "other"],
    default: "web",
  },
  featured: { type: Boolean, default: false },
  startDate: Date,
  endDate: Date,
  status: {
    type: String,
    enum: ["completed", "in_progress", "planned"],
    default: "in_progress",
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Projet = mongoose.model("Projet", projetSchema);

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  role: String,
});

const User = mongoose.model("User", userSchema);

const sampleProjects = [
  {
    title: "Portfolio GraphQL API",
    description:
      "API GraphQL complète pour gérer un portfolio professionnel avec authentification JWT, gestion de profils, projets, expériences et compétences.",
    technologies: [
      "Node.js",
      "TypeScript",
      "GraphQL",
      "MongoDB",
      "Apollo Server",
      "JWT",
    ],
    category: "backend",
    status: "in_progress",
    featured: true,
    startDate: new Date("2025-10-01"),
    githubUrl: "https://github.com/username/portfolio-api",
    demoUrl: "https://api.portfolio.com",
  },
  {
    title: "E-Commerce React",
    description:
      "Application e-commerce moderne avec panier, paiement Stripe, gestion de stock et tableau de bord admin.",
    technologies: ["React", "Redux", "Tailwind CSS", "Stripe", "Firebase"],
    category: "fullstack",
    status: "completed",
    featured: true,
    startDate: new Date("2025-06-01"),
    endDate: new Date("2025-09-15"),
    githubUrl: "https://github.com/username/ecommerce-app",
    demoUrl: "https://shop-demo.netlify.app",
  },
  {
    title: "Task Manager Mobile",
    description:
      "Application mobile de gestion de tâches avec synchronisation cloud, notifications push et mode hors-ligne.",
    technologies: [
      "React Native",
      "Expo",
      "AsyncStorage",
      "Push Notifications",
    ],
    category: "mobile",
    status: "completed",
    featured: false,
    startDate: new Date("2025-03-01"),
    endDate: new Date("2025-05-30"),
    githubUrl: "https://github.com/username/task-manager",
  },
  {
    title: "Dashboard Analytics",
    description:
      "Tableau de bord analytique avec graphiques interactifs, export PDF et filtres avancés pour la visualisation de données.",
    technologies: ["Vue.js", "Chart.js", "D3.js", "Express", "PostgreSQL"],
    category: "web",
    status: "in_progress",
    featured: false,
    startDate: new Date("2025-09-01"),
    githubUrl: "https://github.com/username/analytics-dashboard",
  },
  {
    title: "Chat App Real-time",
    description:
      "Application de messagerie instantanée avec WebSockets, salons de discussion, partage de fichiers et statuts en ligne.",
    technologies: ["Socket.io", "Node.js", "React", "MongoDB", "AWS S3"],
    category: "fullstack",
    status: "planned",
    featured: false,
    startDate: new Date("2025-12-01"),
  },
];

async function seedProjects() {
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
        "❌ Utilisateur admin non trouvé. Créez d'abord un compte admin."
      );
      process.exit(1);
    }

    console.log("👤 Admin trouvé:", adminUser.email, "- ID:", adminUser._id);

    // Supprimer les anciens projets (optionnel)
    const deleteResult = await Projet.deleteMany({ userId: adminUser._id });
    console.log(
      `🗑️  ${deleteResult.deletedCount} ancien(s) projet(s) supprimé(s)`
    );

    // Ajouter les nouveaux projets
    const projectsToInsert = sampleProjects.map((project) => ({
      ...project,
      userId: adminUser._id,
    }));

    const insertedProjects = await Projet.insertMany(projectsToInsert);
    console.log(`✅ ${insertedProjects.length} projets ajoutés avec succès!`);

    insertedProjects.forEach((project, index) => {
      console.log(
        `  ${index + 1}. ${project.title} - ${project.category} - ${
          project.status
        }`
      );
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
seedProjects();
