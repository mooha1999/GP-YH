import { useState } from "react";

export function Tabs({ tabs }: TabsProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="w-full">
      <div className="flex border-b border-gray-300">
        {tabs.map((tab, idx) => (
          <button
            key={tab.label}
            onClick={() => setActiveIndex(idx)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              idx === activeIndex
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-600 hover:text-blue-500"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mt-4 bg-white border border-gray-200 rounded-md shadow-sm overflow-auto">
        {tabs[activeIndex].content}
      </div>
    </div>
  );
}

export interface TabItem {
  label: string;
  content: React.ReactNode;
}

export interface TabsProps {
  tabs: TabItem[];
}
