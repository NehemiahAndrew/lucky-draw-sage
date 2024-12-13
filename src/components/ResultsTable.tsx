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
  // Mock data for initial display
  const mockResults = [
    { date: '2024-01-20', numbers: [7, 12, 23, 34, 41, 45] },
    { date: '2024-01-19', numbers: [3, 15, 22, 31, 38, 47] },
    { date: '2024-01-18', numbers: [5, 11, 25, 33, 42, 49] },
  ];

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Winning Numbers</TableHead>
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
                      className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm"
                    >
                      {num}
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