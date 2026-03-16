"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Mic, Tv, TrendingUp, Globe, Medal, MapPin } from "lucide-react"
import winners from "@/data/winners.json"

const emojiToIcon: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  mic: Mic,
  tv: Tv,
  chart: TrendingUp,
  globe: Globe,
  medal: Medal,
}

const gradients = [
  "from-[#DC143C]/10 to-[#DC143C]/5",
  "from-[#003893]/10 to-[#003893]/5",
  "from-amber-500/10 to-amber-500/5",
  "from-emerald-500/10 to-emerald-500/5",
  "from-purple-500/10 to-purple-500/5",
]

const accents = [
  { bg: "bg-[#DC143C]", text: "text-[#DC143C]" },
  { bg: "bg-[#003893]", text: "text-[#003893]" },
  { bg: "bg-amber-500", text: "text-amber-600" },
  { bg: "bg-emerald-500", text: "text-emerald-600" },
  { bg: "bg-purple-500", text: "text-purple-600" },
]

export function WinnersSection() {
  const headerRef = useRef(null)
  const isHeaderInView = useInView(headerRef, { once: true })

  return (
    <section id="winners" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Meet the Winners
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            The faces of change — from rappers to economists, these leaders
            represent a new generation of Nepali politics.
          </p>
        </motion.div>

        {/* Winners Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {winners.map((winner, index) => {
            const Icon = emojiToIcon[winner.emoji] || Medal
            const gradient = gradients[index % gradients.length]
            const accent = accents[index % accents.length]

            return (
              <motion.div
                key={winner.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className={`bg-gradient-to-br ${gradient} border border-border rounded-xl p-6 transition-all hover:shadow-lg`}
              >
                {/* Avatar Icon */}
                <div className="flex items-start gap-4 mb-4">
                  <div
                    className={`flex-shrink-0 w-16 h-16 rounded-full ${accent.bg} flex items-center justify-center text-white`}
                  >
                    <Icon className="w-8 h-8" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-foreground">
                      {winner.name}
                    </h3>
                    <p className={`text-sm font-medium ${accent.text}`}>
                      {winner.role}
                    </p>
                  </div>
                </div>

                {/* Constituency */}
                {winner.constituency !== "N/A" && (
                  <div className="flex items-center gap-2 mb-4 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{winner.constituency}</span>
                  </div>
                )}

                {/* Bio */}
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {winner.bio}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
