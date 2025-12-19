# \<Project name\>

[![GitHub license](https://img.shields.io/npm/l/typescript-project)](https://github.com/webbestmaster/typescript-project/blob/master/license)
[![codecov](https://codecov.io/gh/webbestmaster/typescript-project/branch/master/graph/badge.svg)](https://codecov.io/gh/webbestmaster/typescript-project)
[![npm version](https://img.shields.io/npm/v/typescript-project.svg)](https://www.npmjs.com/package/typescript-project)
[![Known Vulnerabilities](https://snyk.io/test/github/webbestmaster/typescript-project/badge.svg)](https://snyk.io/test/github/webbestmaster/typescript-project)
[![Dependency count](https://badgen.net/bundlephobia/dependency-count/typescript-project)](https://libraries.io/npm/typescript-project)
[![Libraries.io dependency status for GitHub repo](https://img.shields.io/librariesio/github/webbestmaster/typescript-project)](https://libraries.io/npm/typescript-project)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/typescript-project)](https://bundlephobia.com/package/typescript-project)
[![nodejs version](https://img.shields.io/node/v/typescript-project)](https://nodejs.org/en/docs)
[![Github CI](https://github.com/webbestmaster/typescript-project/actions/workflows/github-ci.yml/badge.svg)](https://github.com/webbestmaster/typescript-project/actions/workflows/github-ci.yml)
[![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/webbestmaster/typescript-project/github-ci.yml)](https://github.com/webbestmaster/typescript-project/actions/workflows/github-ci.yml)
[![Type definitions](https://img.shields.io/npm/types/typescript-project)](https://www.typescriptlang.org)
[![Website](https://img.shields.io/website?url=https://github.com/webbestmaster/typescript-project)](https://github.com/webbestmaster/typescript-project)
[![CodeFactor](https://www.codefactor.io/repository/github/webbestmaster/typescript-project/badge)](https://www.codefactor.io/repository/github/webbestmaster/typescript-project)
[![Package Quality](https://packagequality.com/shield/typescript-project.svg)](https://packagequality.com/#?package=typescript-project)
[![GitHub stars](https://img.shields.io/github/stars/webbestmaster/typescript-project?style=social)](https://github.com/webbestmaster/typescript-project)


## Installation

1. install nodejs for your platform, check `.github/workflows/github-ci.yml` to get version of nodejs
2. go to project's directory
3. run `npm i`


## Dev mode

1. make installation
2. go to project's directory
3. run `npm run front:start-*` and\or `npm run back:start-*`


## HTTPS localhost (MacOS)
See [guide](https://johnkagga.medium.com/use-https-with-webpack-dev-server-c378f0e8c6ff) for generating self-signed certificate.
Generated certificate (localhost+1.pem, localhost+1-key.pem) and root certificate (rootCA.pem) should be placed into ssl directory.

```bash
$ brew install mkcert           // Install mkcert
$ mkcert -install               // Create a new local CA
$ mkcert localhost 127.0.0.1    // Generate a certificate for the host you are using locally, e.g localhost
$ mkcert -CAROOT                // Locate the path of you rootCA.pem file
```

Uncomment `devServer.server` to use ssl certificates locally


### CMS Limits

- Max file size is 75MB
- Max image file size is 16MB
- Max audio duration is 3 hours (i.e. 180 minutes)

## License

See [license](license).
