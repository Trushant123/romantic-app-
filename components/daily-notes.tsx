"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, Gift, Sparkles, Unlock } from "lucide-react"

interface DailyNote {
  id: number
  message: string
  emoji: string
  isSpecial?: boolean
}

const dailyNotes: DailyNote[] = [
  {
    id: 1,
    message: "From gym crush to gym partner to soulmate",
    emoji: "❤️",
    isSpecial: true,
  },
  {
    id: 2,
    message: "The rose garden kiss still gives me butterflies",
    emoji: "🌹",
    isSpecial: true,
  },
  {
    id: 3,
    message: "No matter how far, you're always with me",
    emoji: "💫",
  },
  {
    id: 4,
    message: "Our memories are my favorite playlist",
    emoji: "🎶",
  },
  {
    id: 5,
    message: "The way you make me feel… forever addicted",
    emoji: "❤️‍🔥",
    isSpecial: true,
  },
  {
    id: 6,
    message: "Your smile is my daily dose of sunshine",
    emoji: "☀️",
  },
  {
    id: 7,
    message: "Every workout reminds me of how we started",
    emoji: "💪",
  },
  {
    id: 8,
    message: "Distance means nothing when you mean everything",
    emoji: "🌍",
  },
  {
    id: 9,
    message: "You're the reason I believe in forever",
    emoji: "♾️",
  },
  {
    id: 10,
    message: "My heart skips a beat every time you text me",
    emoji: "📱",
  },
  {
    id: 11,
    message: "You turned my world upside down in the best way",
    emoji: "🌟",
  },
  {
    id: 12,
    message: "Every day with you feels like a beautiful dream",
    emoji: "💭",
  },
  {
    id: 13,
    message: "You're my favorite notification",
    emoji: "🔔",
  },
  {
    id: 14,
    message: "Your love is my safe haven",
    emoji: "🏠",
  },
  {
    id: 15,
    message: "You make ordinary moments extraordinary",
    emoji: "✨",
  },
]

