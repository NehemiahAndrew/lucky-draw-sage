import React from 'react';
import { Card } from '@/components/ui/card';
import { format } from 'date-fns';

const RecentDraws = () => {
  // Enhanced mock data with ball colors
  const recentDraws = [
    { 
      id: 1, 
      numbers: [
        { value: 7, color: 'red' },
        { value: 12, color: 'green' },
        { value: 23, color: 'blue' },
        { value: 34, color: 'red' },
        { value: 41, color: 'green' },
        { value: 45, color: 'blue' }
      ],
      drawTime: new Date(2024, 0, 20, 15, 0),
      sum: 162,
      oddCount: 4,
      evenCount: 2
    },
    { 
      id: 2, 
      numbers: [
        { value: 3, color: 'blue' },
        { value: 15, color: 'red' },
        { value: 22, color: 'green' },
        { value: 31, color: 'blue' },
        { value: 38, color: 'red' },
        { value: 47, color: 'green' }
      ],
      drawTime: new Date(2024, 0, 20, 14, 0),
      sum: 156,
      oddCount: 3,
      evenCount: 3
    },
    { 
      id: 3, 
      numbers: [
        { value: 5, color: 'green' },
        { value: 11, color: 'blue' },
        { value: 25, color: 'red' },
        { value: 33, color: 'green' },
        { value: 42, color: 'blue' },
        { value: 49, color: 'red' }
      ],
      drawTime: new Date(2024, 0, 20, 13, 0),
      sum: 165,
      oddCount: 5,
      evenCount: 1
    },
  ];

  const getBallColor = (color: string) => {
    switch (color) {
      case 'red':
        return 'bg-red-500';
      case 'green':
        return 'bg-green-500';
      case 'blue':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

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
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium text-white ${getBallColor(num.color)}`}
                >
                  {num.value}
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