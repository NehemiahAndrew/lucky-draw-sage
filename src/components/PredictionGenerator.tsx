import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from "@/components/ui/use-toast";

interface Prediction {
  color: string;
  numbers: number[];
}

const PredictionGenerator = () => {
  const [prediction, setPrediction] = useState<Prediction | null>(null);
  const [nextDrawTime, setNextDrawTime] = useState<number>(49);
  const [previousPredictions, setPreviousPredictions] = useState<Prediction[]>([]);
  const { toast } = useToast();

  // Historical data from the images
  const historicalDraws = [
    {
      numbers: [20, 15, 35, 31, 25, 1],
      colors: ['blue', 'green', 'blue', 'red', 'red', 'red']
    },
    {
      numbers: [45, 17, 4, 28, 5, 39],
      colors: ['green', 'blue', 'red', 'red', 'blue', 'green']
    },
    {
      numbers: [27, 42, 26, 30, 41, 12],
      colors: ['green', 'green', 'blue', 'green', 'blue', 'green']
    }
  ];

  // Color frequency analysis from the statistics shown in images
  const colorStats = {
    red: { frequency: 0.33, lastDrawn: 0, streak: 2 },
    blue: { frequency: 0.40, lastDrawn: 1, streak: 3 },
    green: { frequency: 0.27, lastDrawn: 2, streak: 1 }
  };

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
    // Calculate weighted probabilities based on frequency and recent patterns
    const weights = {
      red: colorStats.red.frequency * (1 + (colorStats.red.streak * 0.1)),
      blue: colorStats.blue.frequency * (1 + (colorStats.blue.streak * 0.1)),
      green: colorStats.green.frequency * (1 + (colorStats.green.streak * 0.1))
    };

    // Adjust weights based on last appearance
    Object.keys(weights).forEach(color => {
      const stats = colorStats[color as keyof typeof colorStats];
      weights[color as keyof typeof weights] *= Math.exp(-stats.lastDrawn * 0.1);
    });

    // Normalize weights
    const totalWeight = Object.values(weights).reduce((a, b) => a + b, 0);
    const normalizedWeights = Object.entries(weights).map(([color, weight]) => ({
      color,
      probability: weight / totalWeight
    }));

    // Random selection based on weighted probabilities
    const random = Math.random();
    let cumulativeProbability = 0;
    
    for (const { color, probability } of normalizedWeights) {
      cumulativeProbability += probability;
      if (random <= cumulativeProbability) {
        return color;
      }
    }

    return normalizedWeights[0].color; // Fallback
  };

  const analyzePatterns = () => {
    // Analyze number patterns from historical data
    const numberFrequencies: { [key: number]: number } = {};
    
    historicalDraws.forEach(draw => {
      draw.numbers.forEach(num => {
        numberFrequencies[num] = (numberFrequencies[num] || 0) + 1;
      });
    });

    // Select numbers based on frequency and patterns
    const selectedNumbers: number[] = [];
    while (selectedNumbers.length < 6) {
      const availableNumbers = Object.entries(numberFrequencies)
        .filter(([num]) => !selectedNumbers.includes(parseInt(num)))
        .sort((a, b) => b[1] - a[1]);

      if (availableNumbers.length === 0) break;

      // Add some randomness to selection
      const randomIndex = Math.floor(Math.random() * Math.min(3, availableNumbers.length));
      selectedNumbers.push(parseInt(availableNumbers[randomIndex][0]));
    }

    return {
      numbers: selectedNumbers,
      color: predictColor()
    };
  };

  const generatePrediction = () => {
    const newPrediction = analyzePatterns();
    
    setPrediction(newPrediction);
    setPreviousPredictions(prev => [...prev, newPrediction].slice(-3));
    
    toast({
      title: "New Prediction Generated",
      description: `Predicted numbers: ${newPrediction.numbers.join(', ')} (${newPrediction.color})`,
    });

    console.log('Generated prediction:', newPrediction);
    console.log('Previous predictions:', previousPredictions);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <Button onClick={generatePrediction}>Generate Prediction</Button>
        <div className="text-lg font-semibold">
          Next Draw: {nextDrawTime}s
        </div>
      </div>
      
      {prediction && (
        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4">Predicted Numbers:</h3>
          <div className="flex flex-wrap gap-3 mb-4">
            {prediction.numbers.map((num, idx) => (
              <div
                key={idx}
                className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold ${
                  prediction.color === 'red' ? 'bg-red-500' :
                  prediction.color === 'blue' ? 'bg-blue-500' :
                  'bg-green-500'
                }`}
              >
                {num}
              </div>
            ))}
          </div>
          
          <p className="mt-4 text-sm text-muted-foreground">
            Prediction based on pattern analysis and historical data
          </p>
          
          <div className="mt-4">
            <h4 className="text-sm font-medium mb-2">Recent Predictions:</h4>
            <div className="space-y-2">
              {previousPredictions.slice(-3).map((pred, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <div className="flex gap-1">
                    {pred.numbers.map((num, idx) => (
                      <div
                        key={idx}
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm ${
                          pred.color === 'red' ? 'bg-red-500' :
                          pred.color === 'blue' ? 'bg-blue-500' :
                          'bg-green-500'
                        }`}
                      >
                        {num}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default PredictionGenerator;