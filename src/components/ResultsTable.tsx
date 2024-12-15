import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const ResultsTable = () => {
  // Mock data with color information
  const mockResults = [
    { 
      date: '2024-01-20', 
      numbers: [
        { value: 47, color: 'blue' },
        { value: 29, color: 'blue' },
        { value: 27, color: 'green' },
        { value: 4, color: 'red' },
        { value: 14, color: 'blue' },
        { value: 22, color: 'red' }
      ]
    },
    { 
      date: '2024-01-19', 
      numbers: [
        { value: 20, color: 'blue' },
        { value: 47, color: 'blue' },
        { value: 39, color: 'green' },
        { value: 40, color: 'red' },
        { value: 31, color: 'red' },
        { value: 43, color: 'red' }
      ]
    },
    { 
      date: '2024-01-18', 
      numbers: [
        { value: 46, color: 'red' },
        { value: 30, color: 'green' },
        { value: 44, color: 'blue' },
        { value: 7, color: 'red' },
        { value: 29, color: 'blue' },
        { value: 27, color: 'green' }
      ]
    },
  ];

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Numbers & Colors</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockResults.map((result, index) => (
            <TableRow key={index}>
              <TableCell>{result.date}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  {result.numbers.map((num, idx) => (
                    <span
                      key={idx}
                      className={`w-8 h-8 rounded-full text-white flex items-center justify-center text-sm
                        ${num.color === 'red' ? 'bg-red-500' : 
                          num.color === 'blue' ? 'bg-blue-500' : 
                          'bg-green-500'}`}
                    >
                      {num.value}
                    </span>
                  ))}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ResultsTable;