import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Card } from '@/components/ui/card';
import { calculateStatistics, calculateProbabilities } from '@/utils/statistics';

const NumberFrequency = () => {
  // Color frequency data based on recent draws
  const colorData = [
    { color: 'Red', frequency: 8, lastAppearance: 1 },
    { color: 'Blue', frequency: 12, lastAppearance: 0 },
    { color: 'Green', frequency: 10, lastAppearance: 2 }
  ];

  const processedData = colorData.map(item => ({
    ...item,
    fill: item.color.toLowerCase(),
    probability: (item.frequency / 30) * 100 // Simple probability calculation
  }));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <Card className="p-4">
          <h3 className="text-sm font-medium mb-2">Color Distribution</h3>
          <div className="flex flex-wrap gap-2">
            {colorData.map((color, idx) => (
              <span 
                key={idx} 
                className={`px-3 py-1 rounded-full text-white text-sm
                  ${color.color.toLowerCase() === 'red' ? 'bg-red-500' : 
                    color.color.toLowerCase() === 'blue' ? 'bg-blue-500' : 
                    'bg-green-500'}`}
              >
                {color.color}: {color.frequency}
              </span>
            ))}
          </div>
        </Card>
        
        <Card className="p-4">
          <h3 className="text-sm font-medium mb-2">Last Appearances</h3>
          <div className="text-sm space-y-1">
            {colorData.map((color, idx) => (
              <p key={idx}>
                {color.color}: {color.lastAppearance} draws ago
              </p>
            ))}
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="text-sm font-medium mb-2">Probability Analysis</h3>
          <div className="text-sm space-y-1">
            {processedData.map((item, idx) => (
              <p key={idx}>
                {item.color}: {item.probability.toFixed(1)}%
              </p>
            ))}
          </div>
        </Card>
      </div>

      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={processedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="color" />
            <YAxis />
            <Tooltip 
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <Card className="p-2 bg-background border">
                      <p className="font-medium">Color: {data.color}</p>
                      <p>Frequency: {data.frequency}</p>
                      <p>Last Appearance: {data.lastAppearance} draws ago</p>
                      <p>Probability: {data.probability.toFixed(1)}%</p>
                    </Card>
                  );
                }
                return null;
              }}
            />
            <Bar 
              dataKey="frequency"
              fill="#8b5cf6"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default NumberFrequency;