export function removeHtmlTags(input: string) {
  if (!input) return input;
  return input.replace(/<[^>]*>/g, '');
}
