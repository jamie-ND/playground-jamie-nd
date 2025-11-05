# Games Readiness - Visual Structure & Component Hierarchy

## 🖼️ Page Layout

```
┌─────────────────────────────────────────────────────────────────┐
│                         PAGE HEADER                              │
│  Games Readiness                                                 │
│  British Paralympics Association - Assessment Tool               │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                    READINESS SCORE CARD                          │
│  Current Readiness Score                    [Edit Score Button]  │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  8 / 10                            [Excellent Badge]     │   │
│  │  ████████████████████░░░░  80% Ready                     │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                         ROUND TABS                               │
│  [Round 1  8/10] [Round 2  5/10] [Round 3  7/10]  [+ Add Round] │
│  ═══════════                                                     │
│  Created: 01/11/2025  •  3 of 4 questions answered              │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                      ROUND CONTENT AREA                          │
│                                                                   │
│  Round 1                            [Mark Round as Complete]     │
│  3 of 4 questions answered  •  5 of 8 tasks completed           │
│                                                                   │
│  ┌─ Readiness Questions ──────────────────────────────────────┐ │
│  │                                                             │ │
│  │  ┌─ Question 1 ────────────────────────────┐  [2/3 tasks] │ │
│  │  │ How prepared is the team for venue...   │              │ │
│  │  │                                          │              │ │
│  │  │ Answer:                                  │              │ │
│  │  │ ┌─────────────────────────────────────┐ │              │ │
│  │  │ │ We have completed venue walkthroughs│ │              │ │
│  │  │ │ and identified 3 key accessibility  │ │              │ │
│  │  │ │ points that need attention...       │ │              │ │
│  │  │ └─────────────────────────────────────┘ │              │ │
│  │  │                                          │              │ │
│  │  │ Notes:                                   │              │ │
│  │  │ ┌─────────────────────────────────────┐ │              │ │
│  │  │ │ Meeting scheduled with venue team   │ │              │ │
│  │  │ └─────────────────────────────────────┘ │              │ │
│  │  │                                          │              │ │
│  │  │ Tasks to Improve Readiness: [+ Add Task]│              │ │
│  │  │ ┌─────────────────────────────────────┐ │              │ │
│  │  │ │ ☑ Complete accessibility audit       │ [x]          │ │
│  │  │ │ ☑ Order wheelchair ramps             │ [x]          │ │
│  │  │ │ ☐ Schedule training session          │ [x]          │ │
│  │  │ └─────────────────────────────────────┘ │              │ │
│  │  │                                          │              │ │
│  │  │ Last modified: 11/05/2025, 2:30 PM      │              │ │
│  │  └──────────────────────────────────────────┘              │ │
│  │                                                             │ │
│  │  ┌─ Question 2 ────────────────────────────┐  [1/2 tasks] │ │
│  │  │ What is the current status of athlete...│              │ │
│  │  │ ...                                      │              │ │
│  │  └──────────────────────────────────────────┘              │ │
│  │                                                             │ │
│  │  ┌─ Question 3 ────────────────────────────┐  [1/1 tasks] │ │
│  │  │ ...                                      │              │ │
│  │  └──────────────────────────────────────────┘              │ │
│  │                                                             │ │
│  │  ┌─ Question 4 ────────────────────────────┐  [1/2 tasks] │ │
│  │  │ ...                                      │              │ │
│  │  └──────────────────────────────────────────┘              │ │
│  │                                                             │ │
│  └─────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

## 🏗️ Component Hierarchy

```
GamesReadinessPage (page.tsx)
│
├── Header (native HTML)
│   ├── Title: "Games Readiness"
│   └── Subtitle: "British Paralympics Association"
│
├── ReadinessScore
│   ├── Card
│   │   ├── CardHeader
│   │   │   ├── CardTitle: "Current Readiness Score"
│   │   │   └── Button: "Edit Score" (when editable)
│   │   └── CardContent
│   │       ├── Score Display (large number)
│   │       ├── Badge (status indicator)
│   │       ├── Progress Bar
│   │       └── Score Editor (when editing)
│   │           ├── Number Selector (1-10 grid)
│   │           └── Action Buttons (Save/Cancel)
│
├── RoundTabs
│   ├── Tab Navigation Container
│   │   ├── Round Tab Button (for each round)
│   │   │   ├── Round Name
│   │   │   ├── Completion Badge (if complete)
│   │   │   └── Score Indicator
│   │   └── Add Round Button
│   └── Round Info Bar
│       └── Metadata (dates, progress)
│
└── RoundContent
    ├── Round Header
    │   ├── Round Title
    │   ├── Statistics
    │   └── Complete Button / Completed Badge
    │
    ├── Alert Banner (when applicable)
    │   ├── Warning (incomplete questions)
    │   └── Success (completed round)
    │
    └── Questions List
        └── QuestionItem (for each question)
            ├── Card
            │   ├── CardHeader
            │   │   ├── CardTitle (question text)
            │   │   └── Badge (task count)
            │   └── CardContent
            │       ├── Answer Section
            │       │   ├── Label
            │       │   └── Textarea
            │       ├── Notes Section
            │       │   ├── Label
            │       │   └── Textarea
            │       ├── Tasks Section
            │       │   ├── Header with Add Button
            │       │   ├── Task List
            │       │   │   └── Task Item (for each task)
            │       │   │       ├── Checkbox
            │       │   │       ├── Task Text
            │       │   │       └── Delete Button
            │       │   └── Add Task Input (when adding)
            │       │       ├── Input Field
            │       │       └── Add/Cancel Buttons
            │       └── Timestamp Footer
