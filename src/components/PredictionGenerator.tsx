import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

const PredictionGenerator = () => {
  const [prediction, setPrediction] = useState<number[]>([]);
  const [strategy, setStrategy] = useState<string>("balanced");
  const { toast } = useToast();

  const generatePrediction = () => {
    let numbers = new Set<number>();
    const hotNumbers = [7, 11, 23, 27, 33, 42, 47]; // Example hot numbers
    const coldNumbers = [2, 9, 13, 19, 31, 39, 44]; // Example cold numbers
    const recentPatterns = [
      [1, 10, 20, 30, 40, 45], // Example patterns from recent draws
      [5, 15, 25, 35, 40, 45],
      [3, 13, 23, 33, 43, 48]
    ];
    
    const addNumberWithProbability = (num: number, probability: number) => {
      if (Math.random() < probability && numbers.size < 6) {
        numbers.add(num);
      }
    };

    switch(strategy) {
      case "hot":
        // Use hot numbers with higher probability
        hotNumbers.forEach(num => addNumberWithProbability(num, 0.7));
        while(numbers.size < 6) {
          const num = Math.floor(Math.random() * 49) + 1;
          numbers.add(num);
        }
        break;
      
      case "cold":
        // Use cold numbers with higher probability
        coldNumbers.forEach(num => addNumberWithProbability(num, 0.7));
        while(numbers.size < 6) {
          const num = Math.floor(Math.random() * 49) + 1;
          numbers.add(num);
        }
        break;
      
      case "pattern":
        // Use numbers based on recent patterns
        const randomPattern = recentPatterns[Math.floor(Math.random() * recentPatterns.length)];
        randomPattern.forEach(num => addNumberWithProbability(num, 0.5));
        while(numbers.size < 6) {
          const num = Math.floor(Math.random() * 49) + 1;
          numbers.add(num);
        }
        break;
      
      case "balanced":
      default:
        // Balanced approach using all strategies
        hotNumbers.forEach(num => addNumberWithProbability(num, 0.3));
        coldNumbers.forEach(num => addNumberWithProbability(num, 0.3));
        while(numbers.size < 6) {
          const num = Math.floor(Math.random() * 49) + 1;
          numbers.add(num);
        }
    }

    const sortedNumbers = Array.from(numbers).sort((a, b) => a - b);
    setPrediction(sortedNumbers);
    
    toast({
      title: "New Prediction Generated",
      description: `Using ${strategy} strategy with enhanced probability calculations`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <Select
          value={strategy}
          onValueChange={setStrategy}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select strategy" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="balanced">Balanced</SelectItem>
            <SelectItem value="hot">Hot Numbers</SelectItem>
            <SelectItem value="cold">Cold Numbers</SelectItem>
            <SelectItem value="pattern">Pattern Based</SelectItem>
          </SelectContent>
        </Select>
        
        <Button onClick={generatePrediction}>Generate Prediction</Button>
      </div>
      
      {prediction.length > 0 && (
        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4">Suggested Numbers:</h3>
          <div className="flex flex-wrap gap-3">
            {prediction.map((num, idx) => (
              <div
                key={idx}
                className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-lg font-semibold shadow-lg"
              >
                {num}
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Strategy: {strategy.charAt(0).toUpperCase() + strategy.slice(1)}
          </p>
        </Card>
      )}
    </div>
  );
};

export default PredictionGenerator;