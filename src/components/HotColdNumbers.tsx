import React from 'react';
import { Card } from '@/components/ui/card';

interface NumberStatus {
  number: number;
  frequency: number;
  status: 'hot' | 'cold';
}

interface ColorStatus {
  color: string;
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

  const colorStatuses: ColorStatus[] = [
    { color: 'Red', frequency: 15, status: 'hot' },
    { color: 'Blue', frequency: 18, status: 'hot' },
    { color: 'Green', frequency: 8, status: 'cold' },
  ];

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Hot & Cold Analysis</h3>
      
      {/* Numbers Section */}
      <div className="mb-6">
        <h4 className="text-sm font-medium mb-3">Numbers</h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h5 className="text-sm font-medium text-red-500 mb-2">Hot Numbers</h5>
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
            <h5 className="text-sm font-medium text-blue-500 mb-2">Cold Numbers</h5>
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
      </div>

      {/* Colors Section */}
      <div>
        <h4 className="text-sm font-medium mb-3">Colors</h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h5 className="text-sm font-medium text-red-500 mb-2">Hot Colors</h5>
            <div className="flex flex-wrap gap-2">
              {colorStatuses
                .filter((c) => c.status === 'hot')
                .map((color, idx) => (
                  <div
                    key={idx}
                    className={`px-4 py-2 rounded-md text-white text-sm font-medium
                      ${color.color.toLowerCase() === 'red' ? 'bg-red-500' : 
                        color.color.toLowerCase() === 'blue' ? 'bg-blue-500' : 
                        'bg-green-500'}`}
                  >
                    {color.color} ({color.frequency})
                  </div>
                ))}
            </div>
          </div>
          <div>
            <h5 className="text-sm font-medium text-blue-500 mb-2">Cold Colors</h5>
            <div className="flex flex-wrap gap-2">
              {colorStatuses
                .filter((c) => c.status === 'cold')
                .map((color, idx) => (
                  <div
                    key={idx}
                    className={`px-4 py-2 rounded-md text-white text-sm font-medium
                      ${color.color.toLowerCase() === 'red' ? 'bg-red-500' : 
                        color.color.toLowerCase() === 'blue' ? 'bg-blue-500' : 
                        'bg-green-500'}`}
                  >
                    {color.color} ({color.frequency})
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default HotColdNumbers;