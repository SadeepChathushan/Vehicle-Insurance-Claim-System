// Escape potentially dangerous characters for XSS
export const sanitizeString = (value) => {
    if (typeof value === 'string') {
      return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
    }
    return value;
  };
  
  // Existing regex patterns for validation
  const patterns = {
    fullName: /^[a-zA-Z\s]{3,30}$/, // Alphabets and spaces, 3-30 characters
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/, // Email regex
    contactNo: /^\+?[0-9]{10,15}$/, // Phone number with optional "+"
    nic: /^([0-9]{9}[vV])|([0-9]{12})$/, // NIC validation for both formats
    password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/, // Password: 8-20 chars, one digit, lowercase, and uppercase
    normalText: /^[a-zA-Z0-9\s,'-]{1,200}$/, // Normal text validation with safe characters, 1-200 chars
  };
  
  // Validate each field based on regex and sanitize
  export const validateField = (fieldName, value) => {
    const sanitizedValue = sanitizeString(value); // Sanitize the input
    const pattern = patterns[fieldName];
    return pattern ? pattern.test(sanitizedValue) : true; // Validate against pattern
  };
  
  // Validate all fields at once
  export const validateAllFields = (formData) => {
    const errors = {};
    Object.keys(formData).forEach((key) => {
      if (!validateField(key, formData[key])) {
        errors[key] = `Invalid ${key}`;
      }
    });
    return errors;
  };
  