// filepath: c:\Users\Ms.Sanskriti\SmartLearningPortal\smart-learning-portal\src\utils\summarizer.ts
import { pipeline } from "@huggingface/transformers";

// Initialize summarization pipeline
let summarizer: any;

const initializeSummarizer = async () => {
  if (!summarizer) {
    summarizer = await pipeline("summarization");
  }
};

export const summarizeText = async (text: string): Promise<string> => {
  try {
    // Initialize the summarizer if not already initialized
    await initializeSummarizer();

    const maxTokens = 1024;
    const chunkSize = maxTokens - 100; // Leave buffer for special tokens
    const chunks = [];

    // Split the text into chunks
    for (let i = 0; i < text.length; i += chunkSize) {
      chunks.push(text.slice(i, i + chunkSize));
    }

    // Summarize each chunk
    const summaries = [];
    for (const chunk of chunks) {
      const summary = await summarizer(chunk, { max_length: 100, min_length: 30, do_sample: false });
      summaries.push(summary[0].summary_text);
    }

    return summaries.join("\n\n");
  } catch (error) {
    return `An error occurred during summarization: ${error.message}`;
  }
};