export function DailyNotes() {
  const [currentDay, setCurrentDay] = useState(1)
  const [unlockedNotes, setUnlockedNotes] = useState<number[]>([])
  const [showNote, setShowNote] = useState(false)
  const [selectedNote, setSelectedNote] = useState<DailyNote | null>(null)

  useEffect(() => {
    // Load unlocked notes from localStorage
    const saved = localStorage.getItem("romantic-unlocked-notes")
    if (saved) {
      setUnlockedNotes(JSON.parse(saved))
    }

    // Calculate current day based on start date (you can adjust this)
    const startDate = new Date("2024-01-01") // Adjust to your preferred start date
    const today = new Date()
    const diffTime = Math.abs(today.getTime() - startDate.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    setCurrentDay(Math.min(diffDays, dailyNotes.length))
  }, [])

  const unlockTodaysNote = () => {
    if (!unlockedNotes.includes(currentDay)) {
      const newUnlocked = [...unlockedNotes, currentDay]
      setUnlockedNotes(newUnlocked)
      localStorage.setItem("romantic-unlocked-notes", JSON.stringify(newUnlocked))
    }

    const note = dailyNotes[currentDay - 1]
    setSelectedNote(note)
    setShowNote(true)
  }

  const viewPreviousNote = (noteId: number) => {
    const note = dailyNotes[noteId - 1]
    setSelectedNote(note)
    setShowNote(true)
  }

  const closeNote = () => {
    setShowNote(false)
    setSelectedNote(null)
  }

  const todaysNote = dailyNotes[currentDay - 1]
  const isTodayUnlocked = unlockedNotes.includes(currentDay)

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2
          className="text-3xl font-bold text-primary mb-4 romantic-text-shadow"
          style={{ fontFamily: "var(--font-romantic-heading)" }}
        >
          Daily Love Notes
        </h2>
        <p className="text-muted-foreground text-lg" style={{ fontFamily: "var(--font-romantic-body)" }}>
          Sweet messages to brighten your day, one note at a time
        </p>
      </div>

      {/* Today's Note */}
      <Card className="p-8 max-w-2xl mx-auto bg-card/80 backdrop-blur-sm border-secondary/30">
        <div className="text-center space-y-6">
          <div className="flex justify-center items-center gap-3">
            <Badge variant="secondary" className="text-lg px-4 py-2">
              Day {currentDay}
            </Badge>
            <Heart className="text-secondary heartbeat-animation" size={24} />
          </div>

          {!isTodayUnlocked ? (
            <div className="space-y-6">
              <div className="flex justify-center">
                <div className="relative">
                  <Gift className="text-primary float-animation" size={64} />
                  <Sparkles className="absolute -top-2 -right-2 text-accent" size={24} />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-foreground" style={{ fontFamily: "var(--font-romantic-heading)" }}>
                Today's Love Note Awaits
              </h3>
              <p className="text-muted-foreground" style={{ fontFamily: "var(--font-romantic-body)" }}>
                Click to unlock your daily dose of love
              </p>
              <Button
                onClick={unlockTodaysNote}
                className="bg-primary hover:bg-primary/90 glow-animation text-lg px-8 py-3"
              >
                <Unlock className="mr-2" size={20} />
                Unlock Today's Note
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex justify-center">
                <Heart className="text-secondary glow-animation" size={64} />
              </div>
              <h3 className="text-2xl font-bold text-foreground" style={{ fontFamily: "var(--font-romantic-heading)" }}>
                Today's Note Unlocked!
              </h3>
              <Button
                onClick={() => viewPreviousNote(currentDay)}
                variant="outline"
                className="border-secondary text-secondary hover:bg-secondary/10"
              >
                Read Today's Message
              </Button>
            </div>
          )}
        </div>
      </Card>

      {/* Previous Notes Grid */}
      {unlockedNotes.length > 0 && (
        <div className="space-y-6">
          <h3
            className="text-2xl font-bold text-center text-foreground"
            style={{ fontFamily: "var(--font-romantic-heading)" }}
          >
            Your Collection of Love
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
            {unlockedNotes
              .sort((a, b) => b - a)
              .map((noteId) => {
                const note = dailyNotes[noteId - 1]
                return (
                  <Card
                    key={noteId}
                    className={`p-4 cursor-pointer hover:bg-card/90 transition-all duration-300 ${note.isSpecial ? "border-secondary/50 glow-animation" : ""}`}
                    onClick={() => viewPreviousNote(noteId)}
                  >
                    <div className="text-center space-y-3">
                      <Badge variant="outline" className="text-xs">
                        Day {noteId}
                      </Badge>
                      <div className="text-3xl">{note.emoji}</div>
                      <p
                        className="text-sm text-muted-foreground line-clamp-2"
                        style={{ fontFamily: "var(--font-romantic-body)" }}
                      >
                        {note.message}
                      </p>
                    </div>
                  </Card>
                )
              })}
          </div>
        </div>
      )}

      {/* Note Modal */}
      {showNote && selectedNote && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <Card className="max-w-lg w-full p-8 bg-card/95 backdrop-blur-sm border-secondary/30">
            <div className="text-center space-y-6">
              <div className="flex justify-center items-center gap-3">
                <Badge variant="secondary">Day {selectedNote.id}</Badge>
                {selectedNote.isSpecial && <Heart className="text-secondary heartbeat-animation" size={20} />}
              </div>

              <div className="text-6xl">{selectedNote.emoji}</div>

              <h3 className="text-2xl font-bold text-foreground" style={{ fontFamily: "var(--font-romantic-heading)" }}>
                Love Note
              </h3>

              <p
                className="text-lg text-foreground leading-relaxed"
                style={{ fontFamily: "var(--font-romantic-body)" }}
              >
                {selectedNote.message}
              </p>

              <div className="flex justify-center gap-2">
                <Heart className="text-secondary float-animation" size={16} />
                <Heart className="text-accent float-animation" size={16} style={{ animationDelay: "0.5s" }} />
                <Heart className="text-primary float-animation" size={16} style={{ animationDelay: "1s" }} />
              </div>

              <Button onClick={closeNote} variant="outline" className="mt-6 bg-transparent">
                Close
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
