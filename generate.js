const fs = require('fs');
const path = require('path');
const marked = require('marked');
const matter = require('gray-matter');
const Handlebars = require('handlebars');
const { execSync } = require("child_process");

/// variables & constants
const buildHome = false;
const buildBlogIndex = false;
const buildPosts = false;

// Input
const inputDir = path.join(__dirname, "content");
const templatePath = path.join(__dirname, "template/layout.hbs");

// Output
const publicDir = path.join(__dirname, "public");
const blogDir = path.join(__dirname, "public/blog");

function registerTemplate(templateName) {
  const templatePath = path.join(__dirname, `template/${templateName}.hbs`);
  const templateSource = fs.readFileSync(templatePath, "utf-8");
  const template = Handlebars.compile(templateSource);
  Handlebars.registerPartial(templateName, template);
}

registerTemplate('header');
registerTemplate('footer');

function findChangedPosts() {
  try {
    const gitResult = execSync(`git diff --name-only HEAD^ HEAD -- ${inputDir}`)
    console.log('Find changed posts git result: ', gitResult);  
      
    const changedFiles = gitResult.toString().trim().split("\n");
    console.log('Changed posts:', changedFiles)

    return changedFiles.filter(file => file.endsWith('.md'));
  } catch (error) {
    console.error('Error finding changed posts:', error);
    return [];
  }
}
// function findLatestPost() {
//   const files = fs.readdirSync(inputDir).filter(file => file.endsWith('.md'));
//   if (files.length === 0) {
//     return null
//   }

//   files.sort((a, b) => {
//     const aTime = fs.statSync(path.join(inputDir, a)).ctime;
//     const bTime = fs.statSync(path.join(inputDir, b)).ctime;

//     return bTime - aTime;
//   });

//   return files[0];
// }

// Ensure the oput directory existsts
if (!fs.existsSync(blogDir)) {
  fs.mkdirSync(blogDir);
}

const templateSource = fs.readFileSync(templatePath, "utf-8");
const template = Handlebars.compile(templateSource);

// const latestPost = findLatestPost();
// console.log(`Before start ${latestPost}`);

const changedPosts = findChangedPosts();

// if (latestPost) {
//   console.log(`Processing file (inside if): ${latestPost}`); // Log the file being processed
  
//   const content = fs.readFileSync(path.join(inputDir, latestPost), "utf-8");

//   const { data, content: markdownContent } = matter(content);

//   const htmlContent = marked.parse(markdownContent);

//   const postHtml = template({
//     title: data.title,
//     main: htmlContent,
//     date: data.date,
//   });

//   const outputFileName = latestPost.replace(".md", ".html");
//   fs.writeFileSync(path.join(blogDir, outputFileName), postHtml);
  
//   console.log(__dirname);
//   console.log(publicDir);
//   console.log(blogDir);
//   console.log(`Generated: ${outputFileName}`);

// } else {
//   console.log('No new file to process.');
// }

if (buildHome) {
  const homeHtml = template({
    // title: data.title,
    main: "<h1> This is my home page<h1>",
    stylePath: "style.css",
    // date: data.date,
  });

  fs.writeFileSync(path.join(publicDir, "index.html"), homeHtml);
}

if (buildBlogIndex) {
  const blogHtml = template({
    // title: data.title,
    main: "<h1> This is my blog page<h1>",
    stylePath: "style.css",
    // date: data.date,
  });

  fs.writeFileSync(path.join(blogDir, "index.html"), blogHtml);
}

if (changedPosts) {
    // const files = fs.readdirSync(inputDir).filter((file) => file.endsWith(".md"));
  
  changedPosts.forEach((post) => {
    console.log(`Start Processing file:  ${post}`);
    console.log(`Read file:  ${post}`);
    const content = fs.readFileSync(path.join(inputDir, post.replace('content/', '')), "utf-8");

    console.log(`Get matter metada for:  ${post}`);
    const { data, content: markdownContent } = matter(content);
   
   
    console.log(`Parse content to HTML for :  ${post}`);
    const htmlContent = marked.parse(markdownContent);
   
    console.log(`Set the HBS template for :  ${post}`);
    const html = template({
      title: data.title,
      main: htmlContent,
      date: data.date,
      stylePath: "~/style.css",
    });

    // const outputFileName = file.replace(".md", ".html");
    console.log(`Build output file name (basename) for :  ${post}`);
    const outputFileName = path.basename(post).replace(".md", ".html");

    console.log(`Build output path for :  ${post}`);
    const outputPath = path.join(blogDir, outputFileName);

    console.log(`Writing to fs for :  ${post}`);
    fs.writeFileSync(outputPath, html);

    console.log(`Generated: ${outputPath}`);
  });
} else {
  console.log('No new or updated files to process.');
  process.exit(0);
}

console.log('Incremental build completed');
// console.log('static site generator completed.')