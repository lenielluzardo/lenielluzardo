console.log("\n # START Static website build process. --\n");

//#region Module Imports.
console.log("- # Loading dependencies. --\n");

const fs = require("fs");
const path = require("path");
const { Marked } = require("marked");
const customHeadingId = require ("marked-custom-heading-id");
const matter = require("gray-matter");
const Handlebars = require("handlebars");
const minimist = require("minimist");
const { markedHighlight } = require("marked-highlight");
const hljs  = require("highlight.js");

const marked = new Marked(
  markedHighlight({
    emptyLangClass:'hljs',
    langPrefix: 'hljs language-',
    highlight(code, lang, info) {
        const language = hljs.getLanguage(lang) ? lang : 'plaintext';
         return hljs.highlight(code, { language }).value;
    }
  })
)

//#endregion.


const args = minimist(process.argv.slice(2));
const entries_incremental = args.files ? args.files.split(" ") : [];

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
let hbs_layout = null;
let hbs_articles_latest = null;

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
      hbs_layout = Handlebars.compile(tmplSrc);

    } else {
      console.log(`___ ${index} - Compiling ${fileName} template. --`);
      let partialName = fileName.replace(".hbs", "");

      console.log(`___ ${index} - Registering ${partialName} template. --`);
      Handlebars.registerPartial(partialName, tmplSrc);

      if (partialName === "article") {
        articleTmpl = tmplSrc;
      }
      if (partialName == "articles_latest") {
        hbs_articles_latest = tmplSrc;
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
console.log(`-- # START BUILD: Articles html page. --`);

// Ensure the blog directory exists
if (!fs.existsSync(path_blog)) {
  fs.mkdirSync(path_blog);
}

function buildArticle(index, a_file_name, meta_data, md_content) {
  console.log(`___ ${index} - Parsing content to HTML from: ${a_file_name} --`);
  let html_content = marked.parse(md_content);
  
  console.log("trying to extract outline");

  let outlineEndTag = '</outline>';
  let idxOutlineStart = html_content.indexOf(`<outline>`);
  let idxOutlineEnd = html_content.indexOf(`</outline>`);
  let inxEndOutlineEnd = idxOutlineEnd + outlineEndTag.length;
    
  let outline = html_content.substring(idxOutlineStart, inxEndOutlineEnd);

  console.log(inxEndOutlineEnd);

  console.log("the outline is");
  console.log(outline);
  
  console.log("the HTML is");
  html_content = html_content.replace(outline, "");

  console.log(html_content)

  outline = outline.replace("<outline>", "");
  outline = outline.replace("</outline>", "");

  console.log("the outline is #2");

  console.log(outline);

  console.log(
    `___ ${index} - Setting Handlebars template values from: ${a_file_name} --`
  );

  const html = hbs_layout({
    route: "/article",
    meta: meta_data,
    outline: outline,
    content: html_content,
  });

  console.log(
    `___ ${index} - Build html page output file name for:  ${a_file_name} --`
  );
  const outputFileName = path.basename(a_file_name).replace(".md", ".html");

  console.log(`___ ${index} - Building output path for:  ${a_file_name} --`);
  const outputPath = path.join(path_blog, outputFileName);

  console.log(
    `___ ${index} - Writing HTML page into file system for: ${a_file_name} --`
  );
  fs.writeFileSync(outputPath, html);

  console.log(`___ ${index} - HTML file generated: ${outputPath} --`);
}

const articles_all = fs.readdirSync(path_db_entries).filter((file) => file.endsWith(".md"));
const articles_latest_vm = [];

if (articles_all) {
  
  articles_all.forEach((_art, _idx) => {
    console.log(`___ ${_idx} - Reading content article from: ${_art} --`);
    const content = fs.readFileSync(path.join(path_db_entries, _art), "utf-8");

    console.log(`___ ${_idx} - Getting matter metada from: ${_art} --`);
    const { data, content: md_content } = matter(content);

    articles_latest_vm.push({ ...data });

    if (entries_incremental.length > 0) {
      console.log(`INCREMENTAL BUILD ACTIVATED FOR: ${entries_incremental}`);

      let articles_incremental = entries_incremental.map((f) => {
        let name = f.replace("db/entries/", "");
        console.log(`name change from: ${f} || to: ${name}`);
        return name;
      });

      const article_to_build = articles_incremental.find(
        (articleName) => articleName === _art
      );
      if (article_to_build) {
        buildArticle(_idx, _art, data, md_content);
      }
    } else {
      // If not incremental then build all articles.
      buildArticle(_idx, _art, data, md_content);
    }
  });
} else {
  console.info("-- # INFO: No new or updated articles to process.");
}

console.log(`-- # END BUILD: Blog Articles html pages --`);
//#endregion.

//#region Articles Latest Partial Build
const sorted_articles_latest_vm = articles_latest_vm.sort((a, b) => {
  const aDate = new Date(a.date_created);
  const bDate = new Date(b.date_created);

  return bDate.getDate() - aDate.getDate();
});

if (hbs_articles_latest) {
  const html_articles_latest = Handlebars.compile(hbs_articles_latest)({
    articles_latest: sorted_articles_latest_vm,
  });

  fs.writeFileSync(
    path.join(path_blog, "/__partials__/_articles_latest.html"),
    html_articles_latest
  );
}
//#endregion

//#region Blog HTML page build.
console.log(`-- # START BUILD: Blog html page. --`);

if (buildBlogPg) {

  const blogHtml = hbs_layout({
    route: "/blog",
  });

  fs.writeFileSync(path.join(path_blog, "index.html"), blogHtml);
}
console.log(`-- # END BUILD: Blog html page. --`);
//#endregion

//#region Home HTML page build.
console.log(`-- # START BUILD: Home html page. --\n`);

if (buildHomePg) {
  const homeHtml = hbs_layout({
    route: "/",
  });

  fs.writeFileSync(path.join(path_public, "index.html"), homeHtml);
}
console.log(`-- # END BUILD: Home html page. --\n`);
//#endregion

console.log("# END Static website build process. --");
