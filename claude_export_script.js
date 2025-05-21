function getConversationId() {
    const urlPath = window.location.pathname;
    const matches = urlPath.match(/\/chat\/([a-f0-9-]+)/);
    return matches ? matches[1] : null;
}

// Advanced function to extract organization ID
function getOrganizationId() {
    return extractClaudeOrgID();
}

// Advanced organizationID extraction script
function extractClaudeOrgID() {
    console.log("🔍 Starting advanced organizationID extraction...");

    // Get conversation ID from URL for reference
    const conversationId = window.location.pathname.match(/\/chat\/([a-f0-9-]+)/)?.[1];
    console.log(`📝 Current conversation ID: ${conversationId}`);

    // ========= Method 1: Check localStorage =========
    console.log("Method 1: Checking localStorage...");
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        try {
            const value = localStorage.getItem(key);
            if (value && value.includes("organizationID")) {
                console.log(`Found potential match in localStorage key: ${key}`);

                try {
                    const parsed = JSON.parse(value);
                    const orgId = extractOrgIdFromObject(parsed);
                    if (orgId) {
                        console.log(`✅ Found organizationID in localStorage: ${orgId}`);
                        return orgId;
                    }
                } catch (e) {
                    // Not valid JSON or doesn't contain the ID
                }
            }
        } catch (e) {
            // Skip inaccessible localStorage items
        }
    }

    // ========= Method 2: Check sessionStorage =========
    console.log("Method 2: Checking sessionStorage...");
    for (let i = 0; i < sessionStorage.length; i++) {
        const key = sessionStorage.key(i);
        try {
            const value = sessionStorage.getItem(key);
            if (value && value.includes("organizationID")) {
                console.log(`Found potential match in sessionStorage key: ${key}`);

                try {
                    const parsed = JSON.parse(value);
                    const orgId = extractOrgIdFromObject(parsed);
                    if (orgId) {
                        console.log(`✅ Found organizationID in sessionStorage: ${orgId}`);
                        return orgId;
                    }
                } catch (e) {
                    // Not valid JSON or doesn't contain the ID
                }
            }
        } catch (e) {
            // Skip inaccessible sessionStorage items
        }
    }

    // ========= Method 3: Check global variables =========
    console.log("Method 3: Checking global window variables...");

    // Common paths where the organization ID might be stored
    const potentialPaths = [
        "window.__NEXT_DATA__.props.pageProps.organization.uuid",
        "window.__NEXT_DATA__.props.pageProps.organization.id",
        "window.__NEXT_DATA__.props.pageProps.organizationID",
        "window.__PRELOADED_STATE__.organization.uuid",
        "window.__PRELOADED_STATE__.organization.id",
        "window.app.organization.uuid",
        "window.app.organization.id",
        "window.app.user.organization.uuid"
    ];

    for (const path of potentialPaths) {
        try {
            // Using eval to access nested properties by string path
            const value = eval(path);
            if (value && /^[a-f0-9-]{36}$/.test(value)) {
                console.log(`✅ Found organizationID in ${path}: ${value}`);
                return value;
            }
        } catch (e) {
            // Path doesn't exist, continue to next
        }
    }

    // ========= Method 4: Check cookies =========
    console.log("Method 4: Checking cookies...");
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
        const [name, value] = cookie.trim().split('=');
        if (value && value.length > 30 && /[a-f0-9-]{30,}/.test(value)) {
            console.log(`Potential organizationID in cookie ${name}: ${value}`);
            // Check if it's a valid UUID format
            if (/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/.test(value)) {
                console.log(`✅ Found likely organizationID in cookie: ${value}`);
                return value;
            }
        }
    }

    // ========= Method 5: Monitor network requests =========
    console.log("Method 5: Looking for network requests with organization ID...");
    console.log("⚠️ To use this method, refresh the page and run the script again.");
    console.log("Check console for any XHR requests containing organization IDs in their URLs.");

    // Add a network request monitor
    const originalXHROpen = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function(method, url) {
        if (url && url.includes("/organizations/")) {
            const match = url.match(/\/organizations\/([a-f0-9-]{36})/);
            if (match && match[1]) {
                console.log(`✅ Found organizationID in XHR request: ${match[1]}`);
                // Don't return, just log - allow script to continue with other methods
            }
        }
        return originalXHROpen.apply(this, arguments);
    };

    // ========= Method 6: Check all script tags =========
    console.log("Method 6: Scanning all script tags...");
    const scripts = document.querySelectorAll('script');
    for (const script of scripts) {
        const content = script.textContent || '';
        if (content.includes('organizationID') || content.includes('organization_id')) {
            // Look for anything that looks like a UUID
            const uuidMatches = content.match(/[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}/g);
            if (uuidMatches && uuidMatches.length > 0) {
                for (const uuid of uuidMatches) {
                    if (content.includes(`organizationID`) && content.includes(uuid)) {
                        console.log(`✅ Found likely organizationID in script tag: ${uuid}`);
                        return uuid;
                    }
                }
            }
        }
    }

    // ========= Method 7: Check data attributes in DOM =========
    console.log("Method 7: Checking data attributes in DOM...");
    const allElements = document.querySelectorAll('*[data-organization-id], *[data-org-id]');
    for (const element of allElements) {
        const orgId = element.getAttribute('data-organization-id') || element.getAttribute('data-org-id');
        if (orgId && /^[a-f0-9-]{36}$/.test(orgId)) {
            console.log(`✅ Found organizationID in DOM attribute: ${orgId}`);
            return orgId;
        }
    }

    // Try with a broader search for any UUID in the document
    const allUUIDs = document.documentElement.outerHTML.match(/[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}/g) || [];
    if (allUUIDs.length > 0) {
        console.log("Found these UUIDs in the document:");
        console.log(allUUIDs);

        // Look for conversation ID and the ID before it might be the org ID in some patterns
        if (conversationId) {
            const convIdIndex = allUUIDs.indexOf(conversationId);
            if (convIdIndex > 0) {
                const possibleOrgId = allUUIDs[convIdIndex - 1];
                console.log(`⚠️ Possible organizationID based on proximity to conversation ID: ${possibleOrgId}`);
                return possibleOrgId;
            }
        }
    }

    // ========= Last resort: Direct Access via Chrome DevTools =========
    console.log("❌ Couldn't automatically find the organizationID.");
    console.log(`⚙️ Try this manual approach:\n
1. Open Chrome DevTools (F12 or Ctrl+Shift+I)
2. Go to the Application tab
3. Look under Storage > Local Storage > https://claude.ai
4. Search for entries containing "organization"
5. Or check Network tab and look for requests to organizations/[id]`);

    // If all else fails, prompt the user
    const userInput = prompt('Could not automatically detect your organization ID. Please enter it manually:', '');
    return userInput || null;
}

