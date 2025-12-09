import type { NextApiRequest, NextApiResponse } from 'next';
import { getTemplates, Template } from '@/utils/storage';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Template[] | { error: string }>
) {
  if (req.method === 'GET') {
    const templates = await getTemplates();
    res.status(200).json(templates);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
