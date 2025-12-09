import type { NextApiRequest, NextApiResponse } from 'next';
import { getTemplateById, Template } from '@/utils/storage';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Template | { error: string }>
) {
  const { id } = req.query;

  if (req.method === 'GET') {
    const template = getTemplateById(id as string);

    if (!template) {
      return res.status(404).json({ error: 'Template not found' });
    }

    res.status(200).json(template);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
