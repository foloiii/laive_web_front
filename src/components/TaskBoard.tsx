
import React, { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import TaskColumn, { Column } from './TaskColumn';
import { Task } from './TaskCard';
import { ChatTask } from './ChatTaskCard';

// Initial data for the task board
const initialColumns: Column[] = [
  {
    id: 'live-questions',
    title: 'Live questions',
    color: 'muted',
    type: 'chat',
    tasks: [
        {
        id: 'c1',
        message: 'On this dashboard, are we considering all the sales or only the retail sales ? Do we want to exclude specific products or clients on this dashboard ? I know that usually your team exclude the ecommerce sales from your analysis.',
        author: 'Assistant',
        timestamp: '10:46 AM',
        avatarColor: 'bg-slate-600',
        category: {
            type: 'Functional',
            color: 'blue'
          },
        annotations: [
          {
            text: 'I know that usually your team exclude the ecommerce sales from your analysis.',
            tooltip: 'Laive is directly connected to your data catalog, allowing to understand the deep context of your organization, and retrieve key informations to orient the questions.'
          }
        ]
        },
        {
        id: 'c2',
        message: 'We have multiple sources for Sales data, which ones are the right to use ? Do we use the ERP or the CRM ? I know that usually you use the ERP data since it is more reliable and complete regarding the in-store sales.',
        author: 'Assistant',
        timestamp: '10:47 AM',
        avatarColor: 'bg-slate-600',
        category: {
            type: 'Technical',
            color: 'orange'
          },
        annotations: [
          {
            text: 'I know that usually you use the ERP data since it is more reliable and complete regarding the in-store sales.',
            tooltip: 'Using its direct connection to CONFLUENCE, Laive detected in the system technical documentation that the ERP data is more reliable and complete regarding the in-store sales.'
          }
        ]
        },
        {
          id: 'c3',
          message: 'I understand your need to have a those insights in the next week regarding the upcoming business review, but regarding the features we listed and the actual roadmap, we might not be able to deliver a fully developped product until 2 months. Can we find a way to help you having quick manual insights for your review, and plan a delivery of the full product in 2 months ?',
          author: 'Assistant',
          timestamp: '10:48 AM',
          avatarColor: 'bg-slate-600',
          category: {
              type: 'Organizational',
              color: 'green'
            },
          annotations: [
          {
            text: 'regarding the features we listed and the actual roadmap, we might not be able to deliver a fully developped product until 2 months',
            tooltip: 'Using its direct connection to JIRA, Laive retrieved the team roadmap and the evaluated the delivery date of the product.'
          }
        ]
        }
    ]
  },
  {
    id: 'notes',
    title: 'Live meeting',
    color: 'muted',
    type: 'chat',
    tasks: [
      {
        id: 'm1',
        message: 'Ok, so we need a dashboard in order to see the evolution of the sales over time during the past 5 years, can we have it for the next week ?',
        author: 'Client',
        timestamp: '10:45 AM',
        avatarColor: 'bg-emerald-500'
      },
      {
        id: 'm2',
        message: 'So to build this specific dashboard, what kind of filter do we need to expose ?',
        author: 'Product Owner',
        timestamp: '10:47 AM',
        avatarColor: 'bg-violet-500'
      },
      {
        id: 'm3',
        message: 'We should include filters by date range, product category, and sales region at minimum.',
        author: 'Client',
        timestamp: '10:48 AM',
        avatarColor: 'bg-emerald-500'
      }
    ]
  }
];

interface TaskBoardProps {
  className?: string;
}

const TaskBoard: React.FC<TaskBoardProps> = ({ className }) => {
  const [columns, setColumns] = useState<Column[]>([
    {
      id: 'live-questions',
      title: 'Live questions',
      color: 'muted',
      type: 'chat',
      tasks: []
    },
    {
      id: 'notes',
      title: 'Live meeting',
      color: 'muted',
      type: 'chat',
      tasks: []
    }
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isWaitingForTyping, setIsWaitingForTyping] = useState(false);
  const [lastAddedTaskId, setLastAddedTaskId] = useState<string | null>(null);

  const handleTypingComplete = (taskId: string) => {
    // Seulement si c'est la dernière tâche ajoutée
    if (taskId === lastAddedTaskId) {
      // Quand la frappe est terminée, attendre 1 seconde puis passer à la suivante
      setTimeout(() => {
        setIsWaitingForTyping(false);
        setCurrentIndex(prev => prev + 1);
      }, 1000);
    }
  };

  useEffect(() => {
    const meetingTasks = initialColumns.find(col => col.id === 'notes')?.tasks || [];
    const questionTasks = initialColumns.find(col => col.id === 'live-questions')?.tasks || [];
    const maxLength = Math.max(meetingTasks.length, questionTasks.length);

    // Ajouter la prochaine carte seulement si on n'attend pas la fin de frappe et qu'il y a encore des cartes
    if (currentIndex < maxLength * 2 && !isWaitingForTyping) {
      setColumns(prevColumns => {
        const newColumns = [...prevColumns];

        // Alternance : pair = meeting, impair = questions
        const isMeetingTurn = currentIndex % 2 === 0;
        const taskIndex = Math.floor(currentIndex / 2);

        if (isMeetingTurn && taskIndex < meetingTasks.length) {
          // Ajouter une tâche de meeting
          const meetingColumnIndex = newColumns.findIndex(col => col.id === 'notes');
          if (meetingColumnIndex !== -1) {
            const taskToAdd = meetingTasks[taskIndex];
            newColumns[meetingColumnIndex] = {
              ...newColumns[meetingColumnIndex],
              tasks: [...newColumns[meetingColumnIndex].tasks, taskToAdd]
            };
            setLastAddedTaskId(taskToAdd.id);
            setIsWaitingForTyping(true);
          }
        } else if (!isMeetingTurn && taskIndex < questionTasks.length) {
          // Ajouter une tâche de questions
          const questionColumnIndex = newColumns.findIndex(col => col.id === 'live-questions');
          if (questionColumnIndex !== -1) {
            const taskToAdd = questionTasks[taskIndex];
            newColumns[questionColumnIndex] = {
              ...newColumns[questionColumnIndex],
              tasks: [...newColumns[questionColumnIndex].tasks, taskToAdd]
            };
            setLastAddedTaskId(taskToAdd.id);
            setIsWaitingForTyping(true);
          }
        }

        return newColumns;
      });
    }
  }, [currentIndex, isWaitingForTyping]);

  return (
    <div className={`flex gap-4 overflow-x-auto pb-4 ${className}`}>
      {columns.map(column => (
        <TaskColumn
          key={column.id}
          column={column}
          onTypingComplete={handleTypingComplete}
        />
      ))}
    </div>
  );
};

export default TaskBoard;
