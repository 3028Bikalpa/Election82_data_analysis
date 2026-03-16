"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import {
  Swords,
  AlertCircle,
  Trophy,
  Medal,
  Laptop,
  BarChart3,
} from "lucide-react"
import moments from "@/data/moments.json"

const emojiToIcon: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  boxing: Swords,
  surprised: AlertCircle,
  trophy: Trophy,
  medal: Medal,
  laptop: Laptop,
  chart: BarChart3,
}

const cardColors = [
  { bg: "bg-[#DC143C]/5", border: "border-[#DC143C]/30", accent: "text-[#DC143C]" },
  { bg: "bg-[#003893]/5", border: "border-[#003893]/30", accent: "text-[#003893]" },
  { bg: "bg-amber-500/5", border: "border-amber-500/30", accent: "text-amber-600" },
  { bg: "bg-emerald-500/5", border: "border-emerald-500/30", accent: "text-emerald-600" },
  { bg: "bg-purple-500/5", border: "border-purple-500/30", accent: "text-purple-600" },
  { bg: "bg-orange-500/5", border: "border-orange-500/30", accent: "text-orange-600" },
]

export function MomentsSection() {
  const headerRef = useRef(null)
  const isHeaderInView = useInView(headerRef, { once: true })

  return (
    <section id="moments" className="py-20 px-4 bg-muted/30">
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
            Historic Moments
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Key results that defined this election and will be remembered for
            years to come.
          </p>
        </motion.div>

        {/* Moments Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {moments.map((moment, index) => {
            const Icon = emojiToIcon[moment.emoji] || Trophy
            const colors = cardColors[index % cardColors.length]

            return (
              <motion.div
                key={moment.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className={`${colors.bg} border-2 ${colors.border} rounded-xl p-6 transition-shadow hover:shadow-lg`}
              >
                {/* Icon */}
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${colors.bg} ${colors.accent} mb-4`}
                >
                  <Icon className="w-6 h-6" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {moment.title}
                </h3>

                {/* Constituency Badge */}
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${colors.bg} ${colors.accent} border ${colors.border} mb-4`}
                >
                  {moment.constituency}
                </span>

                {/* Winner vs Loser */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-green-600 bg-green-100 dark:bg-green-900/30 px-2 py-0.5 rounded">
                      Winner
                    </span>
                    <span className="text-sm font-medium text-foreground">
                      {moment.winner}
                    </span>
                  </div>
                  {moment.loser && (
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-red-600 bg-red-100 dark:bg-red-900/30 px-2 py-0.5 rounded">
                        Defeated
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {moment.loser}
                      </span>
                    </div>
                  )}
                </div>

                {/* Why it matters */}
                <div className="pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    <span className={`font-semibold ${colors.accent}`}>
                      Why it matters:
                    </span>{" "}
                    {moment.whyItMatters}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
