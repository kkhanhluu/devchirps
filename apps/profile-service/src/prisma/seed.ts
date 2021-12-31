import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const user1 = await prisma.profile.upsert({
    where: { auth0AccountId: 'auth0|6182a2caebde9e0069685d74' },
    update: {},
    create: {
      auth0AccountId: 'auth0|6182a2caebde9e0069685d74',
      avatar: 'https://i.pravatar.cc/150?img=8',
      firstName: 'Khanh',
      lastName: 'Luu',
      userName: 'kkhanhluu',
      description: 'Web developer',
    },
  });
  const user2 = await prisma.profile.upsert({
    where: { auth0AccountId: 'auth0|6179e6fc25f20300680ad3e2' },
    update: {},
    create: {
      auth0AccountId: 'auth0|6179e6fc25f20300680ad3e2',
      avatar: 'https://i.pravatar.cc/150?img=56',
      firstName: 'Dung',
      lastName: 'Nguyen',
      userName: 'dzung',
      description: 'Javascript learner',
    },
  });
  console.log(`Seed 2 users: ${user1.firstName}, ${user2.firstName}`);
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
