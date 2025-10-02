import { readFileSync } from "fs";

const findLicense = async (packageJsonPath) => {
  const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf8"));
  const licenseData = await fetch(
    "https://raw.githubusercontent.com/spdx/license-list-data/refs/heads/main/json/licenses.json",
  ).then((r) => r.json());
  const license = packageJson.license;
  const found = licenseData.licenses.find((l) => l.licenseId === license);
  console.log(
    found
      ? `Found ${license}. Full name: ${found.name}`
      : `Could not find ${license}.`,
  );
};

findLicense(process.argv[2]);
