"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Heart, Lock, Unlock, Flame, Eye, EyeOff } from "lucide-react"

interface SpicyNote {
  id: number
  message: string
  emoji: string
  intensity: "warm" | "hot" | "fire"
  image?: string // Added optional image property for special notes
}

const spicyNotes: SpicyNote[] = [
  {
    id: 1,
    message: "Remember Aug 4? The night that started it all",
    emoji: "💋🔥",
    intensity: "fire",
  },
  {
    id: 2,
    message: "Aug 11… our rough, wild session",
    emoji: "😏❤️‍🔥",
    intensity: "fire",
  },
  {
    id: 3,
    message: "Your body, your touch… unforgettable",
    emoji: "😘🔥",
    intensity: "hot",
  },
  {
    id: 4,
    message: "I miss the way you whisper my name in the dark",
    emoji: "😈💫",
    intensity: "hot",
  },
  {
    id: 5,
    message: "Can't wait to make new spicy memories soon",
    emoji: "🔥💋",
    intensity: "fire",
  },
  {
    id: 6,
    message: "The way you look at me before we lose control",
    emoji: "👀🔥",
    intensity: "hot",
  },
  {
    id: 7,
    message: "Your hands exploring every inch of my soul",
    emoji: "🌹💫",
    intensity: "warm",
  },
  {
    id: 8,
    message: "Those moments when time stops and it's just us",
    emoji: "⏰❤️‍🔥",
    intensity: "hot",
  },
  {
    id: 9,
    message: "The taste of your lips, forever on mine",
    emoji: "💋✨",
    intensity: "warm",
  },
  {
    id: 10,
    message: "Our bodies speaking a language only we understand",
    emoji: "🔥💫",
    intensity: "fire",
  },
  {
    id: 11, // Added the lipstick kiss note with image
    message: "I Respectfully Request the Presence of You In my Panties",
    emoji: "💋📝",
    intensity: "fire",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-08-22%20at%2011.45.39_aee790b8.jpg-lnD60q0dYkLMM7z3qi35JQqSfYtQ3N.jpeg",
  },
]

const correctPasswords = ["2407", "july24", "ourfirstdate", "gymcrush"]

