export type TaskValidation =
  | { valid: true; title: string; description: string }
  | { valid: false; message: string };
