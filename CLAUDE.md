# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Claude Conversation Exporter - a browser-based JavaScript utility that exports Claude AI conversations to Markdown and JSON formats. The project consists of a single JavaScript file that runs entirely in the user's browser console without any dependencies or build process.

## Key Architecture

The script (`claude_export_script.js`) performs the following operations:

1. **ID Extraction**: Uses multiple methods to extract organization ID from localStorage, sessionStorage, global variables, cookies, and DOM
2. **API Integration**: Fetches conversation data from Claude's internal API endpoint
3. **Data Processing**: Converts JSON responses to formatted Markdown, handling:
   - Regular messages and thinking sections
   - Tool usage and results
   - File attachments and artifacts
   - Truncated content indicators
4. **File Generation**: Creates downloadable .md and .json files locally in the browser

## Development Guidelines

### Code Standards
- Pure vanilla JavaScript - no frameworks or dependencies
- Browser console execution environment
- No build process or transpilation needed
- UUID format validation for organization and conversation IDs

### Testing Approach
- Manual testing in browser console
- Test with various conversation types (with/without thinking, tool use, attachments)
- Verify organization ID extraction works across different Claude UI states
- Check file downloads work in major browsers (Chrome, Firefox, Edge)

### Common Tasks

To test the script:
1. Open any Claude conversation in your browser
2. Open developer console (F12)
3. Paste the entire `claude_export_script.js` content
4. Press Enter to execute
5. Verify two files download: `claude_conversation.md` and `claude_conversation.json`

### Security Considerations
- Script runs entirely client-side with no external data transmission
- Uses browser's existing authentication (cookies/session)
- Validates UUID formats before API calls
- Handles API errors gracefully with console logging

## 📝 CRITICAL: Detailed Commit Message Requirements

### MANDATORY: Comprehensive Commit Documentation
Every commit MUST include detailed technical documentation to prevent recurring issues and regressions.

#### Commit Message Structure (REQUIRED):
```
fix/feat/chore: Brief summary of the change

## 🔍 ROOT CAUSE ANALYSIS (REQUIRED for fixes)
### The Problem:
- Detailed description of the exact issue
- Technical root cause explanation
- Why this occurred (environmental factors, configuration, etc.)

### Impact:
- What was broken or not working
- User experience impact
- System behavior before fix

## 🛠️ SOLUTION IMPLEMENTED (REQUIRED)
### Technical Changes:
- Specific code changes made
- Configuration modifications
- Before/after comparisons with code examples

### Why This Works:
- Technical explanation of the solution
- How it addresses the root cause
- Integration with existing systems

## 🚨 PREVENTION MEASURES (REQUIRED for recurring issues)
### To Prevent Future Regression:
- Specific patterns to follow
- Code patterns to avoid
- Configuration best practices
- Testing requirements

### Code Patterns to Remember:
```typescript
// Example of correct pattern
const config = {
  setting: false, // CRITICAL: Must be false
  // ... explanation
};
```

## 🔗 RELATED ISSUES/COMMITS (REQUIRED if applicable)
- Previous fixes for same issue
- Related commits or PRs
- GitHub issue numbers

## 🎯 TESTING VERIFIED (REQUIRED)
- Specific tests that now pass
- Manual verification steps performed
- Expected behavior confirmed
```

#### Why Detailed Commits Are Critical:

1. **Prevent Recurring Mistakes**
   - Document exact technical causes
   - Provide clear before/after patterns
   - Reference previous fixes to avoid cycles

2. **Knowledge Transfer**
   - Future developers understand context
   - Debugging becomes faster
   - Pattern recognition improves

3. **Regression Prevention**
   - Clear patterns to follow/avoid
   - Testable verification steps
   - Historical context for decisions

4. **Project Memory**
   - Institutional knowledge preservation
   - Audit trail for complex issues
   - Pattern documentation for common problems
