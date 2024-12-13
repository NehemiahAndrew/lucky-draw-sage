import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const NumberFrequency = () => {
  // Mock frequency data
  const frequencyData = Array.from({ length: 49 }, (_, i) => ({
    number: i + 1,
    frequency: Math.floor(Math.random() * 20) + 1, // Mock frequency
  }));

  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={frequencyData}>
          <XAxis dataKey="number" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="frequency" fill="#1a237e" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default NumberFrequency;