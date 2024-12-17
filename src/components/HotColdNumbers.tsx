import React from 'react';
import { Card } from '@/components/ui/card';

interface ColorStatus {
  color: string;
  frequency: number;
  status: 'hot' | 'cold';
}

const HotColdNumbers = () => {
  const colorStatuses: ColorStatus[] = [
    { color: 'Red', frequency: 15, status: 'hot' },
    { color: 'Blue', frequency: 18, status: 'hot' },
    { color: 'Green', frequency: 8, status: 'cold' },
  ];

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Hot & Cold Colors</h3>
      
      <div className="space-y-6">
        <div>
          <h4 className="text-sm font-medium text-red-500 mb-3">Hot Colors</h4>
          <div className="flex flex-wrap gap-3">
            {colorStatuses
              .filter((c) => c.status === 'hot')
              .map((color, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-full ${
                      color.color === 'Red' ? 'bg-red-500' :
                      color.color === 'Blue' ? 'bg-blue-500' :
                      'bg-green-500'
                    }`}
                  />
                  <span className="text-sm">
                    {color.color} ({color.frequency})
                  </span>
                </div>
              ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-blue-500 mb-3">Cold Colors</h4>
          <div className="flex flex-wrap gap-3">
            {colorStatuses
              .filter((c) => c.status === 'cold')
              .map((color, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-full ${
                      color.color === 'Red' ? 'bg-red-500' :
                      color.color === 'Blue' ? 'bg-blue-500' :
                      'bg-green-500'
                    }`}
                  />
                  <span className="text-sm">
                    {color.color} ({color.frequency})
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default HotColdNumbers;