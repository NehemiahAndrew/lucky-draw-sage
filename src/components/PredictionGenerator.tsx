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

  // Historical patterns from recent draws
  const historicalDraws = [
    {
      numbers: [37, 32, 20, 41, 11, 34],
      colors: ['red', 'blue', 'blue', 'blue', 'blue', 'red']
    },
    {
      numbers: [20, 29, 11, 12, 31, 19],
      colors: ['blue', 'blue', 'blue', 'green', 'red', 'red']
    },
    {
      numbers: [22, 5, 20, 35, 46, 36],
      colors: ['red', 'blue', 'blue', 'blue', 'red', 'green']
    }
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

  const analyzePatterns = () => {
    // Analyze number patterns
    const numberFrequencies: { [key: number]: number } = {};
    const colorFrequencies: { [key: string]: number } = {};
    const numberColorPairs: { [key: number]: string[] } = {};

    // Process historical data
    historicalDraws.forEach(draw => {
      draw.numbers.forEach((num, idx) => {
        numberFrequencies[num] = (numberFrequencies[num] || 0) + 1;
        colorFrequencies[draw.colors[idx]] = (colorFrequencies[draw.colors[idx]] || 0) + 1;
        
        if (!numberColorPairs[num]) {
          numberColorPairs[num] = [];
        }
        numberColorPairs[num].push(draw.colors[idx]);
      });
    });

    // Calculate probabilities using Bayesian approach
    const totalDraws = historicalDraws.length;
    const numberProbabilities = Object.entries(numberFrequencies).map(([num, freq]) => ({
      number: parseInt(num),
      probability: freq / totalDraws,
      colors: numberColorPairs[parseInt(num)]
    }));

    // Select numbers based on probabilities and patterns
    const selectedNumbers: number[] = [];
    const usedPositions = new Set();

    while (selectedNumbers.length < 6) {
      const availableNumbers = numberProbabilities
        .filter(np => !selectedNumbers.includes(np.number))
        .sort((a, b) => b.probability - a.probability);

      if (availableNumbers.length === 0) break;

      // Add some randomness to avoid getting stuck in patterns
      const randomIndex = Math.floor(Math.random() * Math.min(3, availableNumbers.length));
      selectedNumbers.push(availableNumbers[randomIndex].number);
    }

    // Predict color based on historical color patterns for these numbers
    const predictedColor = Object.entries(colorFrequencies)
      .sort((a, b) => b[1] - a[1])[0][0];

    return {
      numbers: selectedNumbers,
      color: predictedColor
    };
  };

  const generatePrediction = () => {
    const newPrediction = analyzePatterns();
    
    setPrediction(newPrediction);
    setPreviousPredictions(prev => [...prev, newPrediction]);
    
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