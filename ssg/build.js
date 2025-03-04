console.log("\n # START Static website build process. --\n");

//#region Module Imports.
console.log("- # Loading dependencies. --\n");

const fs = require("fs");
const path = require("path");
const marked = require("marked");
const customHeadingId = require ("marked-custom-heading-id");
const matter = require("gray-matter");
const Handlebars = require("handlebars");
const { execSync } = require("child_process");
const minimist = require("minimist");

//#endregion.

const args = minimist(process.argv.slice(2));
const inc_files = args.files ? args.files.split(" ") : [];

//#region Module Configurations.
marked.use(customHeadingId());

//#endregion

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

function processHBSTemplates(hbsTemplates) {
  console.log(`___ Template files: ${hbsTemplates} --`);

  hbsTemplates.forEach((fileName, index) => {
    console.log(`___ ${index} - Reading source template for: ${fileName} --`);
    tmplSrc = fs.readFileSync(`${path_hbs_template}/${fileName}`, "utf-8");

    if (fileName === "layout.hbs") {
      console.log(
        `___ ${index} - Compiling and saving ${fileName} template. --`
      );
      layoutTmpl = Handlebars.compile(tmplSrc);
    } else {
      console.log(`___ ${index} - Compiling ${fileName} template. --`);
      let partialName = fileName.replace(".hbs", "");

      console.log(`___ ${index} - Registering ${partialName} template. --`);
      Handlebars.registerPartial(partialName, tmplSrc);

      if (partialName === "article") {
        articleTmpl = tmplSrc;
      }
    }
  });

  Handlebars.registerHelper("main", (context) => {
    switch (context.data.root.route) {
      case "/":
        return "home";
      case "/blog":
        return "blog";
      case "/article":
        return "article";
    }
  });
}

processHBSTemplates(hbsTemplates);
console.log(`-- # END Handlebars template process. --\n`);
//#endregion.

//#region Articles HTML pages build.

// Ensure the blog directory exists
if (!fs.existsSync(path_blog)) {
  fs.mkdirSync(path_blog);
}

console.log(`-- # START BUILD: Articles html page. --`);
let articles_to_build = []
let articles = fs.readdirSync(path_db_entries).filter((file) => file.endsWith(".md"));

if (inc_files.length > 0) {
  console.log(`INCREMENTAL BUILD ACTIVATED FOR: ${inc_files}`);
  let inc_filenames = inc_files.map(f => {
    let name = f.replace('db/entries/', '')
    console.log(`name change from: ${f} || to: ${name}`);
    return name;
  });
  
  articles_to_build = inc_filenames;
}
else {
  articles_to_build = articles; 
}

let articles_latest = articles.map((entryFileName) => {
  
  const entryTitle = entryFileName.replace(".md", "").replaceAll("-", " ")
                      .toLowerCase().split(' ')
                      .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                      .join(' ');
                      
  const dashedName = entryFileName.replace(".md", ".html");

  let entry = {
    title: entryTitle,
    slug: `/blog/${dashedName}`,
    filename: entryFileName
  };

  console.log(entry);
  return entry;
});

console.log("Articles to build: ", articles_to_build);

function buildArticles(articles_to_build) {
  if (articles_to_build) {
    articles_to_build.forEach((article, index) => {
      console.log(`___ ${index} - Reading content article from: ${article} --`);
      const content = fs.readFileSync(
        path.join(path_db_entries, article),
        "utf-8"
      );

      console.log(`___ ${index} - Getting matter metada from: ${article} --`);
      const { data, content: markdownContent } = matter(content);

      console.log(`___ ${index} - Parsing content to HTML from: ${article} --`);
      const htmlContent = marked.parse(markdownContent);

      console.log(
        `___ ${index} - Setting Handlebars template values from: ${article} --`
      );

      articles_latest.forEach((entry) => {
        if (entry.filename === article) {
          entry["article_img_url"] = data.article_img_url;
          entry["article_img_alt"] = data.article_img_alt;
        }
      });

      const html = layoutTmpl({
        route: "/article",
        meta: data,
        content: htmlContent,
        articles_latest: articles_latest,
      });

      // const outputFileName = file.replace(".md", ".html");
      console.log(
        `___ ${index} - Build html page output file name for:  ${article} --`
      );
      const outputFileName = path.basename(article).replace(".md", ".html");

      console.log(`___ ${index} - Building output path for:  ${article} --`);
      const outputPath = path.join(path_blog, outputFileName);

      console.log(
        `___ ${index} - Writing HTML page into file system for: ${article} --`
      );
      fs.writeFileSync(outputPath, html);

      console.log(`___ ${index} - HTML file generated: ${outputPath} --`);
    });
  } else {
    console.log("-- # INFO: No new or updated articles to process.");
  }
}

buildArticles(articles_to_build)
console.log(`-- # END BUILD: Blog Articles html pages --`);
//#endregion.

//#region Blog HTML page build.
console.log('\n');
console.log(`-- # START BUILD: Blog html page. --`);
if (buildBlogPg) {
  const blogHtml = layoutTmpl({
    route: "/blog",
    articles_latest: articles_latest,
  });

  fs.writeFileSync(path.join(path_blog, "index.html"), blogHtml);
}
console.log(`-- # END BUILD: Blog html page. --`);
//#endregion

//#region Home HTML page build.
console.log(`-- # START BUILD: Home html page. --\n`);
if (buildHomePg) {
  const homeHtml = layoutTmpl({
    route: "/",
  });

  fs.writeFileSync(path.join(path_public, "index.html"), homeHtml);
}
console.log(`-- # END BUILD: Home html page. --\n`);
//#endregion

console.log("# END Static website build process. --");
