import type { NextApiRequest, NextApiResponse } from 'next';
import { getTemplates, addTemplate, Template } from '@/utils/storage';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Template[] | Template | { error: string }>
) {
  if (req.method === 'GET') {
    const templates = getTemplates();
    res.status(200).json(templates);
  } else if (req.method === 'POST') {
    const { title, description, tags, prompt, author } = req.body;

    if (!title || !description || !prompt) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newTemplate = addTemplate({
      title,
      description,
      tags: Array.isArray(tags) ? tags : [],
      prompt,
      author: author || 'Anonymous',
    });

    res.status(201).json(newTemplate);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
