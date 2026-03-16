"use client"

import { motion } from "framer-motion"
import { ExternalLink } from "lucide-react"

const sources = [
  { name: "Election Commission of Nepal", url: "https://election.gov.np" },
  { name: "Wikipedia", url: "https://en.wikipedia.org" },
  { name: "Kathmandu Post", url: "https://kathmandupost.com" },
  { name: "NepInsights", url: "https://nepinsights.com" },
]

export function Footer() {
  return (
    <footer className="py-12 px-4 bg-card border-t border-border">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Logo */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#DC143C] to-[#003893] flex items-center justify-center text-white font-bold">
              NE
            </div>
            <div className="text-left">
              <div className="font-semibold text-foreground">
                Nepal Election 2082
              </div>
              <div className="text-xs text-muted-foreground">
                नेपाल निर्वाचन २०८२
              </div>
            </div>
          </div>

          {/* Data Sources */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-foreground mb-3">
              Data Sources
            </h4>
            <div className="flex flex-wrap justify-center gap-4">
              {sources.map((source) => (
                <a
                  key={source.name}
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {source.name}
                  <ExternalLink className="w-3 h-3" />
                </a>
              ))}
            </div>
          </div>

          {/* Disclaimer */}
          <div className="p-4 rounded-lg bg-muted/50 max-w-2xl mx-auto mb-6">
            <p className="text-xs text-muted-foreground">
              <strong>Disclaimer:</strong> This site is for public education
              only. Data reflects results as of March 10, 2026. The information
              presented is based on publicly available data and is intended to
              help citizens understand the election outcomes. This is not an
              official government resource.
            </p>
          </div>

          {/* Copyright */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-xs text-muted-foreground">
            <span>Made with care for democracy</span>
            <span className="hidden sm:inline">•</span>
            <span>Data as of Falgun 25, 2082 BS (March 10, 2026)</span>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
