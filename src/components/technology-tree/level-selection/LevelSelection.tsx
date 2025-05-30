
import React, { useRef } from "react";
import { LevelColumn } from "./LevelColumn";
import { ConnectionLines } from "./ConnectionLines";
import { useConnectionLines } from "./useConnectionLines";
import { toast } from "@/hooks/use-toast";

interface LevelSelectionProps {
  selectedPath: {
    level1: string;
    level2: string;
    level3: string;
  };
  level1Items: any[];
  level2Items: Record<string, any[]>;
  level3Items: Record<string, any[]>;
  onNodeClick: (level: string, nodeId: string) => void;
  levelNames: {
    level1: string;
    level2: string;
    level3: string;
  };
}

export const LevelSelection = ({
  selectedPath,
  level1Items,
  level2Items,
  level3Items,
  onNodeClick,
  levelNames
}: LevelSelectionProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { level1to2Line, level2to3Line } = useConnectionLines(containerRef, selectedPath);

  // Reorder items to ensure selected items appear first
  const reorderedLevel1Items = React.useMemo(() => {
    const items = [...level1Items];
    const selectedIndex = items.findIndex(item => item.id === selectedPath.level1);
    if (selectedIndex > 0) {
      const [selectedItem] = items.splice(selectedIndex, 1);
      items.unshift(selectedItem);
    }
    return items;
  }, [level1Items, selectedPath.level1]);

  const visibleLevel2Items = React.useMemo(() => {
    if (!selectedPath.level1) return [];
    const items = [...(level2Items[selectedPath.level1] || [])];
    const selectedIndex = items.findIndex(item => item.id === selectedPath.level2);
    if (selectedIndex > 0) {
      const [selectedItem] = items.splice(selectedIndex, 1);
      items.unshift(selectedItem);
    }
    return items;
  }, [level2Items, selectedPath]);

  const visibleLevel3Items = React.useMemo(() => {
    if (!selectedPath.level2) return [];
    const items = [...(level3Items[selectedPath.level2] || [])];
    const selectedIndex = items.findIndex(item => item.id === selectedPath.level3);
    if (selectedIndex > 0) {
      const [selectedItem] = items.splice(selectedIndex, 1);
      items.unshift(selectedItem);
    }
    return items;
  }, [level3Items, selectedPath]);

  const handleNodeClick = (level: string, nodeId: string) => {
    onNodeClick(level, nodeId);
    
    if (selectedPath[level] !== nodeId) {
      const refreshEvent = new CustomEvent('refresh-papers');
      document.dispatchEvent(refreshEvent);
      
      toast({
        title: "Results updated",
        description: "The paper list has been updated based on your selection",
        duration: 3000,
      });
      
      // Scroll the tree view into view
      if (containerRef.current) {
        const elementTop = containerRef.current.offsetTop;
        const scrollOptions = {
          top: elementTop - 100, // Some padding above the element
          behavior: 'smooth' as ScrollBehavior
        };
        window.scrollTo(scrollOptions);
      }
    }
  };

  return (
    <div className="flex flex-row gap-6 mb-8 relative" ref={containerRef}>
      <LevelColumn
        title="Level 1"
        subtitle={levelNames.level1}
        items={reorderedLevel1Items}
        selectedId={selectedPath.level1}
        onNodeClick={(nodeId) => handleNodeClick('level1', nodeId)}
      />

      <LevelColumn
        title="Level 2"
        subtitle={levelNames.level2}
        items={visibleLevel2Items}
        selectedId={selectedPath.level2}
        onNodeClick={(nodeId) => handleNodeClick('level2', nodeId)}
      />

      <LevelColumn
        title="Level 3"
        subtitle={levelNames.level3}
        items={visibleLevel3Items}
        selectedId={selectedPath.level3}
        onNodeClick={(nodeId) => handleNodeClick('level3', nodeId)}
      />

      <ConnectionLines
        level1to2Line={level1to2Line}
        level2to3Line={level2to3Line}
      />
    </div>
  );
};
