import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowUp, ArrowDown, Minus } from 'lucide-react'; // Icons for trend

interface DataWidgetCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactElement;
  trend?: 'up' | 'down' | 'neutral';
  trendText?: string;
  description?: string; // Optional description below the value
  onClick?: () => void;
  className?: string;
}

const TrendIcon = ({ trend }: { trend?: 'up' | 'down' | 'neutral' }) => {
  if (trend === 'up') return <ArrowUp className="h-4 w-4 text-green-500" />;
  if (trend === 'down') return <ArrowDown className="h-4 w-4 text-red-500" />;
  if (trend === 'neutral') return <Minus className="h-4 w-4 text-gray-500" />;
  return null;
};

const DataWidgetCard: React.FC<DataWidgetCardProps> = ({
  title,
  value,
  icon,
  trend,
  trendText,
  description,
  onClick,
  className,
}) => {
  console.log("Rendering DataWidgetCard:", title);

  return (
    <Card
      className={cn("hover:shadow-md transition-shadow duration-200", onClick ? "cursor-pointer" : "", className)}
      onClick={onClick}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon && React.cloneElement(icon, { className: "h-4 w-4 text-muted-foreground" })}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && <p className="text-xs text-muted-foreground pt-1">{description}</p>}
        {trendText && (
          <div className="flex items-center text-xs text-muted-foreground pt-1">
            <TrendIcon trend={trend} />
            <span className={cn(
              "ml-1",
              trend === 'up' && "text-green-600",
              trend === 'down' && "text-red-600",
            )}>
              {trendText}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DataWidgetCard;