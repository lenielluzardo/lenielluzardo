// Content Management System JavaScript
(function() {
    'use strict';
    
    let currentPosts = [];
    let currentProjects = [];
    let siteConfig = {};
    let tags = [];
    let tech = [];
    
    // Load site configuration and content
    async function loadData() {
        try {
            const response = await fetch('/site.config.json');
            siteConfig = await response.json();
            
            // In a real implementation, you'd fetch posts from an API
            // For now, we'll create mock data structure
            loadPosts();
            loadProjects();
        } catch (error) {
            showMessage('Error loading data: ' + error.message, 'error');
        }
    }
    
    // Load blog posts
    function loadPosts() {
        // Mock posts - in production, these would come from your build or API
        currentPosts = [
            {
                slug: 'sample-post',
                title: 'Sample Blog Post',
                date: '2026-01-06',
                description: 'This is a sample blog post',
                tags: ['javascript', 'tutorial'],
                status: 'published',
                content: '## Sample Content\n\nThis is sample content for the blog post.'
            }
        ];
        
        renderPosts();
    }
    
    // Load projects
    function loadProjects() {
        // Mock projects
        currentProjects = [
            {
                slug: 'sample-project',
                title: 'Sample Project',
                date: '2026-01-06',
                description: 'This is a sample project',
                tech: ['JavaScript', 'Node.js'],
                order: 1,
                status: 'published',
                content: '## Project Overview\n\nThis is sample content for the project.'
            }
        ];
        
        renderProjects();
    }
    
    // Render blog posts list
    function renderPosts() {
        const container = document.getElementById('posts-list');
        
        if (currentPosts.length === 0) {
            container.innerHTML = '<div class="empty-state">No blog posts yet. Create your first post!</div>';
            return;
        }
        
        container.innerHTML = currentPosts.map(post => {
            const isHidden = siteConfig.content.drafts.includes(post.slug);
            const status = isHidden ? 'hidden' : post.status;
            
            return `
                <div class="content-item ${status === 'draft' || status === 'hidden' ? 'draft' : ''}">
                    <div class="content-info">
                        <h3>${post.title}</h3>
                        <div class="content-meta">
                            <span>${new Date(post.date).toLocaleDateString()}</span>
                            <span class="status-badge status-${status}">${status.toUpperCase()}</span>
                            ${post.tags ? `<span>Tags: ${post.tags.join(', ')}</span>` : ''}
                        </div>
                    </div>
                    <div class="content-actions">
                        <button class="action-btn" onclick="editPost('${post.slug}')">Edit</button>
                        ${status === 'published' ? 
                            `<button class="action-btn" onclick="togglePostStatus('${post.slug}', 'hide')">Hide</button>` :
                            `<button class="action-btn" onclick="togglePostStatus('${post.slug}', 'show')">Show</button>`
                        }
                        <button class="action-btn danger" onclick="deletePost('${post.slug}')">Delete</button>
                    </div>
                </div>
            `;
        }).join('');
    }
    
    // Render projects list
    function renderProjects() {
        const container = document.getElementById('projects-list');
        
        if (currentProjects.length === 0) {
            container.innerHTML = '<div class="empty-state">No projects yet. Create your first project!</div>';
            return;
        }
        
        container.innerHTML = currentProjects.map(project => {
            const isHidden = siteConfig.content.hiddenProjects.includes(project.slug);
            const status = isHidden ? 'hidden' : 'published';
            
            return `
                <div class="content-item ${status === 'hidden' ? 'draft' : ''}">
                    <div class="content-info">
                        <h3>${project.title}</h3>
                        <div class="content-meta">
                            <span>Order: ${project.order || 0}</span>
                            <span class="status-badge status-${status}">${status.toUpperCase()}</span>
                            ${project.tech ? `<span>Tech: ${project.tech.join(', ')}</span>` : ''}
                        </div>
                    </div>
                    <div class="content-actions">
                        <button class="action-btn" onclick="editProject('${project.slug}')">Edit</button>
                        ${status === 'published' ? 
                            `<button class="action-btn" onclick="toggleProjectStatus('${project.slug}', 'hide')">Hide</button>` :
                            `<button class="action-btn" onclick="toggleProjectStatus('${project.slug}', 'show')">Show</button>`
                        }
                        <button class="action-btn danger" onclick="deleteProject('${project.slug}')">Delete</button>
                    </div>
                </div>
            `;
        }).join('');
    }
    
    // Create new post
    window.createNewPost = function() {
        tags = [];
        document.getElementById('contentType').value = 'post';
        document.getElementById('contentSlug').value = '';
        document.getElementById('editorTitle').textContent = 'Create New Blog Post';
        document.getElementById('contentTitle').value = '';
        document.getElementById('contentDate').value = new Date().toISOString().split('T')[0];
        document.getElementById('contentDescription').value = '';
        document.getElementById('contentBody').value = '';
        document.getElementById('draftCheckbox').checked = false;
        
        // Show/hide appropriate fields
        document.getElementById('tagsGroup').style.display = 'block';
        document.getElementById('techGroup').style.display = 'none';
        document.getElementById('orderGroup').style.display = 'none';
        
        renderTags();
        openEditor();
    };
    
    // Create new project
    window.createNewProject = function() {
        tech = [];
        document.getElementById('contentType').value = 'project';
        document.getElementById('contentSlug').value = '';
        document.getElementById('editorTitle').textContent = 'Create New Project';
        document.getElementById('contentTitle').value = '';
        document.getElementById('contentDate').value = new Date().toISOString().split('T')[0];
        document.getElementById('contentDescription').value = '';
        document.getElementById('contentBody').value = '';
        document.getElementById('contentOrder').value = '1';
        document.getElementById('draftCheckbox').checked = false;
        
        // Show/hide appropriate fields
        document.getElementById('tagsGroup').style.display = 'none';
        document.getElementById('techGroup').style.display = 'block';
        document.getElementById('orderGroup').style.display = 'block';
        
        renderTech();
        openEditor();
    };
    
    // Edit post
    window.editPost = function(slug) {
        const post = currentPosts.find(p => p.slug === slug);
        if (!post) return;
        
        tags = post.tags || [];
        document.getElementById('contentType').value = 'post';
        document.getElementById('contentSlug').value = post.slug;
        document.getElementById('editorTitle').textContent = 'Edit Blog Post';
        document.getElementById('contentTitle').value = post.title;
        document.getElementById('contentDate').value = post.date;
        document.getElementById('contentDescription').value = post.description;
        document.getElementById('contentBody').value = post.content;
        document.getElementById('draftCheckbox').checked = post.status === 'draft';
        
        document.getElementById('tagsGroup').style.display = 'block';
        document.getElementById('techGroup').style.display = 'none';
        document.getElementById('orderGroup').style.display = 'none';
        
        renderTags();
        openEditor();
    };
    
    // Edit project
    window.editProject = function(slug) {
        const project = currentProjects.find(p => p.slug === slug);
        if (!project) return;
        
        tech = project.tech || [];
        document.getElementById('contentType').value = 'project';
        document.getElementById('contentSlug').value = project.slug;
        document.getElementById('editorTitle').textContent = 'Edit Project';
        document.getElementById('contentTitle').value = project.title;
        document.getElementById('contentDate').value = project.date;
        document.getElementById('contentDescription').value = project.description;
        document.getElementById('contentBody').value = project.content;
        document.getElementById('contentOrder').value = project.order || 1;
        
        document.getElementById('tagsGroup').style.display = 'none';
        document.getElementById('techGroup').style.display = 'block';
        document.getElementById('orderGroup').style.display = 'block';
        
        renderTech();
        openEditor();
    };
    
    // Toggle post status
    window.togglePostStatus = function(slug, action) {
        if (action === 'hide') {
            if (!siteConfig.content.drafts.includes(slug)) {
                siteConfig.content.drafts.push(slug);
            }
        } else {
            siteConfig.content.drafts = siteConfig.content.drafts.filter(s => s !== slug);
        }
        
        downloadConfig();
        showMessage(`Post ${action === 'hide' ? 'hidden' : 'shown'}. Download the updated config and rebuild.`, 'success');
        renderPosts();
    };
    
    // Toggle project status
    window.toggleProjectStatus = function(slug, action) {
        if (action === 'hide') {
            if (!siteConfig.content.hiddenProjects.includes(slug)) {
                siteConfig.content.hiddenProjects.push(slug);
            }
        } else {
            siteConfig.content.hiddenProjects = siteConfig.content.hiddenProjects.filter(s => s !== slug);
        }
        
        downloadConfig();
        showMessage(`Project ${action === 'hide' ? 'hidden' : 'shown'}. Download the updated config and rebuild.`, 'success');
        renderProjects();
    };
    
    // Delete post
    window.deletePost = function(slug) {
        if (!confirm('Are you sure you want to delete this post? You will need to manually delete the file.')) {
            return;
        }
        
        showMessage('To delete: Remove the file src/blog/' + slug + '.md and rebuild.', 'success');
    };
    
    // Delete project
    window.deleteProject = function(slug) {
        if (!confirm('Are you sure you want to delete this project? You will need to manually delete the file.')) {
            return;
        }
        
        showMessage('To delete: Remove the file src/projects/' + slug + '.md and rebuild.', 'success');
    };
    
    // Tags management
    function renderTags() {
        const container = document.getElementById('tagsContainer');
        const input = document.getElementById('tagInput');
        
        container.innerHTML = tags.map(tag => `
            <span class="tag-item">
                ${tag}
                <button type="button" onclick="removeTag('${tag}')">&times;</button>
            </span>
        `).join('') + input.outerHTML;
        
        // Re-attach event listener
        document.getElementById('tagInput').addEventListener('keydown', handleTagInput);
    }
    
    function renderTech() {
        const container = document.getElementById('techContainer');
        const input = document.getElementById('techInput');
        
        container.innerHTML = tech.map(t => `
            <span class="tag-item">
                ${t}
                <button type="button" onclick="removeTech('${t}')">&times;</button>
            </span>
        `).join('') + input.outerHTML;
        
        // Re-attach event listener
        document.getElementById('techInput').addEventListener('keydown', handleTechInput);
    }
    
    function handleTagInput(e) {
        if (e.key === 'Enter' && e.target.value.trim()) {
            e.preventDefault();
            const tag = e.target.value.trim();
            if (!tags.includes(tag)) {
                tags.push(tag);
                renderTags();
            }
            e.target.value = '';
        }
    }
    
    function handleTechInput(e) {
        if (e.key === 'Enter' && e.target.value.trim()) {
            e.preventDefault();
            const t = e.target.value.trim();
            if (!tech.includes(t)) {
                tech.push(t);
                renderTech();
            }
            e.target.value = '';
        }
    }
    
    window.removeTag = function(tag) {
        tags = tags.filter(t => t !== tag);
        renderTags();
    };
    
    window.removeTech = function(t) {
        tech = tech.filter(item => item !== t);
        renderTech();
    };
    
    // Open/close editor
    function openEditor() {
        document.getElementById('editorModal').classList.add('active');
    }
    
    window.closeEditor = function() {
        document.getElementById('editorModal').classList.remove('active');
    };
    
    // Handle form submission
    document.getElementById('contentForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const type = document.getElementById('contentType').value;
        const slug = document.getElementById('contentSlug').value || 
                     document.getElementById('contentTitle').value.toLowerCase()
                         .replace(/[^a-z0-9]+/g, '-')
                         .replace(/^-|-$/g, '');
        
        const title = document.getElementById('contentTitle').value;
        const date = document.getElementById('contentDate').value;
        const description = document.getElementById('contentDescription').value;
        const body = document.getElementById('contentBody').value;
        const isDraft = document.getElementById('draftCheckbox').checked;
        
        // Build frontmatter
        let frontmatter = `---\ntitle: "${title}"\ndate: ${date}\ndescription: "${description}"\n`;
        
        if (type === 'post') {
            if (tags.length > 0) {
                frontmatter += `tags: [${tags.map(t => `"${t}"`).join(', ')}]\n`;
            }
        } else {
            const order = document.getElementById('contentOrder').value;
            if (tech.length > 0) {
                frontmatter += `tech: [${tech.map(t => `"${t}"`).join(', ')}]\n`;
            }
            frontmatter += `order: ${order}\n`;
        }
        
        if (isDraft) {
            frontmatter += 'draft: true\n';
        }
        
        frontmatter += 'layout: article.njk\n---\n\n';
        
        const fullContent = frontmatter + body;
        
        // Download the file
        const blob = new Blob([fullContent], { type: 'text/markdown' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = slug + '.md';
        link.click();
        
        const folder = type === 'post' ? 'blog' : 'projects';
        showMessage(`File downloaded! Place it in src/${folder}/${slug}.md and rebuild.`, 'success');
        
        closeEditor();
    });
    
    // Download config
    function downloadConfig() {
        const dataStr = JSON.stringify(siteConfig, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = 'site.config.json';
        link.click();
    }
    
    // Show status message
    function showMessage(message, type = 'success') {
        const messageEl = document.getElementById('statusMessage');
        messageEl.textContent = message;
        messageEl.className = 'status-message ' + type + ' show';
        
        setTimeout(() => {
            messageEl.classList.remove('show');
        }, 8000);
    }
    
    // Tab switching
    document.querySelectorAll('.tab-button').forEach(button => {
        button.addEventListener('click', function() {
            const tab = this.dataset.tab;
            
            // Update active states
            document.querySelectorAll('.tab-button').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            
            this.classList.add('active');
            document.getElementById(tab + '-tab').classList.add('active');
        });
    });
    
    // Initialize
    loadData();
})();
