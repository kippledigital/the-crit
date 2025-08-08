# The Crit MCP Server

This is a Model Context Protocol (MCP) server for The Crit project. It provides custom tools that can be used with AI assistants like Claude.

## Setup

1. Install dependencies:
```bash
cd mcp-server
npm install
```

2. Build the TypeScript code:
```bash
npm run build
```

3. Test the server:
```bash
npm run dev
```

## Available Tools

### get_project_info
Get information about The Crit project.

**Parameters:**
- `info_type` (string): Type of information to retrieve
  - `"overview"`: General project overview
  - `"structure"`: Project file structure
  - `"dependencies"`: Key dependencies

### analyze_critique
Analyze a critique submission.

**Parameters:**
- `critique_text` (string): The critique text to analyze
- `analysis_type` (string): Type of analysis to perform
  - `"sentiment"`: Sentiment analysis
  - `"structure"`: Structure and organization analysis
  - `"feedback_quality"`: Quality assessment of feedback

## Integration with Claude

To use this MCP server with Claude, you'll need to configure it in your Claude settings. The server communicates via stdio, so you can point Claude to the built JavaScript file.

## Development

- Source code is in `src/`
- Built files go to `dist/`
- Run `npm run build` after making changes
- Use `npm run dev` for development with auto-rebuild

## Adding New Tools

1. Add the tool definition to the `tools` array in `src/index.ts`
2. Add a case in the switch statement in the `CallToolRequestSchema` handler
3. Implement the tool handler function
4. Rebuild the server

## Example Usage

```typescript
// Example tool call
{
  name: "get_project_info",
  arguments: {
    info_type: "overview"
  }
}
``` 