// Helper function to extract organization ID from an object
function extractOrgIdFromObject(obj, depth = 0, maxDepth = 5) {
    if (depth > maxDepth || !obj || typeof obj !== 'object') {
        return null;
    }

    // Case 1: Direct organizationID property
    if (obj.organizationID && typeof obj.organizationID === 'string' && 
        /^[a-f0-9-]{36}$/.test(obj.organizationID)) {
        return obj.organizationID;
    }

    // Case 2: In customIDs object
    if (obj.customIDs && obj.customIDs.organizationID && 
        /^[a-f0-9-]{36}$/.test(obj.customIDs.organizationID)) {
        return obj.customIDs.organizationID;
    }

    // Case 3: In organization object
    if (obj.organization && obj.organization.uuid && 
        /^[a-f0-9-]{36}$/.test(obj.organization.uuid)) {
        return obj.organization.uuid;
    }

    if (obj.organization && obj.organization.id && 
        /^[a-f0-9-]{36}$/.test(obj.organization.id)) {
        return obj.organization.id;
    }

    // Recursive search
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key) && 
            typeof obj[key] === 'object' && obj[key] !== null) {

            const result = extractOrgIdFromObject(obj[key], depth + 1, maxDepth);
            if (result) {
                return result;
            }
        }
    }

    return null;
}

// Build the API URL
function buildApiUrl() {
    const orgId = getOrganizationId();
    const convId = getConversationId();

    if (!orgId || !convId) {
        console.error('Could not find organization ID or conversation ID');
        return null;
    }

    return `https://claude.ai/api/organizations/${orgId}/chat_conversations/${convId}?tree=True&rendering_mode=messages&render_all_tools=true`;
}

