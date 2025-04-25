
import React from 'react';
import CountyStatCard from '../dashboard/CountyStatCard';

export default function StatSection() {
  const countyStats = [
    { county: "Bungoma", percentage: 33, rank: 1 },
    { county: "Homabay", percentage: 33, rank: 2 },
    { county: "Migori", percentage: 30, rank: 3 },
    { county: "Narok", percentage: 27, rank: 4 }
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            GBV Rate in Kenya
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Counties with the highest rates of gender-based violence
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {countyStats.map((stat) => (
            <CountyStatCard
              key={stat.county}
              county={stat.county}
              percentage={stat.percentage}
              rank={stat.rank}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
