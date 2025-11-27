---
title: "How To Create a SSG with Node JS and Github."
excerpt: "A simple and a fast way to create your personal blog and portfolio."
author: "Leniel Luzardo"
author_bio: "Software developer"
author_img: "%author_img%"
author_profile: "https://www.linkedin.com/in/lenielluzardo"
type: "Technical Guide"
category: "Web Development"
tags: ["Node.js", "Blogging", "GitHub"]
created: "2025-03-03"
modified: "2025-03-03"
url: "https://www.luzar.dev/blog/how-to-create-a-ssg-with-nodejs-and-github.html"
slug: "/blog/how-to-create-a-ssg-with-nodejs-and-github.html"
img_url: "https://res.cloudinary.com/du3l28sfg/image/upload/v1741032541/blog/covers/iwr6traoh40sgsoxqy9y.jpg"
img_alt: "A placeholder image for testing purposes."
---
<div id="outline">

## Outline.
1. **[A simple and a fast way to create your personal blog and portfolio.](#introduction)**
2. **[Pre-requesites](#pre-requisites)**
3. **[Initialize a Repository.](#create-repository)**
4. **[Create Project Struture.](#project-structe)**
5. **[Install Dependencies.](#install-dependencies)**
6. **[Building the SSG.](#building-ssg)**
7. **[Create Handlebars Template.](#create-hbs-template)**
8. **[Build The HTML Files.](#build-html)**
9. **[Deploy to Github.](#github-deploy)**
10. **[Conclusion.](#conclusion)**

</div>

---

## A simple and fast way to create your personal blog and portfolio. {#introduction}

Hello, fellow developers and tech enthusiasts!

The main goal of this guide is to share with you a "simple and fast" way to create a Static Site Generator  with Node.js that will be fed with `markdown` files, generate the corresponding `HTML` static files for your blog and then deploy it to GitHub Pages. 

You might be asking: **But aren't there already several well-known SSGs on the web that are well-supported and have great communities, documentation, plugins, and resources?**

To which I'd say: **Yes, but**:

* **First:** This is a great and fun project to practice your programming skills, with a "real-world" final product that is a little bit more than a "Hello World" console application. *(Bt the way, I don't have any problem with "Hello world" console apps; they're fun* 😉*)*

* **Second:** You won't have any dependency on third-party vendors or the need to learn another JS framework. We'll use only Vanilla JavaScript, the Node.js environment and GitHub to create a simple and low-maintenance blogging system.
  
* **Third:** This way, you can have your little corner of the "WWW" and share your expertise and ideas with the rest of the world in no time. 

**So, if you're still interested and want to give it a try, grap a cup of coffee, do some hand stretches, and let's dive in.**

---

## Pre-requisites. {#pre-requesites}

Okay, let’s start with the prerequisites; please make sure you have the following items in place before proceeding. If you’re an experienced programmer, don’t worry—this should be a piece of cake for you! 😎

1. **[Basic JavaScript programming skills][1.0]**
2. **[Basic understanding of Node.js][1.1]**
3. **[Basic understanding of the Handlebars.js template engine][1.2]**
4. **[A GitHub account with a repository][1.3]**
5. **[Basic understanding of GitHub Actions][1.4]**
6. **[A code editor like VS Code][1.5]**

[1.0]: https://developer.mozilla.org/en-US/docs/Web/JavaScript "MDN Javascript tutorial"
[1.1]: https://nodejs.org/en/learn/getting-started/introduction-to-nodejs "Official NodeJs docs"
[1.2]: https://handlebarsjs.com/guide/#what-is-handlebars "Official Handlebars documentation"
[1.3]: https://github.com/ "Official Github page"
[1.4]: https://docs.github.com/es/actions "Github Actions guide"
[1.5]: https://code.visualstudio.com/ "Visual Studio Code download page"   

---

## Initialize a Repository. {#create-repository}

First things first: it’s necessary to [create a GitHub account][2.1] and [initialize a repository][2.2] if you don’t already have one.

[GitHub has a special repository][2.3] that is displayed on your profile and commonly used to showcase your personal information, experience, or a custom message. While it’s not necessary, for this example, we’ll use GitHub’s "special repo" to create our SSG. The main idea is to have a personal blog where you can write articles and showcase your experience within the same repository as your GitHub profile’s **`README.md`** file, centralizing all the information for your brand. However, you can create your SSG in any other repository if that’s what you prefer.

Okay, once you’ve created your account and repository, it’s [time to clone it to your machine][2.4].

[2.1]:https://github.com/signup "Create Github account guide"
[2.2]:https://docs.github.com/en/repositories/creating-and-managing-repositories/quickstart-for-repositories "Create a Github repository guide"
[2.3]: https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile/customizing-your-profile/managing-your-profile-readme "Special Github repository guide"
[2.4]:https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository "Github Cloning guide"
---

## Create Project Struture. {#project-structure}

Now that we have our repository cloned to our machine, we can navigate to the directory where we cloned it. Open it in your code editor (I use VS Code) and start coding—**yay!**

We’ll use a project structure that allows us to use or migrate the articles we write to a headless CMS later if that’s what we want. However, that’s beyond the scope of this tutorial for now.

For the GitHub "special repo" to work properly, the **README.md** file must be in the root directory of our repository. Since we want to keep the root directory as clean as possible, we’ll create the following subdirectories for our project:

* A directory called **db** for the articles or "entries."
* A directory called **ssg** for the SSG script and Handlebars templates.
* A directory called **docs** for the final static files that will eventually be served from GitHub Pages.

The only directory with a strict name is the **docs** directory. This is because, when we deploy our site later, we’ll use the GitHub Pages branch deployment feature. Unfortunately, at the time of writing this guide, GitHub Pages only allows you to deploy from the root directory or a subdirectory called "/docs" *(without using the GitHub Custom Actions workflow).*

Okay, our repository structure should look something like this:

```
repository/
|-- db/
|-- docs/
|-- ss/
|-- README**.md**

```
Great! Now we have everything in place to start typing away and create some magic! 😉

---

## Install Dependencies. {#install-dependencies}

Now that we have our repository structure in place, let’s open the code editor you chose (I’ll be using VS Code). If you’re using VS Code like me, you can open the editor from the file explorer’s context menu by right-clicking the explorer window and selecting **"Open with Code"**.

![Open VS Code from Context Menu](https://res.cloudinary.com/du3l28sfg/image/upload/v1741105903/blog/exampleof/open-vscode-contex-from-menu_dnkvdd.png)

### Check That Node Is Installed

Once the code editor is open, we need to confirm that Node is installed, just in case you missed it in the steps above.  
**Run the following command in a new terminal:** *(If you’re using VS Code, you can open the integrated terminal.)*

```
\repository\ssg > node --version

// If you see something like it means it's installed: 
// ouput:
// v22.14.0 

```

### Initialize the Manifest

After confirming that Node is installed, let’s initialize our application manifest, which will contain general information about our app and hold references to all our dependencies.

**In your terminal, run:**

```
npm init
```
You’ll be asked to fill in some values, and after you enter them, a `"package.json"` file will be created.

![npm init Example](https://res.cloudinary.com/du3l28sfg/image/upload/v1741109966/blog/exampleof/npm-init_ofiix6.png)

### Install dependencies.
Now, let’s install our dependencies. For this project, we need the following libraries:

1. **[gray-matter][5.1]:** To parse `YAML` frontmatter metadata from our **`.md`** files into JSON.
2. **[handlebars][5.2]:** To compose layouts for the different sections of our website.
3. **[marked][5.3]:** To parse the content of our **`.md`** files into `HTML`.
4. **[marked-custom-heading-id][5.4]:** To take advantage of Markdown’s extended syntax for referencing heading IDs.
5. **[minimist][5.5]:** To read arguments from the terminal environment and activate incremental builds.
6. **[fs][5.6]:** The Node FS module, used to load, read, and write to the filesystem. 

**Run the following command:**
```
npm install gray-matter handlebars marked marked-custom-heading-id minimist
```

We should end up with a `"package.json"` file similar to this:

```json
/repository/ssg/package.json

{
  "name": "node-ssg",
  "version": "1.0.0",
  "description": "My awesome SSG with Node",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "repository": {
    "type": "git",
    "url": "your-git-repo"
  },
  "author": "your-name",
  "license": "ISC",
  "dependencies": {
    "gray-matter": "^4.0.3",
    "handlebars": "^4.7.8",
    "marked": "^15.0.7",
    "marked-custom-heading-id": "^2.0.11",
    "minimist": "^1.2.8"
  }
}
```
[5.1]: https://www.npmjs.com/package/gray-matter "Gray Matter library"
[5.2]: https://www.npmjs.com/package/handlebars "Handlebars library"
[5.3]: https://www.npmjs.com/package/marked "Marked library"
[5.4]: https://www.npmjs.com/package/marked-custom-heading-id "Marked Custom Headings library"
[5.5]: https://www.npmjs.com/package/minimist "Minimist library"
[5.6]: https://nodejs.org/api/fs.html "File System module from Node.js"

---

## Building the SSG {#building-ssg}

Now the fun part has arrived: coding the script that will work its magic for us 😎. Generally speaking, the entire logic of this system consists of the following steps:

1. Load the **.md** files from our file system, located at `repository/db/`.
2. Read the content of the **.md** files.
3. Compose a general layout for our homepage and article pages using Handlebars.
4. Compile the templates into HTML markup.
5. Write the HTML files to the `repository/docs/` directory.

### Creating the Build Script

Inside the `repository/ssg/` directory, create a file named `build.js`. This will serve as our application’s entry point. As a side task, open the `package.json` file and ensure that the `"main"` field specifies our build script as its value.

```json 
/repository/ssg/package.json

{
  ... some key values

  "main": "build.js",
  
  ... more key values
}
```

Now, in our `build.js` script, import the following libraries as shown below:

```javascript 
/repository/ssg/build.js

const fs = require("fs");                 // This is for input/ouput operation.
const path = require("path");             // This is for path construction and navigation.
const marked = require("marked");         // This is to parse **.md** file to html.
const customHeadingId = require ("marked-custom-heading-id"); // To use **.md** extended syntax features (for reference heading ids).
const matter = require("gray-matter");    // To extract frontmatter metadata.
const Handlebars = require("handlebars"); // To compose some HTML templates.
const minimist = require("minimist");     // To read arguments from the terminal.
```

Now let’s define some variables for the repository paths to target the directories we want to read from and write to:

**Note:** Take into consideration that for the `root` path, we need to navigate one level up to access the `repository/db/` and `repository/docs/` directories.

```javascript 
/repository/ssg/build.js

...module imports

const path_root = path.join(__dirname, "../");      // this is: repository/
const path_db = path.join(path_root, 'db');         // this is: repository/db      
const path_ssg = path.join(path_root, 'ssg');       // this is: repository/ssg
const path_docs = path.join(path_root, 'docs');     // this is: repository/docs
```

With this configuration in place, we should be ready for the next step: composing our templates.

---

## Create a Handlebars Template {#create-hbs-template}

Great! We have all our dependencies and repository paths set up. Now we need to create some `HTML` templates that will be populated with our **.md** content. To avoid making this tutorial longer than it already is, we’ll create a simple `HTML` template to demonstrate the fundamentals of the Handlebars engine. However, **[you can check the source code for this repo][6.1]** to get an idea of the structure you can achieve with this template engine.

In the `repository/ssg/` directory, create a file named `template.hbs`. Then open it and write some markup as shown below:

```html
/repository/ssg/template.hbs

<!-- Handlebars uses doble curly braces to output variable values stored in the context -->
<h1>{{ title }}</h1>
<article> 

<!-- Handlebars used triple curly braces to output HTML text directly without scaping -->
{{{ content }}} 

</article>
```

Now we need to read the contents of this file and precompile it to use it correctly.  
We’ll use the `fs` module to read the contents of the template file and then pass them to the `Handlebars.compile()` function. We’ll define a function to encapsulate the compilation code, making it reusable and keeping everything a bit more organized.

```javascript
/repository/ssg/build.js

... module imports
... paths configuration

const path_hbs_template = path.join(path_ssg, 'template.hbs');

function compileHBSTemplate(path) {
  // Reads the content of the template.
  hbsTemplateContent = fs.readFileSync(path, "utf-8");
  
  // Compile the template content, this returns a function that builds the HTML later.
  const hbsCompiledTemplate = Handlebars.compile(hbsTemplateContent); 
  
  // We return the pre-compiled template.
  return hbsCompiledTemplate;
}

// We get the precompile template that we'll use later to create the html.
const hbsCompiledTemplate = compileHBSTemplate(path_hbs_template);

```

[6.1]: https://github.com/lenielluzardo/lenielluzardo/tree/main/ssg/hbs_template "Author's repository Templating"

---

## Build the HTML Files {#build-html}

We’re almost there—don’t give up yet! With the template in place, the next step is to:

1. Create a function to build the HTML for us. This function will accept four parameters: `filename`, `metadata`, `mdContent`, and `hbsTemplate`. It will parse the precompiled Handlebars template into `HTML`, inject the dynamic data from the other variables, and write the final result to the filesystem. Think of this as an unusual MVC-Frankenstein pattern 🧟‍♂️!

2. Then we’ll retrieve our **`.md`** files by using the `fs` module to read the entire `repository/db/` directory. This will give us a list of all the articles on our website.

3. Finally, we need to iterate over the **`.md`** list to read the content of each file and build the `HTML` by calling the previously defined function with the corresponding arguments. We’ll use **`gray-matter`** to extract the frontmatter metadata from the **`.md`** files and **`marked`** to parse the Markdown syntax into `HTML`.


```javascript
/repository/ssg/build.js

... module imports
... paths configuration
... hbs template configuration

// 1. Defining the build HTML file function.
function buildHTMLfile(fileName, metadata, mdContent, hbsTemplate) {
  
  const htmlContent = marked.parse(mdContent);

  const html = hbsTemplate({
    title: metadata.title,
    content: htmlContent,
  });

  // Replacing file extensions from .md to .html
  const htmlFileName = fileName.replace(".md", ".html");
  const outputPath = path.join(path_docs, htmlFileName);

  fs.writeFileSync(outputPath, html);
}

// 2. Read Entries / articles / blog post etc.. from /repository/db
const mdEntries = fs.readdirSync(path_db);

// Check is not empty.
if (mdEntries && mdEntries.length > 0) {

// 3. Iterating over the list.
  md.Entries.forEach((fileName) => {
    
    // Form the filename path
    const path_filename = path.join(path_db, fileName);

    // Reads its content
    const content = fs.readFileSync(path_filename, "utf-8");

    // Get the frontmatter and body content.
    const { data, content: mdContent } = matter(content); 

    // Calling the build HTML function
    buildHTMLfile(fileName, data, mdContent, hbsCompiledTemplate);
  });
}

```

Whew! That was a long journey, my friend—you made it! Although we’re not done yet 😅.  
I’ll provide you with a **`.md`** article template. You’ll notice that it has more properties and metadata than the Handlebars template we created. If you’d like, as an exercise, you can pass additional properties to the Handlebars template. I won’t include it here because it’s too long, but [you can find it here][7.1].

For the sake of this example, we’ll proceed with:

```markdown

---
title: "My title"
---

# My Heading
Some paragraph.

```

Ok, once you have a **`.md`** file located in your `repository/db/` directory, the next step is to make the engine roar! Open a new terminal, navigate to the `repository/ssg/` directory, and:

**Run this command:**
``node build``

After it finishes, you'll notice that a new HTML file has been added to the `docs/` directory. If you open it, you'll notice that the content is the same as your markdown article.

**Congratulations!!!**🥳🎉🎉 We have a working SSG for articles.

[7.1]: https://github.com/lenielluzardo/node-ssg-template/blob/main/db/myarticle.md "Markdown article template"
---

## Deploy to Github. {#github-deploy}
Well, we have our SSG, but something is missing. We need to make our articles available for the world to see. This step is an easy one; we just need to go to our repository's settings tab. Under the Pages section in the "Build and Deployment" area, we're going to select "Deploy from branch," choose our "main" branch, and then select our "docs" directory. GitHub will take care of the deployment process for us; it will deploy any static file that is under the "docs" directory. Make sure you have an index.html file as the default file for our website.

This is a very general and quick overview of how to deploy it. I intend to write a more detailed explanation of this step and to implement incremental deployments in following articles.

--

## Conclusion

Although it may seem like it is not a common pattern, this approach allows you to have a hybrid system that takes advantage of the headless CMS pattern and static pages, without the need to pay for or configure any type of server or database. Your database consists of the **`.md`** files that you can use later with another system if the requirements change. However, for a simple blog that doesn't have huge loads of articles or that does not change so often, it's a perfect match. Also, you don't need to learn another framework or platform, making the development process really easy.

Obviously, we didn't compose a complicated HTML layout, nor did we implement sub-routes. But we will do it in another guide that will be based on the progress we made today. I'll keep you posted; I hope to publish this article and make the others in a couple of days.

Until then, "and in case I don't see ya, good afternoon, good evening, and good night."

![Truman bye bye](https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExcmV6dHYwbXF6ZDViZDNlMTl0OWNzdXF5ODBlZmI4a3BlNTAycnI1OCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/dRvEZLV0ORAmHT1L5u/giphy.gif)

---

*This post was written in Markdown and automatically rendered by this Node.js SSG blogging system. Pretty cool, huh?*