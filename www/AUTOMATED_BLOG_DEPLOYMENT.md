# Automated Blog Deployment Setup

This document explains how to set up automated deployment when you push blog posts to the `ll.db.blog` repository.

## How It Works

```
┌─────────────────────────────────────────────────────────────┐
│  1. Push article to ll.db.blog repository                   │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│  2. GitHub Action in ll.db.blog triggers                    │
│     Sends repository_dispatch to main repo                  │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│  3. GitHub Action in main repo activates                    │
│     - Updates blog submodule to latest                      │
│     - Commits submodule reference change                    │
│     - Pushes to main repo                                   │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│  4. Netlify detects main repo change                        │
│     - Builds site with new blog content                     │
│     - Deploys to production                                 │
└─────────────────────────────────────────────────────────────┘
```

## Setup Instructions

### Step 1: Create a Personal Access Token

1. Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
   - Or visit: https://github.com/settings/tokens

2. Click **"Generate new token (classic)"**

3. Configure the token:
   - **Note**: "Blog to Main Repo Dispatch"
   - **Expiration**: Choose "No expiration" or set a long duration
   - **Scopes**: Select these permissions:
     - ✅ `repo` (Full control of private repositories)
     - ✅ `workflow` (Update GitHub Action workflows)

4. Click **"Generate token"**

5. **IMPORTANT**: Copy the token immediately (you won't see it again)

### Step 2: Add Token to Blog Repository

1. Go to your blog repository: https://github.com/lenielluzardo/ll.db.blog

2. Navigate to **Settings → Secrets and variables → Actions**

3. Click **"New repository secret"**

4. Create the secret:
   - **Name**: `DISPATCH_TOKEN`
   - **Value**: Paste your personal access token from Step 1

5. Click **"Add secret"**

### Step 3: Commit and Push the Workflow Files

The workflow files have been created locally. Now commit them to both repositories:

#### For the blog repository (ll.db.blog):

```bash
cd d:\d\p\dev\lenielluzardo\www\src\blog

git add .github/workflows/notify-main-repo.yml
git commit -m "feat: add GitHub Action to notify main repo on blog updates"
git push origin main
```

#### For the main repository (lenielluzardo):

```bash
cd d:\d\p\dev\lenielluzardo

git add .github/workflows/update-blog-submodule.yml
git commit -m "feat: add GitHub Action to auto-update blog submodule"
git push origin main
```

## Testing the Workflow

### Test 1: Manual Trigger

1. Go to main repository Actions tab: https://github.com/lenielluzardo/lenielluzardo/actions

2. Select "Update Blog Submodule" workflow

3. Click **"Run workflow"** → **"Run workflow"**

4. Watch the workflow execute - it should update the submodule to latest

### Test 2: Push a Blog Post

1. Add or edit a blog post in the `ll.db.blog` repository

2. Commit and push to main branch:
   ```bash
   cd d:\d\p\dev\lenielluzardo\www\src\blog
   
   # Edit or create a post
   code 2026-01-15-test-post.md
   
   git add .
   git commit -m "feat: add test blog post"
   git push origin main
   ```

3. Check Actions in blog repo: https://github.com/lenielluzardo/ll.db.blog/actions
   - Should see "Notify Main Repo of Blog Updates" workflow running

4. Check Actions in main repo: https://github.com/lenielluzardo/lenielluzardo/actions
   - Should see "Update Blog Submodule" workflow triggered
   - Workflow will update submodule and commit

5. Check Netlify: https://app.netlify.com/projects/wwwlenielluzardo/deploys
   - Should see a new deployment triggered by the submodule update

## Workflow Files

### Main Repository Workflow
**File**: `.github/workflows/update-blog-submodule.yml`

**Triggers**:
- `repository_dispatch` event with type `blog-updated` (from blog repo)
- Manual trigger via "Run workflow" button

**Actions**:
1. Checks out main repository with submodules
2. Updates blog submodule to latest commit on main branch
3. Checks if there are changes
4. Commits and pushes submodule reference update if changes exist
5. Triggers Netlify deployment automatically

### Blog Repository Workflow
**File**: `.github/workflows/notify-main-repo.yml`

**Triggers**:
- Push to main branch
- Only when `.md` files change (excludes README)

**Actions**:
1. Sends repository_dispatch event to main repository
2. Uses DISPATCH_TOKEN secret for authentication

## Monitoring

### Check Workflow Status

**Blog Repository**:
```
https://github.com/lenielluzardo/ll.db.blog/actions
```

**Main Repository**:
```
https://github.com/lenielluzardo/lenielluzardo/actions
```

**Netlify Deployments**:
```
https://app.netlify.com/projects/wwwlenielluzardo/deploys
```

### Workflow Logs

If something fails:
1. Click on the failed workflow run
2. Click on the job name
3. Expand the failed step to see error messages

## Common Issues

### Issue: "Notify Main Repo" workflow doesn't trigger main repo

**Solution**: Verify DISPATCH_TOKEN secret exists in blog repository settings

### Issue: "Update Blog Submodule" workflow fails with permission error

**Solution**: 
- Check that your personal access token has `repo` and `workflow` scopes
- Token might have expired - regenerate and update secret

### Issue: Submodule not updating despite workflow success

**Solution**:
```bash
# Manually verify submodule state
cd d:\d\p\dev\lenielluzardo\www\src\blog
git fetch origin
git status

# Force update if needed
git reset --hard origin/main
```

### Issue: Netlify doesn't deploy after submodule update

**Solution**: Check netlify.toml has `git_submodules = true` in build.processing section

## Maintenance

### Token Renewal

If you set an expiration on your token:
1. GitHub will email you before it expires
2. Generate a new token with same permissions
3. Update DISPATCH_TOKEN secret in blog repository settings

### Disable Automatic Updates

To temporarily disable:
1. Go to main repository → Actions tab
2. Select "Update Blog Submodule" workflow
3. Click "..." menu → "Disable workflow"

To re-enable, repeat and select "Enable workflow"

## Alternative: Manual Workflow

If you prefer manual control, you can disable the automatic trigger and use:

```bash
# Update submodule locally
cd www/src/blog
git pull origin main
cd ../../..
git add www/src/blog
git commit -m "chore: update blog submodule"
git push origin main
```

Or trigger the GitHub Action manually from the Actions tab.

## Security Notes

- Keep your personal access token secure
- Never commit tokens to Git repositories
- Use GitHub Secrets for storing tokens
- Review workflow logs to ensure they don't leak sensitive data
- Consider using fine-grained personal access tokens for better security

## Support

If you encounter issues:
1. Check workflow logs in GitHub Actions
2. Verify token permissions and expiration
3. Ensure submodule URL is correct in .gitmodules
4. Check Netlify build logs for submodule-related errors
