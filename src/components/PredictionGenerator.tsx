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
  const [prediction, setPrediction] = useState<Array<{value: number, color: string}>>([]);
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
    
    // Color distribution rules based on the game mechanics
    const colorRules = {
      red: { min: 1, max: 2 },    // 1-2 red balls
      blue: { min: 2, max: 3 },   // 2-3 blue balls
      green: { min: 1, max: 2 }   // 1-2 green balls
    };

    const assignColor = (num: number): string => {
      // Simple color assignment based on number ranges
      if (num <= 16) return 'red';
      if (num <= 33) return 'blue';
      return 'green';
    };

    const addNumberWithProbability = (num: number, probability: number) => {
      if (Math.random() < probability && numbers.size < 6) {
        numbers.add(num);
      }
    };

    switch(strategy) {
      case "hot":
        // Focus on numbers with high frequency and recent wins
        processedData
          .filter(item => item.status === 'hot' && item.lastDrawn <= 3)
          .forEach(item => addNumberWithProbability(item.number, 0.8));
        break;
      
      case "cold":
        // Focus on numbers that haven't appeared recently
        processedData
          .filter(item => item.status === 'cold' && item.lastDrawn > 10)
          .forEach(item => addNumberWithProbability(item.number, 0.7));
        break;
      
      case "pattern":
        // Use recent winning patterns and color distribution
        processedData
          .filter(item => item.lastDrawn <= 5)
          .forEach(item => addNumberWithProbability(item.number, 0.6));
        break;
      
      case "balanced":
      default:
        // Balanced approach considering both frequency and color distribution
        processedData.forEach(item => {
          const probability = item.winningProbability * 
            (item.lastDrawn < 5 ? 1.2 : 1) * 
            (item.status === 'hot' ? 1.1 : 1);
          addNumberWithProbability(item.number, probability);
        });
    }

    // Ensure we have exactly 6 numbers
    while(numbers.size < 6) {
      const num = Math.floor(Math.random() * 49) + 1;
      numbers.add(num);
    }

    // Convert to array and assign colors
    const sortedNumbers = Array.from(numbers)
      .sort((a, b) => a - b)
      .map(num => ({
        value: num,
        color: assignColor(num)
      }));

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
                className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-semibold text-white ${
                  num.color === 'red' ? 'bg-red-500' :
                  num.color === 'blue' ? 'bg-blue-500' :
                  'bg-green-500'
                }`}
              >
                {num.value}
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