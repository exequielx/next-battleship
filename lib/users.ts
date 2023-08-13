import { User } from "./types";

const users: User[] = [];

export const addUser = (id: string, name: string) => {
  const existingUser = users.find(
    (user) => user.id === id
  );

  if (!id || !name) return { error: "Username are required." };
  if (existingUser) return { error: "Username is taken." };

  const user = { id, name };
  users.push(user);

  return user;
};

export const removeUser = (id: string) => {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) return users.splice(index, 1)[0];
};

export const getUser = (id: string) => users.find((user) => user.id === id);

export const getUsers = () => users;

