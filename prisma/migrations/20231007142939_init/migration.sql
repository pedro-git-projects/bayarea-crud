-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "username" TEXT NOT NULL,
    "hash" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "todoItems" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "deadline" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "todoItems_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TodoItemUser" (
    "userId" INTEGER NOT NULL,
    "todoItemId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignedBy" TEXT NOT NULL,

    CONSTRAINT "TodoItemUser_pkey" PRIMARY KEY ("userId","todoItemId")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- AddForeignKey
ALTER TABLE "TodoItemUser" ADD CONSTRAINT "TodoItemUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TodoItemUser" ADD CONSTRAINT "TodoItemUser_todoItemId_fkey" FOREIGN KEY ("todoItemId") REFERENCES "todoItems"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
