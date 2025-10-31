import { User } from "@modules/auth/auth.model";
import { Profil } from "@modules/profil/profil.model";
import { env } from "./environment";
import { database } from "./database";
import { logger } from "./logger";

export async function seedDatabase() {
  try {
    await database.connect();

    const existingAdmin = await User.findOne({ email: env.adminEmail });

    if (existingAdmin) {
      logger.info("Admin user already exists");
      return;
    }

    const adminUser = await User.create({
      username: env.adminUsername,
      email: env.adminEmail,
      password: env.adminPassword,
      role: "admin",
      isActive: true,
    });

    logger.info(`✅ Admin user created: ${adminUser.email}`);

    const adminProfil = await Profil.create({
      userId: adminUser._id,
      fullName: "Admin User",
      title: "Portfolio Admin",
      bio: "Welcome to my portfolio! This is the admin account.",
      email: adminUser.email,
      socials: [],
    });

    logger.info(`✅ Admin profil created for: ${adminProfil.fullName}`);

    logger.info("✅ Database seeded successfully!");
    logger.info(`\n📧 Admin Email: ${env.adminEmail}`);
    logger.info(`🔑 Admin Password: ${env.adminPassword}\n`);

    await database.disconnect();
    process.exit(0);
  } catch (error) {
    logger.error("❌ Error seeding database:", error);
    process.exit(1);
  }
}

if (require.main === module) {
  seedDatabase();
}
