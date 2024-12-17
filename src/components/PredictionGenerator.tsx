import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from "@/components/ui/use-toast";

interface ColorPrediction {
  color: string;
  probability: number;
}

const PredictionGenerator = () => {
  const [prediction, setPrediction] = useState<ColorPrediction | null>(null);
  const [nextDrawTime, setNextDrawTime] = useState<number>(49);
  const [previousPredictions, setPreviousPredictions] = useState<ColorPrediction[]>([]);
  const { toast } = useToast();

  // Historical color data
  const historicalColors = [
    { color: 'red', frequency: 15, lastDrawn: 0, streak: 2 },
    { color: 'blue', frequency: 18, lastDrawn: 1, streak: 3 },
    { color: 'green', frequency: 8, lastDrawn: 2, streak: 1 }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setNextDrawTime((prev) => {
        if (prev <= 0) {
          generatePrediction();
          return 49;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const predictColor = () => {
    // Calculate weighted probabilities based on frequency and patterns
    const weights = historicalColors.reduce((acc, color) => ({
      ...acc,
      [color.color]: color.frequency * (1 + (color.streak * 0.1)) * Math.exp(-color.lastDrawn * 0.1)
    }), {} as Record<string, number>);

    // Normalize weights
    const totalWeight = Object.values(weights).reduce((a, b) => a + b, 0);
    const normalizedWeights = Object.entries(weights).map(([color, weight]) => ({
      color,
      probability: (weight / totalWeight) * 100
    }));

    // Random selection based on weighted probabilities
    const random = Math.random();
    let cumulativeProbability = 0;
    
    for (const { color, probability } of normalizedWeights) {
      cumulativeProbability += probability / 100;
      if (random <= cumulativeProbability) {
        return { color, probability };
      }
    }

    return normalizedWeights[0];
  };

  const generatePrediction = () => {
    const newPrediction = predictColor();
    
    setPrediction(newPrediction);
    setPreviousPredictions(prev => [...prev, newPrediction].slice(-3));
    
    toast({
      title: "New Color Prediction Generated",
      description: `Predicted color: ${newPrediction.color} (${newPrediction.probability.toFixed(2)}% probability)`,
    });

    console.log('Generated color prediction:', newPrediction);
    console.log('Previous predictions:', previousPredictions);
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
          <h3 className="text-lg font-medium mb-4">Predicted Color:</h3>
          <div className="flex items-center gap-4 mb-4">
            <div
              className={`w-16 h-16 rounded-full ${
                prediction.color === 'red' ? 'bg-red-500' :
                prediction.color === 'blue' ? 'bg-blue-500' :
                'bg-green-500'
              }`}
            />
            <div>
              <p className="font-semibold capitalize">{prediction.color}</p>
              <p className="text-sm text-muted-foreground">
                {prediction.probability.toFixed(2)}% probability
              </p>
            </div>
          </div>
          
          <p className="mt-4 text-sm text-muted-foreground">
            Prediction based on historical color patterns and frequency analysis
          </p>
          
          <div className="mt-4">
            <h4 className="text-sm font-medium mb-2">Recent Predictions:</h4>
            <div className="flex gap-4">
              {previousPredictions.map((pred, index) => (
                <div
                  key={index}
                  className={`w-8 h-8 rounded-full ${
                    pred.color === 'red' ? 'bg-red-500' :
                    pred.color === 'blue' ? 'bg-blue-500' :
                    'bg-green-500'
                  }`}
                />
              ))}
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default PredictionGenerator;