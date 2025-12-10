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

  const getCleanTemplate = () => {
    if (!template) return null;
    const { id, title, tags, author, createdAt, version, prompt, ...clean } = template;
    return clean;
  };

  const handleCopy = () => {
    if (!template) return;
    // Construct a copyable prompt from the structured data
    const inputsSection = template.inputs && template.inputs.length > 0
      ? `**Inputs**:\n${template.inputs.map(i => `- ${i.name} (${i.type}): ${i.description} [Default: ${i.default}]`).join('\n')}\n\n`
      : '';

    const phasesSection = template.phases && template.phases.length > 0
      ? template.phases.map(p => `**Phase ${p.name}**: ${p.goal}\n**Instructions**:\n${p.instructions}`).join('\n\n')
      : (template.prompt || '');

    const fullPrompt = `**System Role**: ${template.systemRole || 'General Assistant'}\n\n` +
      `**Objective**: ${template.description}\n\n` +
      inputsSection +
      phasesSection +
      `\n\n**Verification**:\n${template.verification?.manualCheck || ''}`;

    navigator.clipboard.writeText(fullPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center py-20">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-[#1a73e8] rounded-full animate-spin"></div>
        </div>
      </Layout>
    );
  }

  if (!template) {
    return (
      <Layout>
        <div className="text-center py-20">
          <h2 className="text-2xl font-medium text-[#202124]">Template not found</h2>
          <button onClick={() => router.push('/')} className="mt-4 text-[#1a73e8] hover:underline">
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
            className="mb-6 flex items-center text-[#5f6368] hover:text-[#202124] transition-colors text-sm font-medium"
          >
            <span className="material-icons-round text-lg mr-1">arrow_back</span>
            Back to Station
          </button>

          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-normal text-[#202124] mb-4 tracking-tight">
                {template.title}
              </h1>
              <p className="text-xl text-[#5f6368] font-light leading-relaxed max-w-2xl">
                {template.description}
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <button
                onClick={handleCopy}
                className={`flex items-center gap-2 px-6 py-3 rounded-full shadow-sm hover:shadow-md transition-all transform active:scale-95 font-medium text-sm tracking-wide ${
                  copied
                    ? 'bg-green-50 text-green-700 border border-green-200'
                    : 'bg-[#1a73e8] hover:bg-[#1557b0] text-white'
                }`}
              >
                <span className="material-icons-round">
                  {copied ? 'check' : 'content_copy'}
                </span>
                {copied ? 'Copied Text' : 'Copy Agent Spec'}
              </button>

              <button
                onClick={() => {
                  const clean = getCleanTemplate();
                  if (clean) {
                    navigator.clipboard.writeText(JSON.stringify(clean, null, 2));
                    alert("Clean JSON Copied to Clipboard!");
                  }
                }}
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-gray-50 text-[#5f6368] border border-gray-300 shadow-sm transition-all transform active:scale-95 font-medium text-sm tracking-wide"
              >
                <span className="material-icons-round">data_object</span>
                Copy JSON
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 items-center mt-6">
            {template.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 bg-gray-100 text-[#5f6368] rounded-full text-xs font-medium border border-gray-200">
                {tag}
              </span>
            ))}
            <span className="text-gray-300 mx-2">|</span>
            <span className="text-xs text-[#5f6368]">
              v{template.version || '1.0.0'} • {template.author || 'Anonymous'}
            </span>
          </div>
        </div>

        {/* System Role Card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">

            {/* System Role (New Schema) */}
            {template.systemRole && (
              <section className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <h2 className="text-sm font-bold text-[#1a73e8] uppercase tracking-wider mb-4 flex items-center gap-2">
                  <span className="material-icons-round text-lg">psychology</span>
                  System Role
                </h2>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 font-mono text-[#202124] leading-relaxed text-sm">
                  {template.systemRole}
                </div>
              </section>
            )}

            {/* Phases (New Schema) */}
            {template.phases && template.phases.length > 0 ? (
              <section>
                <h2 className="text-sm font-bold text-[#5f6368] uppercase tracking-wider mb-6 flex items-center gap-2">
                  <span className="material-icons-round text-lg">list_alt</span>
                  Execution Phases
                </h2>
                <div className="space-y-6">
                  {template.phases.map((phase, index) => (
                    <div key={index} className="relative pl-8 border-l-2 border-gray-200 hover:border-[#1a73e8] transition-colors group">
                      <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white border-2 border-gray-300 group-hover:border-[#1a73e8] transition-colors" />
                      <div className="mb-2">
                        <span className="text-xs font-bold text-[#5f6368] uppercase tracking-wider">Phase {index + 1}</span>
                        <h3 className="text-lg font-medium text-[#202124]">{phase.name}</h3>
                        <p className="text-[#5f6368] text-sm italic">{phase.goal}</p>
                      </div>
                      <div className="bg-white rounded-lg p-4 border border-gray-200 text-[#202124] whitespace-pre-wrap font-mono text-sm shadow-sm">
                        {phase.instructions}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ) : (
              /* Legacy Fallback */
              <section className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                 <h2 className="text-sm font-bold text-[#5f6368] uppercase tracking-wider mb-4">Legacy Prompt Content</h2>
                 <div className="bg-gray-50 rounded-lg p-6 border border-gray-100 overflow-x-auto">
                    <pre className="font-mono text-sm text-[#202124] whitespace-pre-wrap leading-relaxed">
                      {template.prompt || "No content available."}
                    </pre>
                 </div>
              </section>
            )}

          </div>

          {/* Sidebar */}
          <div className="space-y-8">

            {/* Verification */}
            <section className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <h2 className="text-sm font-bold text-[#188038] uppercase tracking-wider mb-4 flex items-center gap-2">
                <span className="material-icons-round text-lg">verified</span>
                Verification
              </h2>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 text-[#202124] text-sm whitespace-pre-wrap">
                {template.verification?.manualCheck || "No verification steps provided."}
              </div>
            </section>

            {/* Inputs */}
            {template.inputs && template.inputs.length > 0 && (
              <section className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <h2 className="text-sm font-bold text-[#f9ab00] uppercase tracking-wider mb-4 flex items-center gap-2">
                  <span className="material-icons-round text-lg">input</span>
                  Inputs
                </h2>
                <div className="space-y-4">
                  {template.inputs.map((input) => (
                    <div key={input.name} className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-bold text-[#202124] font-mono">{input.name}</span>
                        <span className="text-xs text-[#5f6368] uppercase">{input.type}</span>
                      </div>
                      <p className="text-xs text-[#5f6368] mb-2">{input.description}</p>
                      {input.default && (
                         <div className="text-xs text-[#5f6368] font-mono bg-gray-200 px-2 py-1 rounded inline-block">
                           Default: {String(input.default)}
                         </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

          </div>
        </div>

      </div>
    </Layout>
  );
}
