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
  Legend,
} from "recharts"
import { TrendingUp, TrendingDown } from "lucide-react"
import comparison from "@/data/comparison.json"

export function ComparisonSection() {
  const headerRef = useRef(null)
  const isHeaderInView = useInView(headerRef, { once: true })

  const chartData = comparison.map((party) => ({
    name: party.party,
    "2079 BS (2022)": party.seats2022,
    "2082 BS (2026)": party.seats2082,
    change: party.seats2082 - party.seats2022,
    color: party.color,
  }))

  return (
    <section id="comparison" className="py-20 px-4 bg-muted/30">
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
            The Big Shift
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            2079 BS vs 2082 BS — How the political landscape transformed in just
            one election cycle.
          </p>
        </motion.div>

        {/* Highlight Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-[#DC143C]/10 to-[#DC143C]/5 border-2 border-[#DC143C]/30 rounded-xl p-6 sm:p-8 mb-12 text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <TrendingUp className="w-8 h-8 text-[#DC143C]" />
            <span className="text-4xl sm:text-5xl font-bold text-[#DC143C]">
              8x
            </span>
          </div>
          <p className="text-lg sm:text-xl text-foreground font-medium">
            RSP went from <strong>21</strong> seats in 2022 to{" "}
            <strong>182</strong> seats in 2026.
          </p>
          <p className="text-muted-foreground mt-2">
            That is an <strong className="text-[#DC143C]">8x increase</strong>{" "}
            in a single election — the biggest surge in Nepali political
            history.
          </p>
        </motion.div>

        {/* Comparison Chart */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-card border border-border rounded-xl p-4 sm:p-8 mb-12"
        >
          <h3 className="text-xl font-semibold mb-6">Seat Comparison by Party</h3>
          <div className="h-80 sm:h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Bar
                  dataKey="2079 BS (2022)"
                  fill="#003893"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="2082 BS (2026)"
                  fill="#DC143C"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Change Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {chartData.map((party, index) => (
            <motion.div
              key={party.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-card border border-border rounded-xl p-4 text-center"
            >
              <div
                className="w-3 h-3 rounded-full mx-auto mb-2"
                style={{ backgroundColor: party.color }}
              />
              <h4 className="font-semibold text-foreground text-sm mb-2">
                {party.name}
              </h4>
              <div className="flex items-center justify-center gap-2">
                {party.change > 0 ? (
                  <TrendingUp className="w-4 h-4 text-green-500" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-500" />
                )}
                <span
                  className={`text-lg font-bold ${
                    party.change > 0 ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {party.change > 0 ? "+" : ""}
                  {party.change}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {party["2079 BS (2022)"]} → {party["2082 BS (2026)"]}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Context Box */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 p-6 rounded-xl bg-[#003893]/5 border border-[#003893]/20"
        >
          <h3 className="text-lg font-semibold text-[#003893] dark:text-blue-400 mb-2">
            What is a political wave?
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            A political wave happens when voters overwhelmingly reject the old
            guard and rally behind a new movement. Think of it like a classroom
            suddenly deciding they want a completely new set of prefects. In
            Nepal&apos;s case, the traditional parties — Nepali Congress,
            CPN-UML, and Maobadi — lost a combined{" "}
            <strong className="text-foreground">117 seats</strong>, while RSP
            gained <strong className="text-foreground">161 seats</strong>. This
            kind of shift is rare and signals a fundamental change in what
            voters want from their leaders.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
