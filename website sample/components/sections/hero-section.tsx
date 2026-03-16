"use client"

import { motion } from "framer-motion"
import { ChevronDown, Users, Vote, Award, Trophy } from "lucide-react"
import overview from "@/data/overview.json"
import seats from "@/data/seats.json"

const stats = [
  {
    label: "Registered Voters",
    labelNp: "दर्ता भोटरहरू",
    value: overview.registeredVoters.toLocaleString(),
    icon: Users,
    color: "bg-[#003893]",
  },
  {
    label: "Voter Turnout",
    labelNp: "मतदान प्रतिशत",
    value: `${overview.estimatedTurnoutPercent}%`,
    icon: Vote,
    color: "bg-[#DC143C]",
  },
  {
    label: "Total Seats",
    labelNp: "कुल सिटहरू",
    value: overview.totalSeats.toString(),
    icon: Award,
    color: "bg-[#003893]",
  },
  {
    label: "Winning Party",
    labelNp: "विजेता पार्टी",
    value: "RSP",
    subValue: `${seats[0].total} seats`,
    icon: Trophy,
    color: "bg-[#DC143C]",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
}

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20 overflow-hidden"
    >
      {/* Background with mountain silhouette */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#003893]/5 via-background to-background" />
      <div className="absolute inset-0 overflow-hidden">
        <svg
          className="absolute bottom-0 w-full h-64 text-[#003893]/5"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="currentColor"
            d="M0,160L60,144C120,128,240,96,360,112C480,128,600,192,720,208C840,224,960,192,1080,160C1200,128,1320,96,1380,80L1440,64L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          />
        </svg>
        <svg
          className="absolute bottom-0 w-full h-48 text-[#DC143C]/5"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="currentColor"
            d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,261.3C960,256,1056,224,1152,197.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
      </div>

      <motion.div
        className="relative z-10 text-center max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Badge */}
        <motion.div variants={itemVariants} className="mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#DC143C]/10 text-[#DC143C] text-sm font-medium border border-[#DC143C]/20">
            <span className="w-2 h-2 rounded-full bg-[#DC143C] animate-pulse" />
            {overview.electionDate}
          </span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4"
        >
          <span className="text-foreground">Nepal Voted for </span>
          <span className="text-[#DC143C]">Change</span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-2xl sm:text-3xl md:text-4xl font-medium text-[#003893] mb-8"
        >
          नेपालले परिवर्तनलाई मत दियो
        </motion.p>

        <motion.p
          variants={itemVariants}
          className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12"
        >
          The 2082 federal election saw the largest political shift in Nepal
          since democracy was restored. For the first time since 1999, a single
          party won enough seats to govern alone.
        </motion.p>

        {/* Stats Grid */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="relative group"
            >
              <div className="bg-card border border-border rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow">
                <div
                  className={`inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-lg ${stat.color} text-white mb-3`}
                >
                  <stat.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-foreground mb-1">
                  {stat.value}
                </div>
                {stat.subValue && (
                  <div className="text-sm text-[#DC143C] font-medium mb-1">
                    {stat.subValue}
                  </div>
                )}
                <div className="text-xs sm:text-sm text-muted-foreground">
                  {stat.label}
                </div>
                <div className="text-xs text-muted-foreground/70">
                  {stat.labelNp}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.a
          href="#timeline"
          variants={itemVariants}
          className="inline-flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-sm">Scroll to explore</span>
          <ChevronDown className="w-5 h-5" />
        </motion.a>
      </motion.div>
    </section>
  )
}
