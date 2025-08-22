"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, ChevronLeft, ChevronRight, Camera, MapPin } from "lucide-react"

interface Photo {
  id: number
  src: string
  caption: string
  location: string
  date: string
  description: string
}

const photos: Photo[] = [
  {
    id: 1,
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/first%20gym%20pic.jpg-mv4IpnPaZWP2uJEDBL4s6jBBYIJGpf.jpeg", // replaced placeholder with real gym selfie
    caption: "Where it all began",
    location: "The Gym",
    date: "Our Beginning",
    description: "From gym crushes to workout partners - this is where our love story started.",
  },
  {
    id: 2,
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-08-22%20at%2011.45.29_4a3efeeb.jpg-XNM2tk30rnGFXSDkApFkxXzrgBr8y5.jpeg", // replaced placeholder with real mall mirror selfie
    caption: "Our first official date",
    location: "The Mall",
    date: "July 24",
    description: "Trying on clothes, taking pictures, and falling deeper with every laugh we shared.",
  },
  {
    id: 3,
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-08-22%20at%2011.45.38_988a12d4.jpg-njZSW2xA1ZQgytLmF5voIy36ZNF3Cy.jpeg", // replaced placeholder with person wearing flower
    caption: "Our first kiss",
    location: "Japanese Rose Garden",
    date: "July 31",
    description: "Among the roses, our lips met for the first time. The world stopped, and it was just us.",
  },
  {
    id: 4,
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-08-22%20at%2011.45.39_dd3e3a15.jpg-pZfFqWgENPRXybXTvsp529PSIWb7Qs.jpeg", // replaced placeholder with intimate mirror selfie
    caption: "Our first night together",
    location: "Together",
    date: "August 4",
    description: "Passionate, emotional, and beautiful. The night that changed everything between us.",
  },
  {
    id: 5,
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-08-22%20at%2011.45.29_26c780f0.jpg-FcWlLEqrvUFw4xt5j2ECWiV7BXUL5W.jpeg", // replaced placeholder with hands holding at table
    caption: "Pizza date before Delhi",
    location: "Our Favorite Spot",
    date: "August 18",
    description: "Our last date before the distance. Every bite was bittersweet, knowing we'd be apart.",
  },
  {
    id: 6,
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-08-22%20at%2011.45.34_b1b8a96b.jpg-tpHugBQcBYPIBLoTDnfIOpD1Kxzhvn.jpeg", // replaced placeholder with couple selfie
    caption: "Love across the miles",
    location: "Delhi & Home",
    date: "Long Distance",
    description: "Miles apart but hearts closer than ever. Distance only made our love grow stronger.",
  },
  {
    id: 7,
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-08-22%20at%2011.45.33_6b3ca582.jpg-jmIZy3w7rFKBLjDBjevUS3OSqjl7zj.jpeg",
    caption: "Hand in hand",
    location: "Our Walks",
    date: "Every Day",
    description: "Simple moments like holding hands became the most precious memories we treasure.",
  },
  {
    id: 8,
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-08-22%20at%2011.45.37_5d24e5f5.jpg-vLjo0LCNbafsFST2MZfHLTrM5e5Svg.jpeg",
    caption: "Garden moments",
    location: "Peaceful Gardens",
    date: "Quiet Times",
    description: "Finding peace together in beautiful places, creating memories in every corner we explore.",
  },
  {
    id: 9,
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-08-22%20at%2011.45.36_35c00e27.jpg-SJ45rEmBal620QslLtGxTBPvEi3c2o.jpeg",
    caption: "Tender touches",
    location: "Everywhere",
    date: "Always",
    description: "Your gentle touch, your caring hands - every moment of tenderness between us is magic.",
  },
]

