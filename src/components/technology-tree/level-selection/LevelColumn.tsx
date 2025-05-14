
import React, { useState } from 'react';
import { TreeNode } from './TreeNode';
import { EditNodeDialog } from './EditNodeDialog';
import { CustomNodeButton } from './CustomNodeButton';
import { EmptyNodeList } from './EmptyNodeList';

interface LevelItem {
  id: string;
  name: string;
  info?: string;
  isCustom?: boolean;
  description?: string;
}

interface LevelColumnProps {
  title: string;
  subtitle: string;
  items: LevelItem[];
  selectedId: string;
  onNodeClick: (nodeId: string) => void;
  onEditNode?: (nodeId: string, updatedNode: { title: string; description: string }) => void;
  onDeleteNode?: (nodeId: string) => void;
}

export const LevelColumn: React.FC<LevelColumnProps> = ({
  title,
  subtitle,
  items,
  selectedId,
  onNodeClick,
  onEditNode,
  onDeleteNode
}) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingNode, setEditingNode] = useState<LevelItem | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  
  // Determine level number based on title
  const levelNumber = title === "レベル1" ? 1 : 
                      title === "レベル2" ? 2 : 
                      title === "レベル3" ? 3 : 
                      undefined;
  
  const handleCustomNodeClick = () => {
    // Scroll to the top of the page
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Extract the level number from the title (e.g., "レベル1" -> "1")
    // Updated to handle Japanese title format
    const levelNumber = title === "レベル1" ? "1" : 
                        title === "レベル2" ? "2" : 
                        title === "レベル3" ? "3" : 
                        title.slice(-1);
    
    // Update sidebar tab to chat with level-specific message
    const customEvent = new CustomEvent('switch-to-chat', {
      detail: {
        message: `👋 こんにちは！レベル${levelNumber}の下に新しいノードを追加する準備はできていますか？始め方は次のとおりです：
🔹 オプション1：タイトルと説明を自分ではっきりと入力してください。
🔹 オプション2：自然な言葉であなたのアイデアを説明するだけでいいです — 私がそれを適切に構造化されたノードに変換するお手伝いをします！`
      }
    });
    document.dispatchEvent(customEvent);
    
    // Find and open the chatbox
    const chatbox = document.querySelector('[data-chatbox]');
    if (chatbox) {
      chatbox.setAttribute('data-chatbox-open', 'true');
    }
  };

  const handleEditClick = (e: React.MouseEvent, item: LevelItem) => {
    e.stopPropagation(); // Prevent triggering node selection
    setEditingNode(item);
    setEditTitle(item.name);
    setEditDescription(item.description || "");
    setIsEditDialogOpen(true);
  };

  const handleDeleteClick = (e: React.MouseEvent, nodeId: string) => {
    e.stopPropagation(); // Prevent triggering node selection
    if (onDeleteNode) {
      onDeleteNode(nodeId);
    }
  };

  const handleSaveEdit = () => {
    if (editingNode && onEditNode) {
      onEditNode(editingNode.id, {
        title: editTitle,
        description: editDescription
      });
    }
    setIsEditDialogOpen(false);
  };

  // Create the combined title (e.g., "レベル1：目的")
  const combinedTitle = title && subtitle ? `${title}：${subtitle}` : title;
  
  // Define title color based on level
  const getTitleColor = () => {
    if (title === "レベル1") return "#3d5e80";
    if (title === "レベル2") return "#3774c2";
    if (title === "レベル3") return "#467efd";
    return "text-blue-700"; // default color
  };

  return (
    <div className="w-1/3 bg-white p-4 rounded-lg relative">
      <div className="flex items-center justify-between mb-4">
        <h2 
          className="text-base"
          style={{ 
            color: getTitleColor(), 
            fontSize: '14px', 
            fontWeight: 400 
          }}
        >
          {combinedTitle}
        </h2>
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M12.1406 7.0002C12.1406 7.08722 12.1061 7.17068 12.0445 7.23222C11.983 7.29376 11.8995 7.32833 11.8125 7.32833H2.1875C2.10048 7.32833 2.01702 7.29376 1.95548 7.23222C1.89395 7.17068 1.85938 7.08722 1.85938 7.0002C1.85938 6.91318 1.89395 6.82972 1.95548 6.76818C2.01702 6.70665 2.10048 6.67207 2.1875 6.67207H11.8125C11.8995 6.67207 11.983 6.70665 12.0445 6.76818C12.1061 6.82972 12.1406 6.91318 12.1406 7.0002ZM5.48187 2.85707L6.67188 1.66762V5.2502C6.67188 5.33722 6.70645 5.42068 6.76798 5.48222C6.82952 5.54375 6.91298 5.57832 7 5.57832C7.08702 5.57832 7.17048 5.54375 7.23202 5.48222C7.29356 5.42068 7.32812 5.33722 7.32812 5.2502V1.66762L8.51812 2.85707C8.58033 2.91503 8.6626 2.94659 8.7476 2.94509C8.83261 2.94359 8.91372 2.90915 8.97383 2.84903C9.03395 2.78892 9.06839 2.70781 9.06989 2.6228C9.07139 2.5378 9.03984 2.45553 8.98188 2.39332L7.23188 0.643325C7.17035 0.581877 7.08695 0.547363 7 0.547363C6.91305 0.547363 6.82965 0.581877 6.76813 0.643325L5.01813 2.39332C4.96017 2.45553 4.92861 2.5378 4.93011 2.6228C4.93161 2.70781 4.96605 2.78892 5.02617 2.84903C5.08628 2.90915 5.16739 2.94359 5.2524 2.94509C5.3374 2.94659 5.41967 2.91503 5.48187 2.85707ZM8.51812 11.1433L7.32812 12.3328V8.7502C7.32812 8.66318 7.29356 8.57972 7.23202 8.51818C7.17048 8.45665 7.08702 8.42208 7 8.42208C6.91298 8.42208 6.82952 8.45665 6.76798 8.51818C6.70645 8.57972 6.67188 8.66318 6.67188 8.7502V12.3328L5.48187 11.1433C5.41967 11.0854 5.3374 11.0538 5.2524 11.0553C5.16739 11.0568 5.08628 11.0912 5.02617 11.1514C4.96605 11.2115 4.93161 11.2926 4.93011 11.3776C4.92861 11.4626 4.96017 11.5449 5.01813 11.6071L6.76813 13.3571C6.82965 13.4185 6.91305 13.453 7 13.453C7.08695 13.453 7.17035 13.4185 7.23188 13.3571L8.98188 11.6071C9.03984 11.5449 9.07139 11.4626 9.06989 11.3776C9.06839 11.2926 9.03395 11.2115 8.97383 11.1514C8.91372 11.0912 8.83261 11.0568 8.7476 11.0553C8.6626 11.0538 8.58033 11.0854 8.51812 11.1433Z" fill="#8F8F8F"/>
        </svg>
      </div>
      
      <div className="space-y-4">
        {items.map((item) => (
          <TreeNode
            key={item.id}
            item={item}
            isSelected={selectedId === item.id}
            onClick={() => onNodeClick(item.id)}
            onEditClick={(e) => handleEditClick(e, item)}
            onDeleteClick={(e) => handleDeleteClick(e, item.id)}
            level={levelNumber}
          />
        ))}

        <CustomNodeButton onClick={handleCustomNodeClick} />

        {items.length === 0 && <EmptyNodeList levelTitle={title} />}
      </div>

      <EditNodeDialog
        isOpen={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        title={editTitle}
        description={editDescription}
        onTitleChange={setEditTitle}
        onDescriptionChange={setEditDescription}
        onSave={handleSaveEdit}
      />
    </div>
  );
};
