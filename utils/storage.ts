import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const FILE_PATH = path.join(DATA_DIR, 'templates.json');

export interface Template {
  id: string;
  title: string;
  description: string;
  tags: string[];
  prompt: string;
  author?: string;
  createdAt: string;
}

export const getTemplates = (): Template[] => {
  if (!fs.existsSync(FILE_PATH)) {
    return [];
  }
  const fileContent = fs.readFileSync(FILE_PATH, 'utf-8');
  try {
    return JSON.parse(fileContent);
  } catch (error) {
    console.error('Error parsing templates.json:', error);
    return [];
  }
};

export const getTemplateById = (id: string): Template | undefined => {
  const templates = getTemplates();
  return templates.find((t) => t.id === id);
};

export const addTemplate = (template: Omit<Template, 'id' | 'createdAt'>): Template => {
  const templates = getTemplates();
  const newTemplate: Template = {
    ...template,
    id: Date.now().toString(), // Simple ID generation
    createdAt: new Date().toISOString(),
  };
  templates.push(newTemplate);

  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  fs.writeFileSync(FILE_PATH, JSON.stringify(templates, null, 2));
  return newTemplate;
};
