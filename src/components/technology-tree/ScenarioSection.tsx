
import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Edit } from "lucide-react";

interface ScenarioSectionProps {
  scenario?: string;
  conversationHistory?: any[];
}

export const ScenarioSection = ({ 
  scenario = "網膜疾患を持つ医療専門家と患者が、早期発見のための非侵襲的診断方法を求める臨床環境",
  conversationHistory = []
}: ScenarioSectionProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get searchMode from location state - if it's not defined or is "deep", show the section
  // 'quick' mode means user came directly from home page, hide the section
  // any other mode (e.g. "deep", undefined) means user came from research-context, show the section
  const searchMode = location.state?.searchMode;
  
  // If searchMode is "quick", don't render the component
  if (searchMode === "quick") {
    return null;
  }

  return (
    <div className="bg-blue-50 rounded-lg p-6 mb-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-sm font-medium text-blue-600 mb-1">研究シナリオ：</h2>
          <p className="text-gray-800 text-base mb-3">{scenario}</p>
        </div>
      </div>
    </div>
  );
};
