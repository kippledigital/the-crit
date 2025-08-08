# MCP Server Setup Guide

This guide will help you set up the Model Context Protocol (MCP) servers for The Crit project.

## Installed MCP Servers

### 1. Perplexity MCP Server
- **Package**: `@jschuller/perplexity-mcp`
- **Status**: ✅ Installed
- **Purpose**: Provides access to Perplexity's search and research capabilities

### 2. The Crit MCP Server
- **Location**: `./mcp-server/`
- **Status**: ✅ Created
- **Purpose**: Custom tools for The Crit project

### 3. DataForSEO MCP Server
- **Package**: `dataforseo-mcp-server`
- **Status**: ✅ Installed
- **Purpose**: Provides access to SEO data and analytics from DataForSEO APIs

## Setup Instructions

### Step 1: Get API Keys

#### Perplexity API Key
1. Go to [Perplexity API](https://www.perplexity.ai/settings/api)
2. Sign up or log in to your account
3. Generate an API key
4. Copy the API key

#### DataForSEO Credentials
1. Go to [DataForSEO](https://dataforseo.com/)
2. Sign up for an account
3. Get your login credentials (username and password)
4. Note: DataForSEO offers various SEO APIs including SERP, Backlinks, and more

### Step 2: Configure Claude Desktop

1. Open Claude Desktop
2. Go to Settings (⌘ + ,)
3. Navigate to "MCP Servers"
4. Add the following configuration:

```json
{
  "mcpServers": {
    "perplexity-mcp": {
      "command": "npx",
      "args": [
        "-y", 
        "@jschuller/perplexity-mcp"
      ],
      "env": {
        "PERPLEXITY_API_KEY": "your_actual_api_key_here"
      }
    },
    "the-crit-mcp": {
      "command": "node",
      "args": [
        "./mcp-server/dist/index.js"
      ]
    },
    "dataforseo-mcp": {
      "command": "npx",
      "args": [
        "-y",
        "dataforseo-mcp-server"
      ],
      "env": {
        "DATAFORSEO_LOGIN": "your_dataforseo_login",
        "DATAFORSEO_PASSWORD": "your_dataforseo_password"
      }
    }
  }
}
```

### Step 3: Build The Crit MCP Server

```bash
cd mcp-server
npm install
npm run build
```

### Step 4: Test the Servers

1. Restart Claude Desktop
2. Try asking Claude to use the Perplexity search tool
3. Test the custom The Crit tools

## Available Tools

### Perplexity MCP Tools
- **Search**: Web search with real-time results
- **Research**: Deep research on topics
- **Analysis**: AI-powered analysis of search results

### The Crit MCP Tools
- **get_project_info**: Get information about The Crit project
- **analyze_critique**: Analyze critique submissions

### DataForSEO MCP Tools
- **SERP API**: Search engine results page data
- **Backlinks API**: Backlink analysis and data
- **Keywords Data API**: Keyword research and analysis
- **On-Page API**: On-page SEO analysis
- **Business Data API**: Business listings and information
- **Domain Analytics API**: Domain performance metrics

## Usage Examples

### Perplexity Search
```
"Search for the latest developments in AI coding assistants"
```

### The Crit Tools
```
"Get project information about The Crit"
"Analyze this critique submission: [your critique text]"
```

### DataForSEO Tools
```
"Search for SERP data for 'AI coding assistants'"
"Get backlink data for example.com"
"Analyze keywords for 'web development'"
```

## Troubleshooting

### Perplexity API Issues
- Ensure your API key is correct
- Check your Perplexity account has sufficient credits
- Verify the API key has the necessary permissions

### The Crit MCP Issues
- Make sure the server is built (`npm run build` in mcp-server directory)
- Check that the dist/index.js file exists
- Verify TypeScript compilation completed successfully

### DataForSEO MCP Issues
- Ensure your DataForSEO credentials are correct
- Check your DataForSEO account has sufficient credits
- Verify the login/password combination works
- Note: There may be dependency issues with the ajv module - this is a known issue

### General MCP Issues
- Restart Claude Desktop after configuration changes
- Check the Claude Desktop logs for error messages
- Ensure all dependencies are installed

## Next Steps

1. Replace `"your_actual_api_key_here"` with your real Perplexity API key
2. Build the The Crit MCP server
3. Restart Claude Desktop
4. Test both servers with Claude

## Files Created

- `claude_desktop_config.json`: Configuration template
- `mcp-server/`: Custom MCP server for The Crit
- `MCP_SETUP_GUIDE.md`: This setup guide 