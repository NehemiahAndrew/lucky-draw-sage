import React from 'react';
import { Card } from '@/components/ui/card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

interface FrequencyData {
  color: string;
  count: number;
}

const FrequencyTracker = () => {
  // Sample frequency data based on historical draws
  const colorFrequencyData: FrequencyData[] = [
    { color: 'Red', count: 15 },
    { color: 'Blue', count: 18 },
    { color: 'Green', count: 12 },
  ];

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Color Frequency Distribution</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={colorFrequencyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="color" />
            <YAxis />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-background border rounded p-2">
                      <p className="font-medium">{payload[0].payload.color}</p>
                      <p>Count: {payload[0].value}</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar
              dataKey="count"
              fill="#8B5CF6"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default FrequencyTracker;