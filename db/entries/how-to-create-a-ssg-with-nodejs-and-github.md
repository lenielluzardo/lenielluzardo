---
title: "How To Create a SSG with Node JS and Github."
excerpt: "A simple and a fast way to create your personal blog and portfolio."
author: "Leniel Luzardo"
author_bio: "Software developer"
author_img: "%author_img%"
author_profile: "https://www.linkedin.com/in/lenielluzardo"
category: "Web Development"
tags: ["Node.js", "Blogging", "GitHub"]
date_created: "2025-03-03"
date_modified: "2025-03-03"
article_url: "https://www.luzar.dev/blog/how-to-create-a-ssg-with-nodejs-and-github.html"
article_slug: "/blog/how-to-create-a-ssg-with-nodejs-and-github.html"
article_img_url: "https://res.cloudinary.com/du3l28sfg/image/upload/v1741032541/blog/iwr6traoh40sgsoxqy9y.jpg"
article_img_alt: "A placeholder image for testing purposes."
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

## A simple and a fast way to create your personal blog and portfolio.. {#introduction}

Hello, fellow developers and tech enthusiasts!

The main goal for this guide is to share with you a "simple and fast" way to create a Static Site Generator build with Node.js, that will be feed with markdown files and generate the corresponding HTML static files for your articles, and host them on GitHub pages. 

You'd be asking: **¿But there aren't already several well-known SSGs on the web that are well supported and has great communities, documentation, plugings and resources?**

To which I'd say: **Yes, BUT**:

* **First:** This is a great and fun project to put into practice your programming skills, with a "real world" final product that is a little bit more than a "Hello World" console application. *(BTW, I don't have any problem with "Hello world" console apps, they're fun* 😉 *)*

* **Second:** You wont have any dependency with third-party vendors nor the need to learn another JS framework. We'll use only Vanilla Javascript, Node.js environment and Github actions to create a simple and low maintenance blogging system.
  
* **Third:** This way you can have your little corner on the **WWW**, and share your expertise and ideas with the rest of the world in no-time. 

**So, if you are still interested and want to give it a try, take a cup of coffee, make some hand streches and let's dive in.**

---

## Pre-requisites. {#pre-requesites}

Ok let's start with the pre-requesites; please make sure you have the following items in place before going further. Or if you're an experienced programmer, no worries then, this should be a piece of cake for you! 😎.

1. **[Basic JavaScript programming skills.][1.0]** 
2. **[Having Node.js basic understanding.][1.1]**
3. **[Handlebars.js Template engine basic understanding.][1.2]**
4. **[A Github account with a repository.][1.3]**
5. **[Basic Github Actions basic understanding.][1.4]**
6. **[A Code Editor like VSCode.][1.5]**

[1.0]: https://developer.mozilla.org/en-US/docs/Web/JavaScript "MDN Javascript tutorial"
[1.1]: https://nodejs.org/en/learn/getting-started/introduction-to-nodejs "Official NodeJs docs"
[1.2]: https://handlebarsjs.com/guide/#what-is-handlebars "Official Handlebars documentation"
[1.3]: https://github.com/ "Official Github page"
[1.4]: https://docs.github.com/es/actions "Github Actions guide"
[1.5]: https://code.visualstudio.com/ "Visual Studio Code download page"   

---

## Initialize a Repository. {#create-repository}

First things, first; is necessary that you [Create a Github account][2.1] and [initialize a repository][2.2]. If you don't have one already.

[Github has a special repository][2.3] that is presented in your profile commonly used to showcase your personal information, experience, or a custom message. Although, is not necessary, for this example, we'll use the Github "special repo" to create our SSG; the main idea of this, is to have a personal blog to write articles and show our experience in the same repository of our Github profile README**.md** file, that way we can have all the information for our brand centrilized. Although, you can create your SSG in any another repository if that's what you want to do. 

Ok, once you have created your account and your repository, its [time to clone it into your machine][2.4].

[2.1]:https://github.com/signup "Create Github account guide"
[2.2]:https://docs.github.com/en/repositories/creating-and-managing-repositories/quickstart-for-repositories "Create a Github repository guide"
[2.3]: https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile/customizing-your-profile/managing-your-profile-readme "Special Github repository guide"
[2.4]:https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository "Github Cloning guide"
---

## Create Project Struture. {#project-structure}

Now that we have our repository cloned into our machine, we can navigate to the directory we clone it. Open it in the code editor (I use VSCode) and start codining, **Yey!**.

