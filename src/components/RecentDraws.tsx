import React from 'react';
import { Card } from '@/components/ui/card';

// Historical data from the provided image
const recentDraws = [
  {
    id: 4700263,
    numbers: [
      { value: 47, color: 'blue' },
      { value: 29, color: 'blue' },
      { value: 27, color: 'green' },
      { value: 4, color: 'red' },
      { value: 14, color: 'blue' },
      { value: 22, color: 'red' }
    ],
    rangeTotal: 143,
    range: 'L'
  },
  {
    id: 4700262,
    numbers: [
      { value: 20, color: 'blue' },
      { value: 47, color: 'blue' },
      { value: 39, color: 'green' },
      { value: 40, color: 'red' },
      { value: 31, color: 'red' },
      { value: 43, color: 'red' }
    ],
    rangeTotal: 220,
    range: 'H'
  },
  // ... Adding more historical draws
  {
    id: 4700254,
    numbers: [
      { value: 46, color: 'red' },
      { value: 30, color: 'green' },
      { value: 44, color: 'blue' },
      { value: 7, color: 'red' },
      { value: 29, color: 'blue' },
      { value: 27, color: 'green' }
    ],
    rangeTotal: 183,
    range: 'H'
  }
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

const RecentDraws = () => {
  return (
    <div className="space-y-4">
      {recentDraws.map((draw) => (
        <Card key={draw.id} className="p-4">
          <div className="flex flex-col space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">
                Draw #{draw.id}
              </span>
              <span className={`text-sm font-medium ${
                draw.range === 'H' ? 'text-red-500' : 'text-blue-500'
              }`}>
                {draw.range} ({draw.rangeTotal})
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
          </div>
        </Card>
      ))}
    </div>
  );
};

export default RecentDraws;
