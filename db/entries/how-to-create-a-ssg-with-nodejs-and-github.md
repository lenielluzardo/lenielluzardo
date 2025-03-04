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
6. **[Create The Build Script.](#create-build-script)**
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

[Github has a special repository][2.3] that is presented in your profile commonly used to showcase your personal information, experience, or a custom message. Although, is not necessary, for this example, we'll use the Github "special repo" to create our SSG; the main idea of this, is to have a personal blog to write articles and show our experience in the same repository of our Github profile README.md file, that way we can have all the information for our brand centrilized. Although, you can create your SSG in any another repository if that's what you want to do. 

Ok, once you have created your account and your repository, its [time to clone it into your machine][2.4].

[2.1]:https://github.com/signup "Create Github account guide"
[2.2]:https://docs.github.com/en/repositories/creating-and-managing-repositories/quickstart-for-repositories "Create a Github repository guide"
[2.3]: https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile/customizing-your-profile/managing-your-profile-readme "Special Github repository guide"
[2.4]:https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository "Github Cloning guide"
---

## Create Project Struture. {#project-structure}

Now that we have our repository cloned into our machine, we can navigate to the directory we clone it. Open it in the code editor (I use VSCode) and start codining, **Yey!**.

We will use a project structure that will allow us to: use or migrate the articles we write to a headless CMS later, if that is what we want. But that is out of the scope of this tutorial for now.

For the Github "special repo" to work properly, the README.md file needs to be in the root directory of our repository. Because we want to maintain the root directory as clean as possible. we will create the following sub-directories for our project:

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
|__ README.md

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

1. **[gray-matter][5.1]:** In order to parse YAML frontmatter metadata from out .md files to JSON.
2. **[handlebars][5.2]**: In order to compose layouts for the different sections of our website.
3. **[marked][5.3]**: In order to parse the content of our .md files into HTML.
4. **[marked-custom-heading-id][5.4]**: In orther to take advantage of Markdown extended syntax for reference heading ids.
5. **[minimist][5.5]**: In order to read arguments from the terminal environment, to activate incremental builds.

**Run the following command:**
```
npm install gray-matter handlebars marked marked-custom-heading-id minimist
```
We should end up with a `package.json` file similar to this:

```json

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



---

## Create The Build Script. {#create-build-script}
*This section is currently under construction*

---

## Create Handlebars Template. {#create-hbs-template}
*This section is currently under construction*

---

## Build The HTML Files. {#build-html}
*This section is currently under construction*

---

## Deploy to Github. {#github-deploy}
*This section is currently under construction*

--

## Conclusion
*This section is currently under construction*


---

*This post was written in Markdown and automatically rendered by this Node.js SSG blogging system. Pretty cool, huh?*