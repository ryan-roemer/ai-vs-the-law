import { readFileSync } from "fs";

async function findLicense(packagePath) {
  const pkg = JSON.parse(readFileSync(packagePath, "utf8"));
  const response = await fetch(
    "https://raw.githubusercontent.com/spdx/license-list-data/refs/heads/main/json/licenses.json",
  );
  const { licenses } = await response.json();
  const match = licenses.find((l) => l.licenseId === pkg.license);
  if (!match) {
    console.log(`Could not find ${pkg.license}.`);
  } else {
    console.log(`Found ${pkg.license}. Full name: ${match.name}.`);
  }
}

findLicense(process.argv[2]);
