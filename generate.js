const fs = require('fs');
const path = require('path');
const marked = require('marked');

const inputDir = path.join(__dirname, 'content');
const outputDir = path.join(__dirname, 'public/blog/');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}
const files = fs.readdirSync(inputDir).filter(file => file.endsWith('.md'));

files.forEach(file => {
  const content = fs.readFileSync(path.join(inputDir, file), 'utf-8');

  const html = marked.parse(content);

  const outputFileName = file.replace('.md', '.html');
  fs.writeFileSync(path.join(outputDir, outputFileName), html);

  console.log(`Generated: ${outputFileName}`);
});

console.log('static site generator completed.')