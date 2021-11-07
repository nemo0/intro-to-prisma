const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.findMany();

  console.log(users);

  const usersWithTodos = await prisma.user.findMany({
    include: {
      todos: true,
    },
  });

  console.log(JSON.stringify(usersWithTodos, null, 2));

  const todos = await prisma.todo.findMany();

  console.log(todos);

  const todosWithUsers = await prisma.todo.findMany({
    include: {
      User: true,
    },
  });

  console.log(JSON.stringify(todosWithUsers, null, 2));
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
