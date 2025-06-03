"use client";
import React from "react";
import DynamicTable from "../../components/dynamicTable/DynamicTable";
import { faker } from "@faker-js/faker";
import SpaceBackgroundWrapper from "../../components/spaceBackground/SpaceBackgroundWrapper";
import NavigationBar from "../../components/navigationBar/navigationBar";
import { Box } from "@mui/material";

export default function ProductsPage() {
  // Use useMemo to ensure data is stable between renders
  const products = React.useMemo(() => Array.from({ length: 37 }, () => ({
    Name: faker.commerce.productName(),
    Category: faker.commerce.department(),
    Price: `$${faker.commerce.price({ min: 10, max: 500, dec: 2 })}`,
    Description: faker.commerce.productDescription(),
    SKU: faker.string.alphanumeric(10),
    Brand: faker.company.name(),
    Color: faker.color.human(),
    Material: faker.commerce.productMaterial(),
    Weight: `${faker.number.float({ min: 0.1, max: 10, fractionDigits: 2 })} kg`,
    Dimensions: `${faker.number.int({ min: 10, max: 100 })}x${faker.number.int({ min: 10, max: 100 })}x${faker.number.int({ min: 1, max: 50 })} cm`,
    Stock: faker.number.int({ min: 0, max: 500 }),
    Rating: faker.number.float({ min: 1, max: 5, fractionDigits: 1 }),
    Reviews: faker.number.int({ min: 0, max: 1000 }),
    ReleaseDate: faker.date.past({ years: 5 }).toISOString().split('T')[0],
    Supplier: faker.company.name(),
    Country: faker.location.country(),
    Barcode: faker.string.numeric(13),
    Warranty: `${faker.number.int({ min: 0, max: 5 })} years`,
    Discount: `${faker.number.int({ min: 0, max: 50 })}%`,
    Featured: faker.datatype.boolean() ? "Yes" : "No",
    Shipping: faker.commerce.productAdjective(),
  })), []); // Empty dependency array ensures data is generated only once

  const handleNavigation = (itemId: string) => {
    console.log('Navigated to:', itemId);
    // Add navigation logic here
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <NavigationBar onNavigate={handleNavigation} />
      <Box sx={{ flex: 1, overflow: 'auto' }}>
        <SpaceBackgroundWrapper />
        <main className="p-8 max-w-4xl mx-auto relative">
          <DynamicTable data={products} rowsPerPage={8} />
        </main>
      </Box>
    </Box>
  );
} 