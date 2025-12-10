export interface TemplateInput {
  name: string;
  type: 'string' | 'boolean' | 'select' | 'number';
  description: string;
  default?: string | boolean | number;
  options?: string[]; // For 'select' type
}

export interface TemplatePhase {
  name: string;
  goal: string;
  tools?: string[]; // e.g., ["write_to_file", "run_command"]
  instructions: string; // Detailed, step-by-step instructions
}

export interface TemplateVerification {
  autoCheck?: string; // Command to run for automated verification
  manualCheck?: string; // Instructions for manual verification
}

export interface Template {
  id: string;
  title: string;
  description: string;
  tags: string[];
  author: string;
  createdAt: string;
  version: string;

  // The "Contract"
  inputs: TemplateInput[];

  // Legacy Support
  prompt?: string;

  // The "Vibe" & System Instructions
  systemRole?: string;

  // Execution Spec
  phases?: TemplatePhase[];

  // Verification
  verification?: TemplateVerification;
}
