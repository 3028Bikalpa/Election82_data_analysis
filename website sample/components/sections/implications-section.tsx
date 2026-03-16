"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { TrendingUp, Users, Building2, Info } from "lucide-react"
import overview from "@/data/overview.json"

const implications = [
  {
    icon: TrendingUp,
    title: "Economy",
    titleNp: "अर्थतन्त्र",
    description:
      "RSP has promised major economic reforms including anti-corruption measures, job creation for youth, and improved infrastructure. With a majority, they can pass budgets and economic policies without coalition compromises.",
    color: "bg-emerald-500",
    borderColor: "border-emerald-500/30",
    bgColor: "bg-emerald-500/5",
  },
  {
    icon: Users,
    title: "Youth",
    titleNp: "युवा",
    description:
      "For the first time, many young candidates won seats. The average age of parliament has dropped significantly. Expect policies focused on education, employment, and digital connectivity.",
    color: "bg-[#003893]",
    borderColor: "border-[#003893]/30",
    bgColor: "bg-[#003893]/5",
  },
  {
    icon: Building2,
    title: "Governance",
    titleNp: "शासन",
    description:
      "A single-party majority means faster decision-making but also greater responsibility. With no coalition partners to blame, RSP will be held fully accountable for their governance.",
    color: "bg-[#DC143C]",
    borderColor: "border-[#DC143C]/30",
    bgColor: "bg-[#DC143C]/5",
  },
]

export function ImplicationsSection() {
  const headerRef = useRef(null)
  const isHeaderInView = useInView(headerRef, { once: true })

  return (
    <section id="implications" className="py-20 px-4 bg-muted/30">
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
            What Does This Mean for You?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            How the election results might affect everyday life in Nepal.
          </p>
        </motion.div>

        {/* Key Stat Highlight */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-card border border-border rounded-xl p-6 sm:p-8 mb-12"
        >
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#003893]/10 flex items-center justify-center">
              <Info className="w-5 h-5 text-[#003893]" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                What does a majority mean?
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                RSP has <strong className="text-[#DC143C]">182</strong> of{" "}
                <strong>275</strong> seats. They only need{" "}
                <strong className="text-[#003893]">
                  {overview.majorityNeeded}
                </strong>{" "}
                to govern alone. This means they can pass laws without asking
                other parties for permission — something no party has done since{" "}
                <strong>{overview.lastSinglePartyMajorityYear}</strong>. Think
                of it like having enough votes in your class to decide the field
                trip destination without needing anyone else to agree.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Implication Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {implications.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`${item.bgColor} border ${item.borderColor} rounded-xl p-6`}
            >
              <div
                className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${item.color} text-white mb-4`}
              >
                <item.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-1">
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {item.titleNp}
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Neutral Note */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 p-6 rounded-xl bg-card border border-border text-center"
        >
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Note:</strong> This analysis is
            neutral and factual. The future impact depends on the policies
            implemented and how effectively the new government delivers on its
            promises. Democracy thrives when citizens stay informed and engaged.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
