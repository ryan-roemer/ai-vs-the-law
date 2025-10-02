import fs from "fs/promises";

const findLicense = async () => {
  const pkgPath = process.argv[2];
  const pkg = JSON.parse(await fs.readFile(pkgPath, "utf8"));
  const { license } = pkg;

  const { licenses } = await fetch(
    "https://raw.githubusercontent.com/spdx/license-list-data/refs/heads/main/json/licenses.json",
  ).then((res) => res.json());

  const licenseName = licenses.find((l) => l.licenseId === license)?.name;
  if (licenseName) {
    console.log(`Found ${license}. Full name: ${licenseName}`);
  } else {
    console.log("Could not find license.");
  }
};

findLicense();
