const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/portfolio")
  .then(async () => {
    console.log("✅ Connecté à MongoDB");

    const db = mongoose.connection.db;
    const result = await db.collection("competences").deleteMany({});

    console.log(`✅ ${result.deletedCount} compétence(s) supprimée(s)`);

    await mongoose.connection.close();
    console.log("✅ Connexion fermée");
    process.exit(0);
  })
  .catch((err) => {
    console.error("❌ Erreur:", err);
    process.exit(1);
  });
