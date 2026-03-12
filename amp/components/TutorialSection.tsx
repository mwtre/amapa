import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface TutorialSectionProps {
  title: string;
  content: React.ReactNode;
}

export const TutorialSection: React.FC<TutorialSectionProps> = ({ title, content }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-green-900/30 p-4 rounded-md mb-4">
      <button
        className="flex justify-between items-center w-full text-left"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h3 className="text-lg font-semibold text-green-300">{title}</h3>
        {isExpanded ? <ChevronUp className="text-green-300" /> : <ChevronDown className="text-green-300" />}
      </button>
      {isExpanded && <div className="mt-2 text-green-100">{content}</div>}
    </div>
  );
};