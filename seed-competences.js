/**
 * Script pour ajouter des compétences de test dans la base de données
 * Usage: node seed-competences.js
 */

const mongoose = require("mongoose");
require("dotenv").config();

const competenceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  category: {
    type: String,
    enum: [
      "programming_language",
      "framework",
      "database",
      "tool",
      "soft_skill",
      "methodology",
      "cloud",
      "devops",
      "design",
      "other",
    ],
    required: true,
  },
  level: {
    type: String,
    enum: ["beginner", "intermediate", "advanced", "expert"],
    required: true,
  },
  icon: String,
  yearsOfExperience: Number,
  description: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Competence = mongoose.model("Competence", competenceSchema);

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  role: String,
});

const User = mongoose.model("User", userSchema);

const sampleCompetences = [
  // Programming Languages
  {
    name: "JavaScript",
    category: "programming_language",
    level: "expert",
    icon: "⚡",
    yearsOfExperience: 6,
    description:
      "Maîtrise avancée de JavaScript ES6+, async/await, promises, closures et programmation fonctionnelle.",
  },
  {
    name: "TypeScript",
    category: "programming_language",
    level: "advanced",
    icon: "🔷",
    yearsOfExperience: 4,
    description:
      "Typage fort, interfaces, génériques et décorateurs. Utilisation dans des projets Node.js et React.",
  },
  {
    name: "Python",
    category: "programming_language",
    level: "intermediate",
    icon: "🐍",
    yearsOfExperience: 3,
    description:
      "Développement de scripts, APIs REST avec FastAPI/Flask, et automatisation de tâches.",
  },

  // Frameworks
  {
    name: "React",
    category: "framework",
    level: "expert",
    icon: "⚛️",
    yearsOfExperience: 5,
    description:
      "Hooks, Context API, Redux, React Query. Création de composants réutilisables et optimisation des performances.",
  },
  {
    name: "Node.js",
    category: "framework",
    level: "advanced",
    icon: "🟢",
    yearsOfExperience: 5,
    description:
      "APIs RESTful, GraphQL, Express, authentication JWT, middleware et gestion des erreurs.",
  },
  {
    name: "Vue.js",
    category: "framework",
    level: "intermediate",
    icon: "💚",
    yearsOfExperience: 2,
    description:
      "Composition API, Vuex, Vue Router. Développement d'applications SPA modernes.",
  },
  {
    name: "Next.js",
    category: "framework",
    level: "advanced",
    icon: "▲",
    yearsOfExperience: 3,
    description:
      "SSR, SSG, API routes, optimisation d'images et SEO. Déploiement sur Vercel.",
  },

  // Databases
  {
    name: "MongoDB",
    category: "database",
    level: "advanced",
    icon: "🍃",
    yearsOfExperience: 4,
    description:
      "Modélisation de données, agrégations, indexation et optimisation de requêtes. Mongoose ODM.",
  },
  {
    name: "PostgreSQL",
    category: "database",
    level: "intermediate",
    icon: "🐘",
    yearsOfExperience: 3,
    description:
      "Requêtes SQL complexes, jointures, transactions et procédures stockées.",
  },
  {
    name: "Redis",
    category: "database",
    level: "intermediate",
    icon: "🔴",
    yearsOfExperience: 2,
    description: "Mise en cache, sessions, pub/sub et gestion de queues.",
  },

  // DevOps & Cloud
  {
    name: "Docker",
    category: "devops",
    level: "advanced",
    icon: "🐳",
    yearsOfExperience: 3,
    description:
      "Création de Dockerfiles, Docker Compose, orchestration de conteneurs multi-services.",
  },
  {
    name: "AWS",
    category: "cloud",
    level: "intermediate",
    icon: "☁️",
    yearsOfExperience: 2,
    description:
      "EC2, S3, Lambda, RDS, CloudFront. Déploiement et gestion d'infrastructures cloud.",
  },
  {
    name: "Git",
    category: "tool",
    level: "expert",
    icon: "📦",
    yearsOfExperience: 6,
    description:
      "Workflows Git, branching strategies (Git Flow), rebasing, cherry-picking et résolution de conflits.",
  },

  // Methodologies & Soft Skills
  {
    name: "Agile/Scrum",
    category: "methodology",
    level: "advanced",
    icon: "🔄",
    yearsOfExperience: 4,
    description:
      "Sprints, daily standups, retrospectives, planning poker. Expérience en tant que Scrum Master.",
  },
  {
    name: "Communication",
    category: "soft_skill",
    level: "expert",
    icon: "💬",
    yearsOfExperience: 6,
    description:
      "Communication claire avec les équipes techniques et non-techniques. Présentation de solutions complexes.",
  },
  {
    name: "Problem Solving",
    category: "soft_skill",
    level: "expert",
    icon: "🧩",
    yearsOfExperience: 6,
    description:
      "Analyse de problèmes complexes, débogage efficace et recherche de solutions optimales.",
  },
];

async function seedCompetences() {
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

    // Supprimer les anciennes compétences (optionnel)
    const deleteResult = await Competence.deleteMany({ userId: adminUser._id });
    console.log(
      `🗑️  ${deleteResult.deletedCount} ancienne(s) compétence(s) supprimée(s)`
    );

    // Ajouter les nouvelles compétences
    const competencesToInsert = sampleCompetences.map((competence) => ({
      ...competence,
      userId: adminUser._id,
    }));

    const insertedCompetences = await Competence.insertMany(
      competencesToInsert
    );
    console.log(
      `✅ ${insertedCompetences.length} compétences ajoutées avec succès!\n`
    );

    // Grouper par catégorie
    const byCategory = insertedCompetences.reduce((acc, comp) => {
      if (!acc[comp.category]) acc[comp.category] = [];
      acc[comp.category].push(comp);
      return acc;
    }, {});

    Object.entries(byCategory).forEach(([category, comps]) => {
      console.log(`📁 ${category.replace(/_/g, " ").toUpperCase()}:`);
      comps.forEach((comp) => {
        console.log(
          `   - ${comp.name} (${comp.level}, ${comp.yearsOfExperience} ans)`
        );
      });
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
seedCompetences();
