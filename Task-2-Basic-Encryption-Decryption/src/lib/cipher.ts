/**
 * Applies a Caesar Cipher to the input text.
 * - Shifts only alphabets.
 * - Preserves case, spaces, numbers, and punctuation.
 * - Handles negative shifts and shifts larger than 26.
 * 
 * @param text The input text to process.
 * @param shift The number of positions to shift.
 * @returns The encrypted text.
 */
export function encrypt(text: string, shift: number): string {
  // Normalize shift to always be a positive value between 0 and 25
  const normalizedShift = ((shift % 26) + 26) % 26;
  
  if (normalizedShift === 0) return text;

  return text.replace(/[a-zA-Z]/g, (char) => {
    const isUpper = char <= 'Z';
    const base = isUpper ? 65 : 97; // 65 is 'A', 97 is 'a'
    const charCode = char.charCodeAt(0);
    
    return String.fromCharCode(((charCode - base + normalizedShift) % 26) + base);
  });
}

/**
 * Decrypts a Caesar Cipher by reversing the shift.
 * 
 * @param text The input text to decrypt.
 * @param shift The original shift value used for encryption.
 * @returns The decrypted text.
 */
export function decrypt(text: string, shift: number): string {
  return encrypt(text, -shift);
}
