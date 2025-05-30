
import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Code } from "lucide-react";
import { paperSets } from "../data/paperSets";

interface TabNavigatorProps {
  onValueChange: (value: string) => void;
}

export const TabNavigator = ({ onValueChange }: TabNavigatorProps) => {
  // Get counts from paperSets
  const papersCount = paperSets.default.length;
  const implementationsCount = 2; // There are 2 items in ImplementationList

  return (
    <Tabs defaultValue="papers" className="w-auto" onValueChange={onValueChange}>
      <TabsList className="border-gray-200 gap-6 h-auto p-0 bg-transparent">
        <TabsTrigger 
          value="papers" 
          className="flex items-center data-[state=active]:text-blue-600 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 px-0 py-2 rounded-none bg-transparent text-gray-600 hover:text-blue-600"
        >
          <FileText className="w-4 h-4 mr-2" />
          論文 ({papersCount})
        </TabsTrigger>
        <TabsTrigger 
          value="implementation" 
          className="flex items-center data-[state=active]:text-blue-600 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 px-0 py-2 rounded-none bg-transparent text-gray-600 hover:text-blue-600"
        >
          <Code className="w-4 h-4 mr-2" />
          事例 ({implementationsCount})
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};
