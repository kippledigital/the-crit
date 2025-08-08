import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

// Define your tools
const tools = [
  {
    name: "get_project_info",
    description: "Get information about The Crit project",
    inputSchema: {
      type: "object",
      properties: {
        info_type: {
          type: "string",
          enum: ["overview", "structure", "dependencies"],
          description: "Type of information to retrieve"
        }
      },
      required: ["info_type"]
    }
  },
  {
    name: "analyze_critique",
    description: "Analyze a critique submission",
    inputSchema: {
      type: "object",
      properties: {
        critique_text: {
          type: "string",
          description: "The critique text to analyze"
        },
        analysis_type: {
          type: "string",
          enum: ["sentiment", "structure", "feedback_quality"],
          description: "Type of analysis to perform"
        }
      },
      required: ["critique_text", "analysis_type"]
    }
  }
];

// Create the server
const server = new Server(
  {
    name: "the-crit-mcp-server",
    version: "1.0.0",
  }
);

// Handle list tools requests
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: tools.map(tool => ({
      name: tool.name,
      description: tool.description,
      inputSchema: tool.inputSchema,
    })),
  };
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  switch (name) {
    case "get_project_info":
      return await handleGetProjectInfo(args as { info_type: string });
    
    case "analyze_critique":
      return await handleAnalyzeCritique(args as { 
        critique_text: string; 
        analysis_type: string 
      });
    
    default:
      throw new Error(`Unknown tool: ${name}`);
  }
});

// Tool handlers
async function handleGetProjectInfo(args: { info_type: string }) {
  const { info_type } = args;
  
  switch (info_type) {
    case "overview":
      return {
        content: [
          {
            type: "text",
            text: "The Crit is a Next.js application that provides critique services. It's built with TypeScript, Tailwind CSS, and includes features like form handling and animations."
          }
        ]
      };
    
    case "structure":
      return {
        content: [
          {
            type: "text",
            text: "Project structure:\n- src/app: Next.js app router pages\n- src/components: React components\n- src/lib: Utility functions and configurations\n- public: Static assets including fonts and SVGs"
          }
        ]
      };
    
    case "dependencies":
      return {
        content: [
          {
            type: "text",
            text: "Key dependencies:\n- Next.js 14.0.4\n- React 18\n- Framer Motion for animations\n- Lottie React for animations\n- Lucide React for icons\n- Formidable for form handling"
          }
        ]
      };
    
    default:
      throw new Error(`Unknown info type: ${info_type}`);
  }
}

async function handleAnalyzeCritique(args: { 
  critique_text: string; 
  analysis_type: string 
}) {
  const { critique_text, analysis_type } = args;
  
  switch (analysis_type) {
    case "sentiment":
      return {
        content: [
          {
            type: "text",
            text: `Sentiment analysis for critique:\n\nText: "${critique_text.substring(0, 100)}..."\n\nAnalysis: This appears to be a critique submission. The sentiment analysis would be performed here.`
          }
        ]
      };
    
    case "structure":
      return {
        content: [
          {
            type: "text",
            text: `Structure analysis for critique:\n\nText: "${critique_text.substring(0, 100)}..."\n\nAnalysis: This would analyze the structure and organization of the critique.`
          }
        ]
      };
    
    case "feedback_quality":
      return {
        content: [
          {
            type: "text",
            text: `Feedback quality analysis for critique:\n\nText: "${critique_text.substring(0, 100)}..."\n\nAnalysis: This would assess the quality and helpfulness of the feedback provided.`
          }
        ]
      };
    
    default:
      throw new Error(`Unknown analysis type: ${analysis_type}`);
  }
}

// Start the server
const transport = new StdioServerTransport();
await server.connect(transport);
console.error("The Crit MCP server is running..."); 