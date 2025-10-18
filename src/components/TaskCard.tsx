import { Task } from "@/stores/taskStore";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import {
  MoreVertical,
  Edit,
  Trash2,
  Circle,
  Clock,
  CheckCircle2,
} from "lucide-react";

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
  onStatusChange: (status: Task["status"]) => void;
}

const statusConfig = {
  todo: { label: "To Do", icon: Circle, color: "text-muted-foreground" },
  "in-progress": { label: "In Progress", icon: Clock, color: "text-primary" },
  done: {
    label: "Done",
    icon: CheckCircle2,
    color: "text-[hsl(var(--success))]",
  },
};

export const TaskCard = ({
  task,
  onEdit,
  onDelete,
  onStatusChange,
}: TaskCardProps) => {
  const StatusIcon = statusConfig[task.status].icon;

  return (
    <Card className="group hover:shadow-lg transition-all duration-200 border-border bg-card">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <StatusIcon
                className={`w-4 h-4 ${statusConfig[task.status].color}`}
              />
              <Badge variant="secondary" className="text-xs">
                {statusConfig[task.status].label}
              </Badge>
            </div>
            <CardTitle className="text-lg">{task.title}</CardTitle>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(task)}>
                <Edit className="w-4 h-4" /> Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onStatusChange("todo")}>
                <Circle className="w-4 h-4" /> Move to To Do
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onStatusChange("in-progress")}>
                <Clock className="w-4 h-4" /> Move to In Progress
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onStatusChange("done")}>
                <CheckCircle2 className="w-4 h-4" /> Move to Done
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-destructive"
                onClick={() => onDelete(task)}
              >
                <Trash2 className="w-4 h-4" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-sm line-clamp-2">
          {task.description}
        </CardDescription>
        <div className="mt-3 text-xs text-muted-foreground">
          Updated {new Date(task.updatedAt).toLocaleDateString()}
        </div>
      </CardContent>
    </Card>
  );
};
