/**
 * Games Readiness Page
 * 
 * Main page for the British Paralympics Association's Games Readiness assessment tool.
 * This page allows users to:
 * - View and edit readiness scores across multiple rounds
 * - Answer readiness questions with detailed responses
 * - Track tasks and notes for each question
 * - Mark rounds as complete when finished
 * 
 * ARCHITECTURE & EXTENSION POINTS:
 * 
 * State Management (Current: useState):
 * - Currently using React useState for local state
 * - TO EXTEND: Replace with Context API, Redux, or Zustand for global state
 * - TO EXTEND: Add state persistence to localStorage or sessionStorage
 * 
 * Data Persistence (Future):
 * - TO EXTEND: Connect to Supabase for real-time database
 * - TO EXTEND: Add API calls to save/load rounds
 * - TO EXTEND: Implement optimistic updates with error handling
 * - TO EXTEND: Add auto-save functionality with debouncing
 * 
 * Authentication & Authorization (Future):
 * - TO EXTEND: Add user authentication via Supabase Auth
 * - TO EXTEND: Implement role-based access control (admin, editor, viewer)
 * - TO EXTEND: Add user-specific round creation and editing permissions
 * 
 * Real-time Collaboration (Future):
 * - TO EXTEND: Add real-time updates using Supabase subscriptions
 * - TO EXTEND: Show who is currently viewing/editing
 * - TO EXTEND: Add conflict resolution for simultaneous edits
 * 
 * Reporting & Analytics (Future):
 * - TO EXTEND: Add data visualization (charts for score trends)
 * - TO EXTEND: Generate PDF reports
 * - TO EXTEND: Compare rounds side-by-side
 * - TO EXTEND: Export data to CSV/Excel
 */

"use client";

import React, { useState } from 'react';
import { ReadinessScore } from '@/components/games-readiness/ReadinessScore';
import { RoundTabs } from '@/components/games-readiness/RoundTabs';
import { RoundContent } from '@/components/games-readiness/RoundContent';
import { Round, Question, Task } from '@/types/games-readiness';

// Dummy data for initial questions
// TO EXTEND: Load from database or configuration file
const INITIAL_QUESTIONS: Question[] = [
  {
    id: 'q1',
    text: 'How prepared is the team for venue-specific accessibility requirements?',
    order: 1,
    // category: 'Venue & Logistics' // Future: for grouping
  },
  {
    id: 'q2',
    text: 'What is the current status of athlete equipment readiness and backup provisions?',
    order: 2,
    // category: 'Equipment'
  },
  {
    id: 'q3',
    text: 'How effective is the current communication plan between athletes, coaches, and support staff?',
    order: 3,
    // category: 'Communication'
  },
  {
    id: 'q4',
    text: 'What risk mitigation strategies are in place for potential challenges during the games?',
    order: 4,
    // category: 'Risk Management'
  }
];

// Helper function to create a new round
// TO EXTEND: Move to a separate utility file or API call
function createNewRound(roundNumber: number): Round {
  return {
    id: `round-${Date.now()}`,
    name: `Round ${roundNumber}`,
    readinessScore: 5, // Default score
    isComplete: false,
    answers: INITIAL_QUESTIONS.map(q => ({
      questionId: q.id,
      answer: '',
      notes: '',
      tasks: [],
      lastModified: new Date()
    })),
    createdAt: new Date()
  };
}

