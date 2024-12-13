import React from 'react';

const RecentDraws = () => {
  // Mock recent draws
  const recentDraws = [
    { id: 1, numbers: [7, 12, 23, 34, 41, 45], drawTime: '2024-01-20 15:00' },
    { id: 2, numbers: [3, 15, 22, 31, 38, 47], drawTime: '2024-01-20 14:00' },
    { id: 3, numbers: [5, 11, 25, 33, 42, 49], drawTime: '2024-01-20 13:00' },
  ];

  return (
    <div className="space-y-4">
      {recentDraws.map((draw) => (
        <div key={draw.id} className="p-4 border rounded-lg">
          <div className="text-sm text-gray-500 mb-2">{draw.drawTime}</div>
          <div className="flex space-x-2">
            {draw.numbers.map((num, idx) => (
              <span
                key={idx}
                className="w-8 h-8 rounded-full bg-secondary text-white flex items-center justify-center text-sm"
              >
                {num}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentDraws;