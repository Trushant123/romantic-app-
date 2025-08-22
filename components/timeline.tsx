"use client"

import type React from "react"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Dumbbell, ShoppingBag, Flower2, Moon, Flame, Pizza, Plane } from "lucide-react"

interface TimelineEvent {
  id: string
  date: string
  title: string
  description: string
  icon: React.ComponentType<{ size?: number; className?: string }>
  color: string
  isSpecial?: boolean
}

const timelineEvents: TimelineEvent[] = [
  {
    id: "gym-crush",
    date: "The Beginning",
    title: "Gym Crushes",
    description: "Two hearts beating fast, not just from the workout. Our eyes met across the gym floor.",
    icon: Dumbbell,
    color: "text-accent",
  },
  {
    id: "gym-partners",
    date: "Getting Closer",
    title: "Gym Partners",
    description: "From stolen glances to shared workouts. We became the perfect training duo.",
    icon: Heart,
    color: "text-secondary",
  },
  {
    id: "first-date",
    date: "July 24",
    title: "First Date at the Mall",
    description: "Trying on clothes, taking pictures, and falling deeper with every laugh we shared.",
    icon: ShoppingBag,
    color: "text-primary",
    isSpecial: true,
  },
  {
    id: "first-kiss",
    date: "July 31",
    title: "First Kiss at Japanese Rose Garden",
    description: "Among the roses, our lips met for the first time. The world stopped, and it was just us.",
    icon: Flower2,
    color: "text-secondary",
    isSpecial: true,
  },
  {
    id: "first-night",
    date: "August 4",
    title: "Our First Night Together",
    description: "Passionate, emotional, and beautiful. The night that changed everything between us.",
    icon: Moon,
    color: "text-accent",
    isSpecial: true,
  },
  {
    id: "wild-session",
    date: "August 11",
    title: "Our Wild Session",
    description: "That rough, wild night that still makes us grin when we think about it.",
    icon: Flame,
    color: "text-destructive",
    isSpecial: true,
  },
  {
    id: "pizza-date",
    date: "August 18",
    title: "Pizza Date Before Delhi",
    description: "Our last date before the distance. Every bite was bittersweet, knowing we'd be apart.",
    icon: Pizza,
    color: "text-primary",
  },
  {
    id: "long-distance",
    date: "After Delhi",
    title: "Long Distance, Stronger Bond",
    description: "Miles apart but hearts closer than ever. Distance only made our love grow stronger.",
    icon: Plane,
    color: "text-accent",
  },
]

export function Timeline() {
  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2
          className="text-3xl font-bold text-primary mb-4 romantic-text-shadow"
          style={{ fontFamily: "var(--font-romantic-heading)" }}
        >
          Our Love Timeline
        </h2>
        <p className="text-muted-foreground text-lg" style={{ fontFamily: "var(--font-romantic-body)" }}>
          From gym crushes to soulmates - every moment that brought us closer
        </p>
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-secondary via-primary to-accent opacity-30"></div>

        <div className="space-y-8">
          {timelineEvents.map((event, index) => (
            <div key={event.id} className="relative flex items-start gap-6">
              {/* Timeline dot */}
              <div className="relative z-10 flex-shrink-0">
                <div
                  className={`w-16 h-16 rounded-full bg-card border-4 border-background flex items-center justify-center ${event.isSpecial ? "glow-animation" : ""}`}
                >
                  <event.icon size={24} className={event.color} />
                </div>
              </div>

              {/* Content card */}
              <Card
                className={`flex-1 p-6 bg-card/80 backdrop-blur-sm hover:bg-card/90 transition-all duration-300 ${event.isSpecial ? "border-secondary/50" : ""}`}
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-3 flex-wrap">
                    <Badge variant="secondary" className="text-sm font-medium">
                      {event.date}
                    </Badge>
                    {event.isSpecial && <Heart size={16} className="text-secondary heartbeat-animation" />}
                  </div>

                  <h3
                    className="text-xl font-bold text-foreground"
                    style={{ fontFamily: "var(--font-romantic-heading)" }}
                  >
                    {event.title}
                  </h3>

                  <p
                    className="text-muted-foreground leading-relaxed"
                    style={{ fontFamily: "var(--font-romantic-body)" }}
                  >
                    {event.description}
                  </p>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom decoration */}
      <div className="text-center pt-8">
        <div className="flex justify-center items-center gap-2">
          <Heart className="text-secondary float-animation" size={20} />
          <span className="text-muted-foreground italic" style={{ fontFamily: "var(--font-romantic-body)" }}>
            And our story continues...
          </span>
          <Heart className="text-secondary float-animation" size={20} style={{ animationDelay: "1s" }} />
        </div>
      </div>
    </div>
  )
}
