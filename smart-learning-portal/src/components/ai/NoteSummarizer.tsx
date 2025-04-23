
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { FileText, Download, Bot } from "lucide-react";

export const NoteSummarizer = () => {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!text.trim()) {
      toast({
        variant: "destructive",
        title: "Input required",
        description: "Please enter some text to summarize.",
      });
      return;
    }

    setIsLoading(true);

    // Simulate AI processing
    setTimeout(() => {
      // Mock summary generation
      const mockSummary = generateMockSummary(text);
      setSummary(mockSummary);
      setIsLoading(false);
      
      toast({
        title: "Summary generated",
        description: "Your notes have been successfully summarized.",
      });
    }, 2000);
  };

  const generateMockSummary = (input: string) => {
    // Simple mock summarization logic
    const sentences = input.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const wordCount = input.split(/\s+/).filter(w => w.trim().length > 0).length;
    
    // Extract "important" sentences (just the first few for this mock)
    const importantSentences = sentences.slice(0, Math.min(3, sentences.length));
    
    // Create a fake "key concepts" section
    const keyTerms = ["Learning", "Education", "Technology", "Online", "Platform"];
    
    const summary = `
## Summary
${importantSentences.join('. ')}.

## Key Concepts
${keyTerms.slice(0, Math.min(3 + Math.floor(wordCount / 50), keyTerms.length)).join(', ')}

## Main Points
- The text discusses educational technology and learning platforms
- It emphasizes the importance of structured learning experiences
- Modern approaches to education are highlighted

This summary covers approximately ${Math.min(90, Math.floor(Math.random() * 30) + 70)}% of the key information in your notes.
    `;
    
    return summary;
  };

  const handleDownload = () => {
    const blob = new Blob([summary], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "notes-summary.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Summary downloaded",
      description: "Your summary has been downloaded as a text file.",
    });
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-learn-primary" />
          AI Note Summarizer
        </CardTitle>
        <CardDescription>
          Upload your lecture notes or paste text to get an AI-generated summary
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="text">Your Notes</Label>
            <Textarea
              id="text"
              placeholder="Paste your notes or lecture text here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={8}
              className="resize-none"
            />
          </div>
          <Button type="submit" disabled={isLoading || !text.trim()}>
            {isLoading ? (
              <>Summarizing...</>
            ) : (
              <>
                <FileText className="mr-2 h-4 w-4" />
                Summarize
              </>
            )}
          </Button>
        </form>

        {summary && (
          <div className="mt-8">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-medium">Summary</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={handleDownload}
                className="flex items-center"
              >
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            </div>
            <div className="p-4 bg-learn-light rounded-md whitespace-pre-line">
              {summary}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between text-xs text-muted-foreground">
        <p>Powered by AI</p>
        <p>The summary is generated based on the content you provide.</p>
      </CardFooter>
    </Card>
  );
};
