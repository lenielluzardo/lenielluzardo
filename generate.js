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
const homeOutputDir = path.join(__dirname, "public/");
const blogOutputDir = path.join(__dirname, "public/blog/");

const templatePath = path.join(__dirname, 'template/layout.hbs');

registerTemplate('header');
registerTemplate('footer');
const templateSource = fs.readFileSync(templatePath, "utf-8");
const template = Handlebars.compile(templateSource);

const homeHtml = template({
  // title: data.title,
  main: "<h1> This is my home page<h1>",
  stylePath: "style.css",
  // date: data.date,
});

// const outputFileName = file.replace(".md", ".html");
fs.writeFileSync(path.join(homeOutputDir, "index.html"), homeHtml);

const blogHtml = template({
  // title: data.title,
  main: "<h1> This is my blog page<h1>",
  stylePath: "style.css",
  // date: data.date,
});

fs.writeFileSync(path.join('public/blog', "index.html"), blogHtml);


if (!fs.existsSync(blogOutputDir)) {
  fs.mkdirSync(blogOutputDir);
}

const fileArg = process.argv.find(arg => arg.startsWith('--file='));
const fileName = fileArg ? fileArg.split('=')[1] : null;

if (fileName) {
  const content = fs.readFileSync(path.join(inputDir, filenName), 'utf-8');

  const { data, content: markdownContent } = matter(content);

  const htmlContent = marked(markdownContent);
  const html = template({
    title: data.title,
    main: htmlContent,
    date: data.date,
  });

  return;
}


const files = fs.readdirSync(inputDir).filter(file => file.endsWith('.md'));

files.forEach(file => {
  const content = fs.readFileSync(path.join(inputDir, file), 'utf-8');

  const { data, content: markdownContent } = matter(content);
  
  const htmlContent = marked.parse(markdownContent);

  const html = template({
    title: data.title,
    main: htmlContent,
    date: data.date,
    stylePath: '../style.css'
  });

  const outputFileName = file.replace('.md', '.html');
  fs.writeFileSync(path.join(blogOutputDir, outputFileName), html);

  console.log(`Generated: ${outputFileName}`);
});


console.log('static site generator completed.')