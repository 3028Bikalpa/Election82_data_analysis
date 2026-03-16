"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
} from "recharts"
import { Users, UserPlus, UserCheck } from "lucide-react"
import turnout from "@/data/turnout.json"
import overview from "@/data/overview.json"

const provinceColors = [
  "#DC143C",
  "#003893",
  "#E63946",
  "#2196F3",
  "#FF9800",
  "#4CAF50",
  "#9C27B0",
]

export function TurnoutSection() {
  const headerRef = useRef(null)
  const isHeaderInView = useInView(headerRef, { once: true })

  const sortedTurnout = [...turnout].sort((a, b) => b.turnout - a.turnout)

  const votedData = [
    { name: "Voted", value: overview.estimatedTurnoutPercent, color: "#DC143C" },
    {
      name: "Did Not Vote",
      value: 100 - overview.estimatedTurnoutPercent,
      color: "#E5E7EB",
    },
  ]

  const funFacts = [
    {
      icon: UserPlus,
      value: overview.firstTimeVoters.toLocaleString(),
      label: "First-Time Voters",
      labelNp: "पहिलो पटक मतदाता",
      description: "Young citizens voting for the very first time in their lives",
      color: "bg-[#DC143C]",
    },
    {
      icon: Users,
      value: overview.independentCandidates.toLocaleString(),
      label: "Independent Candidates",
      labelNp: "स्वतन्त्र उम्मेदवार",
      description: "Candidates who ran without any party affiliation",
      color: "bg-[#003893]",
    },
    {
      icon: UserCheck,
      value: overview.registeredVoters.toLocaleString(),
      label: "Registered Voters",
      labelNp: "दर्ता मतदाता",
      description: "Total citizens eligible to cast their vote",
      color: "bg-[#FFD700]",
    },
  ]

  return (
    <section id="turnout" className="py-20 px-4">
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
            Voter Participation
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            About <strong className="text-[#DC143C]">11.3 million</strong>{" "}
            Nepalis cast their vote — that is roughly{" "}
            <strong>60%</strong> of all registered voters.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Province-wise Turnout */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-card border border-border rounded-xl p-4 sm:p-6"
          >
            <h3 className="text-xl font-semibold mb-6">
              Turnout by Province
            </h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={sortedTurnout}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
                >
                  <XAxis type="number" domain={[0, 100]} unit="%" />
                  <YAxis type="category" dataKey="province" width={75} />
                  <Tooltip
                    formatter={(value: number) => [`${value}%`, "Turnout"]}
                    contentStyle={{
                      backgroundColor: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="turnout" radius={[0, 4, 4, 0]}>
                    {sortedTurnout.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={provinceColors[index % provinceColors.length]}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-sm text-muted-foreground mt-4 text-center">
              Gandaki Province had the highest turnout at{" "}
              <strong className="text-foreground">65%</strong>
            </p>
          </motion.div>

          {/* Voted vs Not Voted */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-card border border-border rounded-xl p-4 sm:p-6"
          >
            <h3 className="text-xl font-semibold mb-6 text-center">
              Voted vs Did Not Vote
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={votedData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {votedData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number) => [`${value}%`, "Percentage"]}
                    contentStyle={{
                      backgroundColor: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: "8px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-[#DC143C]" />
                <span className="text-sm text-muted-foreground">
                  Voted (60%)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-gray-200" />
                <span className="text-sm text-muted-foreground">
                  Did Not Vote (40%)
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Fun Fact Cards */}
        <div className="grid sm:grid-cols-3 gap-6">
          {funFacts.map((fact, index) => (
            <motion.div
              key={fact.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-card border border-border rounded-xl p-6 text-center"
            >
              <div
                className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${fact.color} ${
                  fact.color === "bg-[#FFD700]" ? "text-black" : "text-white"
                } mb-4`}
              >
                <fact.icon className="w-6 h-6" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-foreground mb-1">
                {fact.value}
              </div>
              <div className="text-sm font-medium text-foreground mb-1">
                {fact.label}
              </div>
              <div className="text-xs text-muted-foreground mb-2">
                {fact.labelNp}
              </div>
              <p className="text-xs text-muted-foreground">{fact.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
