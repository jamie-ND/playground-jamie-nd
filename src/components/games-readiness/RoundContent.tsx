/**
 * RoundContent Component
 * 
 * Displays the content for the active round, including:
 * - List of questions with answers, notes, and tasks
 * - Complete round button
 * - Round status information
 * 
 * EXTENSION POINTS:
 * - Add question filtering/search
 * - Add question grouping by category
 * - Add progress indicators (answered vs unanswered)
 * - Add bulk actions (e.g., mark all tasks as complete)
 * - Add export functionality (PDF, CSV)
 * - Add comparison with previous rounds
 */

"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { QuestionItem } from './QuestionItem';
import { Round, Question, QuestionAnswer, Task } from '@/types/games-readiness';

interface RoundContentProps {
  round: Round;
  questions: Question[];
  onAnswerChange: (questionId: string, answer: string) => void;
  onNotesChange: (questionId: string, notes: string) => void;
  onTaskAdd: (questionId: string, taskText: string) => void;
  onTaskToggle: (questionId: string, taskId: string) => void;
  onTaskDelete: (questionId: string, taskId: string) => void;
  onCompleteRound: () => void;
}

export function RoundContent({
  round,
  questions,
  onAnswerChange,
  onNotesChange,
  onTaskAdd,
  onTaskToggle,
  onTaskDelete,
  onCompleteRound
}: RoundContentProps) {
  // Calculate statistics
  const answeredQuestions = round.answers.filter(a => a.answer.trim() !== '').length;
  const totalQuestions = questions.length;
  const totalTasks = round.answers.reduce((sum, a) => sum + a.tasks.length, 0);
  const completedTasks = round.answers.reduce(
    (sum, a) => sum + a.tasks.filter(t => t.completed).length,
    0
  );

  // Get answer for a specific question
  const getAnswerForQuestion = (questionId: string): QuestionAnswer => {
    return round.answers.find(a => a.questionId === questionId) || {
      questionId,
      answer: '',
      notes: '',
      tasks: [],
      lastModified: new Date()
    };
  };

  return (
    <div className="space-y-6 p-6">
      {/* Round Header */}
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold">{round.name}</h2>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>{answeredQuestions} of {totalQuestions} questions answered</span>
            {totalTasks > 0 && (
              <>
                <span>•</span>
                <span>{completedTasks} of {totalTasks} tasks completed</span>
              </>
            )}
          </div>
        </div>

        {/* Complete Round Button */}
        {!round.isComplete && (
          <Button
            onClick={onCompleteRound}
            variant="default"
            disabled={answeredQuestions < totalQuestions}
          >
            Mark Round as Complete
          </Button>
        )}

        {round.isComplete && (
          <Badge variant="secondary" className="text-sm px-4 py-2">
            Round Completed
          </Badge>
        )}
      </div>

      {/* Alert if not all questions answered */}
      {!round.isComplete && answeredQuestions < totalQuestions && (
        <div className="p-4 rounded-md bg-yellow-50 border border-yellow-200 text-yellow-800 text-sm">
          <div className="flex items-start gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="shrink-0 mt-0.5"
            >
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            <div>
              <div className="font-medium mb-1">Not all questions answered</div>
              <div>Please answer all {totalQuestions} questions before marking this round as complete.</div>
            </div>
          </div>
        </div>
      )}

      {/* Completion message */}
      {round.isComplete && (
        <div className="p-4 rounded-md bg-green-50 border border-green-200 text-green-800 text-sm">
          <div className="flex items-start gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="shrink-0 mt-0.5"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            <div>
              <div className="font-medium mb-1">Round completed</div>
              <div>
                This round was marked as complete on {round.completedAt?.toLocaleDateString()}.
                No further edits can be made.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Questions List */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Readiness Questions</h3>
        
        {questions
          .sort((a, b) => a.order - b.order)
          .map((question) => (
            <QuestionItem
              key={question.id}
              question={question}
              answer={getAnswerForQuestion(question.id)}
              isEditable={!round.isComplete}
              onAnswerChange={onAnswerChange}
              onNotesChange={onNotesChange}
              onTaskAdd={onTaskAdd}
              onTaskToggle={onTaskToggle}
              onTaskDelete={onTaskDelete}
            />
          ))}
      </div>

      {/* Future Enhancement Section (commented for visibility) */}
      {/* 
      <div className="mt-8 p-4 border-t">
        <h3 className="text-lg font-semibold mb-4">Additional Features</h3>
        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline">Export Round Data</Button>
          <Button variant="outline">Compare with Previous Round</Button>
          <Button variant="outline">Generate Report</Button>
          <Button variant="outline">View Change History</Button>
        </div>
      </div>
      */}
    </div>
  );
}
