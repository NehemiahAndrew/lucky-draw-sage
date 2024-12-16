import React from 'react';
import { Card } from '@/components/ui/card';

// Historical data from the provided image
const recentDraws = [
  {
    id: 4701739,
    numbers: [
      { value: 20, color: 'blue' },
      { value: 29, color: 'blue' },
      { value: 11, color: 'blue' },
      { value: 12, color: 'green' },
      { value: 31, color: 'red' },
      { value: 19, color: 'red' }
    ],
    rangeTotal: 122,
    range: 'L'
  },
  {
    id: 4701738,
    numbers: [
      { value: 22, color: 'red' },
      { value: 5, color: 'blue' },
      { value: 20, color: 'blue' },
      { value: 35, color: 'blue' },
      { value: 46, color: 'red' },
      { value: 36, color: 'green' }
    ],
    rangeTotal: 164,
    range: 'H'
  },
  {
    id: 4701737,
    numbers: [
      { value: 46, color: 'red' },
      { value: 42, color: 'green' },
      { value: 12, color: 'green' },
      { value: 19, color: 'red' },
      { value: 29, color: 'blue' },
      { value: 45, color: 'green' }
    ],
    rangeTotal: 193,
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