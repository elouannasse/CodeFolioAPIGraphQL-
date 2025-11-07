const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/portfolio")
  .then(async () => {
    console.log("✅ Connecté à MongoDB\n");

    const db = mongoose.connection.db;

    // Compter et afficher toutes les éducations
    const educations = await db.collection("educations").find({}).toArray();
    console.log(`📊 Total éducations: ${educations.length}\n`);

    educations.forEach((edu, i) => {
      console.log(
        `${i + 1}. ${edu.degree || "Sans diplôme"} - ${
          edu.fieldOfStudy || "N/A"
        }`
      );
      console.log(`   ID: ${edu._id}`);
      console.log(`   UserID: ${edu.userId || "❌ NULL"}`);
      console.log(`   Institution: ${edu.institution || "N/A"}`);
      console.log(`   Localisation: ${edu.location || "N/A"}`);
      console.log(
        `   Période: ${edu.startDate || "N/A"} - ${
          edu.isCurrent ? "En cours" : edu.endDate || "N/A"
        }`
      );
      console.log(`   Note: ${edu.grade || "N/A"}`);
      console.log("");
    });

    // Éducations avec userId null
    const nullUserIdEducations = educations.filter((edu) => !edu.userId);
    if (nullUserIdEducations.length > 0) {
      console.log(
        `\n⚠️  ${nullUserIdEducations.length} éducation(s) avec userId null:`
      );
      nullUserIdEducations.forEach((edu) => {
        console.log(
          `   - ${edu.degree || "Sans diplôme"} @ ${
            edu.institution || "N/A"
          } (ID: ${edu._id})`
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
