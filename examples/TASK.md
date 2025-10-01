Write code that meets the following criteria:

- A simple JavaScript script file named `index.js`.
- Can be run with `node /PATH/TO/index.js /PATH/TO/package.json`
- Inputs a `package.json` file
- Inputs all SPDX license data from `https://raw.githubusercontent.com/spdx/license-list-data/refs/heads/main/json/licenses.json`
- Reads the `license` field
  - Determines if it matches any array entries in `licenseId` field of the license data field `licenses` array.
  - If no match, then outputs `Could not find {license}.`
  - If a match, then outputs `Found {license}. Full name: {name}`.
