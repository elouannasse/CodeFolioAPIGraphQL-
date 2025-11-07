const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/portfolio")
  .then(async () => {
    console.log("✅ Connecté à MongoDB\n");

    const db = mongoose.connection.db;

    // Compter et afficher toutes les compétences
    const competences = await db.collection("competences").find({}).toArray();
    console.log(`📊 Total compétences: ${competences.length}\n`);

    competences.forEach((comp, i) => {
      console.log(`${i + 1}. ${comp.name || "Sans nom"}`);
      console.log(`   ID: ${comp._id}`);
      console.log(`   UserID: ${comp.userId || "❌ NULL"}`);
      console.log(`   Catégorie: ${comp.category || "N/A"}`);
      console.log(`   Niveau: ${comp.level || "N/A"}`);
      console.log(`   Années d'expérience: ${comp.yearsOfExperience || 0}`);
      console.log("");
    });

    // Compétences avec userId null
    const nullUserIdCompetences = competences.filter((comp) => !comp.userId);
    if (nullUserIdCompetences.length > 0) {
      console.log(
        `\n⚠️  ${nullUserIdCompetences.length} compétence(s) avec userId null:`
      );
      nullUserIdCompetences.forEach((comp) => {
        console.log(`   - ${comp.name || "Sans nom"} (ID: ${comp._id})`);
      });
    }

    await mongoose.connection.close();
    console.log("\n✅ Connexion fermée");
    process.exit(0);
  })
  .catch((err) => {
    console.error("❌ Erreur:", err);
    process.exit(1);
  });
