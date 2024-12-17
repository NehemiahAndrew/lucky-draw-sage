import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface TrendData {
  color: string;
  streak: number;
  lastSeen: number;
}

const TrendAnalysis = () => {
  const trends: TrendData[] = [
    { color: 'Red', streak: 2, lastSeen: 0 },
    { color: 'Blue', streak: 3, lastSeen: 1 },
    { color: 'Green', streak: 1, lastSeen: 2 },
  ];

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Current Trends</h3>
      <div className="space-y-4">
        {trends.map((trend, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className={`w-4 h-4 rounded-full ${
                  trend.color === 'Red'
                    ? 'bg-red-500'
                    : trend.color === 'Blue'
                    ? 'bg-blue-500'
                    : 'bg-green-500'
                }`}
              />
              <span className="font-medium">{trend.color}</span>
            </div>
            <div className="flex gap-2">
              <Badge variant="secondary">
                Streak: {trend.streak}
              </Badge>
              <Badge variant="outline">
                Last seen: {trend.lastSeen} draws ago
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default TrendAnalysis;