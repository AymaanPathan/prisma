import { prisma } from "../lib/prisma.js";

async function main() {
  const user = await prisma.user.createMany({
    data: [
      {
        name: "Aymaan",
        email: "aymaan2@example.com",
        password: "password123",
      },
      {
        name: "BOB",
        email: "bob@example.com",
        password: "password123",
      },
      {
        name: "roy",
        email: "roy@example.com",
        password: "password123",
      },
    ],
  });

  console.log("User created:", user);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
