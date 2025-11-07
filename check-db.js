const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/portfolio")
  .then(async () => {
    console.log("✅ Connecté à MongoDB\n");

    const db = mongoose.connection.db;

    // Compter et afficher tous les projets
    const projets = await db.collection("projets").find({}).toArray();
    console.log(`📊 Total projets: ${projets.length}\n`);

    projets.forEach((p, i) => {
      console.log(`${i + 1}. ${p.title || "Sans titre"}`);
      console.log(`   ID: ${p._id}`);
      console.log(`   UserID: ${p.userId || "❌ NULL"}`);
      console.log(`   Status: ${p.status || "N/A"}`);
      console.log("");
    });

    // Projets avec userId null
    const nullUserIdProjects = projets.filter((p) => !p.userId);
    if (nullUserIdProjects.length > 0) {
      console.log(
        `\n⚠️  ${nullUserIdProjects.length} projet(s) avec userId null:`
      );
      nullUserIdProjects.forEach((p) => {
        console.log(`   - ${p.title || "Sans titre"} (ID: ${p._id})`);
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
