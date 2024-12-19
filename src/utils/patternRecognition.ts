interface Pattern {
  sequence: string[];
  frequency: number;
  lastOccurrence: number;
}

export const findPatterns = (history: string[], patternLength: number = 3): Pattern[] => {
  const patterns: { [key: string]: Pattern } = {};
  
  // Look for patterns of specified length in history
  for (let i = 0; i <= history.length - patternLength; i++) {
    const sequence = history.slice(i, i + patternLength);
    const patternKey = sequence.join(',');
    
    if (!patterns[patternKey]) {
      patterns[patternKey] = {
        sequence,
        frequency: 1,
        lastOccurrence: i
      };
    } else {
      patterns[patternKey].frequency++;
      patterns[patternKey].lastOccurrence = i;
    }
  }
  
  return Object.values(patterns).sort((a, b) => b.frequency - a.frequency);
};

export const predictNextColor = (history: string[]): string => {
  const patterns = findPatterns(history);
  const recentColors = history.slice(-3);
  
  // Find matching patterns
  const matchingPatterns = patterns.filter(pattern => 
    pattern.sequence.slice(0, -1).every((color, index) => 
      color === recentColors[index]
    )
  );
  
  if (matchingPatterns.length > 0) {
    // Return the last color of the most frequent matching pattern
    return matchingPatterns[0].sequence[matchingPatterns[0].sequence.length - 1];
  }
  
  // Fallback to frequency-based prediction
  const colorFrequency: { [key: string]: number } = {};
  history.forEach(color => {
    colorFrequency[color] = (colorFrequency[color] || 0) + 1;
  });
  
  const mostFrequentColor = Object.entries(colorFrequency)
    .sort(([, a], [, b]) => b - a)[0][0];
    
  return mostFrequentColor;
};

export const getPatternConfidence = (patterns: Pattern[], prediction: string): number => {
  if (patterns.length === 0) return 0;
  
  const matchingPattern = patterns.find(p => 
    p.sequence[p.sequence.length - 1] === prediction
  );
  
  if (!matchingPattern) return 0;
  
  // Calculate confidence based on pattern frequency and recency
  const maxFrequency = Math.max(...patterns.map(p => p.frequency));
  const frequencyWeight = matchingPattern.frequency / maxFrequency;
  const recencyWeight = 1 - (matchingPattern.lastOccurrence / patterns.length);
  
  return (frequencyWeight * 0.7 + recencyWeight * 0.3) * 100;
};