```

## 🎨 Component Props Flow

```
┌─────────────────────────────────────────────────────────────┐
│                      GamesReadinessPage                      │
│                     (State Management)                       │
│                                                              │
│  State:                                                      │
│  • rounds: Round[]                                           │
│  • activeRoundId: string | null                              │
│  • questions: Question[]                                     │
│                                                              │
│  Handlers:                                                   │
│  • handleAddRound()                                          │
│  • handleRoundSelect(id)                                     │
│  • handleScoreChange(score)                                  │
│  • handleAnswerChange(qId, answer)                           │
│  • handleNotesChange(qId, notes)                             │
│  • handleTaskAdd(qId, text)                                  │
│  • handleTaskToggle(qId, taskId)                             │
│  • handleTaskDelete(qId, taskId)                             │
│  • handleCompleteRound()                                     │
└─────────────────────────────────────────────────────────────┘
        │                    │                     │
        ▼                    ▼                     ▼
┌──────────────┐   ┌──────────────────┐   ┌──────────────────┐
│ReadinessScore│   │   RoundTabs      │   │  RoundContent    │
├──────────────┤   ├──────────────────┤   ├──────────────────┤
│Props:        │   │Props:            │   │Props:            │
│• score       │   │• rounds[]        │   │• round           │
│• isEditable  │   │• activeRoundId   │   │• questions[]     │
│• onScoreChg()│   │• onRoundSelect() │   │• onAnswerChange()│
│• onSave()    │   │• onAddRound()    │   │• onNotesChange() │
└──────────────┘   └──────────────────┘   │• onTaskAdd()     │
                                           │• onTaskToggle()  │
                                           │• onTaskDelete()  │
                                           │• onCompleteRound│
                                           └──────────────────┘
                                                   │
                                                   ▼
                                           ┌──────────────────┐
                                           │  QuestionItem    │
                                           ├──────────────────┤
                                           │Props:            │
                                           │• question        │
                                           │• answer          │
                                           │• isEditable      │
                                           │• onAnswerChange()│
                                           │• onNotesChange() │
                                           │• onTaskAdd()     │
                                           │• onTaskToggle()  │
                                           │• onTaskDelete()  │
                                           └──────────────────┘
```

## 🔄 Data Flow Example: Adding a Task

```
User clicks "Add Task" in QuestionItem
        ↓
User types task text and clicks "Add"
        ↓
QuestionItem.onTaskAdd(questionId, taskText) is called
        ↓
Bubbles up to RoundContent.onTaskAdd
        ↓
Bubbles up to GamesReadinessPage.handleTaskAdd
        ↓
Updates state: creates new Task object with ID
        ↓
State update triggers re-render
        ↓
New props flow down: rounds → activeRound → answers → tasks
        ↓
