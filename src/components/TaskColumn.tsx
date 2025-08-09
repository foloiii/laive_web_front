
import React, { useState } from 'react';
import TaskCard, { Task } from './TaskCard';
import ChatTaskCard, { ChatTask } from './ChatTaskCard';

export interface Column {
  id: string;
  title: string;
  color: string;
  tasks: (Task | ChatTask)[];
  type?: 'task' | 'chat';
}

interface TaskColumnProps {
  column: Column;
  onTypingComplete?: (taskId: string) => void;
}

const TaskColumn: React.FC<TaskColumnProps> = ({
  column,
  onTypingComplete
}) => {
  // Fonction pour vérifier si c'est une ChatTask
  const isChatTask = (task: Task | ChatTask): task is ChatTask => {
    return 'message' in task && 'author' in task;
  };

  return (
    <div
      className={`flex flex-col rounded-lg border border-border backdrop-blur-sm transition-all duration-300 bg-card/50 ${column.id === 'live-questions' ? 'flex-[2]' : column.id === 'notes' ? 'flex-[1]' : 'flex-1'}`}
    >
      <div className="p-3 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-muted"></span>
          <h4 className="font-medium text-sm text-foreground">{column.title}</h4>
          <span className="text-xs bg-muted/50 px-2 py-0.5 rounded-full text-muted-foreground">
            {column.tasks.length}
          </span>
        </div>
        <div className="text-muted-foreground">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 12V12.01M8 12V12.01M16 12V12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      <div className="p-2 flex-1 space-y-2 overflow-visible">
        {column.tasks.map((task) => (
          isChatTask(task) ? (
            <ChatTaskCard
              key={task.id}
              task={task}
              onTypingComplete={() => onTypingComplete?.(task.id)}
            />
          ) : (
            <TaskCard
              key={task.id}
              task={task}
            />
          )
        ))}
      </div>
    </div>
  );
};

export default TaskColumn;
