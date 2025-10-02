Create a JS file "index.js" that:

- Runs: `node /PATH/TO/index.js /PATH/TO/package.json`
- Reads `package.json` license field
- Fetches SPDX data from
  `https://raw.githubusercontent.com/spdx/license-list-data/refs/heads/main/json/licenses.json`
- Matches license against `licenseId` in `licenses` array
- Outputs: `Found {license}. Full name: {name}` or `Could not find {license}.`

Requirements:

- ESM with `import`
- No extra logging or error handling
- Use `async/await`, `fetch`, `fs/promises`
- One `findLicense` function (max 10 lines).
- ALL code logic inside `findLicense` function
- Call `findLicense` in script
