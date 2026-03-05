import { LucideIcon } from "lucide-react";

export interface StatCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
  color: string;
}

export const StatCard = ({
  label,
  value,
  icon: Icon,
  color,
}: StatCardProps) => (
  <div className="bg-clay border border-gold/10 p-6 rounded-xl shadow-sm">
    <div className="flex items-center justify-between mb-4">
      <Icon className={color} size={24} />
    </div>
    <p className="text-gray-400 text-sm font-medium">{label}</p>
    <h3 className="text-2xl font-bold text-white font-serif">{value}</h3>
  </div>
);
