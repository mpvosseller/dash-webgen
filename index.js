#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const os = require('os')
const yargs = require('yargs')
const https = require('https')

main()

async function main() {
  const argv = yargs
    .scriptName('aws-web-pub')
    .usage('$0 <cmd> [projectDir]')
    .option('name', {
      alias: 'n',
      describe: 'name of the docset',
    })
    .option('url', {
      alias: 'u',
      describe: 'url of the docset',
    })
    .option('out', {
      alias: 'o',
      describe: 'output directory',
    })
    .demandOption(['name', 'url'])
    .help().argv

  const docSetName = argv.name
  const url = argv.url
  const outDir = argv.out || `${os.homedir()}/Library/Application Support/Dash/DocSets`
  await createDocSet({ docSetName, url, outDir })
}

async function createDocSet({ docSetName, url, outDir }) {
  const docSetPath = `${outDir}/${docSetName}/${docSetName}.docset`
  const docSetIndexFilePath = `${docSetPath}/Contents/Resources/docSet.dsidx`
  const plistFilePath = `${docSetPath}/Contents/Info.plist`
  createInfoFile({ filePath: plistFilePath, docSetName, url })
  createIndexFile({ filePath: docSetIndexFilePath })
  await createIconFiles({ dir: docSetPath, url })

  console.log(`Created docset "${docSetName}" at ${docSetPath}`)
  console.log('Tell Dash to rescan docsets:')
  console.log('Dash -> Preferences -> Docsets -> Rescan')
}

function createInfoFile({ filePath, docSetName, url }) {
  const data = `<?xml version="1.0" encoding="UTF-8"?>
    <!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
    <plist version="1.0">
    <dict>
        <key>CFBundleIdentifier</key>
        <string>${docSetName}</string>
        <key>CFBundleName</key>
        <string>${docSetName}</string>
        <key>DocSetPlatformFamily</key>
        <string>${docSetName}</string>
        <key>isDashDocset</key>
        <true/>
        <key>dashIndexFilePath</key>
        <string>${url}</string>
        <key>isJavaScriptEnabled</key>
        <true/>
    </dict>
    </plist>`
  makeParentDir(filePath)
  fs.writeFileSync(filePath, data)
}

function createIndexFile({ filePath }) {
  makeParentDir(filePath)
  fs.closeSync(fs.openSync(filePath, 'w'))
}

async function createIconFiles({ dir, url }) {
  const domain = new URL(url).hostname
  await saveFavicon({
    filePath: `${dir}/icon.png`,
    size: '16',
    domain,
  })

  await saveFavicon({
    filePath: `${dir}/icon@2x.png`,
    size: '32',
    domain,
  })
}

async function saveFavicon({ filePath, domain, size }) {
  const url = `https://www.google.com/s2/favicons?sz=${size}&domain_url=${domain}`
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filePath)
    const req = https.get(url, (res) => {
      res.pipe(file)
      res.on('end', () => {
        resolve()
      })
    })
    req.on('error', reject)
  })
}

function makeParentDir(filePath) {
  const dir = path.dirname(filePath)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
}
