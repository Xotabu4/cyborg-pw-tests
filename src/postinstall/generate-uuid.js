import fs from 'fs';
import path from 'path';

const idPath = path.resolve(process.cwd(), '.analytics-id');

// Generate simple UUID-like ID: timestamp + random hex
function generateId() {
  return (
    Date.now().toString(36) + // time-based prefix
    '-' +
    Math.random().toString(16).substring(2, 10) // random suffix
  );
}

try {
  let id;

  if (!fs.existsSync(idPath)) {
    id = generateId();
    fs.writeFileSync(idPath, id, 'utf-8');
    console.log('🔧 Generated analytics ID:', id);
  } else {
    id = fs.readFileSync(idPath, 'utf-8');
    console.log('📦 Using existing analytics ID:', id);
  }

  // Optional: send to analytics endpoint
} catch (err) {
  console.error('❌ Failed to create or read analytics ID:', err);
}