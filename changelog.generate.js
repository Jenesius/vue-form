const changelog = require('generate-changelog');
const fs        = require('fs');
const pkg = require('./package.json')

changelog.generate({ patch: true, repoUrl: /(.*)(\.git)/.exec(pkg.repository.url)[1] })
.then(function (changelog) {
    fs.writeFileSync('./CHANGELOG.md', changelog);
});