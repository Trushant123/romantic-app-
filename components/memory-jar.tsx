"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, Sparkles, RotateCcw, X } from "lucide-react"

interface Memory {
  id: number
  text: string
  emoji: string
  category: "cute" | "sweet" | "spicy"
  color: string
}

const memories: Memory[] = [
  {
    id: 1,
    text: "A thousand soft kisses",
    emoji: "🌸",
    category: "sweet",
    color: "bg-pink-100 border-pink-300",
  },
  {
    id: 2,
    text: "Movie marathons & cuddle sessions",
    emoji: "🎬",
    category: "cute",
    color: "bg-purple-100 border-purple-300",
  },
  {
    id: 3,
    text: "That smile of yours is my biggest weakness",
    emoji: "😍",
    category: "sweet",
    color: "bg-amber-100 border-amber-300",
  },
  {
    id: 4,
    text: "Bite marks and blushes",
    emoji: "😈",
    category: "spicy",
    color: "bg-red-100 border-red-300",
  },
  {
    id: 5,
    text: "Your sleepy morning voice",
    emoji: "🌅",
    category: "cute",
    color: "bg-orange-100 border-orange-300",
  },
  {
    id: 6,
    text: "The way you steal my hoodies",
    emoji: "👕",
    category: "cute",
    color: "bg-blue-100 border-blue-300",
  },
  {
    id: 7,
    text: "Midnight conversations that last till dawn",
    emoji: "🌙",
    category: "sweet",
    color: "bg-indigo-100 border-indigo-300",
  },
  {
    id: 8,
    text: "Your hands exploring every inch of me",
    emoji: "🔥",
    category: "spicy",
    color: "bg-red-100 border-red-300",
  },
  {
    id: 9,
    text: "Dancing in the kitchen while cooking",
    emoji: "💃",
    category: "cute",
    color: "bg-green-100 border-green-300",
  },
  {
    id: 10,
    text: "The way you whisper my name",
    emoji: "💫",
    category: "spicy",
    color: "bg-purple-100 border-purple-300",
  },
  {
    id: 11,
    text: "Your laugh that lights up my world",
    emoji: "✨",
    category: "sweet",
    color: "bg-yellow-100 border-yellow-300",
  },
  {
    id: 12,
    text: "Lazy Sunday mornings in bed",
    emoji: "☀️",
    category: "sweet",
    color: "bg-orange-100 border-orange-300",
  },
  {
    id: 13,
    text: "The way you look at me like I'm your world",
    emoji: "🌍",
    category: "sweet",
    color: "bg-teal-100 border-teal-300",
  },
  {
    id: 14,
    text: "Your gentle touches that drive me wild",
    emoji: "🌹",
    category: "spicy",
    color: "bg-rose-100 border-rose-300",
  },
  {
    id: 15,
    text: "Sharing ice cream and stealing kisses",
    emoji: "🍦",
    category: "cute",
    color: "bg-pink-100 border-pink-300",
  },
  {
    id: 16,
    text: "The way you make me feel safe in your arms",
    emoji: "🤗",
    category: "sweet",
    color: "bg-blue-100 border-blue-300",
  },
  {
    id: 17,
    text: "Those intense moments when time stops",
    emoji: "⏰",
    category: "spicy",
    color: "bg-red-100 border-red-300",
  },
  {
    id: 18,
    text: "Your silly jokes that make me snort-laugh",
    emoji: "😂",
    category: "cute",
    color: "bg-lime-100 border-lime-300",
  },
]

