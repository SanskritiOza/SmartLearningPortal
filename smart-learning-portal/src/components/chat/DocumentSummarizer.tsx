import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { summarizeText } from "@/utils/summarizer";

const extractTextFromFile = async (file: File): Promise<string> => {
  if (file.type === "text/plain") {
    return await file.text();
  } else if (file.type === "application/pdf") {
    const pdfjsLib = await import("pdfjs-dist");
    const pdf = await pdfjsLib.getDocument(await file.arrayBuffer()).promise;
    let text = "";
    for (let i = 0; i < pdf.numPages; i++) {
      const page = await pdf.getPage(i + 1);
      const content = await page.getTextContent();
      text += content.items.map((item: any) => item.str).join(" ");
    }
    return text;
  } else if (file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
    const docx = await import("docx-parser");
    const parsedDoc = await docx.parse(file);
    return parsedDoc.text;
  } else {
    throw new Error("Unsupported file type.");
  }
};

export const DocumentSummarizer = () => {
  const [file, setFile] = useState<File | null>(null);
  const [summary, setSummary] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setSummary(null); // Reset summary when a new file is uploaded
    }
  };

  const handleSummarize = async () => {
    if (!file) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please upload a document first.",
      });
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const text = await extractTextFromFile(file); // Function to extract text from the file
      const summary = await summarizeText(text);
      setSummary(summary);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An error occurred while summarizing the document.";
      setError(errorMessage);
      toast({
        variant: "destructive",
        title: "Error",
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-center">Document Summarizer</CardTitle>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="mb-4">
          <input
            type="file"
            accept=".txt,.pdf,.docx"
            onChange={handleFileUpload}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>

        <Button
          onClick={handleSummarize}
          disabled={!file || isLoading}
          className="w-full"
        >
          {isLoading ? "Summarizing..." : "Generate Summary"}
        </Button>

        {summary && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Summary:</h3>
            <p className="text-gray-700 whitespace-pre-wrap">{summary}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};