QuestionItem receives updated task list
        ↓
New task appears in UI
```

## 📱 Responsive Considerations

### Desktop (>1024px)
- Full-width cards with comfortable spacing
- Horizontal tab layout with scrolling
- Side-by-side layout potential for future features

### Tablet (768px - 1024px)
- Slightly compressed cards
- Horizontal tabs still visible
- Comfortable touch targets

### Mobile (<768px)
- Full-width stacked layout
- Horizontal scrollable tabs
- Larger touch targets
- Optimized text sizes

## 🎯 Key Interaction Patterns

### Edit → Save Pattern
1. **ReadinessScore**: Edit button → Number picker → Save/Cancel
2. **QuestionItem**: Direct textarea editing (auto-saves on blur)
3. **Tasks**: Inline add form → Add/Cancel buttons

### Add → Create Pattern
1. **Rounds**: Plus button → Instant creation with defaults
2. **Tasks**: Add button → Input field → Confirm/Cancel

### Toggle Pattern
1. **Tabs**: Click to switch (immediate update)
2. **Task Checkbox**: Click to toggle (immediate update)
3. **Round Complete**: Button → State change → Lock UI

### Delete Pattern
1. **Tasks**: X button → Immediate deletion
   - Future: Could add confirmation dialog

## 🎨 Color Semantics

### Readiness Scores
- **Red (1-4)**: Urgent attention needed
- **Yellow (5-7)**: Progressing but needs work
- **Green (8-10)**: Ready for games

### UI Elements
- **Primary**: Actions, active states, links
- **Secondary**: Alternative actions, info badges
- **Destructive**: Danger actions, errors
- **Muted**: Disabled states, secondary text

### State Indicators
- **Complete Badge**: Green/secondary
- **Task Counts**: Neutral badge
- **Warnings**: Yellow background
- **Success**: Green background

## 🔧 Extension Hot Spots

### 1. Add New Question Types
**Location**: `page.tsx` → `INITIAL_QUESTIONS`
```typescript
{
  id: 'q5',
  text: 'Your new question here',
  order: 5,
  category: 'New Category'  // Enable this
}
```

### 2. Add User Authentication
**Location**: `app/layout.tsx` or `page.tsx`
```typescript
// Wrap with auth provider
<SupabaseProvider>
  {children}
</SupabaseProvider>
```

### 3. Add Database Persistence
**Location**: `page.tsx` → Each handler function
```typescript
const handleScoreChange = async (newScore: number) => {
  // Update local state
  setRounds(...);
  
  // Add this: Save to database
  await updateRoundInDatabase(activeRoundId, { score: newScore });
};
```

### 4. Add Task Assignment
**Location**: `QuestionItem.tsx` → Task list item
```typescript
<select onChange={(e) => onTaskAssign(task.id, e.target.value)}>
  {users.map(u => <option value={u.id}>{u.name}</option>)}
</select>
```

### 5. Add Analytics
**Location**: `page.tsx` → Handler functions
```typescript
const handleCompleteRound = () => {
  // Existing logic
  setRounds(...);
  
  // Add this: Track event
  analytics.track('round_completed', {
    roundId: activeRoundId,
    score: activeRound.readinessScore,
    timestamp: new Date()
  });
};
```

## 📚 Quick Reference

### Import Paths
```typescript
// Components
import { ReadinessScore } from '@/components/games-readiness';

// Types
import { Round, Question } from '@/types/games-readiness';

// UI Components
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
```

### Type Imports
```typescript
import type { Round, Question, Task, QuestionAnswer } from '@/types/games-readiness';
```

### Common Patterns
```typescript
// Find active round
const activeRound = rounds.find(r => r.id === activeRoundId);

// Update specific round
setRounds(rounds.map(round =>
  round.id === targetId
    ? { ...round, updatedField: newValue }
    : round
));

// Update nested answer
setRounds(rounds.map(round =>
  round.id === activeRoundId
    ? {
        ...round,
        answers: round.answers.map(a =>
          a.questionId === questionId
            ? { ...a, answer: newAnswer }
            : a
        )
      }
    : round
));
```

---

This structure document provides a visual understanding of how the components fit together and interact. Use it as a reference when extending or modifying the application.
