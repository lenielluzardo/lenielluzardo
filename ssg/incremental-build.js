const fs = require("fs");
const marked = require("marked");
const minimist = require("minimist");

const args = minimist(process.argv.slice(2));
const files = args.files ? args.files.split(" ") : [];

if (files.length === 0) {
  console.log("No files specified, building all .md files...");
  // Your existing logic for full build
} else {
  files.forEach((file) => {
    if (file.endsWith(".md")) {
      const markdown = fs.readFileSync(file, "utf8");
      const html = marked.parse(markdown);
      const outputFile = file
        .replace(".md", ".html")
        .replace(/^.*public\//, "public/");
      fs.writeFileSync(outputFile, html);
      console.log(`Built ${file} -> ${outputFile}`);
    }
  });
}