export function SecretSection() {
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [attempts, setAttempts] = useState(0)
  const [selectedNote, setSelectedNote] = useState<SpicyNote | null>(null)
  const [showNote, setShowNote] = useState(false)
  const [revealedNotes, setRevealedNotes] = useState<number[]>([])

  useEffect(() => {
    // Check if already unlocked in this session
    const unlocked = sessionStorage.getItem("secret-unlocked")
    if (unlocked === "true") {
      setIsUnlocked(true)
    }
  }, [])

  const handlePasswordSubmit = () => {
    if (correctPasswords.includes(password.toLowerCase())) {
      setIsUnlocked(true)
      sessionStorage.setItem("secret-unlocked", "true")
      setPassword("")
      setAttempts(0)
    } else {
      setAttempts((prev) => prev + 1)
      setPassword("")
    }
  }

  const revealNote = (note: SpicyNote) => {
    setSelectedNote(note)
    setShowNote(true)
    if (!revealedNotes.includes(note.id)) {
      setRevealedNotes((prev) => [...prev, note.id])
    }
  }

  const closeNote = () => {
    setShowNote(false)
    setSelectedNote(null)
  }

  const getIntensityColor = (intensity: string) => {
    switch (intensity) {
      case "warm":
        return "bg-orange-100 border-orange-300 text-orange-800"
      case "hot":
        return "bg-red-100 border-red-300 text-red-800"
      case "fire":
        return "bg-rose-100 border-rose-300 text-rose-800"
      default:
        return "bg-pink-100 border-pink-300 text-pink-800"
    }
  }

  if (!isUnlocked) {
    return (
      <div className="space-y-8">
        <div className="text-center mb-8">
          <h2
            className="text-3xl font-bold text-destructive mb-4 romantic-text-shadow"
            style={{ fontFamily: "var(--font-romantic-heading)" }}
          >
            Secret Garden
          </h2>
          <p className="text-muted-foreground text-lg" style={{ fontFamily: "var(--font-romantic-body)" }}>
            For your eyes only...
          </p>
        </div>

        <Card className="p-8 max-w-md mx-auto bg-gradient-to-br from-red-50 to-rose-50 border-red-200">
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <div className="relative">
                <Lock className="text-destructive glow-animation" size={64} />
                <Flame className="absolute -top-2 -right-2 text-orange-500 float-animation" size={24} />
              </div>
            </div>

            <h3 className="text-2xl font-bold text-destructive" style={{ fontFamily: "var(--font-romantic-heading)" }}>
              Protected Content
            </h3>

            <p className="text-muted-foreground text-sm" style={{ fontFamily: "var(--font-romantic-body)" }}>
              Enter the code to unlock our most intimate memories
            </p>

            <div className="space-y-4">
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter secret code..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handlePasswordSubmit()}
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                </Button>
              </div>

              <Button
                onClick={handlePasswordSubmit}
                className="w-full bg-destructive hover:bg-destructive/90 glow-animation"
                disabled={!password}
              >
                <Unlock className="mr-2" size={16} />
                Unlock Secret
              </Button>

              {attempts > 0 && (
                <p className="text-destructive text-sm">
                  {attempts === 1 && "Hint: Think about our first date..."}
                  {attempts === 2 && "Hint: The date we first met at the mall..."}
                  {attempts >= 3 && "Hint: Try '2407', 'july24', 'ourfirstdate', or 'gymcrush'"}
                </p>
              )}
            </div>

            <div className="text-xs text-muted-foreground space-y-1">
              <p>💡 Hints:</p>
              <p>• Our first date</p>
              <p>• Where we started</p>
              <p>• Special numbers</p>
            </div>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2
          className="text-3xl font-bold text-destructive mb-4 romantic-text-shadow"
          style={{ fontFamily: "var(--font-romantic-heading)" }}
        >
          Our Secret Garden
        </h2>
        <p className="text-muted-foreground text-lg" style={{ fontFamily: "var(--font-romantic-body)" }}>
          Intimate moments, passionate memories, just for us
        </p>
        <Badge variant="destructive" className="mt-2">
          <Flame className="mr-1" size={12} />
          Unlocked
        </Badge>
      </div>

      {/* Spicy Notes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {spicyNotes.map((note) => (
          <Card
            key={note.id}
            className={`p-6 cursor-pointer hover:bg-card/90 transition-all duration-300 bg-gradient-to-br from-red-50 to-rose-50 border-red-200 hover:border-red-300 glow-animation ${
              revealedNotes.includes(note.id) ? "ring-2 ring-destructive/30" : ""
            }`}
            onClick={() => revealNote(note)}
          >
            <div className="text-center space-y-4">
              <div className="text-4xl">{note.emoji}</div>

              <Badge className={getIntensityColor(note.intensity)}>
                {note.intensity === "warm" && "🌹 Warm"}
                {note.intensity === "hot" && "🔥 Hot"}
                {note.intensity === "fire" && "💥 Fire"}
              </Badge>

              <p
                className="text-sm text-muted-foreground line-clamp-2 leading-relaxed"
                style={{ fontFamily: "var(--font-romantic-body)" }}
              >
                {note.message}
              </p>

              {revealedNotes.includes(note.id) && (
                <Heart className="text-destructive heartbeat-animation mx-auto" size={16} />
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Note Modal */}
      {showNote && selectedNote && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <Card className="max-w-lg w-full p-8 bg-gradient-to-br from-red-50 to-rose-50 border-2 border-red-300">
            <div className="text-center space-y-6">
              <div className="flex justify-center items-center gap-3">
                <Badge className={getIntensityColor(selectedNote.intensity)}>
                  {selectedNote.intensity === "warm" && "🌹 Warm Memory"}
                  {selectedNote.intensity === "hot" && "🔥 Hot Memory"}
                  {selectedNote.intensity === "fire" && "💥 Fire Memory"}
                </Badge>
              </div>

              {selectedNote.image ? (
                <div className="space-y-4">
                  <img
                    src={selectedNote.image || "/placeholder.svg"}
                    alt="Special note"
                    className="w-full max-w-sm mx-auto rounded-lg shadow-lg"
                  />
                  <div className="text-4xl">{selectedNote.emoji}</div>
                </div>
              ) : (
                <div className="text-6xl">{selectedNote.emoji}</div>
              )}

              <h3
                className="text-2xl font-bold text-destructive"
                style={{ fontFamily: "var(--font-romantic-heading)" }}
              >
                {selectedNote.image ? "Special Message" : "Intimate Memory"}
              </h3>

              <p
                className="text-lg text-foreground leading-relaxed"
                style={{ fontFamily: "var(--font-romantic-body)" }}
              >
                {selectedNote.message}
              </p>

              <div className="flex justify-center gap-2">
                <Flame className="text-destructive float-animation" size={16} />
                <Heart className="text-secondary float-animation" size={16} style={{ animationDelay: "0.5s" }} />
                <Flame className="text-destructive float-animation" size={16} style={{ animationDelay: "1s" }} />
              </div>

              <Button onClick={closeNote} className="mt-6 bg-destructive hover:bg-destructive/90">
                Keep This Secret
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Warning Message */}
      <Card className="p-6 max-w-2xl mx-auto bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
        <div className="text-center space-y-4">
          <Flame className="text-orange-500 mx-auto float-animation" size={32} />
          <h4 className="text-lg font-bold text-foreground" style={{ fontFamily: "var(--font-romantic-heading)" }}>
            Our Private Sanctuary
          </h4>
          <p
            className="text-sm text-muted-foreground leading-relaxed"
            style={{ fontFamily: "var(--font-romantic-body)" }}
          >
            These intimate memories are sacred to us. They represent the deepest connection we share, the passion that
            burns between us, and the love that grows stronger with every touch.
          </p>
        </div>
      </Card>
    </div>
  )
}
