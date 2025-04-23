
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LearningResource } from "@/types/course";
import { 
  FileText, 
  FileVideo, 
  Link as LinkIcon, 
  FileArchive, 
  Calendar,
  Download,
  ExternalLink
} from "lucide-react";

interface LearningMaterialsProps {
  resources: LearningResource[];
  moduleId?: string;
}

export const LearningMaterials = ({ resources, moduleId }: LearningMaterialsProps) => {
  // Group resources by type
  const documents = resources.filter(r => r.type === "pdf" || r.type === "document");
  const videos = resources.filter(r => r.type === "video");
  const links = resources.filter(r => r.type === "link");

  const getResourceIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return <FileText className="h-5 w-5 text-red-500" />;
      case "document":
        return <FileText className="h-5 w-5 text-blue-500" />;
      case "video":
        return <FileVideo className="h-5 w-5 text-purple-500" />;
      case "link":
        return <LinkIcon className="h-5 w-5 text-green-500" />;
      default:
        return <FileArchive className="h-5 w-5 text-gray-500" />;
    }
  };

  const renderResourceItem = (resource: LearningResource) => (
    <div key={resource.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
      <div className="flex items-start">
        <div className="mr-3">
          {getResourceIcon(resource.type)}
        </div>
        <div className="flex-1">
          <h4 className="font-medium">{resource.title}</h4>
          {resource.description && (
            <p className="text-sm text-muted-foreground mt-1">{resource.description}</p>
          )}
          <div className="flex items-center mt-2 text-xs text-muted-foreground">
            <Calendar className="h-3.5 w-3.5 mr-1" />
            Added: {new Date(resource.uploadedAt).toLocaleDateString()}
          </div>
        </div>
        <div>
          {resource.type === "link" ? (
            <Button variant="outline" size="sm" asChild>
              <a href={resource.url} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-1" />
                Visit
              </a>
            </Button>
          ) : (
            <Button variant="outline" size="sm" asChild>
              <a href={resource.url} download>
                <Download className="h-4 w-4 mr-1" />
                Download
              </a>
            </Button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Learning Materials</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all">
          <TabsList className="mb-4">
            <TabsTrigger value="all">
              All Materials
              <Badge className="ml-2 bg-gray-100 text-gray-800">{resources.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="documents">
              Documents
              <Badge className="ml-2 bg-blue-100 text-blue-800">{documents.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="videos">
              Videos
              <Badge className="ml-2 bg-purple-100 text-purple-800">{videos.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="links">
              Links
              <Badge className="ml-2 bg-green-100 text-green-800">{links.length}</Badge>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-3 mt-2">
            {resources.length > 0 ? (
              resources.map(renderResourceItem)
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <FileArchive className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>No learning materials available yet</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="documents" className="space-y-3 mt-2">
            {documents.length > 0 ? (
              documents.map(renderResourceItem)
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <FileText className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>No documents available yet</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="videos" className="space-y-3 mt-2">
            {videos.length > 0 ? (
              videos.map(renderResourceItem)
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <FileVideo className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>No videos available yet</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="links" className="space-y-3 mt-2">
            {links.length > 0 ? (
              links.map(renderResourceItem)
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <LinkIcon className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>No links available yet</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
