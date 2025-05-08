
export const chatWithAI = async (
    messages: { role: "user" | "assistant" | "system"; content: string }[],
    apiKey: string
  ) => {
    try {
      // Convert messages array to just the latest user message since Gemini doesn't support chat history in the same way
      const latestMessage = messages.find(msg => msg.role === "user")?.content || "";
      
      const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: latestMessage
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1000,
          },
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.error && errorData.error.message) {
          throw new Error(`Gemini API error: ${errorData.error.message}`);
        } else {
          throw new Error(`Failed to get response (Status: ${response.status})`);
        }
      }
  
      const data = await response.json();
      return data.candidates[0].content.parts[0].text;
    } catch (error) {
      console.error('Error chatting with AI:', error);
      throw error;
    }
  };