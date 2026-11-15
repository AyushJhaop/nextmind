const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const programmes = [
    {
      id: "prog-ai-foundations",
      title: "AI Foundations",
      slug: "ai-foundations",
      description:
        "Understand artificial intelligence, explore modern AI tools and learn how to use AI effectively.",
      level: "Beginner-friendly",
      duration: "Cohort Duration: [Editable Placeholder — e.g. 6 Weeks Guided Track]",
      isActive: true,
    },
    {
      id: "prog-ai-automation",
      title: "AI & Automation",
      slug: "ai-and-automation",
      description:
        "Learn how to build intelligent workflows and automate repetitive tasks using modern AI tools.",
      level: "Beginner to Intermediate",
      duration: "Cohort Duration: [Editable Placeholder — e.g. 8 Weeks Builder Track]",
      isActive: true,
    },
    {
      id: "prog-digital-product",
      title: "Digital Product & Technology",
      slug: "digital-product-and-technology",
      description:
        "Develop the technical and creative skills required to build modern digital products.",
      level: "Beginner to Intermediate",
      duration: "Cohort Duration: [Editable Placeholder — e.g. 10 Weeks Studio Track]",
      isActive: true,
    },
  ];

  for (const prog of programmes) {
    await prisma.programme.upsert({
      where: { slug: prog.slug },
      update: prog,
      create: prog,
    });
  }

  console.log("NEXTMIND database seeded successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

