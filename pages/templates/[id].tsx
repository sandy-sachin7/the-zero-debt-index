import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import { Template } from '@/types/template';

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
    // Construct a copyable prompt from the structured data
    const fullPrompt = `**System Role**: ${template.systemRole}\n\n` +
      `**Objective**: ${template.description}\n\n` +
      template.phases.map(p => `**Phase ${p.name}**: ${p.goal}\n${p.instructions}`).join('\n\n') +
      `\n\n**Verification**:\n${template.verification?.manualCheck || ''}`;

    navigator.clipboard.writeText(fullPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center py-20">
          <div className="w-12 h-12 border-4 border-fuchsia-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </Layout>
    );
  }

  if (!template) {
    return (
      <Layout>
        <div className="text-center py-20">
          <h2 className="text-2xl font-medium text-slate-300">Template not found</h2>
          <button onClick={() => router.push('/')} className="mt-4 text-fuchsia-400 hover:underline">
            Return to Station
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title={`${template.title} | Gemini Vibe Station`}>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <button
            onClick={() => router.back()}
            className="mb-6 flex items-center text-slate-500 hover:text-white transition-colors text-sm font-medium"
          >
            <span className="material-icons-round text-lg mr-1">arrow_back</span>
            Back to Station
          </button>

          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                {template.title}
              </h1>
              <p className="text-xl text-slate-400 font-light leading-relaxed max-w-2xl">
                {template.description}
              </p>
            </div>
            <button
              onClick={handleCopy}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all transform active:scale-95 font-bold text-sm uppercase tracking-wide ${
                copied
                  ? 'bg-green-500/20 text-green-400 border border-green-500/50'
                  : 'bg-fuchsia-600 hover:bg-fuchsia-500 text-white shadow-fuchsia-500/20'
              }`}
            >
              <span className="material-icons-round">
                {copied ? 'check' : 'content_copy'}
              </span>
              {copied ? 'Copied to Clipboard' : 'Copy Agent Spec'}
            </button>
          </div>

          <div className="flex flex-wrap gap-2 items-center mt-6">
            {template.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 bg-slate-800 text-slate-300 rounded-lg text-xs font-mono border border-slate-700">
                {tag}
              </span>
            ))}
            <span className="text-slate-600 mx-2">|</span>
            <span className="text-xs text-slate-500 font-mono">
              v{template.version || '1.0.0'} • {template.author || 'Anonymous'}
            </span>
          </div>
        </div>

        {/* System Role Card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">

            {/* System Role (New Schema) */}
            {template.systemRole && (
              <section className="bg-slate-900/50 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                <h2 className="text-sm font-bold text-fuchsia-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <span className="material-icons-round text-lg">psychology</span>
                  System Role
                </h2>
                <div className="bg-slate-950 rounded-xl p-4 border border-white/5 font-mono text-slate-300 leading-relaxed">
                  {template.systemRole}
                </div>
              </section>
            )}

            {/* Phases (New Schema) */}
            {template.phases && template.phases.length > 0 ? (
              <section>
                <h2 className="text-sm font-bold text-blue-400 uppercase tracking-wider mb-6 flex items-center gap-2">
                  <span className="material-icons-round text-lg">list_alt</span>
                  Execution Phases
                </h2>
                <div className="space-y-6">
                  {template.phases.map((phase, index) => (
                    <div key={index} className="relative pl-8 border-l-2 border-slate-800 hover:border-blue-500/50 transition-colors group">
                      <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-900 border-2 border-slate-700 group-hover:border-blue-500 transition-colors" />
                      <div className="mb-2">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Phase {index + 1}</span>
                        <h3 className="text-lg font-bold text-white">{phase.name}</h3>
                        <p className="text-slate-400 text-sm italic">{phase.goal}</p>
                      </div>
                      <div className="bg-slate-900/50 rounded-xl p-4 border border-white/5 text-slate-300 whitespace-pre-wrap font-mono text-sm">
                        {phase.instructions}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ) : (
              /* Legacy Fallback */
              <section className="bg-slate-900/50 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                 <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Legacy Prompt Content</h2>
                 <div className="bg-slate-950 rounded-xl p-6 border border-white/5 overflow-x-auto">
                    <pre className="font-mono text-sm text-slate-300 whitespace-pre-wrap leading-relaxed">
                      {template.prompt || "No content available."}
                    </pre>
                 </div>
              </section>
            )}

          </div>

          {/* Sidebar */}
          <div className="space-y-8">

            {/* Verification */}
            <section className="bg-slate-900/50 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <h2 className="text-sm font-bold text-green-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                <span className="material-icons-round text-lg">verified</span>
                Verification
              </h2>
              <div className="bg-slate-950 rounded-xl p-4 border border-white/5 text-slate-300 text-sm whitespace-pre-wrap">
                {template.verification?.manualCheck || "No verification steps provided."}
              </div>
            </section>

            {/* Inputs (Placeholder for now) */}
            <section className="bg-slate-900/50 border border-white/10 rounded-2xl p-6 backdrop-blur-sm opacity-50">
              <h2 className="text-sm font-bold text-yellow-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                <span className="material-icons-round text-lg">input</span>
                Inputs (Coming Soon)
              </h2>
              <p className="text-xs text-slate-500">
                Configurable variables will appear here in the next version.
              </p>
            </section>

          </div>
        </div>

      </div>
    </Layout>
  );
}
