"use client";

import { NavigationCard } from "@/components/navigation/navigation-card";
import { NAVIGATION_DATA } from "@/data/constants";

export default function Home() {
  return (
    <main className="flex flex-col items-start justify-start p-6 gap-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 w-full">
        {NAVIGATION_DATA.map((navItem) => (
          <NavigationCard key={navItem.title} {...navItem} />
        ))}
      </div>
    </main>
  );
}
