const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/portfolio")
  .then(async () => {
    console.log("✅ Connecté à MongoDB");

    const db = mongoose.connection.db;

    // Nettoyer tous les projets
    const projets = await db.collection("projets").deleteMany({});
    console.log(`✅ ${projets.deletedCount} projets supprimés`);

    // Nettoyer toutes les expériences
    const experiences = await db.collection("experiences").deleteMany({});
    console.log(`✅ ${experiences.deletedCount} expériences supprimées`);

    // Nettoyer toutes les compétences
    const competences = await db.collection("competences").deleteMany({});
    console.log(`✅ ${competences.deletedCount} compétences supprimées`);

    // Nettoyer toutes les éducations
    const educations = await db.collection("educations").deleteMany({});
    console.log(`✅ ${educations.deletedCount} éducations supprimées`);

    console.log("\n🎉 Toutes les données ont été nettoyées !");

    await mongoose.connection.close();
    console.log("✅ Connexion fermée");
    process.exit(0);
  })
  .catch((err) => {
    console.error("❌ Erreur:", err);
    process.exit(1);
  });