We will use a project structure that will allow us to: use or migrate the articles we write to a headless CMS later, if that is what we want. But that is out of the scope of this tutorial for now.

For the Github "special repo" to work properly, the README**.md** file needs to be in the root directory of our repository. Because we want to maintain the root directory as clean as possible. we will create the following sub-directories for our project:

 * One directory called **db**, for the articles or 'entries' .
 * One directory called **ssg**, for the SSG script and Handlebars templates.
 * And one directory called **docs**, for the final static files, that eventually will be served from Github Pages .

The only directory that has a strict name is the **docs** directory. This is because, later when we deploy our site, we will use the GitHub pages branch deployment feature. Unfortunately at the moment of writing this guide, Github Pages only allow you to deploy from the root directory or a sub-directory called "/docs" *(WHITOUT USING THE GITHUB CUSTOM ACTIONS WORKFLOW).*

Ok then, our repository structure should be something like this:

```
repository
|-- db/
|-- docs/
|-- ss/
|__ README**.md**

```
¡Great! Now we have everything in place to start hitting the keyboard and produce some magic! 😉.

---

## Install Dependencies. {#install-dependencies}

Now that we have our repository structure in place, let's open the Code Editor you chose (I'll be using VSCode). If you're using VSCode like me, you can open the editor from the file explorer menu context, by right-clicking the explorer window until the context menu appears and then select **'Open with Code'**.

