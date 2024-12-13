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
import { calculateProbabilities } from '@/utils/statistics';

const PredictionGenerator = () => {
  const [prediction, setPrediction] = useState<number[]>([]);
  const [strategy, setStrategy] = useState<string>("balanced");
  const { toast } = useToast();

  const generatePrediction = () => {
    let numbers = new Set<number>();
    const mockData = Array.from({ length: 49 }, (_, i) => ({
      number: i + 1,
      frequency: Math.floor(Math.random() * 50) + 1,
      status: '',
      lastDrawn: Math.floor(Math.random() * 10) + 1,
      winningProbability: 0
    }));

    const processedData = calculateProbabilities(mockData);
    const hotNumbers = processedData.filter(item => item.status === 'hot').map(item => item.number);
    const coldNumbers = processedData.filter(item => item.status === 'cold').map(item => item.number);
    
    const addNumberWithProbability = (num: number, probability: number) => {
      if (Math.random() < probability && numbers.size < 6) {
        numbers.add(num);
      }
    };

    switch(strategy) {
      case "hot":
        hotNumbers.forEach(num => addNumberWithProbability(num, 0.7));
        while(numbers.size < 6) {
          const num = Math.floor(Math.random() * 49) + 1;
          numbers.add(num);
        }
        break;
      
      case "cold":
        coldNumbers.forEach(num => addNumberWithProbability(num, 0.7));
        while(numbers.size < 6) {
          const num = Math.floor(Math.random() * 49) + 1;
          numbers.add(num);
        }
        break;
      
      case "pattern":
        const recentPatterns = processedData
          .filter(item => item.lastDrawn <= 3)
          .map(item => item.number);
        recentPatterns.forEach(num => addNumberWithProbability(num, 0.5));
        while(numbers.size < 6) {
          const num = Math.floor(Math.random() * 49) + 1;
          numbers.add(num);
        }
        break;
      
      case "balanced":
      default:
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