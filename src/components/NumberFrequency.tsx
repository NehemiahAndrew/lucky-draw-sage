import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Card } from '@/components/ui/card';

const NumberFrequency = () => {
  // Color frequency data based on recent draws from the images
  const colorData = [
    { 
      color: 'Red', 
      frequency: 15, 
      lastAppearance: 0, 
      probability: 62.2,
      streak: 2
    },
    { 
      color: 'Blue', 
      frequency: 18, 
      lastAppearance: 1, 
      probability: 61.4,
      streak: 4
    },
    { 
      color: 'Green', 
      frequency: 8, 
      lastAppearance: 3, 
      probability: 31.5,
      streak: 1
    }
  ];

  const processedData = colorData.map(item => ({
    ...item,
    fill: item.color.toLowerCase()
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
          <h3 className="text-sm font-medium mb-2">Current Streaks</h3>
          <div className="text-sm space-y-1">
            {colorData.map((color, idx) => (
              <p key={idx}>
                {color.color}: {color.streak} consecutive
              </p>
            ))}
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="text-sm font-medium mb-2">Probability Analysis</h3>
          <div className="text-sm space-y-1">
            {colorData.map((color, idx) => (
              <p key={idx}>
                {color.color}: {color.probability}%
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
                      <p>Current Streak: {data.streak}</p>
                      <p>Probability: {data.probability}%</p>
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