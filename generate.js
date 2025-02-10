const fs = require('fs');
const path = require('path');
const marked = require('marked');
const matter = require('gray-matter');
const Handlebars = require('handlebars');

const inputDir = path.join(__dirname, "content");
const templatePath = path.join(__dirname, "template/layout.hbs");
const templateSource = fs.readFileSync(templatePath, "utf-8");
const template = Handlebars.compile(templateSource);

function registerTemplate(templateName) {
  const templatePath = path.join(__dirname, `template/${templateName}.hbs`);
  const templateSource = fs.readFileSync(templatePath, "utf-8");
  const template = Handlebars.compile(templateSource);
  Handlebars.registerPartial(templateName, template);
}

registerTemplate('header');
registerTemplate('footer');

function findLatestPost() {
  const files = fs.readdirSync(inputDir).filter(file => file.endsWith('.md'));
  if (files.length === 0) {
    return null
  }

  files.sort((a, b) => {
    const aTime = fs.statSync(path.join(inputDir, a)).ctime;
    const bTime = fs.statSync(path.join(inputDir, b)).ctime;

    return bTime - aTime;
  });

  return files[0];
}

const latestPost = findLatestPost();

const homeOutputDir = path.join(__dirname, "public/");
const blogOutputDir = path.join(__dirname, "public/blog/");

if (!fs.existsSync(blogOutputDir)) {
  fs.mkdirSync(blogOutputDir);
}


console.log(`Before start ${latestPost}`);

if (latestPost) {
  
  console.log(`Processing file (inside if): ${fileName}`); // Log the file being processed
  const content = fs.readFileSync(path.join(inputDir, latestPost), "utf-8");

  const { data, content: markdownContent } = matter(content);

  const htmlContent = marked(markdownContent);

  const postHtml = template({
    title: data.title,
    main: htmlContent,
    date: data.date,
  });

  const outputFileName = fileName.replace(".md", ".html");
  fs.writeFileSync(path.join("public/blog/", outputFileName), postHtml);
  console.log(`Generated: ${outputFileName}`);
  process.exit(0);
  
} else {
  console.log('No new file to process.');
  process.exit(0);
}

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