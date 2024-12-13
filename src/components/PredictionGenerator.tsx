import React from 'react';
import { Button } from '@/components/ui/button';

const PredictionGenerator = () => {
  const [prediction, setPrediction] = React.useState<number[]>([]);

  const generatePrediction = () => {
    // Simple random prediction for now
    const numbers = new Set<number>();
    while (numbers.size < 6) {
      numbers.add(Math.floor(Math.random() * 49) + 1);
    }
    setPrediction(Array.from(numbers).sort((a, b) => a - b));
  };

  return (
    <div className="space-y-4">
      <Button onClick={generatePrediction}>Generate Prediction</Button>
      
      {prediction.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-medium mb-2">Suggested Numbers:</h3>
          <div className="flex space-x-2">
            {prediction.map((num, idx) => (
              <span
                key={idx}
                className="w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center text-lg"
              >
                {num}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PredictionGenerator;