// Convert JSON conversation to Markdown format
function convertToMarkdown(data) {
    let markdown = `# ${data.name}\n\n`;

    if (data.summary) {
        markdown += `## Summary\n${data.summary}\n\n`;
    }

    markdown += `*Created: ${new Date(data.created_at).toLocaleString()}*\n\n`;
    markdown += `---\n\n`;

    // Process each message
    data.chat_messages.forEach(message => {
        const sender = message.sender === 'human' ? '👤 **Human**' : '🤖 **Claude**';
        markdown += `## ${sender}\n\n`;

        // Process message content
        if (message.content && message.content.length > 0) {
            message.content.forEach(content => {
                // Handle thinking sections
                if (content.type === 'thinking' && content.thinking) {
                    // Check if thinking content is truncated
                    const thinkingText = content.thinking.includes('characters truncated')
                        ? '**Note:** Full thinking content is truncated in the export.\n\n'
                        : content.thinking;

                    markdown += `**Thinking:**\n\`\`\`\n${thinkingText}\n\`\`\`\n\n`;

                    // Add summaries if they exist
                    if (content.summaries && content.summaries.length > 0) {
                        markdown += `**Summaries:**\n`;
                        content.summaries.forEach(summary => {
                            markdown += `- ${summary.summary}\n`;
                        });
                        markdown += `\n`;
                    }
                }
                // Handle regular text
                else if (content.type === 'text' && content.text) {
                    markdown += `${content.text}\n\n`;
                }
                // Handle tool use with better truncation handling
                else if (content.type === 'tool_use' && content.input) {
                    markdown += `**Tool Use:**\n\`\`\`\n`;

                    // Handle different input structures and truncation
                    if (typeof content.input === 'string') {
                        markdown += content.input;
                    } else if (content.input.content) {
                        // Check for truncation in content
                        if (typeof content.input.content === 'string' &&
                            content.input.content.includes('characters truncated')) {
                            markdown += '**Note:** Tool input content is truncated in the export.\n';
                        } else {
                            markdown += content.input.content;
                        }
                    } else {
                        // For other structures, stringify but note if truncated
                        const inputStr = JSON.stringify(content.input, null, 2);
                        if (inputStr.includes('characters truncated')) {
                            markdown += '**Note:** Tool input is truncated in the export.\n';
                        } else {
                            markdown += inputStr;
                        }
                    }

                    markdown += `\n\`\`\`\n\n`;
                }
                // Handle tool results
                else if (content.type === 'tool_result' && content.content) {
                    markdown += `**Tool Result:**\n\`\`\`\n${JSON.stringify(content.content, null, 2)}\n\`\`\`\n\n`;
                }
            });
        }

        // Process attachments with better truncation handling
        if (message.attachments && message.attachments.length > 0) {
            markdown += `### Attachments:\n\n`;

            message.attachments.forEach(attachment => {
                markdown += `**${attachment.file_name || 'Attachment'}** (${attachment.file_type || 'file'})\n\n`;

                // Include extracted content if available, handle truncation
                if (attachment.extracted_content) {
                    if (attachment.extracted_content.includes('characters truncated')) {
                        markdown += `**Extracted Content:** *(truncated in export)*\n\n`;
                    } else {
                        markdown += `**Extracted Content:**\n\`\`\`\n${attachment.extracted_content}\n\`\`\`\n\n`;
                    }
                }
            });
        }

        // Add timestamp
        markdown += `*${new Date(message.created_at).toLocaleString()}*\n\n`;
        markdown += `---\n\n`;
    });

    return markdown;
}

// Main function to fetch and download the conversation
function fetchAndDownloadConversation() {
    const apiUrl = buildApiUrl();

    if (!apiUrl) {
        console.error('Failed to build API URL');
        return;
    }

    console.log('Fetching conversation from:', apiUrl);

    fetch(apiUrl, {
        method: 'GET',
        credentials: 'include' // Important to include cookies/session info
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Conversation data retrieved successfully');

            // Convert JSON to Markdown
            const markdownContent = convertToMarkdown(data);

            // Also save the original JSON for reference
            const jsonData = JSON.stringify(data, null, 2);
            const jsonUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(jsonData);

            // Create download link for Markdown
            const markdownUri = 'data:text/markdown;charset=utf-8,'+ encodeURIComponent(markdownContent);
            const exportLink = document.createElement('a');
            exportLink.setAttribute('href', markdownUri);
            exportLink.setAttribute('download', 'claude_conversation.md');
            exportLink.click();

            console.log('Markdown download initiated');

            setTimeout(() => {
                const jsonLink = document.createElement('a');
                jsonLink.setAttribute('href', jsonUri);
                jsonLink.setAttribute('download', 'claude_conversation.json');
                jsonLink.click();
                console.log('JSON download initiated');
            }, 1000);
        })
        .catch(error => {
            console.error('Error fetching conversation data:', error);
        });
}

// Execute the function
fetchAndDownloadConversation();
