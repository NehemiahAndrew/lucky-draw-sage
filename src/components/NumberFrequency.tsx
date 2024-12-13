import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Card } from '@/components/ui/card';

const NumberFrequency = () => {
  // Enhanced mock frequency data with hot/cold numbers
  const frequencyData = Array.from({ length: 49 }, (_, i) => ({
    number: i + 1,
    frequency: Math.floor(Math.random() * 50) + 1,
    status: Math.random() > 0.7 ? 'hot' : Math.random() > 0.4 ? 'neutral' : 'cold'
  }));

  const getBarColor = (status: string) => {
    switch(status) {
      case 'hot': return '#ef4444';
      case 'cold': return '#3b82f6';
      default: return '#8b5cf6';
    }
  };

  return (
    <div className="space-y-4">
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
          <BarChart data={frequencyData}>
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
              fill={(entry) => getBarColor(entry.status)}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default NumberFrequency;