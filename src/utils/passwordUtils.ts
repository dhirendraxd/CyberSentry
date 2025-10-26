
interface PasswordStrengthResult {
  score: number;
  hasLength: boolean;
  hasUppercase: boolean;
  hasLowercase: boolean;
  hasNumber: boolean;
  hasSpecial: boolean;
  hasNoCommon: boolean;
}

// List of common passwords
const commonPasswords = [
  'password', 'password123', '123456', 'qwerty', 'admin', 
  'welcome', 'abc123', 'letmein', 'monkey', 'football',
  'iloveyou', 'admin123', 'baseball', 'dragon', 'sunshine',
  'princess', 'qwerty123', 'shadow', 'superman', 'welcome123',
  'master', 'login', 'batman'
];

// Analyze password strength
export const analyzePasswordStrength = (password: string): PasswordStrengthResult => {
  const hasLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);
  
  // Check if password is common
  const lowerPassword = password.toLowerCase();
  const hasNoCommon = !commonPasswords.some(common => 
    lowerPassword === common || lowerPassword.includes(common)
  );
  
  // Calculate score (0-4)
  let score = 0;
  
  if (password.length === 0) {
    return {
      score: 0,
      hasLength,
      hasUppercase,
      hasLowercase,
      hasNumber,
      hasSpecial,
      hasNoCommon
    };
  }
  
  // Add points for each criteria
  if (hasLength) score++;
  if (hasUppercase) score++;
  if (hasLowercase) score++;
  if (hasNumber) score++;
  if (hasSpecial) score++;
  
  // Decrease score for common passwords
  if (!hasNoCommon) score = Math.max(1, score - 2);
  
  // Cap at 4
  score = Math.min(4, score);
  
  return {
    score,
    hasLength,
    hasUppercase,
    hasLowercase,
    hasNumber,
    hasSpecial,
    hasNoCommon
  };
};

// Generate secure password
export const generatePassword = (
  length: number = 16,
  includeUppercase: boolean = true,
  includeLowercase: boolean = true,
  includeNumbers: boolean = true,
  includeSymbols: boolean = true
): string => {
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
  
  let chars = '';
  
  if (includeUppercase) chars += uppercase;
  if (includeLowercase) chars += lowercase;
  if (includeNumbers) chars += numbers;
  if (includeSymbols) chars += symbols;
  
  // Default to lowercase if nothing is selected
  if (chars === '') chars = lowercase;
  
  let password = '';
  
  // Ensure at least one character from each selected type
  if (includeUppercase) {
    password += uppercase.charAt(Math.floor(Math.random() * uppercase.length));
  }
  if (includeLowercase) {
    password += lowercase.charAt(Math.floor(Math.random() * lowercase.length));
  }
  if (includeNumbers) {
    password += numbers.charAt(Math.floor(Math.random() * numbers.length));
  }
  if (includeSymbols) {
    password += symbols.charAt(Math.floor(Math.random() * symbols.length));
  }
  
  // Fill the rest of the password
  const remainingLength = length - password.length;
  
  for (let i = 0; i < remainingLength; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    password += chars.charAt(randomIndex);
  }
  
  // Shuffle the password characters to randomize the guaranteed characters' positions
  return shuffleString(password);
};

// Shuffle a string
const shuffleString = (str: string): string => {
  const array = str.split('');
  
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  
  return array.join('');
};
