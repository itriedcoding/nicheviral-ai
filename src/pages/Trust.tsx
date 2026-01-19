import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Badge } from "@/components/ui/badge";
import { Shield, FileText, Lock, Globe, CheckCircle2, Download } from "lucide-react";
import { Link } from "react-router";

export default function Trust() {
  const certifications = [
    {
      name: "SOC 2 Type II",
      description: "Independently audited for security, availability, and confidentiality",
      status: "Certified",
      date: "Valid through Dec 2026",
    },
    {
      name: "GDPR Compliant",
      description: "Full compliance with EU General Data Protection Regulation",
      status: "Compliant",
      date: "Updated Jan 2026",
    },
    {
      name: "CCPA Compliant",
      description: "California Consumer Privacy Act compliance",
      status: "Compliant",
      date: "Updated Jan 2026",
    },
    {
      name: "ISO 27001",
      description: "Information security management system standard",
      status: "In Progress",
      date: "Expected Q2 2026",
    },
  ];

  const transparencyReports = [
    {
      period: "Q4 2025",
      requests: "0 government requests",
      incidents: "0 data breaches",
      uptime: "99.95%",
    },
    {
      period: "Q3 2025",
      requests: "0 government requests",
      incidents: "0 data breaches",
      uptime: "99.97%",
    },
    {
      period: "Q2 2025",
      requests: "0 government requests",
      incidents: "0 data breaches",
      uptime: "99.94%",
    },
  ];

  const dataProcessing = [
    {
      title: "Data Collection",
      description: "We collect only essential data: email for authentication, generated content for storage, and usage logs for monitoring.",
    },
    {
      title: "Data Storage",
      description: "All data stored in Convex serverless database with encryption at rest (AES-256) and automatic backups.",
    },
    {
      title: "Data Processing",
      description: "AI generation requests processed through secure APIs. No training on user data. Content deleted after 90 days unless saved.",
    },
    {
      title: "Data Retention",
      description: "User content: 90 days. Account data: until deletion requested. Audit logs: 1 year. Backups: 30 days.",
    },
    {
      title: "Data Deletion",
      description: "Users can request full data deletion anytime. Processed within 30 days in compliance with GDPR right to erasure.",
    },
    {
      title: "Third-Party Sharing",
      description: "We never sell your data. Third-party AI APIs process generation requests only. No data sharing with advertisers.",
    },
  ];

  const privacyControls = [
    "Export all your data in JSON format",
    "Delete your account and all associated data",
    "Control which data is stored and for how long",
    "Opt out of usage analytics (basic functionality analytics only)",
    "Review audit logs of all account activity",
    "Two-factor authentication for account security",
  ];

  return (
    <div className="min-h-screen">
      <AnimatedBackground />
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <Badge className="mb-4">Trust Center</Badge>
          <h1 className="text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary to-red-500 bg-clip-text text-transparent">
              Trust & Compliance
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Transparency, compliance, and privacy are at the core of everything we do.
          </p>
        </motion.div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold mb-8">Certifications & Compliance</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="glass-card rounded-2xl p-8"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold mb-2">{cert.name}</h3>
                    <p className="text-muted-foreground text-sm mb-2">{cert.description}</p>
                    <p className="text-xs text-muted-foreground">{cert.date}</p>
                  </div>
                  <Badge className={cert.status === "Certified" || cert.status === "Compliant" ? "bg-green-500/10 text-green-500" : "bg-blue-500/10 text-blue-500"}>
                    {cert.status}
                  </Badge>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Transparency Reports */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="glass-card rounded-2xl p-8 mb-16"
        >
          <h2 className="text-3xl font-bold mb-6">Transparency Reports</h2>
          <p className="text-muted-foreground mb-8">
            Quarterly reports on government requests, security incidents, and system uptime.
          </p>
          <div className="space-y-6">
            {transparencyReports.map((report, index) => (
              <motion.div
                key={report.period}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="border border-muted rounded-xl p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">{report.period}</h3>
                  <Download className="w-5 h-5 text-primary cursor-pointer hover:scale-110 transition-transform" />
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-green-500">{report.requests}</div>
                    <div className="text-sm text-muted-foreground">Gov. Requests</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-500">{report.incidents}</div>
                    <div className="text-sm text-muted-foreground">Data Breaches</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">{report.uptime}</div>
                    <div className="text-sm text-muted-foreground">Uptime</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Data Processing */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold mb-8">Data Processing & Privacy</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {dataProcessing.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="glass-card rounded-2xl p-6"
              >
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Privacy Controls */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="glass-card rounded-2xl p-8 mb-16"
        >
          <h2 className="text-3xl font-bold mb-6">Your Privacy Controls</h2>
          <p className="text-muted-foreground mb-8">
            You have full control over your data. Here's what you can do:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {privacyControls.map((control, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="flex items-start gap-3 p-4 rounded-xl hover:bg-muted/50 transition-colors"
              >
                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">{control}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Policy Links */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="grid md:grid-cols-3 gap-6"
        >
          <Link to="/privacy">
            <div className="glass-card rounded-2xl p-8 cursor-pointer hover:red-glow transition-all">
              <Lock className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-semibold mb-2">Privacy Policy</h3>
              <p className="text-sm text-muted-foreground">
                How we collect, use, and protect your data
              </p>
            </div>
          </Link>

          <Link to="/terms">
            <div className="glass-card rounded-2xl p-8 cursor-pointer hover:red-glow transition-all">
              <FileText className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-semibold mb-2">Terms of Service</h3>
              <p className="text-sm text-muted-foreground">
                Legal terms and conditions of use
              </p>
            </div>
          </Link>

          <Link to="/security">
            <div className="glass-card rounded-2xl p-8 cursor-pointer hover:red-glow transition-all">
              <Shield className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-semibold mb-2">Security Center</h3>
              <p className="text-sm text-muted-foreground">
                Our security practices and measures
              </p>
            </div>
          </Link>
        </motion.div>

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-16 text-center"
        >
          <p className="text-muted-foreground mb-4">
            Have questions about our privacy, security, or compliance practices?
          </p>
          <Link to="/contact">
            <Badge className="cursor-pointer hover:red-glow">Contact Us</Badge>
          </Link>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
