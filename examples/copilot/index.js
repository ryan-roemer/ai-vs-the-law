import { readFile } from "fs/promises";

async function findLicense(packagePath) {
  const packageJson = JSON.parse(await readFile(packagePath, "utf8"));
  const response = await fetch(
    "https://raw.githubusercontent.com/spdx/license-list-data/refs/heads/main/json/licenses.json",
  );
  const spdxData = await response.json();
  const license = packageJson.license;
  const match = spdxData.licenses.find((l) => l.licenseId === license);
  if (match) {
    console.log(`Found ${license}. Full name: ${match.name}`);
  } else {
    console.log(`Could not find ${license}.`);
  }
}

findLicense(process.argv[2]);
