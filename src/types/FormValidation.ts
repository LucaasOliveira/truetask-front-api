export type FormValidation =
  | { valid: true; email: string; password: string }
  | { valid: false; message: string };
