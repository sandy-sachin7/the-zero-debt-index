import { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';

export default function AddTemplate() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tags: '',
    prompt: '',
    author: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const tagsArray = formData.tags.split(',').map((t) => t.trim()).filter(Boolean);

      const res = await fetch('/api/templates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          tags: tagsArray,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to create template');
      }

      router.push('/');
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Please try again.');
      setSubmitting(false);
    }
  };

  return (
    <Layout title="New Template | Vibe Coding">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-normal text-gray-900 mb-2">Create a new template</h1>
          <p className="text-gray-500">Share your best prompts with the community</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-200 space-y-6">
          {error && (
            <div className="bg-red-50 text-red-700 px-4 py-3 rounded-xl text-sm flex items-center gap-2">
              <span className="material-icons-round text-base">error</span>
              {error}
            </div>
          )}

          {/* Title Input */}
          <div className="group">
            <label htmlFor="title" className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 ml-1">
              Template Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-gray-800 placeholder-gray-400"
              placeholder="e.g., React Dashboard"
            />
          </div>

          {/* Description Input */}
          <div>
            <label htmlFor="description" className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 ml-1">
              Short Description
            </label>
            <input
              type="text"
              id="description"
              name="description"
              required
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-gray-800 placeholder-gray-400"
              placeholder="Briefly describe what this app does"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Tags Input */}
            <div>
              <label htmlFor="tags" className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 ml-1">
                Tags
              </label>
              <input
                type="text"
                id="tags"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-gray-800 placeholder-gray-400"
                placeholder="React, Dashboard, Crypto"
              />
            </div>

            {/* Author Input */}
            <div>
              <label htmlFor="author" className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 ml-1">
                Author
              </label>
              <input
                type="text"
                id="author"
                name="author"
                value={formData.author}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-gray-800 placeholder-gray-400"
                placeholder="Your Name"
              />
            </div>
          </div>

          {/* Prompt Input */}
          <div>
            <label htmlFor="prompt" className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 ml-1">
              Prompt Content
            </label>
            <div className="relative">
              <textarea
                id="prompt"
                name="prompt"
                required
                rows={12}
                value={formData.prompt}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-gray-800 font-mono text-sm leading-relaxed placeholder-gray-400 resize-y"
                placeholder="Paste the full prompt here..."
              />
              <div className="absolute bottom-3 right-3 text-gray-400 pointer-events-none">
                <span className="material-icons-round text-lg">code</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-6 flex justify-end gap-4 border-t border-gray-100">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-2.5 rounded-full text-gray-600 font-medium hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-8 py-2.5 bg-[#1a73e8] text-white rounded-full font-medium shadow-md hover:shadow-lg hover:bg-[#1557b0] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {submitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Saving...
                </>
              ) : (
                'Save Template'
              )}
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