![Open VSCode on Context Menu](https://res.cloudinary.com/du3l28sfg/image/upload/v1741105903/blog/exampleof/open-vscode-contex-from-menu_dnkvdd.png)

### Check Node is installed.
Once the code editor is open, we need to make sure the Node is installed, just in case you forgot in the steps above. 
**Run the following command in a new terminal:** *(If you're using VSCode you can open the integrated terminal)*

```
\repository\ssg > node --version

// If you see something like it means it's installed: 
// ouput:
// v22.14.0 

```

### Initialize the manifest.
After we check that we have Node installed, lets initialize our application manifest, which will contain general information about our app and also will hold all the dependencies reference. 

**In your terminal run:**

```
npm init
```
You'll be asked to fill some values, and after you entered them a ``"package.json"`` file will be created.

![npm init Example](https://res.cloudinary.com/du3l28sfg/image/upload/v1741109966/blog/exampleof/npm-init_ofiix6.png)

### Install dependencies.
Now, let's install our dependencies, for this project we need the following libraries:

1. **[gray-matter][5.1]:** In order to parse YAML frontmatter metadata from out **.md** files to JSON.
2. **[handlebars][5.2]**: In order to compose layouts for the different sections of our website.
3. **[marked][5.3]**: In order to parse the content of our **.md** files into HTML.
4. **[marked-custom-heading-id][5.4]**: In orther to take advantage of Markdown extended syntax for reference heading ids.
5. **[minimist][5.5]**: In order to read arguments from the terminal environment, to activate incremental builds.
6. **[fs][5.6]**: Node FS module in order to load, read and write from and to the filesystem. 

**Run the following command:**
```
npm install gray-matter handlebars marked marked-custom-heading-id minimist
```
We should end up with a `package.json` file similar to this:

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

## Building the SSG. {#building-ssg}
Now the fun part has come: coding the script that will do the magic for us 😎. Generally speaking the whole logic of this system consists in:

1. Load the **.md** files from our file system located at `repository/db/`.
2. Reading the content of the **.md** files.
3. Compose some general layout for our home page and articles pages using Handlebars.
4. Compile the templates into HTML markup.
5. Writing the HTML files into the `repository/docs` directory.

### Creating the Build Script.

Inside `repository/ssg/` directory, create a file called `build.js`. This will be our application entry point. As a side quest: open the `package.json` file, and make sure the section called `"main"` has the name of our build script as a value.

```json 
/repository/ssg/package.json

{
  ... some key values

  "main": "build.js",
  
  ... more key values
}
```

Now, in our `build.js` script import the following libraries like so:

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

Now let's define some variables for the repository paths, to be able to target the directories from which we want to read from and the ones we want to write to:

*<ins>Note:</ins> Take in consideration that for the `root` path we need to navigate a level up in order to access the `db/` and the `docs/` directory.*


```javascript 
/repository/ssg/build.js

...module imports

const path_root = path.join(__dirname, "../");      // this is: repository/
const path_db = path.join(path_root, 'db');         // this is: repository/db      
const path_ssg = path.join(path_root, 'ssg');       // this is: repository/ssg
const path_docs = path.join(path_root, 'docs');     // this is: repository/docs
```
With this configuration in place, we should be ready for the next step which is composing our templates.

---

## Create Handlebars Template. {#create-hbs-template}

¡Great!, we have all our dependencies and all the repository paths. Now we need to compose some html templates that will be filled with our **.md** content. To avoid making this tutorial longer than already is, we will create a simple html template to show the fundamentals of the Handlebars engine, but **[you can check the source code for this repo][6.1]** to have a hint on what type of structure can web achieve with this template engine.

In `/repository/ssg/` create a file called `template.hbs`. Then open it an write some markup like this:

```html
/repository/ssg/template.hbs

<!-- Handlebars uses doble curly braces to output variable values stored in the context -->
<h1>{{ title }}</h1>
<article> 

<!-- Handlebars used triple curly braces to output HTML text directly without scaping -->
{{{ content }}} 

</article>
```

Now we need to read the contents of this file and pre-compile it in order to use it correctly.
We'll use the `fs` module to read the content of the template file and then pass it to the `Handlebars.compile()` function. We'll define a function to enclose the compilation code and be able to reuse it and to mantain everything a little bit more organized.

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

## Build The HTML Files. {#build-html}

We're almost there, don't faint yet. Now with the template in place, the next step is to:

1. Create a function that will build the HTML for us; this function will accept four parameters: `filename`, `metadata` `mdContent` and the `hbsTemplate`. And will parse the precompile HBS template into HTML, injection the dynamic data from the other variables and write the final result to the filesystem. Think of this like an odd MVC-Frankenstein pattern 🧟‍♂️!

2. Then, we will get our **`.md`** files. And use the `fs` module to read the entire `db/` directory. That way, we'll get a list of all the articles we have in our website.

3. Finally we need to iterate over the **`.md`** list to read the content for each file an build the HTML, calling the function we previously defined and passing the corresponding arguments. We will use **`gray-matter`** to extract the frontmatter metadata from the **`.md`** file and **`marked`** to parse the **markdown** syntax to HTML.


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

Pfff! Long journey my friend, you made it. Although we're not done 😅.
I'll provide you with a **`.md`** article template. You'll notice that it has more properties and metadata than the Handlebars template with made. If you want, as an exercise, you can pass more properties to the HBS template. I won't paste it here because is too long, but [you can find it here][7.1]

For the sake of this example we'll go with:
```markdown

---
title: "My title"
---

# My Heading
Some paragraph.

```

Ok, once you have a **`.md`** file located in your `db/` directory, the next step is to make the engine roar!. Open a new terminal, navigate to the `ssg/` directory and:

**Run this command:**
``node build``

After it finish, you'll notice that a new HTML  file was added to the `docs/` directory. And if you open it, you'll notice that the content is the same from your markdown article.

**Congratulations!!!**🥳🎉🎉 we have a working SSG of articles.

[7.1]: https://github.com/lenielluzardo/node-ssg-template/blob/main/db/myarticle.md "Markdown article template"
---

## Deploy to Github. {#github-deploy}
Well, we have our SSG but somthing is missing. We need to make available or articles for the world to see. This step is an easy one, we just need to go to our repository settings tab, under the pages section in the apart build and deployment, we're going to select "deploy from branch", we choose our "main" branch and then our "docs" directory. And github will take care the deployment process for us, it will deploy any static file that is under the "docs" directory. Make sure you have and index.html as the default file of our website.

This is a very general and quick overview on how to deploy it. I intend to write a more detailed explanation of this step. And to implement incremental deployments also in following articles. 

--

## Conclusion
Although it may seen like is not a common pattern, this approach allow you to have an hybrid system that takes the advantages of the headless CMS pattern and Static pages, without the need to pay and configure any type of server, nor database. Your database are the **`.md`** files that you can use later with other system if the requirements change, but for a symple blog that doesn't have huge loads of articles or that change no so often it's a perfect match. Also you don't need to learn another framework or platform, making the development process really easy.

Obviously we didn't compose a complicated HTML layout, nor implemented sub-routes. But we will do it in another guide that will be based on the progress we made today. I'll keep you posted, I hope to pulish this article and make the other in a couple of days.

Until then, "and in case I don't see ya, Good afternoon, good evening and good night" 

![Truman bye bye](https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExcmV6dHYwbXF6ZDViZDNlMTl0OWNzdXF5ODBlZmI4a3BlNTAycnI1OCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/dRvEZLV0ORAmHT1L5u/giphy.gif)

---

*This post was written in Markdown and automatically rendered by this Node.js SSG blogging system. Pretty cool, huh?*