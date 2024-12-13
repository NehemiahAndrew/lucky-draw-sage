interface FrequencyData {
  number: number;
  frequency: number;
  status: string;
  lastDrawn: number;
  winningProbability: number;
}

export const calculateStatistics = (data: FrequencyData[]) => {
  // Sort data by frequency
  const sortedByFrequency = [...data].sort((a, b) => b.frequency - a.frequency);
  
  // Calculate average frequency
  const totalFrequency = data.reduce((sum, item) => sum + item.frequency, 0);
  const averageFrequency = totalFrequency / data.length;
  
  // Calculate variance and standard deviation
  const squaredDiffs = data.map(item => 
    Math.pow(item.frequency - averageFrequency, 2)
  );
  const variance = squaredDiffs.reduce((sum, diff) => sum + diff, 0) / data.length;
  const standardDeviation = Math.sqrt(variance);
  
  // Get most and least frequent numbers
  const mostFrequent = sortedByFrequency
    .slice(0, 5)
    .map(item => item.number);
    
  const leastFrequent = sortedByFrequency
    .slice(-5)
    .reverse()
    .map(item => item.number);
    
  return {
    mostFrequent,
    leastFrequent,
    averageFrequency,
    variance,
    standardDeviation
  };
};