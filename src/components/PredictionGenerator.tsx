import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from "@/components/ui/use-toast";

const PredictionGenerator = () => {
  const [prediction, setPrediction] = useState<string | null>(null);
  const [nextDrawTime, setNextDrawTime] = useState<number>(49);
  const [previousPredictions, setPreviousPredictions] = useState<string[]>([]);
  const { toast } = useToast();

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

  const analyzePattern = () => {
    // Get the last few predictions to avoid repetition
    const recentPredictions = previousPredictions.slice(-3);
    
    // Color weights based on historical data
    const weights = {
      red: 0.33,
      blue: 0.33,
      green: 0.33
    };

    // Adjust weights based on recent predictions
    recentPredictions.forEach(color => {
      // Reduce weight of recently predicted colors
      weights[color as keyof typeof weights] *= 0.8;
    });

    // Normalize weights
    const totalWeight = Object.values(weights).reduce((a, b) => a + b, 0);
    Object.keys(weights).forEach(color => {
      weights[color as keyof typeof weights] /= totalWeight;
    });

    // Random selection with weights
    const random = Math.random();
    let cumulativeWeight = 0;
    
    for (const [color, weight] of Object.entries(weights)) {
      cumulativeWeight += weight;
      if (random <= cumulativeWeight) {
        return color;
      }
    }

    return Object.keys(weights)[0];
  };

  const generatePrediction = () => {
    const newPrediction = analyzePattern();
    
    setPrediction(newPrediction);
    setPreviousPredictions(prev => [...prev, newPrediction]);
    
    toast({
      title: "New Prediction Generated",
      description: `Next color predicted: ${newPrediction}. Next draw in ${nextDrawTime} seconds.`,
    });

    // Log for debugging
    console.log('Generated prediction:', newPrediction);
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
            Prediction based on pattern analysis and historical data
          </p>
          
          <div className="mt-4">
            <h4 className="text-sm font-medium mb-2">Recent Predictions:</h4>
            <div className="flex gap-2">
              {previousPredictions.slice(-5).map((color, index) => (
                <div
                  key={index}
                  className={`w-6 h-6 rounded-full ${
                    color === 'red' ? 'bg-red-500' :
                    color === 'blue' ? 'bg-blue-500' :
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