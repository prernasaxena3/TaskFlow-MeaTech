import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/stores/authStore";
import { useTaskStore, Task } from "@/stores/taskStore";
import { Button } from "@/components/ui/button";
import { TaskCard } from "@/components/TaskCard";
import { TaskDialog } from "@/components/TaskDialog";
import { toast } from "sonner";
import { LogOut, Plus, CheckSquare, Loader2 } from "lucide-react";

// Mock data for production
const MOCK_TASKS: Task[] = [
  {
    id: "1",
    title: "Setup project repository",
    description:
      "Initialize the project with React, TypeScript, and dependencies",
    status: "done",
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: "2",
    title: "Implement authentication flow",
    description: "Create login page with frontend-only mock authentication",
    status: "in-progress",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: "3",
    title: "Design task dashboard",
    description:
      "Build a responsive dashboard with task list and CRUD operations",
    status: "todo",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const navigate = useNavigate();
  const { username, logout } = useAuthStore();
  const { tasks, setTasks, addTask, updateTask, deleteTask } = useTaskStore();

  useEffect(() => {
    // Load mock tasks in production
    if (import.meta.env.DEV) {
      fetchTasks(); // Keep MSW in dev
    } else {
      setTasks(MOCK_TASKS);
      setIsLoading(false);
    }
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch("/api/tasks");
      const data = await response.json();
      setTasks(data.tasks);
    } catch (error) {
      toast.error("Failed to fetch tasks");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  // Frontend-only CRUD
  const handleCreateTask = (
    taskData: Omit<Task, "id" | "createdAt" | "updatedAt">
  ) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    addTask(newTask);
    toast.success("Task created successfully");
    setIsDialogOpen(false);
  };

  const handleUpdateTask = (id: string, taskData: Partial<Task>) => {
    const taskIndex = tasks.findIndex((t) => t.id === id);
    if (taskIndex === -1) return toast.error("Task not found");

    const updatedTask: Task = {
      ...tasks[taskIndex],
      ...taskData,
      updatedAt: new Date().toISOString(),
    };
    updateTask(id, updatedTask);
    toast.success("Task updated successfully");
    setIsDialogOpen(false);
    setEditingTask(null);
  };

  const handleDeleteTask = (id: string) => {
    deleteTask(id);
    toast.success("Task deleted successfully");
  };

  const handleEditClick = (task: Task) => {
    setEditingTask(task);
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setEditingTask(null);
  };

  const todoTasks = tasks.filter((t) => t.status === "todo");
  const inProgressTasks = tasks.filter((t) => t.status === "in-progress");
  const doneTasks = tasks.filter((t) => t.status === "done");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-accent">
                <CheckSquare className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold">TaskFlow</h1>
                <p className="text-sm text-muted-foreground">
                  Welcome back, {username}
                </p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold mb-1">My Tasks</h2>
            <p className="text-muted-foreground">
              Manage and track your tasks efficiently
            </p>
          </div>
          <Button onClick={() => setIsDialogOpen(true)}>
            <Plus className="w-4 h-4" />
            New Task
          </Button>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : tasks.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-flex p-4 rounded-full bg-muted/50 mb-4">
              <CheckSquare className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No tasks yet</h3>
            <p className="text-muted-foreground mb-6">
              Create your first task to get started
            </p>
            <Button onClick={() => setIsDialogOpen(true)}>
              <Plus className="w-4 h-4" />
              Create Task
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* To Do Column */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-muted-foreground" />
                <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
                  To Do
                </h3>
                <span className="text-xs text-muted-foreground">
                  ({todoTasks.length})
                </span>
              </div>
              {todoTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onEdit={handleEditClick}
                  onDelete={handleDeleteTask}
                  onStatusChange={(status) =>
                    handleUpdateTask(task.id, { status })
                  }
                />
              ))}
            </div>

            {/* In Progress Column */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
                  In Progress
                </h3>
                <span className="text-xs text-muted-foreground">
                  ({inProgressTasks.length})
                </span>
              </div>
              {inProgressTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onEdit={handleEditClick}
                  onDelete={handleDeleteTask}
                  onStatusChange={(status) =>
                    handleUpdateTask(task.id, { status })
                  }
                />
              ))}
            </div>

            {/* Done Column */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-[hsl(var(--success))]" />
                <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
                  Done
                </h3>
                <span className="text-xs text-muted-foreground">
                  ({doneTasks.length})
                </span>
              </div>
              {doneTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onEdit={handleEditClick}
                  onDelete={handleDeleteTask}
                  onStatusChange={(status) =>
                    handleUpdateTask(task.id, { status })
                  }
                />
              ))}
            </div>
          </div>
        )}
      </main>

      <TaskDialog
        open={isDialogOpen}
        onOpenChange={handleDialogClose}
        task={editingTask}
        onSubmit={(data) => {
          if (editingTask) {
            handleUpdateTask(editingTask.id, data);
          } else {
            handleCreateTask(
              data as Omit<Task, "id" | "createdAt" | "updatedAt">
            );
          }
        }}
      />
    </div>
  );
};