export function MemoryJar() {
  const [currentMemory, setCurrentMemory] = useState<Memory | null>(null)
  const [showMemory, setShowMemory] = useState(false)
  const [jarShaking, setJarShaking] = useState(false)
  const [drawnMemories, setDrawnMemories] = useState<number[]>([])

  const drawRandomMemory = () => {
    setJarShaking(true)

    setTimeout(() => {
      // Get a random memory that hasn't been drawn recently
      const availableMemories = memories.filter((m) => !drawnMemories.includes(m.id))
      const memoriesToChooseFrom = availableMemories.length > 0 ? availableMemories : memories

      const randomIndex = Math.floor(Math.random() * memoriesToChooseFrom.length)
      const selectedMemory = memoriesToChooseFrom[randomIndex]

      setCurrentMemory(selectedMemory)
      setShowMemory(true)
      setJarShaking(false)

      // Track drawn memories (reset after drawing 10)
      const newDrawnMemories = [...drawnMemories, selectedMemory.id]
      if (newDrawnMemories.length > 10) {
        setDrawnMemories([selectedMemory.id])
      } else {
        setDrawnMemories(newDrawnMemories)
      }
    }, 1000)
  }

  const closeMemory = () => {
    setShowMemory(false)
    setCurrentMemory(null)
  }

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2
          className="text-3xl font-bold text-primary mb-4 romantic-text-shadow"
          style={{ fontFamily: "var(--font-romantic-heading)" }}
        >
          Memory Jar
        </h2>
        <p className="text-muted-foreground text-lg" style={{ fontFamily: "var(--font-romantic-body)" }}>
          Click the jar to discover a random memory that will make you smile
        </p>
      </div>

      {/* Memory Jar */}
      <div className="flex justify-center">
        <Card className="p-8 max-w-md mx-auto bg-card/80 backdrop-blur-sm border-secondary/30">
          <div className="text-center space-y-6">
            <h3 className="text-2xl font-bold text-foreground" style={{ fontFamily: "var(--font-romantic-heading)" }}>
              Our Memory Jar
            </h3>

            {/* Jar Visual */}
            <div className="relative flex justify-center">
              <div
                className={`relative cursor-pointer transition-transform duration-300 hover:scale-105 ${jarShaking ? "animate-bounce" : ""}`}
                onClick={!jarShaking ? drawRandomMemory : undefined}
              >
                {/* Jar Body */}
                <div className="w-32 h-40 bg-gradient-to-b from-blue-100 to-blue-200 rounded-b-3xl border-4 border-blue-300 relative overflow-hidden">
                  {/* Jar Contents (floating hearts and stars) */}
                  <div className="absolute inset-2 flex flex-wrap justify-center items-center gap-1">
                    {[...Array(12)].map((_, i) => (
                      <div
                        key={i}
                        className={`text-xs ${i % 2 === 0 ? "text-secondary" : "text-accent"} float-animation`}
                        style={{ animationDelay: `${i * 0.2}s` }}
                      >
                        {i % 3 === 0 ? "💕" : i % 3 === 1 ? "✨" : "💫"}
                      </div>
                    ))}
                  </div>

                  {/* Jar Shine Effect */}
                  <div className="absolute top-2 left-2 w-4 h-8 bg-white/30 rounded-full"></div>
                </div>

                {/* Jar Lid */}
                <div className="w-36 h-6 bg-gradient-to-b from-amber-200 to-amber-300 rounded-t-lg border-4 border-amber-400 -mt-2 relative">
                  <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-8 h-2 bg-amber-400 rounded-full"></div>
                </div>

                {/* Sparkles around jar */}
                <Sparkles className="absolute -top-2 -right-2 text-accent float-animation" size={20} />
                <Sparkles
                  className="absolute -bottom-2 -left-2 text-secondary float-animation"
                  size={16}
                  style={{ animationDelay: "1s" }}
                />
                <Heart
                  className="absolute top-1/2 -right-4 text-primary float-animation"
                  size={14}
                  style={{ animationDelay: "0.5s" }}
                />
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-muted-foreground text-sm" style={{ fontFamily: "var(--font-romantic-body)" }}>
                {jarShaking ? "Shaking up some magic..." : "Click the jar to draw a memory"}
              </p>

              <Button
                onClick={drawRandomMemory}
                disabled={jarShaking}
                className="bg-primary hover:bg-primary/90 glow-animation"
              >
                {jarShaking ? (
                  <>
                    <RotateCcw className="mr-2 animate-spin" size={16} />
                    Drawing Memory...
                  </>
                ) : (
                  <>
                    <Heart className="mr-2" size={16} />
                    Draw a Memory
                  </>
                )}
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Memory Card Modal */}
      {showMemory && currentMemory && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <Card className={`max-w-lg w-full p-8 backdrop-blur-sm border-2 ${currentMemory.color}`}>
            <div className="text-center space-y-6">
              <div className="flex justify-between items-center">
                <Badge
                  variant="outline"
                  className={`${
                    currentMemory.category === "cute"
                      ? "border-blue-300 text-blue-600"
                      : currentMemory.category === "sweet"
                        ? "border-pink-300 text-pink-600"
                        : "border-red-300 text-red-600"
                  }`}
                >
                  {currentMemory.category === "cute"
                    ? "Cute Memory"
                    : currentMemory.category === "sweet"
                      ? "Sweet Memory"
                      : "Spicy Memory"}
                </Badge>
                <Button variant="ghost" size="sm" onClick={closeMemory} className="h-8 w-8 p-0">
                  <X size={16} />
                </Button>
              </div>

              <div className="text-6xl">{currentMemory.emoji}</div>

              <h3 className="text-2xl font-bold text-foreground" style={{ fontFamily: "var(--font-romantic-heading)" }}>
                Memory Card
              </h3>

              <p
                className="text-lg text-foreground leading-relaxed"
                style={{ fontFamily: "var(--font-romantic-body)" }}
              >
                {currentMemory.text}
              </p>

              <div className="flex justify-center gap-2">
                <Heart className="text-secondary float-animation" size={16} />
                <Heart className="text-accent float-animation" size={16} style={{ animationDelay: "0.5s" }} />
                <Heart className="text-primary float-animation" size={16} style={{ animationDelay: "1s" }} />
              </div>

              <div className="flex justify-center gap-4 pt-4">
                <Button
                  onClick={drawRandomMemory}
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary/10 bg-transparent"
                >
                  <RotateCcw className="mr-2" size={16} />
                  Draw Another
                </Button>
                <Button onClick={closeMemory} className="bg-secondary hover:bg-secondary/90">
                  Keep This Memory
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Instructions */}
      <Card className="p-6 max-w-2xl mx-auto bg-muted/50 backdrop-blur-sm">
        <div className="text-center space-y-4">
          <h4 className="text-lg font-semibold text-foreground" style={{ fontFamily: "var(--font-romantic-heading)" }}>
            How it works
          </h4>
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground"
            style={{ fontFamily: "var(--font-romantic-body)" }}
          >
            <div className="space-y-2">
              <div className="text-blue-500">💙 Cute Memories</div>
              <p>Sweet everyday moments that make you smile</p>
            </div>
            <div className="space-y-2">
              <div className="text-pink-500">💖 Sweet Memories</div>
              <p>Romantic moments that warm your heart</p>
            </div>
            <div className="space-y-2">
              <div className="text-red-500">❤️‍🔥 Spicy Memories</div>
              <p>Intimate moments that make you blush</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
