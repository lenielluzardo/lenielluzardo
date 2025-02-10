const fs = require('fs');
const path = require('path');
const marked = require('marked');
const matter = require('gray-matter');
const Handlebars = require('handlebars');

function registerTemplate(templateName) {
  const templatePath = path.join(__dirname, `template/${templateName}.hbs`);
  const templateSource = fs.readFileSync(templatePath, "utf-8");
  const template = Handlebars.compile(templateSource);
  Handlebars.registerPartial(templateName, template);
}

const inputDir = path.join(__dirname, 'content');
const outputDir = path.join(__dirname, 'public/blog/');

const templatePath = path.join(__dirname, 'template/layout.hbs');

registerTemplate('header');
registerTemplate('footer');

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
    content: htmlContent,
    date: data.date
  });

  const outputFileName = file.replace('.md', '.html');
  fs.writeFileSync(path.join(outputDir, outputFileName), html);

  console.log(`Generated: ${outputFileName}`);
});

console.log('static site generator completed.')