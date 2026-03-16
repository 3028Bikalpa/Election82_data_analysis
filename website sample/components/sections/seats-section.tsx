"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useMemo } from "react"
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
import { Info } from "lucide-react"
import seats from "@/data/seats.json"
import votes from "@/data/votes.json"

// Generate parliament arc seats
function generateParliamentSeats(seatsData: typeof seats) {
  const totalSeats = seatsData.reduce((sum, party) => sum + party.total, 0)
  const seatPositions: Array<{ x: number; y: number; color: string; party: string }> = []
  
  // Create seats in semicircle rows
  const rows = 5
  const seatsPerRow = [45, 50, 55, 60, 65] // Increasing seats per row
  
  let seatIndex = 0
  const partySeats = seatsData.flatMap((party) =>
    Array(party.total).fill({ color: party.color, party: party.party })
  )

  for (let row = 0; row < rows && seatIndex < totalSeats; row++) {
    const numSeatsInRow = Math.min(seatsPerRow[row], totalSeats - seatIndex)
    const radius = 120 + row * 30

    for (let i = 0; i < numSeatsInRow && seatIndex < totalSeats; i++) {
      const angle = Math.PI - (Math.PI * (i + 0.5)) / numSeatsInRow
      const x = 200 + radius * Math.cos(angle)
      const y = 180 - radius * Math.sin(angle)
      
      seatPositions.push({
        x,
        y,
        color: partySeats[seatIndex].color,
        party: partySeats[seatIndex].party,
      })
      seatIndex++
    }
  }

  return seatPositions
}

const voteColors: Record<string, string> = {
  RSP: "#E63946",
  "Nepali Congress": "#2196F3",
  "CPN-UML": "#FF9800",
  "NCP Maobadi": "#F44336",
  RPP: "#4CAF50",
  "Shram Sanskriti": "#9C27B0",
  Others: "#607D8B",
}

export function SeatsSection() {
  const headerRef = useRef(null)
  const isHeaderInView = useInView(headerRef, { once: true })
  const parliamentSeats = useMemo(() => generateParliamentSeats(seats), [])

  const fptpPrData = seats.map((party) => ({
    name: party.party.split(" ")[0],
    fptp: party.fptp,
    pr: party.pr,
    color: party.color,
  }))

  const pieData = votes.map((v) => ({
    name: v.party,
    value: v.percent,
    color: voteColors[v.party] || "#607D8B",
  }))

  return (
    <section id="seats" className="py-20 px-4">
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
            Who Won?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            RSP won <strong className="text-[#DC143C]">182 out of 275</strong>{" "}
            seats — that is like one team winning{" "}
            <strong>66 out of 100</strong> seats in a school election.
          </p>
        </motion.div>

        {/* Parliament Arc Visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="bg-card border border-border rounded-xl p-4 sm:p-8">
            <h3 className="text-xl font-semibold text-center mb-6">
              Parliament Seat Distribution
            </h3>
            <div className="flex justify-center">
              <svg viewBox="0 0 400 200" className="w-full max-w-2xl">
                {parliamentSeats.map((seat, i) => (
                  <motion.circle
                    key={i}
                    cx={seat.x}
                    cy={seat.y}
                    r={5}
                    fill={seat.color}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.002, duration: 0.3 }}
                  >
                    <title>{seat.party}</title>
                  </motion.circle>
                ))}
                {/* Center text */}
                <text
                  x="200"
                  y="175"
                  textAnchor="middle"
                  className="fill-foreground text-lg font-bold"
                  fontSize="14"
                >
                  275 Seats
                </text>
              </svg>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap justify-center gap-4 mt-6">
              {seats.map((party) => (
                <div key={party.party} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: party.color }}
                  />
                  <span className="text-sm text-muted-foreground">
                    {party.party.split("(")[0].trim()}: {party.total}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Explainer Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-[#003893]/5 border border-[#003893]/20 rounded-xl p-6"
          >
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-[#003893] mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-foreground mb-2">
                  What is FPTP?
                </h4>
                <p className="text-sm text-muted-foreground">
                  <strong>First Past The Post</strong> — you vote for a person
                  in your area. The candidate with the most votes wins that
                  seat. It is like picking a class representative: whoever gets
                  the most hands raised, wins.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-[#DC143C]/5 border border-[#DC143C]/20 rounded-xl p-6"
          >
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-[#DC143C] mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-foreground mb-2">
                  What is PR?
                </h4>
                <p className="text-sm text-muted-foreground">
                  <strong>Proportional Representation</strong> — you vote for a
                  party, and seats are split by popularity. If a party gets 30%
                  of votes, they get roughly 30% of PR seats. It ensures smaller
                  parties get representation too.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* FPTP vs PR Chart */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-card border border-border rounded-xl p-4 sm:p-8 mb-12"
        >
          <h3 className="text-xl font-semibold mb-6">FPTP vs PR Seats by Party</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={fptpPrData}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 60, bottom: 5 }}
              >
                <XAxis type="number" />
                <YAxis type="category" dataKey="name" width={80} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="fptp" stackId="a" name="FPTP Seats" fill="#003893" />
                <Bar dataKey="pr" stackId="a" name="PR Seats" fill="#DC143C" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-[#003893]" />
              <span className="text-sm text-muted-foreground">FPTP (165 seats)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-[#DC143C]" />
              <span className="text-sm text-muted-foreground">PR (110 seats)</span>
            </div>
          </div>
        </motion.div>

        {/* Vote Share Pie Chart */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-card border border-border rounded-xl p-4 sm:p-8"
        >
          <h3 className="text-xl font-semibold mb-6 text-center">
            Proportional Vote Share
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                  labelLine={false}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number) => [`${value}%`, "Vote Share"]}
                  contentStyle={{
                    backgroundColor: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "8px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <p className="text-center text-sm text-muted-foreground mt-4">
            RSP received nearly <strong className="text-[#DC143C]">48%</strong>{" "}
            of all votes — almost half the country voted for change.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
