const fs = require('fs');
const path = require('path');
const marked = require('marked');
const matter = require('gray-matter');
const Handlebars = require('handlebars');

const inputDir = path.join(__dirname, 'content');
const outputDir = path.join(__dirname, 'public/blog/');
const templatePath = path.join(__dirname, 'template.hbs');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}
const templateSource = fs.readFileSync(templatePath, 'utf-8');
const template = Handlebars.compile(templateSource);

const files = fs.readdirSync(inputDir).filter(file => file.endsWith('.md'));

files.forEach(file => {
  const content = fs.readFileSync(path.join(inputDir, file), 'utf-8');

  const { data, content: markdownContent } = matter(content);
  
  const htmlContent = marked.parse(markdownContent);

  const html = template({
    title: data.title,
    header: "This is the header",
    content: htmlContent,
    date: data.date,
    footer: "this is the footer",
  });

  const outputFileName = file.replace('.md', '.html');
  fs.writeFileSync(path.join(outputDir, outputFileName), html);

  console.log(`Generated: ${outputFileName}`);
});

console.log('static site generator completed.')