export default function GamesReadinessPage() {
  // ============================================================================
  // STATE MANAGEMENT
  // ============================================================================
  
  // Initialize with one default round
  const [rounds, setRounds] = useState<Round[]>([createNewRound(1)]);
  const [activeRoundId, setActiveRoundId] = useState<string | null>(rounds[0]?.id || null);

  // Get the currently active round
  const activeRound = rounds.find(r => r.id === activeRoundId);

  // ============================================================================
  // ROUND MANAGEMENT HANDLERS
  // ============================================================================

  /**
   * Add a new round
   * TO EXTEND: Add validation, confirmation dialog, or template selection
   */
  const handleAddRound = () => {
    const newRound = createNewRound(rounds.length + 1);
    setRounds([...rounds, newRound]);
    setActiveRoundId(newRound.id);
    
    // TO EXTEND: Save to database
    // await saveRound(newRound);
  };

  /**
   * Select a round to make it active
   */
  const handleRoundSelect = (roundId: string) => {
    setActiveRoundId(roundId);
  };

  /**
   * Update the readiness score for the active round
   * TO EXTEND: Add validation, history tracking, or automatic calculation
   */
  const handleScoreChange = (newScore: number) => {
    if (!activeRoundId) return;

    setRounds(rounds.map(round =>
      round.id === activeRoundId
        ? { ...round, readinessScore: newScore }
        : round
    ));

    // TO EXTEND: Save to database
    // await updateRoundScore(activeRoundId, newScore);
  };

  /**
   * Mark the active round as complete
   * TO EXTEND: Add confirmation dialog, validation checks, or approval workflow
   */
  const handleCompleteRound = () => {
    if (!activeRoundId) return;

    setRounds(rounds.map(round =>
      round.id === activeRoundId
        ? { ...round, isComplete: true, completedAt: new Date() }
        : round
    ));

    // TO EXTEND: Save to database and trigger notifications
    // await completeRound(activeRoundId);
    // await notifyTeam(activeRoundId);
  };

  // ============================================================================
  // ANSWER & NOTES HANDLERS
  // ============================================================================

  /**
   * Update answer for a specific question in the active round
   */
  const handleAnswerChange = (questionId: string, answer: string) => {
    if (!activeRoundId) return;

    setRounds(rounds.map(round => {
      if (round.id !== activeRoundId) return round;

      return {
        ...round,
        answers: round.answers.map(a =>
          a.questionId === questionId
            ? { ...a, answer, lastModified: new Date() }
            : a
        )
      };
    }));

    // TO EXTEND: Debounce and auto-save
    // debouncedSave(activeRoundId, questionId, answer);
  };

  /**
   * Update notes for a specific question in the active round
   */
  const handleNotesChange = (questionId: string, notes: string) => {
    if (!activeRoundId) return;

    setRounds(rounds.map(round => {
      if (round.id !== activeRoundId) return round;

      return {
        ...round,
        answers: round.answers.map(a =>
          a.questionId === questionId
            ? { ...a, notes, lastModified: new Date() }
            : a
        )
      };
    }));

    // TO EXTEND: Debounce and auto-save
    // debouncedSave(activeRoundId, questionId, notes);
  };

  // ============================================================================
  // TASK MANAGEMENT HANDLERS
  // ============================================================================

  /**
   * Add a new task to a question
   * TO EXTEND: Add task assignment, due dates, priority
   */
  const handleTaskAdd = (questionId: string, taskText: string) => {
    if (!activeRoundId) return;

    const newTask: Task = {
      id: `task-${Date.now()}`,
      text: taskText,
      completed: false,
      createdAt: new Date()
      // TO EXTEND: assignedTo, dueDate, priority
    };

    setRounds(rounds.map(round => {
      if (round.id !== activeRoundId) return round;

      return {
        ...round,
        answers: round.answers.map(a =>
          a.questionId === questionId
            ? { 
                ...a, 
                tasks: [...a.tasks, newTask],
                lastModified: new Date()
              }
            : a
        )
      };
    }));

    // TO EXTEND: Save to database and send notifications
    // await saveTask(newTask);
    // if (newTask.assignedTo) await notifyAssignee(newTask);
  };

  /**
   * Toggle task completion status
   */
  const handleTaskToggle = (questionId: string, taskId: string) => {
    if (!activeRoundId) return;

    setRounds(rounds.map(round => {
      if (round.id !== activeRoundId) return round;

      return {
        ...round,
        answers: round.answers.map(a =>
          a.questionId === questionId
            ? {
                ...a,
                tasks: a.tasks.map(t =>
                  t.id === taskId
                    ? { ...t, completed: !t.completed }
                    : t
                ),
                lastModified: new Date()
              }
            : a
        )
      };
    }));

    // TO EXTEND: Save to database
    // await updateTask(taskId, { completed: !task.completed });
  };

  /**
   * Delete a task
   * TO EXTEND: Add confirmation dialog for deletion
   */
  const handleTaskDelete = (questionId: string, taskId: string) => {
    if (!activeRoundId) return;

    setRounds(rounds.map(round => {
      if (round.id !== activeRoundId) return round;

      return {
        ...round,
        answers: round.answers.map(a =>
          a.questionId === questionId
            ? {
                ...a,
                tasks: a.tasks.filter(t => t.id !== taskId),
                lastModified: new Date()
              }
            : a
        )
      };
    }));

    // TO EXTEND: Save to database
    // await deleteTask(taskId);
  };

  // ============================================================================
  // RENDER
  // ============================================================================

  return (
    <div className="min-h-screen bg-background">
      {/* Page Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Games Readiness</h1>
              <p className="text-muted-foreground mt-1">
                British Paralympics Association - Assessment Tool
              </p>
            </div>
            {/* Future: Add user profile, settings, help buttons here */}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {/* Readiness Score Section */}
        <div className="mb-6">
          {activeRound && (
            <ReadinessScore
              score={activeRound.readinessScore}
              isEditable={!activeRound.isComplete}
              onScoreChange={handleScoreChange}
            />
          )}
        </div>

        {/* Round Tabs */}
        <div className="mb-6 -mx-4">
          <RoundTabs
            rounds={rounds}
            activeRoundId={activeRoundId}
            onRoundSelect={handleRoundSelect}
            onAddRound={handleAddRound}
          />
        </div>

        {/* Round Content */}
        {activeRound ? (
          <RoundContent
            round={activeRound}
            questions={INITIAL_QUESTIONS}
            onAnswerChange={handleAnswerChange}
            onNotesChange={handleNotesChange}
            onTaskAdd={handleTaskAdd}
            onTaskToggle={handleTaskToggle}
            onTaskDelete={handleTaskDelete}
            onCompleteRound={handleCompleteRound}
          />
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            No round selected. Create a round to get started.
          </div>
        )}
      </main>
    </div>
  );
}
