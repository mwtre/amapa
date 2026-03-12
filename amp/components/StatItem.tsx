import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatItemProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
}

export const StatItem: React.FC<StatItemProps> = ({ icon: Icon, label, value }) => (
  <div className="flex items-center gap-2 bg-green-900/30 p-2 rounded-md">
    <Icon className="w-5 h-5 text-green-400" />
    <div>
      <p className="text-xs text-green-300">{label}</p>
      <p className="text-sm font-semibold text-green-100">{value}</p>
    </div>
  </div>
);