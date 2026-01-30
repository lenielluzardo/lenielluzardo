raw-prompts.md

29/01/2026
This will serve as a raw promp that later when we finish we will match with the CONTINUE_SESSION_PROPMT.md.

1. Let's make a refactor on several features of the project. Let's start removing the cms that is not the one from Netlify.

2. Let's use this repo as the main source to create the articles, so the deployment configuration is simpler than the currently implemented. Meaning, I will post here in this project instead of the ll.db.blog repository.

But, make a github action that everytime that i add a new article to this repo, it will take the new article and commit it also to the ll.db.blog.

===== done

3. Now please change the "blog_main" directory and all its references on files to be called as "blog".

==== done

4. Now please mix all files that you created as registry for the work you've done (so good by the way) in one file. Dividing them per section per date and feature.

5. Edit the continue session to be the file that has all the registry of the changes made to the project, mark the things that are already done with "✅" and use it that to infer the status of the project and how to continue.

6. Edit the AI_AGENT_REPLICATION_PROMPT with the "prompts" from this file also, to be able to replicate the project in the current state.

===== done

7. Edit the AI_AGENT_REPLICATION_PROMPT.md to exlude personal infromation, for data relate to linkeding profile, email and other personal information, use place holder.

Also, don't leave in this file status of the previos project state. This file should serve as a prompt for an AI agent to replicate this exact project from scratch in the current state, it shouldn't have memory of the previous state (because i won't matter).

8. Compare the CONTINUE_SESSION_PROMPT and the PROJECT_CHANGE_REGISTRY for duplicated information. If there's is duplicated information or steps, erase one of the files (the one with less information). If there are information in one file that doesn't exists in the other, mix that in one file (take the main file the one that is more extensive or informative).

Add a section (where correspond) to always update the AI_AGENT_REPLICATION_PROMPT in case there are significant changes to the project arquictecture.

Let's say, to clarify, one file will serve to build the project from scratch by any AI agent. And the other will serve as a sort of history and continuation of the work done in project and/or session

===== done

9. I created a "project-documentation" directory for the prompts and changes and history. Include this in the commit history. Make all the adding, stagins and commiting to github.

10. Then show me again the steps to create the token and sync the repositories please.

===== done

11. Please, check that the sync actions no only syncs for new articles but also for modifications. And if soy make the corresponding changes.

===== done

12. Copilot, based on what you recommended me, let's make the Cloudfare pages + github oauth, but when building the configuration files, leave the ones from netlify as they are, create new files for the configuration with cloudfare and move all configurations for both platforms in their own directories so i can identify all config files related to the platform.

In the files that interact more with the application, don't erase also the current configuration, if you need to disable any existing configuration to avoid conflict, just comment the code and leave a descriptive comment to the purpose of the commented code.