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
    <Layout title="The Zero-Debt Index | Library">
      {/* Hero / Search Section */}
      <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-normal tracking-tight mb-6 text-[#202124]">
            Gemini Vibe Station
          </h1>
          <p className="text-xl text-[#5f6368] max-w-2xl mx-auto leading-relaxed">
            Curated, high-frequency prompts for modern software development.
            <br />
            <span className="text-[#1a73e8] font-medium">Stop writing boilerplate. Start vibe coding.</span>
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <span className="material-icons-round text-gray-400 group-focus-within:text-[#1a73e8]">search</span>
            </div>
            <input
              type="text"
              placeholder="Search templates..."
              className="block w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-full leading-5 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#1a73e8] transition-all shadow-sm hover:shadow-md"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>
        </div>

        {/* Template Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-12 h-12 border-4 border-blue-200 border-t-[#1a73e8] rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map((template) => (
              <Link key={template.id} href={`/templates/${template.id}`} className="group">
                <div className="bg-white rounded-xl border border-gray-200 p-6 h-full hover:shadow-lg hover:border-blue-200 transition-all duration-200 flex flex-col">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-[#1a73e8] group-hover:bg-[#1a73e8] group-hover:text-white transition-colors">
                      <span className="material-icons-round text-xl">
                        {template.tags.includes('Game') ? 'sports_esports' :
                         template.tags.includes('Web') ? 'language' :
                         template.tags.includes('Mobile') ? 'smartphone' : 'code'}
                      </span>
                    </div>
                    <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-md">
                      {template.id}
                    </span>
                  </div>

                  <h3 className="text-lg font-medium text-[#202124] mb-2 group-hover:text-[#1a73e8] transition-colors">
                    {template.title}
                  </h3>

                  <p className="text-[#5f6368] text-sm leading-relaxed mb-4 flex-grow line-clamp-3">
                    {template.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-auto">
                    {template.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="text-xs font-medium text-[#5f6368] bg-gray-50 px-2 py-1 rounded border border-gray-100">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
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
