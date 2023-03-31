import changelog from "generate-changelog";
import pkg from "./package.json";
import fs from "fs";

changelog.generate({ patch: true, repoUrl: /(.*)(\.git)/.exec(pkg.repository.url)[1] })
.then(function (changelog) {
    fs.writeFileSync('./CHANGELOG.md', changelog);
});