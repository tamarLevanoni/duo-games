const { PrismaClient } = require('@prisma/client');
const fs = require('fs');

const prisma = new PrismaClient();

async function exportData() {
  const allData = {
    games: await prisma.game.findMany(),
    locations: await prisma.location.findMany(),
    users: await prisma.user.findMany(),
    borrowings: await prisma.borrowing.findMany(),
    // הוסף כאן עוד טבלאות לפי הצורך
  };

  fs.writeFileSync('backup.json', JSON.stringify(allData, null, 2));
  console.log('✅ ייצוא הנתונים הסתיים!');
}

async function importData() {
  const data = JSON.parse(fs.readFileSync('backup.json', 'utf8'));

  await prisma.game.createMany({ data: data.games });
  await prisma.location.createMany({ data: data.locations });
  await prisma.user.createMany({ data: data.users });
  await prisma.borrowing.createMany({ data: data.borrowings });

  console.log('✅ ייבוא הנתונים הסתיים!');
}

importData().finally(() => prisma.$disconnect());

// exportData().finally(() => prisma.$disconnect());
