const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/templates.json');

function upgradeTemplates() {
  console.log('Starting Template Upgrade...');

  let templates = [];
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    templates = JSON.parse(data);
  } catch (err) {
    console.error('Error reading templates.json:', err);
    process.exit(1);
  }

  const upgradedTemplates = templates.map(t => {
    // If already upgraded, skip
    if (t.inputs && t.phases) return t;

    const promptText = t.prompt || "";

    // Extract System Role
    const systemRoleMatch = promptText.match(/\*\*System Role\*\*:\s*(.*?)(\n|$)/);
    const systemRole = systemRoleMatch ? systemRoleMatch[1].trim() : "You are an expert AI Assistant.";

    // Extract Phases
    const phases = [];
    const phaseRegex = /\*\*Phase (\d+)(?::\s*(.*?))?\*\*\n([\s\S]*?)(?=\*\*Phase|\*\*Verification|$)/g;
    let match;
    while ((match = phaseRegex.exec(promptText)) !== null) {
      phases.push({
        name: `Phase ${match[1]}`,
        goal: match[2] ? match[2].trim() : `Execute Step ${match[1]}`,
        tools: ["write_to_file", "run_command"], // Default tools
        instructions: match[3].trim()
      });
    }

    // If no phases found, treat the whole prompt (minus system role) as one phase
    if (phases.length === 0) {
      let cleanInstructions = promptText
        .replace(/\*\*System Role\*\*:\s*.*(\n|$)/, '')
        .replace(/\*\*Objective\*\*:\s*.*(\n|$)/, '')
        .trim();

      phases.push({
        name: "Execution",
        goal: "Complete the task",
        tools: ["write_to_file", "run_command"],
        instructions: cleanInstructions
      });
    }

    // Extract Verification
    const verificationMatch = promptText.match(/\*\*Verification\*\*:\s*([\s\S]*?)$/);
    const manualCheck = verificationMatch ? verificationMatch[1].trim() : "Verify the output matches the requirements.";

    return {
      id: t.id,
      title: t.title,
      description: t.description,
      tags: t.tags || [],
      author: t.author || "Community",
      createdAt: t.createdAt || new Date().toISOString(),
      version: "1.0.0",
      inputs: [], // Default to empty inputs for now
      systemRole: systemRole,
      phases: phases,
      verification: {
        manualCheck: manualCheck
      }
    };
  });

  fs.writeFileSync(filePath, JSON.stringify(upgradedTemplates, null, 2));
  console.log(`Upgraded ${upgradedTemplates.length} templates to Enterprise Schema.`);
}

upgradeTemplates();
