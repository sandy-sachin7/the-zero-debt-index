const fs = require('fs');
const path = require('path');

const templatesPath = path.join(__dirname, '../data/templates.json');

try {
  const data = fs.readFileSync(templatesPath, 'utf8');
  const templates = JSON.parse(data);

  if (!Array.isArray(templates)) {
    throw new Error('Root element must be an array');
  }

  const ids = new Set();
  const errors = [];

  templates.forEach((template, index) => {
    // Check required fields
    const requiredFields = ['id', 'title', 'description', 'tags', 'systemRole', 'phases', 'verification'];
    requiredFields.forEach(field => {
      if (!template[field]) {
        errors.push(`Template #${index} (${template.id || 'unknown ID'}) missing required field: ${field}`);
      }
    });

    // Check ID uniqueness
    if (template.id) {
      if (ids.has(template.id)) {
        errors.push(`Duplicate ID found: ${template.id}`);
      }
      ids.add(template.id);
    }

    // Check Phases structure
    if (Array.isArray(template.phases)) {
      template.phases.forEach((phase, pIndex) => {
        if (!phase.name || !phase.goal || !phase.instructions) {
          errors.push(`Template ${template.id} Phase #${pIndex} missing required fields (name, goal, instructions)`);
        }
      });
    } else if (template.phases) {
      errors.push(`Template ${template.id} 'phases' must be an array`);
    }
  });

  if (errors.length > 0) {
    console.error('❌ Validation Failed:');
    errors.forEach(err => console.error(`  - ${err}`));
    process.exit(1);
  }

  console.log(`✅ Validation Passed: ${templates.length} templates checked.`);

} catch (err) {
  console.error('❌ Failed to read or parse templates.json:', err.message);
  process.exit(1);
}
