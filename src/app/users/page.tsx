"use client";
import React from "react";
import DynamicTable from "../../components/dynamicTable/DynamicTable";
import { faker } from "@faker-js/faker";

// Generate random user data
const users = Array.from({ length: 42 }, () => ({
  Name: faker.person.fullName(),
  Email: faker.internet.email(),
  Role: faker.helpers.arrayElement(["Admin", "User", "Editor"]),
}));

export default function UsersPage() {
  return (
    <main className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Users Table</h1>
      <DynamicTable data={users} rowsPerPage={8} />
    </main>
  );
} 