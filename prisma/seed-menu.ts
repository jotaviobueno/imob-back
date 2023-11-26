import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main(menus: { name: string; url: string }[]) {
  return prisma.$transaction(
    async (tx) => {
      for (const { name, url } of menus) {
        const menuAlreadyExist = await tx.menu.findFirst({
          where: { name, url },
        });

        if (menuAlreadyExist) return menuAlreadyExist;

        return tx.menu.create({
          data: {
            name,
            url,
            deletedAt: null,
          },
        });
      }
    },
    {
      maxWait: 5000, // default: 2000
      timeout: 550000, // default: 5000
    },
  );
}

const menus: { name: string; url: string }[] = [
  {
    name: 'Home',
    url: '/home',
  },
];

main(menus)
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
