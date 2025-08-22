"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, Calendar, Clock, Sparkles, Settings } from "lucide-react"

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [targetDate, setTargetDate] = useState<Date | null>(null)
  const [isFinished, setIsFinished] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [customDate, setCustomDate] = useState("")
  const [showDatePicker, setShowDatePicker] = useState(false)

  useEffect(() => {
    // Load saved date from localStorage or set a default
    const savedDate = localStorage.getItem("romantic-countdown-date")
    if (savedDate) {
      setTargetDate(new Date(savedDate))
    } else {
      // Default to 30 days from now
      const defaultDate = new Date()
      defaultDate.setDate(defaultDate.getDate() + 30)
      setTargetDate(defaultDate)
      localStorage.setItem("romantic-countdown-date", defaultDate.toISOString())
    }
  }, [])

  useEffect(() => {
    if (!targetDate) return

    const timer = setInterval(() => {
      const now = new Date().getTime()
      const target = targetDate.getTime()
      const difference = target - now

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24))
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((difference % (1000 * 60)) / 1000)

        setTimeLeft({ days, hours, minutes, seconds })
        setIsFinished(false)
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        if (!isFinished) {
          setIsFinished(true)
          setShowConfetti(true)
          setTimeout(() => setShowConfetti(false), 5000)
        }
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [targetDate, isFinished])

  const handleDateChange = () => {
    if (customDate) {
      const newDate = new Date(customDate)
      setTargetDate(newDate)
      localStorage.setItem("romantic-countdown-date", newDate.toISOString())
      setShowDatePicker(false)
      setIsFinished(false)
    }
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2
          className="text-3xl font-bold text-primary mb-4 romantic-text-shadow"
          style={{ fontFamily: "var(--font-romantic-heading)" }}
        >
          Until We Meet Again
        </h2>
        <p className="text-muted-foreground text-lg" style={{ fontFamily: "var(--font-romantic-body)" }}>
          Every second brings us closer together
        </p>
      </div>

      {/* Main Countdown Display */}
      <Card className="p-8 max-w-4xl mx-auto bg-card/80 backdrop-blur-sm border-secondary/30 relative overflow-hidden">
        {/* Confetti Effect */}
        {showConfetti && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-bounce"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${2 + Math.random() * 2}s`,
                }}
              >
                {i % 4 === 0 ? "🎉" : i % 4 === 1 ? "✨" : i % 4 === 2 ? "💕" : "🌟"}
              </div>
            ))}
          </div>
        )}

        <div className="text-center space-y-8">
          {targetDate && (
            <div className="space-y-4">
              <Badge variant="outline" className="text-lg px-4 py-2 border-primary text-primary">
                <Calendar className="mr-2" size={16} />
                {formatDate(targetDate)}
              </Badge>

              {!isFinished ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
                  {[
                    { label: "Days", value: timeLeft.days, color: "text-primary" },
                    { label: "Hours", value: timeLeft.hours, color: "text-secondary" },
                    { label: "Minutes", value: timeLeft.minutes, color: "text-accent" },
                    { label: "Seconds", value: timeLeft.seconds, color: "text-destructive" },
                  ].map(({ label, value, color }) => (
                    <Card key={label} className="p-6 bg-muted/50 border-2 border-muted glow-animation">
                      <div className="text-center space-y-2">
                        <div
                          className={`text-4xl font-bold ${color}`}
                          style={{ fontFamily: "var(--font-romantic-heading)" }}
                        >
                          {value.toString().padStart(2, "0")}
                        </div>
                        <div
                          className="text-sm text-muted-foreground uppercase tracking-wide"
                          style={{ fontFamily: "var(--font-romantic-body)" }}
                        >
                          {label}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex justify-center">
                    <Heart className="text-secondary heartbeat-animation" size={80} />
                  </div>
                  <h3
                    className="text-4xl font-bold text-primary"
                    style={{ fontFamily: "var(--font-romantic-heading)" }}
                  >
                    The Wait is Over!
                  </h3>
                  <p className="text-xl text-foreground" style={{ fontFamily: "var(--font-romantic-body)" }}>
                    Time to create new beautiful memories together
                  </p>
                  <div className="flex justify-center gap-2">
                    <Sparkles className="text-accent float-animation" size={24} />
                    <Heart className="text-secondary float-animation" size={24} style={{ animationDelay: "0.5s" }} />
                    <Sparkles className="text-primary float-animation" size={24} style={{ animationDelay: "1s" }} />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Date Picker Section */}
          <div className="pt-6 border-t border-border/50">
            {!showDatePicker ? (
              <Button
                onClick={() => setShowDatePicker(true)}
                variant="outline"
                className="border-muted-foreground/30 text-muted-foreground hover:border-primary hover:text-primary"
              >
                <Settings className="mr-2" size={16} />
                Change Date
              </Button>
            ) : (
              <div className="space-y-4 max-w-md mx-auto">
                <div className="space-y-2">
                  <label
                    className="text-sm font-medium text-foreground"
                    style={{ fontFamily: "var(--font-romantic-body)" }}
                  >
                    Set your reunion date:
                  </label>
                  <input
                    type="datetime-local"
                    value={customDate}
                    onChange={(e) => setCustomDate(e.target.value)}
                    className="w-full p-3 rounded-lg border border-border bg-background text-foreground"
                    style={{ fontFamily: "var(--font-romantic-body)" }}
                  />
                </div>
                <div className="flex gap-2 justify-center">
                  <Button onClick={handleDateChange} className="bg-primary hover:bg-primary/90" disabled={!customDate}>
                    <Heart className="mr-2" size={16} />
                    Set Date
                  </Button>
                  <Button onClick={() => setShowDatePicker(false)} variant="outline">
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Romantic Messages */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <Card className="p-6 bg-gradient-to-br from-pink-50 to-rose-50 border-pink-200">
          <div className="text-center space-y-4">
            <Heart className="text-secondary mx-auto" size={32} />
            <h4 className="text-lg font-bold text-foreground" style={{ fontFamily: "var(--font-romantic-heading)" }}>
              Distance Means Nothing
            </h4>
            <p className="text-sm text-muted-foreground" style={{ fontFamily: "var(--font-romantic-body)" }}>
              When someone means everything. Every tick of the clock brings us one step closer to being in each other's
              arms again.
            </p>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200">
          <div className="text-center space-y-4">
            <Clock className="text-accent mx-auto" size={32} />
            <h4 className="text-lg font-bold text-foreground" style={{ fontFamily: "var(--font-romantic-heading)" }}>
              Worth Every Second
            </h4>
            <p className="text-sm text-muted-foreground" style={{ fontFamily: "var(--font-romantic-body)" }}>
              The anticipation makes our reunion even sweeter. Until then, you're always in my thoughts and dreams.
            </p>
          </div>
        </Card>
      </div>

      {/* Progress Bar */}
      {targetDate && !isFinished && (
        <Card className="p-6 max-w-2xl mx-auto bg-muted/30">
          <div className="space-y-4">
            <h4
              className="text-center font-semibold text-foreground"
              style={{ fontFamily: "var(--font-romantic-heading)" }}
            >
              Journey Progress
            </h4>
            <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-secondary via-primary to-accent transition-all duration-1000 glow-animation"
                style={{
                  width: `${Math.max(10, Math.min(90, ((new Date().getTime() - (targetDate.getTime() - 30 * 24 * 60 * 60 * 1000)) / (30 * 24 * 60 * 60 * 1000)) * 100))}%`,
                }}
              ></div>
            </div>
            <p
              className="text-center text-xs text-muted-foreground"
              style={{ fontFamily: "var(--font-romantic-body)" }}
            >
              Every moment apart makes our love grow stronger
            </p>
          </div>
        </Card>
      )}
    </div>
  )
}
