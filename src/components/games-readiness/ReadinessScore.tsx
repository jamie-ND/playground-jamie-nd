/**
 * ReadinessScore Component
 * 
 * Displays and allows editing of the current round's readiness score (1-10)
 * with a visual progress bar representation.
 * 
 * EXTENSION POINTS:
 * - Add historical score comparison
 * - Add tooltips explaining what each score level means
 * - Add automatic score calculation based on completed tasks
 * - Add color coding (red for low, yellow for medium, green for high)
 */

"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface ReadinessScoreProps {
  score: number;
  isEditable: boolean;
  onScoreChange: (newScore: number) => void;
  onSave?: () => void;
}

export function ReadinessScore({ 
  score, 
  isEditable, 
  onScoreChange,
  onSave 
}: ReadinessScoreProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempScore, setTempScore] = useState(score);

  // Calculate percentage for progress bar
  const percentage = (score / 10) * 100;

  // Determine color based on score (can be extended with more granular levels)
  const getScoreColor = (scoreValue: number): string => {
    if (scoreValue >= 8) return 'bg-green-500';
    if (scoreValue >= 5) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getScoreTextColor = (scoreValue: number): string => {
    if (scoreValue >= 8) return 'text-green-600';
    if (scoreValue >= 5) return 'text-yellow-600';
    return 'text-red-600';
  };

  const handleSave = () => {
    onScoreChange(tempScore);
    setIsEditing(false);
    onSave?.();
  };

  const handleCancel = () => {
    setTempScore(score);
    setIsEditing(false);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Current Readiness Score</CardTitle>
          {isEditable && !isEditing && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setIsEditing(true)}
            >
              Edit Score
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Score Display */}
        <div className="flex items-center gap-4">
          <div className={cn(
            "text-5xl font-bold",
            getScoreTextColor(isEditing ? tempScore : score)
          )}>
            {isEditing ? tempScore : score}
          </div>
          <div className="text-2xl text-muted-foreground">/ 10</div>
          <Badge 
            variant={score >= 8 ? "default" : score >= 5 ? "secondary" : "destructive"}
            className="ml-auto"
          >
            {score >= 8 ? "Excellent" : score >= 5 ? "Adequate" : "Needs Improvement"}
          </Badge>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
            <div 
              className={cn(
                "h-full transition-all duration-500 ease-out rounded-full",
                getScoreColor(isEditing ? tempScore : score)
              )}
              style={{ width: `${isEditing ? (tempScore / 10) * 100 : percentage}%` }}
            />
          </div>
          <div className="text-xs text-muted-foreground text-right">
            {Math.round(isEditing ? (tempScore / 10) * 100 : percentage)}% Ready
          </div>
        </div>

        {/* Score Editor (shown when editing) */}
        {isEditing && (
          <div className="space-y-4 pt-4 border-t">
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Score (1-10)</label>
              <div className="grid grid-cols-10 gap-2">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <button
                    key={num}
                    onClick={() => setTempScore(num)}
                    className={cn(
                      "h-12 rounded-md font-semibold transition-all",
                      "hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2",
                      tempScore === num
                        ? "bg-primary text-primary-foreground ring-2 ring-primary"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    )}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 justify-end">
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button 
                size="sm"
                onClick={handleSave}
              >
                Save Score
              </Button>
            </div>
          </div>
        )}

        {/* Helper text */}
        {!isEditing && (
          <p className="text-xs text-muted-foreground">
            {isEditable 
              ? "The readiness score reflects the overall preparedness for this round. Click 'Edit Score' to update."
              : "This round is marked complete. The score can no longer be edited."}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
