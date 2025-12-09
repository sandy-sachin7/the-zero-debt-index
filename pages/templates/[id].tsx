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
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
        </div>
      </Layout>
    );
  }

  if (!template) {
    return (
      <Layout>
        <div className="text-center py-20">
          <h2 className="text-2xl font-medium text-gray-800">Template not found</h2>
          <button onClick={() => router.push('/')} className="mt-4 text-blue-600 hover:underline">
            Return to Library
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title={`${template.title} | Vibe Coding`}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="mb-6 flex items-center text-gray-500 hover:text-gray-800 transition-colors text-sm font-medium"
          >
            <span className="material-icons-round text-lg mr-1">arrow_back</span>
            Back
          </button>

          <h1 className="text-3xl sm:text-4xl font-normal text-gray-900 mb-4 tracking-tight">
            {template.title}
          </h1>

          <p className="text-xl text-gray-500 font-light leading-relaxed mb-6">
            {template.description}
          </p>

          <div className="flex flex-wrap gap-2 items-center">
            {template.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium border border-blue-100">
                {tag}
              </span>
            ))}
            <span className="text-gray-300 mx-2">|</span>
            <span className="text-sm text-gray-400 flex items-center gap-1">
              <span className="material-icons-round text-base">person</span>
              {template.author || 'Anonymous'}
            </span>
          </div>
        </div>

        {/* Prompt Card */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden relative">
          <div className="absolute top-4 right-4 z-10">
            <button
              onClick={handleCopy}
              className={`flex items-center gap-2 px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-all transform active:scale-95 font-medium ${
                copied
                  ? 'bg-green-100 text-green-800'
                  : 'bg-[#1a73e8] text-white hover:bg-[#1557b0]'
              }`}
            >
              <span className="material-icons-round">
                {copied ? 'check' : 'content_copy'}
              </span>
              {copied ? 'Copied' : 'Copy Prompt'}
            </button>
          </div>

          <div className="bg-gray-50 px-8 py-4 border-b border-gray-100">
            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Prompt Content</h2>
          </div>

          <div className="p-8 overflow-x-auto">
            <pre className="font-mono text-sm text-gray-800 whitespace-pre-wrap leading-relaxed">
              {template.prompt}
            </pre>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-12 bg-blue-50 rounded-2xl p-8 border border-blue-100 flex gap-6 items-start">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-blue-600 shadow-sm flex-shrink-0">
             <span className="material-icons-round text-2xl">lightbulb</span>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">How to use</h3>
            <p className="text-gray-600 leading-relaxed">
              Copy the prompt above and paste it into <strong>Google AI Studio</strong>, <strong>Gemini Advanced</strong>, or your local agentic environment.
              These prompts are optimized for "Vibe Coding" — providing high-level intent while letting the AI handle the implementation details.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
