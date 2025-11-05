/**
 * QuestionItem Component
 * 
 * Displays a single readiness question with:
 * - Answer input field
 * - Notes section
 * - Tasks list with add/complete/delete functionality
 * 
 * EXTENSION POINTS:
 * - Add rich text editing for answers and notes
 * - Add file attachments
 * - Add @mentions for team collaboration
 * - Add task assignment to specific users
 * - Add task due dates with calendar picker
 * - Add task priority levels
 * - Add comment threads for discussion
 * - Add change history/audit log
 */

"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Question, QuestionAnswer, Task } from '@/types/games-readiness';

interface QuestionItemProps {
  question: Question;
  answer: QuestionAnswer;
  isEditable: boolean;
  onAnswerChange: (questionId: string, answer: string) => void;
  onNotesChange: (questionId: string, notes: string) => void;
  onTaskAdd: (questionId: string, taskText: string) => void;
  onTaskToggle: (questionId: string, taskId: string) => void;
  onTaskDelete: (questionId: string, taskId: string) => void;
}

export function QuestionItem({
  question,
  answer,
  isEditable,
  onAnswerChange,
  onNotesChange,
  onTaskAdd,
  onTaskToggle,
  onTaskDelete
}: QuestionItemProps) {
  const [newTaskText, setNewTaskText] = useState('');
  const [showTaskInput, setShowTaskInput] = useState(false);

  const handleAddTask = () => {
    if (newTaskText.trim()) {
      onTaskAdd(question.id, newTaskText.trim());
      setNewTaskText('');
      setShowTaskInput(false);
    }
  };

  const completedTasks = answer.tasks.filter(t => t.completed).length;
  const totalTasks = answer.tasks.length;

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <CardTitle className="text-lg">{question.text}</CardTitle>
          {totalTasks > 0 && (
            <Badge variant="outline" className="shrink-0">
              {completedTasks}/{totalTasks} tasks
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Answer Section */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">
            Answer
          </label>
          <textarea
            value={answer.answer}
            onChange={(e) => onAnswerChange(question.id, e.target.value)}
            disabled={!isEditable}
            placeholder={isEditable ? "Enter your answer..." : "No answer provided"}
            className={cn(
              "w-full min-h-[100px] px-3 py-2 rounded-md border resize-y",
              "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
              isEditable
                ? "bg-background border-input"
                : "bg-muted border-muted cursor-not-allowed text-muted-foreground"
            )}
          />
        </div>

        {/* Notes Section */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">
            Notes
          </label>
          <textarea
            value={answer.notes}
            onChange={(e) => onNotesChange(question.id, e.target.value)}
            disabled={!isEditable}
            placeholder={isEditable ? "Add notes to provide context or additional information..." : "No notes"}
            className={cn(
              "w-full min-h-[80px] px-3 py-2 rounded-md border resize-y",
              "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
              isEditable
                ? "bg-background border-input"
                : "bg-muted border-muted cursor-not-allowed text-muted-foreground"
            )}
          />
        </div>

        {/* Tasks Section */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-muted-foreground">
              Tasks to Improve Readiness
            </label>
            {isEditable && !showTaskInput && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowTaskInput(true)}
                className="h-7 text-xs"
              >
                + Add Task
              </Button>
            )}
          </div>

          {/* Task List */}
          {answer.tasks.length > 0 ? (
            <ul className="space-y-2">
              {answer.tasks.map((task) => (
                <li
                  key={task.id}
                  className={cn(
                    "flex items-start gap-3 p-3 rounded-md border",
                    "transition-colors",
                    task.completed ? "bg-muted/50" : "bg-background"
                  )}
                >
                  {/* Checkbox */}
                  <button
                    onClick={() => onTaskToggle(question.id, task.id)}
                    disabled={!isEditable}
                    className={cn(
                      "mt-0.5 h-5 w-5 rounded border-2 flex items-center justify-center shrink-0",
                      "transition-all focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                      task.completed
                        ? "bg-primary border-primary"
                        : "border-muted-foreground hover:border-primary",
                      !isEditable && "cursor-not-allowed opacity-50"
                    )}
                  >
                    {task.completed && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </button>

                  {/* Task Text */}
                  <span className={cn(
                    "flex-1 text-sm",
                    task.completed && "line-through text-muted-foreground"
                  )}>
                    {task.text}
                  </span>

                  {/* Delete Button */}
                  {isEditable && (
                    <button
                      onClick={() => onTaskDelete(question.id, task.id)}
                      className="text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground italic py-2">
              No tasks yet. Add tasks to track improvements needed for this question.
            </p>
          )}

          {/* Add Task Input */}
          {showTaskInput && isEditable && (
            <div className="flex gap-2 pt-2">
              <input
                type="text"
                value={newTaskText}
                onChange={(e) => setNewTaskText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleAddTask();
                  } else if (e.key === 'Escape') {
                    setNewTaskText('');
                    setShowTaskInput(false);
                  }
                }}
                placeholder="Enter task description..."
                className="flex-1 px-3 py-2 text-sm rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                autoFocus
              />
              <Button size="sm" onClick={handleAddTask}>
                Add
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => {
                  setNewTaskText('');
                  setShowTaskInput(false);
                }}
              >
                Cancel
              </Button>
            </div>
          )}
        </div>

        {/* Last Modified Timestamp */}
        <div className="text-xs text-muted-foreground pt-2 border-t">
          Last modified: {answer.lastModified.toLocaleString()}
          {/* Future: Add "by [user name]" here when user tracking is implemented */}
        </div>
      </CardContent>
    </Card>
  );
}
