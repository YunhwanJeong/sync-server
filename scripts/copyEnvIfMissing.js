import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const copyFileIfNotExists = (source, destination) => {
  if (!fs.existsSync(destination)) {
    fs.copyFileSync(source, destination);
    console.log(`Copied ${source} to ${destination}`);
  } else {
    console.log(`${destination} already exists. Skipping copy.`);
  }
};

const rootDir = path.resolve(__dirname, '..');
const envPath = path.join(rootDir, '.env');
const envTestPath = path.join(rootDir, 'tests', '.env.test');
const envExamplePath = path.join(rootDir, '.env.example');
const envTestExamplePath = path.join(rootDir, 'tests', '.env.test.example');

copyFileIfNotExists(envExamplePath, envPath);
copyFileIfNotExists(envTestExamplePath, envTestPath);
