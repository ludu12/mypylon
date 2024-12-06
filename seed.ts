import { db } from "./src/db";
import * as schema from "./src/schema";

async function seed() {
  await db.insert(schema.movies).values([
    { title: "Gone in 60 Seconds", releaseYear: 2000 },
    { title: "Face/Off", releaseYear: 1997 },
    { title: "National Treasure", releaseYear: 2004 },
  ]);
}

async function main() {
  try {
    await seed();
    console.log("Seeding completed");
  } catch (error) {
    console.error("Error during seeding:", error);
    process.exit(1);
  }
}

main().then(() => process.exit(1))
