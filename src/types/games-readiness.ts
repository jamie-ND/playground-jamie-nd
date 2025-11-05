/**
 * Types for Games Readiness feature
 * 
 * These types define the data structure for tracking readiness assessments
 * across multiple rounds for the British Paralympics Association.
 */

/**
 * Represents a single task that needs to be completed to improve readiness
 * 
 * EXTENSION POINTS:
 * - Add assignedTo field for user assignment
 * - Add dueDate for deadline tracking
 * - Add priority field (high/medium/low)
 * - Add status field (not_started/in_progress/completed)
 */
export interface Task {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
  // Future: assignedTo?: string;
  // Future: dueDate?: Date;
  // Future: priority?: 'high' | 'medium' | 'low';
}

/**
 * Represents an answer to a readiness question with associated notes and tasks
 * 
 * EXTENSION POINTS:
 * - Add lastModifiedBy for change tracking
 * - Add attachments array for file uploads
 * - Add comments for team discussion
 */
export interface QuestionAnswer {
  questionId: string;
  answer: string;
  notes: string;
  tasks: Task[];
  lastModified: Date;
  // Future: lastModifiedBy?: string;
  // Future: attachments?: Array<{ id: string; url: string; name: string }>;
  // Future: comments?: Array<{ id: string; text: string; author: string; date: Date }>;
}

/**
 * Represents a readiness question
 */
export interface Question {
  id: string;
  text: string;
  category?: string; // Future: for grouping questions
  order: number;
}

/**
 * Represents a single assessment round
 * 
 * EXTENSION POINTS:
 * - Add createdBy for tracking who created the round
 * - Add approvedBy for approval workflow
 * - Add deadline for round completion
 * - Add metadata for additional context
 */
export interface Round {
  id: string;
  name: string;
  readinessScore: number; // 1-10
  isComplete: boolean;
  answers: QuestionAnswer[];
  createdAt: Date;
  completedAt?: Date;
  // Future: createdBy?: string;
  // Future: approvedBy?: string;
  // Future: deadline?: Date;
  // Future: metadata?: Record<string, unknown>;
}

/**
 * The complete Games Readiness state
 */
export interface GamesReadinessState {
  rounds: Round[];
  activeRoundId: string | null;
  questions: Question[];
}
