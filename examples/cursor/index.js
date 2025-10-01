#!/usr/bin/env node

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function fetchSPDXLicenses() {
  try {
    const response = await fetch('https://raw.githubusercontent.com/spdx/license-list-data/refs/heads/main/json/licenses.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.licenses;
  } catch (error) {
    console.error('Error fetching SPDX license data:', error.message);
    process.exit(1);
  }
}

function readPackageJson(filePath) {
  try {
    const packageJsonContent = readFileSync(filePath, 'utf8');
    const packageJson = JSON.parse(packageJsonContent);
    return packageJson;
  } catch (error) {
    console.error(`Error reading package.json file: ${error.message}`);
    process.exit(1);
  }
}

function findLicenseMatch(license, spdxLicenses) {
  return spdxLicenses.find(spdxLicense =>
    spdxLicense.licenseId === license
  );
}

async function main() {
  // Get command line arguments
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.error('Usage: node index.js /PATH/TO/package.json');
    process.exit(1);
  }

  const packageJsonPath = resolve(args[0]);

  // Read package.json
  const packageJson = readPackageJson(packageJsonPath);

  if (!packageJson.license) {
    console.error('No license field found in package.json');
    process.exit(1);
  }

  const license = packageJson.license;

  // Fetch SPDX license data
  const spdxLicenses = await fetchSPDXLicenses();

  // Find matching license
  const matchedLicense = findLicenseMatch(license, spdxLicenses);

  if (matchedLicense) {
    console.log(`Found ${license}. Full name: ${matchedLicense.name}`);
  } else {
    console.log(`Could not find ${license}.`);
  }
}

// Run the main function
main().catch(error => {
  console.error('Unexpected error:', error.message);
  process.exit(1);
});
