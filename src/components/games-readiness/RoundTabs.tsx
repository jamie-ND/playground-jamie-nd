/**
 * RoundTabs Component
 * 
 * Displays horizontal tabs for each assessment round with the ability to
 * select rounds and add new ones.
 * 
 * EXTENSION POINTS:
 * - Add round deletion with confirmation
 * - Add round duplication feature
 * - Add drag-and-drop reordering
 * - Add round status indicators (completed, in-progress, not-started)
 * - Add round dates in tabs
 * - Add filtering/searching for rounds
 */

"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Round } from '@/types/games-readiness';

interface RoundTabsProps {
  rounds: Round[];
  activeRoundId: string | null;
  onRoundSelect: (roundId: string) => void;
  onAddRound: () => void;
}

export function RoundTabs({
  rounds,
  activeRoundId,
  onRoundSelect,
  onAddRound
}: RoundTabsProps) {
  return (
    <div className="border-b bg-background">
      <div className="flex items-center gap-1 px-4 overflow-x-auto">
        {/* Round Tabs */}
        {rounds.map((round) => {
          const isActive = round.id === activeRoundId;
          
          return (
            <button
              key={round.id}
              onClick={() => onRoundSelect(round.id)}
              className={cn(
                "relative px-6 py-3 text-sm font-medium transition-colors whitespace-nowrap",
                "border-b-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary",
                isActive
                  ? "border-primary text-primary bg-primary/5"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted"
              )}
            >
              <div className="flex items-center gap-2">
                <span>{round.name}</span>
                
                {/* Status Badge */}
                {round.isComplete && (
                  <Badge variant="secondary" className="text-xs">
                    Complete
                  </Badge>
                )}
                
                {/* Score Indicator - Future: could be a mini progress circle */}
                <span className={cn(
                  "text-xs px-2 py-0.5 rounded-full",
                  round.readinessScore >= 8 
                    ? "bg-green-100 text-green-700"
                    : round.readinessScore >= 5
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
                )}>
                  {round.readinessScore}/10
                </span>
              </div>
            </button>
          );
        })}

        {/* Add Round Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onAddRound}
          className="ml-2 gap-1 shrink-0"
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
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="16" />
            <line x1="8" y1="12" x2="16" y2="12" />
          </svg>
          Add Round
        </Button>
      </div>

      {/* Round Info Bar (optional - shows additional context about active round) */}
      {activeRoundId && (
        <div className="px-4 py-2 bg-muted/30 border-t text-xs text-muted-foreground">
          {(() => {
            const activeRound = rounds.find(r => r.id === activeRoundId);
            if (!activeRound) return null;
            
            return (
              <div className="flex items-center gap-4">
                <span>
                  Created: {activeRound.createdAt.toLocaleDateString()}
                </span>
                {activeRound.completedAt && (
                  <span>
                    Completed: {activeRound.completedAt.toLocaleDateString()}
                  </span>
                )}
                <span className="ml-auto">
                  {activeRound.answers.filter(a => a.answer.trim() !== '').length} of {activeRound.answers.length} questions answered
                </span>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
}
