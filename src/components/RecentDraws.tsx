import React from 'react';
import { Card } from '@/components/ui/card';
import { format } from 'date-fns';

const RecentDraws = () => {
  // Enhanced mock data with more details
  const recentDraws = [
    { 
      id: 1, 
      numbers: [7, 12, 23, 34, 41, 45], 
      drawTime: new Date(2024, 0, 20, 15, 0),
      sum: 162,
      oddCount: 4,
      evenCount: 2
    },
    { 
      id: 2, 
      numbers: [3, 15, 22, 31, 38, 47], 
      drawTime: new Date(2024, 0, 20, 14, 0),
      sum: 156,
      oddCount: 3,
      evenCount: 3
    },
    { 
      id: 3, 
      numbers: [5, 11, 25, 33, 42, 49], 
      drawTime: new Date(2024, 0, 20, 13, 0),
      sum: 165,
      oddCount: 5,
      evenCount: 1
    },
  ];

  return (
    <div className="space-y-4">
      {recentDraws.map((draw) => (
        <Card key={draw.id} className="p-4">
          <div className="flex flex-col space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">
                {format(draw.drawTime, 'PPpp')}
              </span>
              <span className="text-sm font-medium">
                Draw #{draw.id}
              </span>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {draw.numbers.map((num, idx) => (
                <span
                  key={idx}
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                    num % 2 === 0 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-red-500 text-white'
                  }`}
                >
                  {num}
                </span>
              ))}
            </div>
            
            <div className="grid grid-cols-3 gap-2 text-sm">
              <div className="text-center">
                <span className="block text-muted-foreground">Sum</span>
                <span className="font-medium">{draw.sum}</span>
              </div>
              <div className="text-center">
                <span className="block text-muted-foreground">Odd</span>
                <span className="font-medium">{draw.oddCount}</span>
              </div>
              <div className="text-center">
                <span className="block text-muted-foreground">Even</span>
                <span className="font-medium">{draw.evenCount}</span>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default RecentDraws;