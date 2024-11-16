export const formatNumber = (value: string | number, decimals = 2): string => {
  const num = typeof value === 'string' ? Number(value) : value;
  
  if (isNaN(num)) return '0';
  
  if (num >= 1_000_000_000) {
    return (num / 1_000_000_000).toFixed(decimals) + 'B';
  }
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(decimals) + 'M';
  }
  if (num >= 1_000) {
    return (num / 1_000).toFixed(decimals) + 'K';
  }
  
  return num.toFixed(decimals);
};

export const formatUnits = (value: string, decimals: number): string => {
  try {
    const parsed = BigInt(value);
    const divisor = BigInt(10) ** BigInt(decimals);
    const beforeDecimal = parsed / divisor;
    const afterDecimal = parsed % divisor;
    
    // Format the result using the formatNumber function
    const fullNumber = Number(beforeDecimal.toString() + '.' + afterDecimal.toString().padStart(decimals, '0'));
    return formatNumber(fullNumber);
  } catch (error) {
    console.error('Error formatting units:', error);
    return '0';
  }
};

export const formatPercentage = (value: number): string => {
  if (value < 0.01 && value > 0) return '<0.01%';
  if (value > 99.99 && value < 100) return '99.99%';
  return value.toFixed(2) + '%';
};

export const formatAddress = (address: string, chars = 4): string => {
  if (!address) return '';
  return `${address.slice(0, chars)}...${address.slice(-chars)}`;
};

export const getProgressColor = (progress: number): string => {
  if (progress >= 100) return 'from-green-500 to-green-600';
  if (progress >= 75) return 'from-primary to-primary-dark';
  if (progress >= 50) return 'from-yellow-500 to-yellow-600';
  if (progress >= 25) return 'from-orange-500 to-orange-600';
  return 'from-red-500 to-red-600';
};