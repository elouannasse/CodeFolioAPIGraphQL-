const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  role: String,
  username: String,
});

const User = mongoose.model("User", userSchema);

async function createAdmin() {
  try {
    const mongoUri =
      process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/portfolio";
    console.log("🔌 Connexion à MongoDB:", mongoUri);
    await mongoose.connect(mongoUri);
    console.log("✅ Connecté à MongoDB");

    // Vérifier si admin existe déjà
    const existingAdmin = await User.findOne({ email: "admin@portfolio.com" });

    if (existingAdmin) {
      console.log("✅ Admin existe déjà:", existingAdmin.email);
      console.log("   ID:", existingAdmin._id);
      console.log("   Role:", existingAdmin.role);
    } else {
      // Créer admin
      const hashedPassword = await bcrypt.hash("Admin@123", 10);

      const newAdmin = await User.create({
        email: "admin@portfolio.com",
        username: "admin",
        password: hashedPassword,
        role: "admin",
      });

      console.log("✅ Admin créé avec succès!");
      console.log("   Email:", newAdmin.email);
      console.log("   ID:", newAdmin._id);
      console.log("   Password: Admin@123");
    }
  } catch (error) {
    console.error("❌ Erreur:", error);
  } finally {
    await mongoose.disconnect();
    console.log("👋 Déconnecté de MongoDB");
    process.exit(0);
  }
}

createAdmin();