export function PhotoCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const nextPhoto = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % photos.length)
      setIsTransitioning(false)
    }, 150)
  }

  const prevPhoto = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length)
      setIsTransitioning(false)
    }, 150)
  }

  const goToPhoto = (index: number) => {
    if (isTransitioning || index === currentIndex) return
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentIndex(index)
      setIsTransitioning(false)
    }, 150)
  }

  const currentPhoto = photos[currentIndex]

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2
          className="text-3xl font-bold text-primary mb-4 romantic-text-shadow"
          style={{ fontFamily: "var(--font-romantic-heading)" }}
        >
          Our Photo Gallery
        </h2>
        <p className="text-muted-foreground text-lg" style={{ fontFamily: "var(--font-romantic-body)" }}>
          Pictures worth a thousand words, memories worth a lifetime
        </p>
      </div>

      {/* Main Photo Display */}
      <div className="flex justify-center">
        <div className="relative max-w-2xl">
          {/* Polaroid Frame */}
          <Card className="p-6 bg-white shadow-2xl transform rotate-1 hover:rotate-0 transition-transform duration-300">
            <div className="space-y-4">
              {/* Photo */}
              <div className="relative overflow-hidden rounded-lg bg-muted">
                <img
                  src={currentPhoto.src || "/placeholder.svg"}
                  alt={currentPhoto.caption}
                  className={`w-full h-80 object-cover transition-opacity duration-300 ${
                    isTransitioning ? "opacity-50" : "opacity-100"
                  }`}
                />

                {/* Photo overlay with location */}
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary" className="bg-white/90 text-foreground">
                    <MapPin size={12} className="mr-1" />
                    {currentPhoto.location}
                  </Badge>
                </div>

                {/* Photo overlay with date */}
                <div className="absolute top-4 right-4">
                  <Badge variant="outline" className="bg-white/90 border-primary text-primary">
                    {currentPhoto.date}
                  </Badge>
                </div>
              </div>

              {/* Polaroid Caption */}
              <div className="text-center space-y-2">
                <h3
                  className="text-xl font-bold text-foreground"
                  style={{ fontFamily: "var(--font-romantic-heading)" }}
                >
                  {currentPhoto.caption}
                </h3>
                <p
                  className="text-sm text-muted-foreground leading-relaxed"
                  style={{ fontFamily: "var(--font-romantic-body)" }}
                >
                  {currentPhoto.description}
                </p>
              </div>
            </div>
          </Card>

          {/* Navigation Buttons */}
          <Button
            onClick={prevPhoto}
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white border-2 border-primary/20 hover:border-primary glow-animation"
            disabled={isTransitioning}
          >
            <ChevronLeft size={20} />
          </Button>

          <Button
            onClick={nextPhoto}
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white border-2 border-primary/20 hover:border-primary glow-animation"
            disabled={isTransitioning}
          >
            <ChevronRight size={20} />
          </Button>
        </div>
      </div>

      {/* Photo Thumbnails */}
      <div className="flex justify-center">
        <div className="flex gap-4 overflow-x-auto pb-4 max-w-4xl">
          {photos.map((photo, index) => (
            <button
              key={photo.id}
              onClick={() => goToPhoto(index)}
              className={`flex-shrink-0 relative group ${
                index === currentIndex ? "ring-2 ring-primary ring-offset-2" : ""
              }`}
              disabled={isTransitioning}
            >
              {/* Mini Polaroid */}
              <Card className="p-2 bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div className="space-y-2">
                  <img
                    src={photo.src || "/placeholder.svg"}
                    alt={photo.caption}
                    className="w-20 h-16 object-cover rounded"
                  />
                  <p
                    className="text-xs text-center text-foreground font-medium truncate w-20"
                    style={{ fontFamily: "var(--font-romantic-body)" }}
                  >
                    {photo.caption}
                  </p>
                </div>
              </Card>

              {/* Active indicator */}
              {index === currentIndex && (
                <Heart className="absolute -top-2 -right-2 text-secondary heartbeat-animation" size={16} />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Photo Counter */}
      <div className="text-center">
        <Badge variant="outline" className="text-sm">
          <Camera className="mr-2" size={14} />
          {currentIndex + 1} of {photos.length}
        </Badge>
      </div>

      {/* Memory Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {photos.map((photo, index) => (
          <Card
            key={photo.id}
            className={`p-4 cursor-pointer hover:bg-card/90 transition-all duration-300 ${
              index === currentIndex ? "border-secondary/50 glow-animation" : ""
            }`}
            onClick={() => goToPhoto(index)}
          >
            <div className="space-y-3">
              <div className="relative">
                <img
                  src={photo.src || "/placeholder.svg"}
                  alt={photo.caption}
                  className="w-full h-32 object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg" />
                <Badge variant="secondary" className="absolute bottom-2 left-2 bg-white/90 text-foreground text-xs">
                  {photo.date}
                </Badge>
              </div>

              <div className="space-y-1">
                <h4
                  className="font-semibold text-foreground text-sm"
                  style={{ fontFamily: "var(--font-romantic-heading)" }}
                >
                  {photo.caption}
                </h4>
                <p
                  className="text-xs text-muted-foreground line-clamp-2"
                  style={{ fontFamily: "var(--font-romantic-body)" }}
                >
                  {photo.description}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Romantic Message */}
      <Card className="p-6 max-w-2xl mx-auto bg-gradient-to-br from-pink-50 to-rose-50 border-pink-200">
        <div className="text-center space-y-4">
          <Heart className="text-secondary mx-auto float-animation" size={32} />
          <h4 className="text-lg font-bold text-foreground" style={{ fontFamily: "var(--font-romantic-heading)" }}>
            Every Picture Tells Our Story
          </h4>
          <p
            className="text-sm text-muted-foreground leading-relaxed"
            style={{ fontFamily: "var(--font-romantic-body)" }}
          >
            From our first glances at the gym to our passionate nights together, every moment captured is a treasure.
            These photos are just the beginning of our beautiful journey together.
          </p>
        </div>
      </Card>
    </div>
  )
}
