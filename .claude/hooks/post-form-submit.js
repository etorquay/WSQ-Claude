#!/usr/bin/env node
/**
 * PostToolUse hook — form submission celebration
 *
 * Fires after any Edit/Write that touches index.html and contains
 * the onFormSuccess call, confirming the post-submit wiring is in place.
 *
 * On Windows it uses PowerShell SpeechSynthesizer to speak the
 * success message in the developer's OS so you can hear it while
 * working locally.
 *
 * Claude Code hook contract:
 *   stdin  → JSON: { tool_name, tool_input, tool_response, ... }
 *   stdout → ignored for PostToolUse
 *   exit 0 always
 */

const { execSync } = require('child_process');
const os = require('os');

const SUCCESS_MSG =
  'Hurray, thank you for your submission, we will get back to you in 3 business days.';

let raw = '';
process.stdin.on('data', chunk => { raw += chunk; });
process.stdin.on('end', () => {
  let payload;
  try { payload = JSON.parse(raw); } catch { process.exit(0); }

  const { tool_name, tool_input } = payload;

  // Only fire on Edit/Write calls to index.html that wire the success hook
  const affectsIndex =
    (tool_name === 'Write' || tool_name === 'Edit') &&
    (tool_input?.file_path || '').endsWith('index.html');

  if (!affectsIndex) { process.exit(0); }

  const content = tool_input?.new_string ?? tool_input?.content ?? '';
  if (!content.includes('onFormSuccess')) { process.exit(0); }

  speakOS(SUCCESS_MSG);
  process.exit(0);
});

function speakOS(text) {
  const platform = os.platform();
  const safe = text.replace(/'/g, "\\'");   // escape single quotes

  try {
    if (platform === 'win32') {
      // PowerShell built-in TTS — no extra deps needed
      execSync(
        `powershell -NoProfile -Command "` +
        `Add-Type -AssemblyName System.Speech; ` +
        `$s = New-Object System.Speech.Synthesis.SpeechSynthesizer; ` +
        `$s.Rate = 0; ` +
        `$s.Speak('${safe}')"`,
        { stdio: 'ignore', timeout: 15000 }
      );
    } else if (platform === 'darwin') {
      execSync(`say "${text.replace(/"/g, '\\"')}"`, { stdio: 'ignore', timeout: 15000 });
    } else {
      // Linux — try espeak, fall back silently
      execSync(`espeak "${text.replace(/"/g, '\\"')}"`, { stdio: 'ignore', timeout: 15000 });
    }
  } catch {
    // TTS failure is non-fatal — never block the tool call
  }
}
