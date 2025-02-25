console.log("-- ## Static website build process START. --\n");
console.log("-- ## Loading dependencies. --\n");

const fs = require("fs");
const path = require("path");
const marked = require("marked");
const matter = require("gray-matter");
const Handlebars = require("handlebars");
const { execSync } = require("child_process");

console.log("-- ## Declaring variables. --\n");
const templatePath = path.join(__dirname, "template");
const contentPath = path.join(__dirname, "content");
const publicPath = path.join(__dirname, "public");
const blogPath = path.join(__dirname, "public/blog");

const buildHomePg = true;
const buildBlogPg = true;
const buildPosts = false;

console.log(`-- # Handlebars template process START. --\n`);
let layoutTmpl = null;

let tmplFiles = fs.readdirSync(templatePath);
console.log(`Template files: ${tmplFiles} --\n`);

tmplFiles.forEach((fileName, index) => {
  console.log(`${index} - Reading source template for: ${fileName} --\n`);
  tmplSrc = fs.readFileSync(`${templatePath}/${fileName}`, "utf-8");

  // console.log(`Template source is:\n ${tmplSrc} \n`);

  if (fileName === "layout.hbs") {
    console.log(`${index} - Compiling and saving ${fileName} template. --\n`);
    layoutTmpl = Handlebars.compile(tmplSrc);

    // console.log(`${fileName} template value is:\n ${layoutTmpl} \n`);
  } else {
    console.log(`${index} - Compiling ${fileName} template. --\n`);
    let partialName = fileName.replace(".hbs", "");

    let tmpl = Handlebars.compile(tmplSrc);

    console.log(`${index} - Registering ${partialName} template. --\n`);
    Handlebars.registerPartial(partialName, tmpl);
  }
});

Handlebars.registerHelper("selectMain", (context, options) => {
  switch (context) {
    case "/":
      return "home";
    case "/blog":
      return "blog";
  }
});
console.log(`-- # Handlebars template process END. --\n`);

// Output

// function findChangedPosts() {
//   try {
//     const gitResult = execSync(`git diff --name-only HEAD^ HEAD -- ${inputDir}`)
//     console.log('Find changed posts git result: ', gitResult);

//     const changedFiles = gitResult.toString().trim().split("\n");
//     console.log('Changed posts:', changedFiles)

//     return changedFiles.filter(file => file.endsWith('.md'));
//   } catch (error) {
//     console.error('Error finding changed posts:', error);
//     return [];
//   }
// }
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

// Ensure the oput directory exists
if (!fs.existsSync(blogPath)) {
  fs.mkdirSync(blogPath);
}

// const templateSource = fs.readFileSync(`${templatePath}/layout.hbs`, "utf-8");
// const template = Handlebars.compile(templateSource);

// const latestPost = findLatestPost();
// console.log(`Before start ${latestPost}`);

// const changedPosts = findChangedPosts();

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

console.log(`-- # Home page html build START. --\n`);
if (buildHomePg) {
  const homeHtml = layoutTmpl({
    route: "/",
    stylePath: "/style.css",
  });

  fs.writeFileSync(path.join(publicPath, "index.html"), homeHtml);
}
console.log(`-- # Home page html build END. --\n`);

console.log(`-- # Blog page html build START. --\n`);
if (buildBlogPg) {
  const blogHtml = layoutTmpl({
    route: "/blog",
    stylePath: "/style.css",
  });

  fs.writeFileSync(path.join(blogPath, "index.html"), blogHtml);
}
console.log(`-- # Blog page html build END. --\n`);

// const files = fs.readdirSync(inputDir).filter((file) => file.endsWith(".md"));
// if (files) {
//   changedPosts.forEach((post) => {
//     console.log(`Start Processing file:  ${post}`);
//     console.log(`Read file:  ${post}`);
//     const content = fs.readFileSync(
//       path.join(inputDir, post.replace("content/", "")),
//       "utf-8"
//     );

//     console.log(`Get matter metada for:  ${post}`);
//     const { data, content: markdownContent } = matter(content);

//     console.log(`Parse content to HTML for :  ${post}`);
//     const htmlContent = marked.parse(markdownContent);

//     console.log(`Set the HBS template for :  ${post}`);
//     const html = template({
//       title: data.title,
//       main: htmlContent,
//       date: data.date,
//       stylePath: "~/style.css",
//     });

//     // const outputFileName = file.replace(".md", ".html");
//     console.log(`Build output file name (basename) for :  ${post}`);
//     const outputFileName = path.basename(post).replace(".md", ".html");

//     console.log(`Build output path for :  ${post}`);
//     const outputPath = path.join(blogDir, outputFileName);

//     console.log(`Writing to fs for :  ${post}`);
//     fs.writeFileSync(outputPath, html);

//     console.log(`Generated: ${outputPath}`);
//   });
// } else {
//   console.log("No new or updated files to process.");
//   process.exit(0);
// }

console.log("-- ## Static website build process END. --\n");
// console.log('static site generator completed.')
