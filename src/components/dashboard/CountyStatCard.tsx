
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface CountyStatCardProps {
  county: string;
  percentage: number;
  rank?: number;
}

export default function CountyStatCard({ county, percentage, rank }: CountyStatCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className={`py-3 ${rank && rank <= 3 ? 'bg-safeminor-primary text-white' : 'bg-gray-100'}`}>
        <CardTitle className="text-base flex justify-between items-center">
          <span>{county}</span>
          {rank && <span className="text-sm font-normal">Rank #{rank}</span>}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold">{percentage}%</div>
          <div className="w-full max-w-[140px] bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-safeminor-primary h-2.5 rounded-full" 
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
