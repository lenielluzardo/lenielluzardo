// Admin Dashboard JavaScript
(function() {
    'use strict';
    
    let config = {};
    
    // Load configuration
    async function loadConfig() {
        try {
            const response = await fetch('/site.config.json');
            config = await response.json();
            populateForm();
        } catch (error) {
            showMessage('Error loading configuration: ' + error.message, 'error');
        }
    }
    
    // Populate form with current config
    function populateForm() {
        // Blog CTA
        document.getElementById('blogCTA').checked = config.features.blogCTA.enabled;
        document.getElementById('blogCTATitle').value = config.features.blogCTA.title;
        document.getElementById('blogCTADescription').value = config.features.blogCTA.description;
        document.getElementById('blogCTAButtonText').value = config.features.blogCTA.buttonText;
        toggleSettings('blogCTA', config.features.blogCTA.enabled);
        
        // Newsletter
        document.getElementById('newsletter').checked = config.features.newsletter.enabled;
        document.getElementById('newsletterTitle').value = config.features.newsletter.title;
        document.getElementById('newsletterDescription').value = config.features.newsletter.description;
        document.getElementById('newsletterButtonText').value = config.features.newsletter.buttonText;
        toggleSettings('newsletter', config.features.newsletter.enabled);
        
        // Homepage features
        document.getElementById('recentPosts').checked = config.features.recentPosts.enabled;
        document.getElementById('recentProjects').checked = config.features.recentProjects.enabled;
        
        // Pages
        document.getElementById('workWithMePage').checked = config.features.workWithMePage.enabled;
        
        // Blog categories
        document.getElementById('blogCategories').checked = config.features.blogCategories.enabled;
    }
    
    // Toggle settings visibility
    function toggleSettings(featureName, show) {
        const settingsEl = document.getElementById(featureName + 'Settings');
        if (settingsEl) {
            settingsEl.style.display = show ? 'block' : 'none';
        }
    }
    
    // Show status message
    function showMessage(message, type = 'success') {
        const messageEl = document.getElementById('statusMessage');
        messageEl.textContent = message;
        messageEl.className = 'status-message ' + type + ' show';
        
        setTimeout(() => {
            messageEl.classList.remove('show');
        }, 5000);
    }
    
    // Save configuration
    function saveConfig(newConfig) {
        const dataStr = JSON.stringify(newConfig, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = 'site.config.json';
        link.click();
        
        showMessage('Configuration saved! Replace the site.config.json file in your project root and rebuild the site.', 'success');
    }
    
    // Handle form submission
    document.getElementById('configForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Update config object
        config.features.blogCTA.enabled = document.getElementById('blogCTA').checked;
        config.features.blogCTA.title = document.getElementById('blogCTATitle').value;
        config.features.blogCTA.description = document.getElementById('blogCTADescription').value;
        config.features.blogCTA.buttonText = document.getElementById('blogCTAButtonText').value;
        
        config.features.newsletter.enabled = document.getElementById('newsletter').checked;
        config.features.newsletter.title = document.getElementById('newsletterTitle').value;
        config.features.newsletter.description = document.getElementById('newsletterDescription').value;
        config.features.newsletter.buttonText = document.getElementById('newsletterButtonText').value;
        
        config.features.recentPosts.enabled = document.getElementById('recentPosts').checked;
        config.features.recentProjects.enabled = document.getElementById('recentProjects').checked;
        config.features.workWithMePage.enabled = document.getElementById('workWithMePage').checked;
        config.features.blogCategories.enabled = document.getElementById('blogCategories').checked;
        
        saveConfig(config);
    });
    
    // Download config button
    document.getElementById('downloadConfig').addEventListener('click', function() {
        const dataStr = JSON.stringify(config, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = 'site.config.json';
        link.click();
        
        showMessage('Configuration downloaded!', 'success');
    });
    
    // Reset to defaults
    document.getElementById('resetConfig').addEventListener('click', function() {
        if (confirm('Are you sure you want to reset all settings to defaults?')) {
            loadConfig();
            showMessage('Configuration reset to current saved state.', 'success');
        }
    });
    
    // Toggle settings visibility on checkbox change
    document.getElementById('blogCTA').addEventListener('change', function() {
        toggleSettings('blogCTA', this.checked);
    });
    
    document.getElementById('newsletter').addEventListener('change', function() {
        toggleSettings('newsletter', this.checked);
    });
    
    // Initialize
    loadConfig();
})();
