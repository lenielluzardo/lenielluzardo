console.log("\n # START Static website build process. --\n");

//#region Module imports.
console.log("- # Loading dependencies. --\n");

const fs = require("fs");
const path = require("path");
const marked = require("marked");
const matter = require("gray-matter");
const Handlebars = require("handlebars");
const { execSync } = require("child_process");

//#endregion.


//#region Variables declaration.
console.log("- # Declaring variables. --\n");

const path_root = path.join(__dirname, "../");
const path_ssg_root = path.join(__dirname, '');
const path_db = `${path_root}db`;
const path_db_entries = `${path_db}/entries`;
const path_hbs_template = `${path_ssg_root}/hbs_template`;
const path_public = `${path_root}docs`;
const path_blog = `${path_public}/blog`;

const buildHomePg = true;
const buildBlogPg = true;
const buildPosts = false;

console.log(`PATHS VALUES: \n`);
console.log(`'__dirname': ${__dirname}`);
console.log(`path_db: ${path_db}`);
console.log(`path_db_entries: ${path_db_entries}`);
console.log(`path_hbs_template: ${path_hbs_template}`);
console.log(`path_public: ${path_public}`);
console.log(`path_blog: ${path_blog}`);

//#endregion.

//#region Handlebars configuration & tamplate build.
console.log(`-- # START Handlebars template process. --\n`);
let layoutTmpl = null;
let articleTmpl = null;

let hbsTemplates = fs.readdirSync(path_hbs_template);

console.log(`___ Template files: ${hbsTemplates} --\n`);

hbsTemplates.forEach((fileName, index) => {
  
  // switch (fileName) {
  //   case fileName.includes('partial'):
      
  //     break;
  //   case '':
  //     break;
  // }

  console.log(`___ ${index} - Reading source template for: ${fileName} --\n`);
  tmplSrc = fs.readFileSync(`${path_hbs_template}/${fileName}`, "utf-8");

  // console.log(`Template source is:\n ${tmplSrc} \n`);

  if (fileName === "layout.hbs") {
    console.log(`___ ${index} - Compiling and saving ${fileName} template. --\n`);
    layoutTmpl = Handlebars.compile(tmplSrc);

    // console.log(`${fileName} template value is:\n ${layoutTmpl} \n`);
  } else {
    console.log(`___ ${index} - Compiling ${fileName} template. --\n`);
    let partialName = fileName.replace(".hbs", "");

    // let tmpl = Handlebars.compile(tmplSrc);

    console.log(`___ ${index} - Registering ${partialName} template. --\n`);
    Handlebars.registerPartial(partialName, tmplSrc);
   
    if (partialName === 'article') {
      // let tmpl = Handlebars.compile(tmplSrc);
      articleTmpl = tmplSrc;
    }
  }
});

Handlebars.registerHelper("main", (context) => {
  console.log(context);

  switch (context.data.root.route) {
    case "/":
      return "home";
    case "/blog":
      return "blog";
    case "/article":
      return "article";
  }
});
console.log(`-- # END Handlebars template process. --\n`);
//#endregion.
// const articless = [
//   { name: "this is my #1 article", url: "this-is-my-no1-article" },
//   { name: "this is my #2 article", url: "this-is-my-no2-article" },
// ];

//- Ensure the oput directory exists
if (!fs.existsSync(path_blog)) {
  fs.mkdirSync(path_blog);
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

//#region Home HTML page build.
console.log(`-- # START BUILD: Home html page. --\n`);
if (buildHomePg) {
  const homeHtml = layoutTmpl({
    route: "/",
    stylePath: "/style.css",
  });

  fs.writeFileSync(path.join(path_public, "index.html"), homeHtml);
}
console.log(`-- # END BUILD: Home html page. --\n`);
//#endregion

//#region Articles HTML pages build.



const articles = fs.readdirSync(path_db_entries).filter((file) => file.endsWith(".md"));

const articless = articles.map((article) => {
  const outputFileName = path.basename(article).replace(".md", ".html");

  let articlee = {
    title: outputFileName,
    path: outputFileName,
  };

  return articlee;
});

function buildArticles(articles) {
  if (articles) {
    articles.forEach((article, index) => {
   
      console.log(`___ ${index} - Reading content article from: ${article} --\n`);
      const content = fs.readFileSync(path.join(path_db_entries, article), "utf-8");

      console.log(`___ ${index} - Getting matter metada from: ${article} --\n`);
      const { data, content: markdownContent } = matter(content);

      console.log(`___ ${index} - Parsing content to HTML from: ${article} --\n`);
      const htmlContent = marked.parse(markdownContent);

      console.log(`___ ${index} - Setting Handlebars template values from: ${article} --\n`);
    

      const articlehtml = Handlebars.compile(articleTmpl)({
        meta: data ,        
        content: htmlContent,
        articles: articless
      });

      const html = layoutTmpl({
        route: "/article",
        title: data.title,
        date: data.date,
        content: htmlContent,
        articles: articless
      });
      // const outputFileName = file.replace(".md", ".html");
      console.log(`___ ${index} - Build html page output file name for:  ${article} --\n`);
      const outputFileName = path.basename(article).replace(".md", ".html");

      console.log(`___ ${index} - Building output path for:  ${article} --\n`);
      const outputPath = path.join(path_blog, outputFileName);

      console.log(`___ ${index} - Writing HTML page into file system for: ${article} --\n`);
      fs.writeFileSync(outputPath, html);

      console.log(`___ ${index} - HTML file generated: ${outputPath} --\n`);
    });
  } else {
    console.log("-- # INFO: No new or updated articles to process.");
  }
}

buildArticles(articles)
console.log(`-- # END BUILD: Blog Articles html pages`);
//#endregion.



//#region Blog HTML page build.
console.log(`-- # START BUILD: Blog html page. --\n`);
if (buildBlogPg) {
  const blogHtml = layoutTmpl({
    route: "/blog",
    stylePath: "/style.css",
    articles: articless,
  });

  fs.writeFileSync(path.join(path_blog, "index.html"), blogHtml);
}
console.log(`-- # END BUILD: Blog html page. --\n`);
//#endregion
console.log("# END Static website build process. --\n");
// console.log('static site generator completed.')
