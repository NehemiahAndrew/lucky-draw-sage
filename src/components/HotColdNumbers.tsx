import React from 'react';
import { Card } from '@/components/ui/card';

interface NumberStatus {
  number: number;
  frequency: number;
  status: 'hot' | 'cold';
}

const HotColdNumbers = () => {
  const numberStatuses: NumberStatus[] = [
    { number: 7, frequency: 8, status: 'hot' },
    { number: 15, frequency: 7, status: 'hot' },
    { number: 23, frequency: 1, status: 'cold' },
    { number: 31, frequency: 2, status: 'cold' },
  ];

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Hot & Cold Numbers</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h4 className="text-sm font-medium text-red-500 mb-2">Hot Numbers</h4>
          <div className="flex flex-wrap gap-2">
            {numberStatuses
              .filter((n) => n.status === 'hot')
              .map((number) => (
                <div
                  key={number.number}
                  className="w-12 h-12 rounded-full bg-red-500 text-white flex items-center justify-center font-medium"
                >
                  {number.number}
                </div>
              ))}
          </div>
        </div>
        <div>
          <h4 className="text-sm font-medium text-blue-500 mb-2">Cold Numbers</h4>
          <div className="flex flex-wrap gap-2">
            {numberStatuses
              .filter((n) => n.status === 'cold')
              .map((number) => (
                <div
                  key={number.number}
                  className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center font-medium"
                >
                  {number.number}
                </div>
              ))}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default HotColdNumbers;