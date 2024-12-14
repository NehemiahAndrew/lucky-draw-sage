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

  // Calculate median frequency
  const medianFrequency = calculateMedian(data.map(item => item.frequency));
  
  // Calculate mode frequency
  const modeFrequency = calculateMode(data.map(item => item.frequency));
  
  // Calculate quartiles
  const frequencies = data.map(item => item.frequency).sort((a, b) => a - b);
  const q1 = calculateQuartile(frequencies, 0.25);
  const q3 = calculateQuartile(frequencies, 0.75);
  const iqr = q3 - q1;
    
  return {
    mostFrequent,
    leastFrequent,
    averageFrequency,
    variance,
    standardDeviation,
    medianFrequency,
    modeFrequency,
    quartiles: { q1, q3, iqr }
  };
};

const calculateMedian = (numbers: number[]): number => {
  const sorted = [...numbers].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  
  if (sorted.length % 2 === 0) {
    return (sorted[middle - 1] + sorted[middle]) / 2;
  }
  
  return sorted[middle];
};

const calculateMode = (numbers: number[]): number => {
  const frequency: { [key: number]: number } = {};
  let maxFreq = 0;
  let mode = numbers[0];

  numbers.forEach(num => {
    frequency[num] = (frequency[num] || 0) + 1;
    if (frequency[num] > maxFreq) {
      maxFreq = frequency[num];
      mode = num;
    }
  });

  return mode;
};

const calculateQuartile = (numbers: number[], percentile: number): number => {
  const position = (numbers.length - 1) * percentile;
  const base = Math.floor(position);
  const rest = position - base;
  
  if (numbers[base + 1] !== undefined) {
    return numbers[base] + rest * (numbers[base + 1] - numbers[base]);
  }
  
  return numbers[base];
};

export const calculateProbabilities = (data: FrequencyData[]): FrequencyData[] => {
  const totalDraws = data.reduce((sum, item) => sum + item.frequency, 0);
  const stats = calculateStatistics(data);
  
  return data.map(item => {
    // Enhanced probability calculation based on game patterns
    const frequencyWeight = item.frequency / totalDraws;
    const recencyWeight = Math.exp(-item.lastDrawn / 10); // Exponential decay for last drawn
    const streakAdjustment = item.lastDrawn < 3 ? 0.8 : 1.2; // Adjust for recent appearances
    
    const winningProbability = (frequencyWeight + recencyWeight) * streakAdjustment;
    
    return {
      ...item,
      winningProbability,
      status: determineNumberStatus(item.frequency, stats)
    };
  });
};

const determineNumberStatus = (frequency: number, stats: ReturnType<typeof calculateStatistics>): string => {
  const threshold = stats.standardDeviation;
  
  if (frequency > stats.averageFrequency + threshold) return 'hot';
  if (frequency < stats.averageFrequency - threshold) return 'cold';
  return 'neutral';
};