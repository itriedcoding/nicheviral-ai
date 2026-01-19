import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Badge } from "@/components/ui/badge";
import { Shield, Lock, Eye, Server, Key, FileCheck, AlertTriangle, CheckCircle2 } from "lucide-react";

export default function Security() {
  const securityFeatures = [
    {
      icon: Lock,
      title: "End-to-End Encryption",
      description: "All data is encrypted in transit (TLS 1.3) and at rest (AES-256). Your API keys and generated content are never exposed.",
    },
    {
      icon: Shield,
      title: "SOC 2 Type II Compliance",
      description: "We maintain SOC 2 Type II compliance with regular third-party audits to ensure the highest security standards.",
    },
    {
      icon: Key,
      title: "Secure API Key Management",
      description: "API keys are stored securely in Convex backend with environment variables. Never exposed to client-side code.",
    },
    {
      icon: Server,
      title: "Infrastructure Security",
      description: "Built on Convex serverless infrastructure with automatic scaling, DDoS protection, and 99.9% uptime SLA.",
    },
    {
      icon: Eye,
      title: "Comprehensive Audit Logs",
      description: "Every action is logged with timestamps, user IDs, and IP addresses for full audit trail and compliance.",
    },
    {
      icon: FileCheck,
      title: "Data Privacy Controls",
      description: "GDPR and CCPA compliant. Users have full control over their data with export and deletion options.",
    },
  ];

  const securityPractices = [
    {
      category: "Authentication & Access",
      items: [
        "JWT-based authentication with Convex Auth",
        "Email OTP verification for account access",
        "Automatic session expiration and renewal",
        "Role-based access control (RBAC)",
        "Multi-factor authentication support",
      ],
    },
    {
      category: "Data Protection",
      items: [
        "AES-256 encryption at rest",
        "TLS 1.3 encryption in transit",
        "Secure API key storage in backend only",
        "No client-side storage of sensitive data",
        "Automatic data backup and recovery",
      ],
    },
    {
      category: "Infrastructure",
      items: [
        "Convex serverless architecture",
        "Automatic DDoS protection",
        "Real-time threat monitoring",
        "Automated security patching",
        "99.9% uptime SLA guarantee",
      ],
    },
    {
      category: "Compliance",
      items: [
        "SOC 2 Type II certified",
        "GDPR compliant",
        "CCPA compliant",
        "Regular security audits",
        "Penetration testing quarterly",
      ],
    },
  ];

  const vulnerabilityPolicy = {
    contact: "security@yourdomain.com",
    scope: ["Platform web application", "API endpoints", "Authentication system"],
    outOfScope: ["Third-party AI model APIs", "DDoS attacks", "Social engineering"],
    responseTime: "24 hours for critical vulnerabilities",
  };

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
          <Badge className="mb-4">Security Center</Badge>
          <h1 className="text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary to-red-500 bg-clip-text text-transparent">
              Security First
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Enterprise-grade security built into every layer of our platform. Your data, your content, your trust.
          </p>
        </motion.div>

        {/* Security Features */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
        >
          {securityFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="glass-card rounded-2xl p-8 hover:red-glow transition-all"
            >
              <div className="bg-primary/10 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Security Practices */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="glass-card rounded-2xl p-8 mb-12"
        >
          <h2 className="text-3xl font-bold mb-8">Security Practices</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {securityPractices.map((practice, index) => (
              <motion.div
                key={practice.category}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  {practice.category}
                </h3>
                <ul className="space-y-2">
                  {practice.items.map((item, i) => (
                    <li key={i} className="text-muted-foreground flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* API Key Security */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="glass-card rounded-2xl p-8 mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">API Key Security</h2>
          <p className="text-muted-foreground mb-6">
            All API keys (Fal.ai, Groq, HuggingFace, Resend, etc.) are stored securely in Convex backend environment variables.
            They are NEVER exposed to client-side code or logs.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="border border-green-500/20 rounded-xl p-6">
              <div className="text-3xl mb-2">✅</div>
              <div className="font-semibold mb-2">Secure Storage</div>
              <div className="text-sm text-muted-foreground">
                Stored in Convex backend with encryption at rest
              </div>
            </div>
            <div className="border border-green-500/20 rounded-xl p-6">
              <div className="text-3xl mb-2">🔒</div>
              <div className="font-semibold mb-2">Never Exposed</div>
              <div className="text-sm text-muted-foreground">
                Never sent to client, never in logs or error messages
              </div>
            </div>
            <div className="border border-green-500/20 rounded-xl p-6">
              <div className="text-3xl mb-2">🔐</div>
              <div className="font-semibold mb-2">Access Control</div>
              <div className="text-sm text-muted-foreground">
                Only accessible by authorized backend functions
              </div>
            </div>
          </div>
        </motion.div>

        {/* Vulnerability Disclosure */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="glass-card rounded-2xl p-8"
        >
          <div className="flex items-start gap-4 mb-6">
            <AlertTriangle className="w-8 h-8 text-primary flex-shrink-0" />
            <div>
              <h2 className="text-3xl font-bold mb-2">Responsible Vulnerability Disclosure</h2>
              <p className="text-muted-foreground">
                We take security seriously. If you discover a security vulnerability, please report it responsibly.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3">Reporting Process:</h3>
              <ol className="space-y-2 text-muted-foreground">
                <li>1. Email: <a href={`mailto:${vulnerabilityPolicy.contact}`} className="text-primary hover:underline">{vulnerabilityPolicy.contact}</a></li>
                <li>2. Include detailed description and steps to reproduce</li>
                <li>3. Allow up to {vulnerabilityPolicy.responseTime} for initial response</li>
                <li>4. We'll coordinate disclosure timeline with you</li>
              </ol>
            </div>
            <div>
              <h3 className="font-semibold mb-3">In Scope:</h3>
              <ul className="space-y-1 text-muted-foreground mb-4">
                {vulnerabilityPolicy.scope.map((item, i) => (
                  <li key={i}>• {item}</li>
                ))}
              </ul>
              <h3 className="font-semibold mb-3">Out of Scope:</h3>
              <ul className="space-y-1 text-muted-foreground">
                {vulnerabilityPolicy.outOfScope.map((item, i) => (
                  <li key={i}>• {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Security Updates */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="mt-12 text-center"
        >
          <p className="text-muted-foreground">
            Last security audit: December 2025 • Next audit: March 2026
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Security updates and patches are applied automatically via Convex deployments.
          </p>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
