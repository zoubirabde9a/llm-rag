"use client";
import React from "react";
import DynamicTable from "../../components/dynamicTable/DynamicTable";
import { faker } from "@faker-js/faker";

export default function UsersPage() {
  // Use useMemo to ensure data is stable between renders
  const users = React.useMemo(() => Array.from({ length: 42 }, () => ({
    Name: faker.person.fullName(),
    Email: faker.internet.email(),
    Role: faker.helpers.arrayElement(["Admin", "User", "Editor"]),
  })), []); // Empty dependency array ensures data is generated only once

  return (
    <main className="p-8 max-w-4xl mx-auto">
      <DynamicTable data={users} rowsPerPage={8} />
    </main>
  );
} 