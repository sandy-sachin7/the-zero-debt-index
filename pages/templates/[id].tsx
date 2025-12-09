import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import { Template } from '@/utils/storage';

export default function TemplateDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [template, setTemplate] = useState<Template | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/templates/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Not found');
        return res.json();
      })
      .then((data) => {
        setTemplate(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  const handleCopy = () => {
    if (!template) return;
    navigator.clipboard.writeText(template.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      </Layout>
    );
  }

  if (!template) {
    return (
      <Layout>
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold text-gray-900">Template not found</h2>
          <button onClick={() => router.push('/')} className="mt-4 text-blue-600 hover:underline">
            Go back home
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title={`${template.title} | Vibe Coding Kit`}>
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <button onClick={() => router.back()} className="text-sm text-gray-500 hover:text-gray-900 mb-4 flex items-center gap-1">
            ← Back to templates
          </button>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{template.title}</h1>
          <p className="text-lg text-gray-600 mb-4">{template.description}</p>
          <div className="flex flex-wrap gap-2 mb-6">
            {template.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-700">
                {tag}
              </span>
            ))}
          </div>
          <div className="flex items-center text-sm text-gray-500 gap-4">
             <span>Author: {template.author || 'Anonymous'}</span>
             <span>Added: {new Date(template.createdAt).toLocaleDateString()}</span>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="font-semibold text-gray-700">Prompt</h2>
            <button
              onClick={handleCopy}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                copied
                  ? 'bg-green-100 text-green-700'
                  : 'bg-black text-white hover:bg-gray-800'
              }`}
            >
              {copied ? 'Copied!' : 'Copy Prompt'}
            </button>
          </div>
          <div className="p-6 bg-gray-50/50">
            <pre className="whitespace-pre-wrap font-mono text-sm text-gray-800 bg-white p-4 rounded-lg border border-gray-200 overflow-x-auto">
              {template.prompt}
            </pre>
          </div>
        </div>

        <div className="mt-8 bg-blue-50 rounded-xl p-6 border border-blue-100">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">How to use this prompt</h3>
          <ol className="list-decimal list-inside text-blue-800 space-y-2">
            <li>Click the <strong>Copy Prompt</strong> button above.</li>
            <li>Open <a href="https://aistudio.google.com/" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-600">Google AI Studio</a> or your preferred AI coding assistant.</li>
            <li>Paste the prompt into the chat.</li>
            <li>Watch as the AI generates your application code!</li>
            <li>Iterate by asking for refinements or additional features.</li>
          </ol>
        </div>
      </div>
    </Layout>
  );
}
