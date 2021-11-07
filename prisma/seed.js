const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const main = async () => {
  const john = await prisma.user.create({
    data: {
      fname: 'John',
      lname: 'Doe',
    },
  });
  console.log(john);

  const johnny = await prisma.user.create({
    data: {
      fname: 'Johnny',
      lname: 'Doe',
      todos: {
        create: [
          {
            text: 'Do dishes',
          },
          {
            text: 'Walk the dog',
          },
        ],
      },
    },
  });

  const run = await prisma.todo.create({
    data: {
      text: 'Run a full marathon',
    },
  });

  console.log(run);

  const grocery = await prisma.todo.create({
    data: {
      text: 'Buy groceries for the week',
      User: {
        create: {
          fname: 'Amelia',
          lname: 'Dane',
        },
      },
    },
  });
  console.log(grocery);
};

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
