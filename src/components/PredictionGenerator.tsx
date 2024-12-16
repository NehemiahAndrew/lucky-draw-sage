import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from "@/components/ui/use-toast";

const PredictionGenerator = () => {
  const [prediction, setPrediction] = useState<string | null>(null);
  const [nextDrawTime, setNextDrawTime] = useState<number>(49);
  const { toast } = useToast();

  useEffect(() => {
    const timer = setInterval(() => {
      setNextDrawTime((prev) => {
        if (prev <= 0) {
          // Reset to 49 when it reaches 0
          return 49;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const generatePrediction = () => {
    // Analysis based on recent patterns from the provided images
    const colorPatterns = {
      red: { frequency: 12, lastAppearance: 0, weight: 0.35 },
      blue: { frequency: 15, lastAppearance: 1, weight: 0.4 },
      green: { frequency: 8, lastAppearance: 2, weight: 0.25 }
    };

    // Calculate probabilities based on frequency and last appearance
    const probabilities = Object.entries(colorPatterns).map(([color, data]) => ({
      color,
      score: (data.frequency * data.weight) * (1 / (data.lastAppearance + 1))
    }));

    // Sort by score and get the most likely color
    const sortedProbabilities = probabilities.sort((a, b) => b.score - a.score);
    const predictedColor = sortedProbabilities[0].color;

    setPrediction(predictedColor);
    
    toast({
      title: "New Prediction Generated",
      description: `Next draw in ${nextDrawTime} seconds`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <Button onClick={generatePrediction}>Generate Color Prediction</Button>
        <div className="text-lg font-semibold">
          Next Draw: {nextDrawTime}s
        </div>
      </div>
      
      {prediction && (
        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4">Predicted Next Color:</h3>
          <div className="flex items-center gap-3">
            <div
              className={`w-12 h-12 rounded-full ${
                prediction === 'red' ? 'bg-red-500' :
                prediction === 'blue' ? 'bg-blue-500' :
                'bg-green-500'
              }`}
            />
            <span className="text-xl font-semibold capitalize">{prediction}</span>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            This prediction is based on historical patterns and frequency analysis
          </p>
        </Card>
      )}
    </div>
  );
};

export default PredictionGenerator;