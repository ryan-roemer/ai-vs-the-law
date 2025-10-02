import { readFile } from "fs/promises";

async function findLicense(packageJsonPath) {
  const packageJson = JSON.parse(await readFile(packageJsonPath, "utf8"));
  const license = packageJson.license;
  const response = await fetch(
    "https://raw.githubusercontent.com/spdx/license-list-data/refs/heads/main/json/licenses.json",
  );
  const data = await response.json();
  const found = data.licenses.find((l) => l.licenseId === license);
  return found
    ? `Found ${license}. Full name: ${found.name}`
    : `Could not find ${license}.`;
}

const packageJsonPath = process.argv[2];
console.log(await findLicense(packageJsonPath));
