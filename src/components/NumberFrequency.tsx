import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Card } from '@/components/ui/card';
import { calculateStatistics } from '@/utils/statistics';

const NumberFrequency = () => {
  // Enhanced mock frequency data with more statistical information
  const frequencyData = Array.from({ length: 49 }, (_, i) => ({
    number: i + 1,
    frequency: Math.floor(Math.random() * 50) + 1,
    status: Math.random() > 0.7 ? 'hot' : Math.random() > 0.4 ? 'neutral' : 'cold',
    lastDrawn: Math.floor(Math.random() * 10) + 1, // Days since last drawn
    winningProbability: Math.random()
  }));

  const stats = calculateStatistics(frequencyData);

  const getBarColor = (status: string) => {
    switch(status) {
      case 'hot': return '#ef4444';
      case 'cold': return '#3b82f6';
      default: return '#8b5cf6';
    }
  };

  // Process the data to include color information
  const processedData = frequencyData.map(item => ({
    ...item,
    fill: getBarColor(item.status)
  }));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <Card className="p-4">
          <h3 className="text-sm font-medium mb-2">Most Frequent Numbers</h3>
          <div className="flex flex-wrap gap-2">
            {stats.mostFrequent.map((num, idx) => (
              <span key={idx} className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-sm">
                {num}
              </span>
            ))}
          </div>
        </Card>
        
        <Card className="p-4">
          <h3 className="text-sm font-medium mb-2">Least Frequent Numbers</h3>
          <div className="flex flex-wrap gap-2">
            {stats.leastFrequent.map((num, idx) => (
              <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                {num}
              </span>
            ))}
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="text-sm font-medium mb-2">Statistical Summary</h3>
          <div className="text-sm space-y-1">
            <p>Average Frequency: {stats.averageFrequency.toFixed(2)}</p>
            <p>Standard Deviation: {stats.standardDeviation.toFixed(2)}</p>
            <p>Variance: {stats.variance.toFixed(2)}</p>
          </div>
        </Card>
      </div>

      <div className="flex justify-end space-x-4 mb-4">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <span className="text-sm">Hot Numbers</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <span className="text-sm">Cold Numbers</span>
        </div>
      </div>
      
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={processedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="number" />
            <YAxis />
            <Tooltip 
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <Card className="p-2 bg-background border">
                      <p className="font-medium">Number: {data.number}</p>
                      <p>Frequency: {data.frequency}</p>
                      <p className="capitalize">Status: {data.status}</p>
                      <p>Last Drawn: {data.lastDrawn} days ago</p>
                      <p>Win Probability: {(data.winningProbability * 100).toFixed(2)}%</p>
                    </Card>
                  );
                }
                return null;
              }}
            />
            <Bar 
              dataKey="frequency" 
              radius={[4, 4, 0, 0]}
              fill="#8b5cf6"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default NumberFrequency;