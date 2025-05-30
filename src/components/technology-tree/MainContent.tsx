
import React from 'react';
import { PathDisplay } from "./PathDisplay";
import { LevelSelection } from "./LevelSelection";
import { ScenarioSection } from "./ScenarioSection";

interface MainContentProps {
  selectedPath: {
    level1: string;
    level2: string;
    level3: string;
    level4?: string;
  };
  level1Items: any[];
  level2Items: Record<string, any[]>;
  level3Items: Record<string, any[]>;
  onNodeClick: (level: string, nodeId: string) => void;
  onEditNode?: (level: string, nodeId: string, updatedNode: { title: string; description: string }) => void;
  onDeleteNode?: (level: string, nodeId: string) => void;
  levelNames?: {
    level1: string;
    level2: string;
    level3: string;
    level4?: string;
  };
  query?: string;
  hasUserMadeSelection: boolean;
  scenario?: string;
  conversationHistory?: any[];
  onAddLevel4?: () => void;
  searchMode?: string;
}

export const MainContent = ({
  selectedPath,
  level1Items,
  level2Items,
  level3Items,
  onNodeClick,
  onEditNode,
  onDeleteNode,
  levelNames = {
    level1: "目的",
    level2: "機能",
    level3: "測定/技術",
    level4: "実装"
  },
  query,
  scenario,
  hasUserMadeSelection,
  conversationHistory,
  onAddLevel4,
  searchMode
}: MainContentProps) => {
  return (
    <div className="container mx-auto px-4 py-6">
      <ScenarioSection 
        scenario={scenario} 
        conversationHistory={conversationHistory}
      />
      <PathDisplay 
        selectedPath={selectedPath}
        level1Items={level1Items}
        level2Items={level2Items}
        level3Items={level3Items}
        onAddLevel4={onAddLevel4}
      />
      <LevelSelection
        selectedPath={selectedPath}
        level1Items={level1Items}
        level2Items={level2Items}
        level3Items={level3Items}
        onNodeClick={onNodeClick}
        onEditNode={onEditNode}
        onDeleteNode={onDeleteNode}
        levelNames={levelNames}
      />
    </div>
  );
};
