
import React from 'react';
import { PathDisplay } from "./PathDisplay";
import { LevelSelection } from "./LevelSelection";
import { ScenarioSection } from "./ScenarioSection";

interface MainContentProps {
  selectedPath: {
    level1: string;
    level2: string;
    level3: string;
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
  };
  query?: string;
  hasUserMadeSelection: boolean;
  scenario?: string;
  onEditScenario?: (newScenario: string) => void;
  conversationHistory?: any[]; // Added this prop
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
    level3: "測定/技術"
  },
  query,
  scenario,
  onEditScenario,
  hasUserMadeSelection,
  conversationHistory // Added this parameter
}: MainContentProps) => {
  return (
    <div className="container mx-auto px-4 py-6">
      <ScenarioSection scenario={scenario} onEditScenario={onEditScenario} conversationHistory={conversationHistory} />
      <PathDisplay 
        selectedPath={selectedPath}
        level1Items={level1Items}
        level2Items={level2Items}
        level3Items={level3Items}
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
