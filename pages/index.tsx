import { useEffect, useState } from 'react';
import Link from 'next/link';
import Layout from '@/components/Layout';
import { Template } from '@/utils/storage';

export default function Home() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    fetch('/api/templates')
      .then((res) => res.json())
      .then((data) => {
        setTemplates(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch templates', err);
        setLoading(false);
      });
  }, []);

  const filteredTemplates = templates.filter(t =>
    t.title.toLowerCase().includes(filter.toLowerCase()) ||
    t.tags.some(tag => tag.toLowerCase().includes(filter.toLowerCase()))
  );

  return (
    <Layout title="Vibe Coding | Library">
      {/* Hero / Search Section */}
      <div className="flex flex-col items-center justify-center py-10 mb-8">
        <h1 className="text-4xl sm:text-5xl font-normal text-gray-800 mb-6 text-center tracking-tight">
          What do you want to <span className="text-blue-600 font-medium">build</span> today?
        </h1>

        <div className="w-full max-w-2xl relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <span className="material-icons-round text-gray-400 group-focus-within:text-blue-500 transition-colors">search</span>
          </div>
          <input
            type="text"
            className="w-full pl-12 pr-4 py-4 rounded-full border border-gray-200 shadow-sm focus:shadow-md focus:border-transparent focus:ring-2 focus:ring-blue-100 outline-none transition-all text-lg text-gray-700 placeholder-gray-400"
            placeholder="Search templates, tags, or ideas..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
      </div>

      {/* Content Grid */}
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <Link key={template.id} href={`/templates/${template.id}`} className="group">
              <article className="bg-white rounded-2xl p-6 h-full border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col hover:-translate-y-1">
                <div className="flex items-start justify-between mb-3">
                  <div className="p-2 bg-blue-50 rounded-xl text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <span className="material-icons-round text-2xl">
                      {template.tags.includes('Agentic') ? 'smart_toy' : 'code'}
                    </span>
                  </div>
                  {template.tags.includes('Expert') && (
                    <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-bold uppercase tracking-wide rounded-md">
                      Expert
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-medium text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                  {template.title}
                </h3>

                <p className="text-gray-500 text-sm leading-relaxed mb-4 flex-grow">
                  {template.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-auto">
                  {template.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-medium">
                      {tag}
                    </span>
                  ))}
                  {template.tags.length > 3 && (
                    <span className="px-3 py-1 bg-gray-50 text-gray-400 text-xs rounded-full font-medium">
                      +{template.tags.length - 3}
                    </span>
                  )}
                </div>
              </article>
            </Link>
          ))}

          {filteredTemplates.length === 0 && (
            <div className="col-span-full text-center py-20 text-gray-500">
              <span className="material-icons-round text-4xl mb-2 text-gray-300">search_off</span>
              <p>No templates found matching "{filter}"</p>
            </div>
          )}
        </div>
      )}
    </Layout>
  );
}
