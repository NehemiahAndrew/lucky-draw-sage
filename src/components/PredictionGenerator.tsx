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
    
    // Different strategies for number generation
    switch(strategy) {
      case "hot":
        // Bias towards higher frequency numbers
        while(numbers.size < 6) {
          const num = Math.floor(Math.random() * 49) + 1;
          if (Math.random() < 0.7) { // 70% chance to pick from hot numbers
            numbers.add(num > 40 ? num : num + 10);
          } else {
            numbers.add(num);
          }
        }
        break;
      
      case "cold":
        // Bias towards lower frequency numbers
        while(numbers.size < 6) {
          const num = Math.floor(Math.random() * 49) + 1;
          if (Math.random() < 0.7) { // 70% chance to pick from cold numbers
            numbers.add(num < 10 ? num + 5 : num - 5);
          } else {
            numbers.add(num);
          }
        }
        break;
      
      case "balanced":
      default:
        // Even distribution with some patterns
        while(numbers.size < 6) {
          const num = Math.floor(Math.random() * 49) + 1;
          numbers.add(num);
        }
    }

    const sortedNumbers = Array.from(numbers).sort((a, b) => a - b);
    setPrediction(sortedNumbers);
    
    toast({
      title: "New Prediction Generated",
      description: `Using ${strategy} strategy`,
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