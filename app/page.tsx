"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, Star, Calendar, Gift, Camera, Lock } from "lucide-react"
import { Timeline } from "@/components/timeline"
import { DailyNotes } from "@/components/daily-notes"
import { MemoryJar } from "@/components/memory-jar"
import { CountdownTimer } from "@/components/countdown-timer"
import { PhotoCarousel } from "@/components/photo-carousel"
import { SecretSection } from "@/components/secret-section"

export default function RomanticSurprisePage() {
  const [activeSection, setActiveSection] = useState("home")
  const [hearts, setHearts] = useState<
    { left: string; top: string; delay: string }[]
  >([])

  // Generate random heart positions only on client
  useEffect(() => {
    setHearts(
      [...Array(6)].map((_, i) => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        delay: `${i * 0.5}s`,
      }))
    )
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-amber-50">
      {/* Header */}
      <header className="text-center py-8 px-4">
        <div className="flex justify-center items-center gap-2 mb-4">
          <Heart className="text-secondary heartbeat-animation" size={32} />
          <h1
            className="text-4xl font-bold text-primary romantic-text-shadow"
            style={{ fontFamily: "var(--font-romantic-heading)" }}
          >
            Our Love Story
          </h1>
          <Heart className="text-secondary heartbeat-animation" size={32} />
        </div>
        <p
          className="text-muted-foreground text-lg"
          style={{ fontFamily: "var(--font-romantic-body)" }}
        >
          A digital treasure chest of our memories
        </p>
      </header>

      {/* Navigation */}
      <nav className="flex justify-center gap-4 px-4 mb-8 flex-wrap">
        {[
          { id: "home", label: "Home", icon: Heart },
          { id: "timeline", label: "Our Story", icon: Calendar },
          { id: "notes", label: "Daily Notes", icon: Gift },
          { id: "memories", label: "Memory Jar", icon: Star },
          { id: "countdown", label: "Countdown", icon: Calendar },
          { id: "photos", label: "Photos", icon: Camera },
          { id: "secret", label: "🔥", icon: Lock },
        ].map(({ id, label, icon: Icon }) => (
          <Button
            key={id}
            variant={activeSection === id ? "default" : "outline"}
            onClick={() => setActiveSection(id)}
            className="glow-animation"
          >
            <Icon size={16} className="mr-2" />
            {label}
          </Button>
        ))}
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 pb-8">
        {activeSection === "home" && (
          <div className="text-center space-y-8">
            <Card className="p-8 max-w-2xl mx-auto bg-card/80 backdrop-blur-sm">
              <div className="space-y-6">
                <div className="flex justify-center">
                  <div className="relative">
                    <Heart
                      className="text-secondary float-animation"
                      size={64}
                    />
                    <Star
                      className="absolute -top-2 -right-2 text-accent"
                      size={24}
                    />
                  </div>
                </div>
                <h2
                  className="text-3xl font-bold text-primary"
                  style={{ fontFamily: "var(--font-romantic-heading)" }}
                >
                  Welcome to Our Love Story
                </h2>
                <p
                  className="text-lg text-foreground leading-relaxed"
                  style={{ fontFamily: "var(--font-romantic-body)" }}
                >
                  From gym crushes to soulmates, this is our journey together.
                  Explore our timeline, unlock daily surprises, and relive our
                  most precious memories.
                </p>
                <div className="flex justify-center gap-4 pt-4">
                  <Button
                    onClick={() => setActiveSection("timeline")}
                    className="bg-primary hover:bg-primary/90 glow-animation"
                  >
                    Start Our Journey
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}

        {activeSection === "timeline" && (
          <div className="max-w-4xl mx-auto">
            <Timeline />
          </div>
        )}

        {activeSection === "notes" && (
          <div className="max-w-6xl mx-auto">
            <DailyNotes />
          </div>
        )}

        {activeSection === "memories" && (
          <div className="max-w-4xl mx-auto">
            <MemoryJar />
          </div>
        )}

        {activeSection === "countdown" && (
          <div className="max-w-6xl mx-auto">
            <CountdownTimer />
          </div>
        )}

        {activeSection === "photos" && (
          <div className="max-w-6xl mx-auto">
            <PhotoCarousel />
          </div>
        )}

        {activeSection === "secret" && (
          <div className="max-w-6xl mx-auto">
            <SecretSection />
          </div>
        )}
      </main>

      {/* Floating Hearts */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {hearts.map((pos, i) => (
          <Heart
            key={i}
            className="absolute text-secondary/20 float-animation"
            size={20}
            style={{
              left: pos.left,
              top: pos.top,
              animationDelay: pos.delay,
            }}
          />
        ))}
      </div>
    </div>
  )
}
