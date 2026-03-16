"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import {
  Ban,
  Users,
  Landmark,
  Calendar,
  Star,
  Mic,
  Vote,
  Trophy,
} from "lucide-react"
import timeline from "@/data/timeline.json"

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  ban: Ban,
  users: Users,
  landmark: Landmark,
  calendar: Calendar,
  star: Star,
  mic: Mic,
  vote: Vote,
  trophy: Trophy,
}

const typeColors: Record<string, { bg: string; border: string; text: string }> = {
  trigger: {
    bg: "bg-red-500/10",
    border: "border-red-500/30",
    text: "text-red-600 dark:text-red-400",
  },
  protest: {
    bg: "bg-orange-500/10",
    border: "border-orange-500/30",
    text: "text-orange-600 dark:text-orange-400",
  },
  political: {
    bg: "bg-blue-500/10",
    border: "border-blue-500/30",
    text: "text-blue-600 dark:text-blue-400",
  },
  historic: {
    bg: "bg-amber-500/10",
    border: "border-amber-500/30",
    text: "text-amber-600 dark:text-amber-400",
  },
  party: {
    bg: "bg-purple-500/10",
    border: "border-purple-500/30",
    text: "text-purple-600 dark:text-purple-400",
  },
  election: {
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/30",
    text: "text-emerald-600 dark:text-emerald-400",
  },
  result: {
    bg: "bg-[#DC143C]/10",
    border: "border-[#DC143C]/30",
    text: "text-[#DC143C]",
  },
}

function TimelineItem({
  event,
  index,
}: {
  event: (typeof timeline)[0]
  index: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const Icon = iconMap[event.icon] || Calendar
  const colors = typeColors[event.type] || typeColors.political

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.1 }}
      className={`flex items-start gap-4 ${
        index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
      }`}
    >
      {/* Content Card */}
      <div
        className={`flex-1 ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}
      >
        <div
          className={`inline-block p-4 sm:p-6 rounded-xl border ${colors.bg} ${colors.border}`}
        >
          <div
            className={`flex items-center gap-2 mb-2 ${
              index % 2 === 0 ? "md:justify-end" : ""
            }`}
          >
            <span className={`text-sm font-medium ${colors.text}`}>
              {event.date}
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2">
            {event.title}
          </h3>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            {event.description}
          </p>
        </div>
      </div>

      {/* Center Icon */}
      <div className="relative flex-shrink-0 hidden md:flex flex-col items-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.2 }}
          className={`w-12 h-12 rounded-full ${colors.bg} border-2 ${colors.border} flex items-center justify-center z-10`}
        >
          <Icon className={`w-5 h-5 ${colors.text}`} />
        </motion.div>
        {index < timeline.length - 1 && (
          <div className="w-0.5 h-full bg-border absolute top-12" />
        )}
      </div>

      {/* Mobile Icon */}
      <div className="flex-shrink-0 md:hidden">
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.2 }}
          className={`w-10 h-10 rounded-full ${colors.bg} border-2 ${colors.border} flex items-center justify-center`}
        >
          <Icon className={`w-4 h-4 ${colors.text}`} />
        </motion.div>
      </div>

      {/* Spacer for alignment */}
      <div className="flex-1 hidden md:block" />
    </motion.div>
  )
}

export function TimelineSection() {
  const headerRef = useRef(null)
  const isHeaderInView = useInView(headerRef, { once: true })

  return (
    <section id="timeline" className="py-20 px-4 bg-muted/30">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            What Happened?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Imagine you are fed up with your town&apos;s leadership and take to
            the streets until a new fair election is called — that&apos;s
            exactly what Nepal&apos;s youth did in 2025.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line for Desktop */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2" />

          {/* Timeline Items */}
          <div className="space-y-8 md:space-y-12">
            {timeline.map((event, index) => (
              <TimelineItem key={event.title} event={event} index={index} />
            ))}
          </div>
        </div>

        {/* Context Box */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 p-6 rounded-xl bg-[#003893]/5 border border-[#003893]/20"
        >
          <h3 className="text-lg font-semibold text-[#003893] dark:text-blue-400 mb-2">
            Why does this matter?
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            In just <strong className="text-foreground">6 months</strong>,
            Nepal went from nationwide protests to a complete government change.
            The youth-led movement forced out the old guard and brought in fresh
            faces. This was the fastest democratic transition in Nepal&apos;s
            history — proving that when people unite, change happens.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
