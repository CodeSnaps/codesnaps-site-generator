type Data = Array<{
  component: string;
  content: string;
}>;

export function estimateTokensCount(data: Data) {
  let totalTokens = 0;
  let alphanumericCharsCount = 0; // To count alphanumeric characters separately

  data.forEach((item) => {
    const chars = item.content.split('');

    chars.forEach((char) => {
      if (!char.match(/[A-Za-z0-9]/)) {
        totalTokens++; // Increment for special characters directly
      } else {
        alphanumericCharsCount++; // Count alphanumeric characters to process later
      }
    });
  });

  // For alphanumeric characters, we need to divide the count by 2 to get the tokens estimate
  const alphanumericTokens = alphanumericCharsCount / 2;
  totalTokens += alphanumericTokens;

  return Math.ceil(totalTokens);
}
