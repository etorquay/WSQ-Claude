#!/usr/bin/env node
/**
 * PreToolUse hook — form field validation guard
 *
 * Fires before any Edit or Write tool call that touches index.html.
 * Reads the current form field values from the tool input, validates
 * name / email / phone, and blocks the tool if any rule fails.
 *
 * Claude Code hook contract:
 *   stdin  → JSON: { tool_name, tool_input, ... }
 *   stdout → JSON: { decision: "approve" | "block", reason?: string }
 *   exit 0 always (non-zero would be treated as a system error)
 */

const RULES = {
  name: {
    re: /^[A-Za-zÀ-ÖØ-öø-ÿ'\- ]{2,80}$/,
    emptyMsg:   'Name is required.',
    invalidMsg: 'Name must be 2–80 letters, spaces, hyphens, or apostrophes — no digits.',
  },
  email: {
    re: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
    emptyMsg:   'Email address is required.',
    invalidMsg: 'Email must be a valid address (e.g. jane@company.com).',
  },
  phone: {
    re: /^\+?[\d\s\-().]{7,20}$/,
    optional:   true,
    invalidMsg: 'Phone number must be 7–20 digits and may include +, spaces, dashes, or parentheses.',
  },
};

let raw = '';
process.stdin.on('data', chunk => { raw += chunk; });
process.stdin.on('end', () => {
  let payload;
  try { payload = JSON.parse(raw); } catch { approve(); return; }

  const { tool_name, tool_input } = payload;

  // Only inspect Edit/Write calls that touch index.html
  const affectsIndex =
    tool_name === 'Write' && (tool_input?.file_path || '').endsWith('index.html') ||
    tool_name === 'Edit'  && (tool_input?.file_path || '').endsWith('index.html');

  if (!affectsIndex) { approve(); return; }

  // Extract form field values from the content being written/edited
  const content = tool_input?.new_string ?? tool_input?.content ?? '';

  // Only run field validation when the content contains actual submitted values
  // (i.e. a JSON body being POSTed, not HTML markup changes)
  const bodyMatch = content.match(/JSON\.stringify\((\{[^}]+\})\)/);
  if (!bodyMatch) { approve(); return; }

  let fields;
  try { fields = JSON.parse(bodyMatch[1]); } catch { approve(); return; }

  const errors = [];

  for (const [field, rule] of Object.entries(RULES)) {
    const value = (fields[field] ?? '').trim();

    if (!rule.optional && value.length === 0) {
      errors.push(`${field}: ${rule.emptyMsg}`);
      continue;
    }
    if (value.length > 0 && !rule.re.test(value)) {
      errors.push(`${field}: ${rule.invalidMsg}`);
    }
  }

  if (errors.length > 0) {
    block(`Form validation failed:\n${errors.map(e => `  • ${e}`).join('\n')}`);
  } else {
    approve();
  }
});

function approve() {
  process.stdout.write(JSON.stringify({ decision: 'approve' }));
  process.exit(0);
}

function block(reason) {
  process.stdout.write(JSON.stringify({ decision: 'block', reason }));
  process.exit(0);
}
