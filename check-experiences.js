const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/portfolio")
  .then(async () => {
    console.log("✅ Connecté à MongoDB\n");

    const db = mongoose.connection.db;

    // Compter et afficher toutes les expériences
    const experiences = await db.collection("experiences").find({}).toArray();
    console.log(`📊 Total expériences: ${experiences.length}\n`);

    experiences.forEach((exp, i) => {
      console.log(
        `${i + 1}. ${exp.position || "Sans titre"} @ ${exp.company || "N/A"}`
      );
      console.log(`   ID: ${exp._id}`);
      console.log(`   UserID: ${exp.userId || "❌ NULL"}`);
      console.log(`   Type: ${exp.employmentType || "N/A"}`);
      console.log(
        `   Période: ${exp.startDate || "N/A"} - ${
          exp.isCurrent ? "Présent" : exp.endDate || "N/A"
        }`
      );
      console.log("");
    });

    // Expériences avec userId null
    const nullUserIdExperiences = experiences.filter((exp) => !exp.userId);
    if (nullUserIdExperiences.length > 0) {
      console.log(
        `\n⚠️  ${nullUserIdExperiences.length} expérience(s) avec userId null:`
      );
      nullUserIdExperiences.forEach((exp) => {
        console.log(
          `   - ${exp.position || "Sans titre"} @ ${
            exp.company || "N/A"
          } (ID: ${exp._id})`
        );
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
