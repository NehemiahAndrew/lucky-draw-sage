import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from "@/components/ui/use-toast";
import { findPatterns, predictNextColor, getPatternConfidence } from '@/utils/patternRecognition';

interface ColorPrediction {
  color: string;
  probability: number;
}

const PredictionGenerator = () => {
  const [prediction, setPrediction] = useState<ColorPrediction | null>(null);
  const [nextDrawTime, setNextDrawTime] = useState<number>(49);
  const [previousPredictions, setPreviousPredictions] = useState<ColorPrediction[]>([]);
  const { toast } = useToast();

  // Historical color data (most recent first)
  const historicalColors = [
    'red', 'blue', 'green', 'blue', 'red',
    'blue', 'red', 'green', 'blue', 'blue',
    'red', 'green', 'blue', 'red', 'blue'
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

  const generatePrediction = () => {
    const predictedColor = predictNextColor(historicalColors);
    const patterns = findPatterns(historicalColors);
    const confidence = getPatternConfidence(patterns, predictedColor);
    
    const newPrediction = {
      color: predictedColor,
      probability: confidence
    };
    
    setPrediction(newPrediction);
    setPreviousPredictions(prev => [...prev, newPrediction].slice(-3));
    
    toast({
      title: "New Color Prediction Generated",
      description: `Predicted color: ${predictedColor} (${confidence.toFixed(2)}% confidence)`,
    });

    console.log('Generated color prediction:', newPrediction);
    console.log('Patterns found:', patterns);
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
                {prediction.probability.toFixed(2)}% confidence
              </p>
            </div>
          </div>
          
          <p className="mt-4 text-sm text-muted-foreground">
            Prediction based on pattern recognition and historical analysis
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