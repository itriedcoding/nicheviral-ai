import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, Check, Download, Trash2, Eye, Lock, UserCheck, Mail } from "lucide-react";

export default function GDPR() {
  const rights = [
    {
      icon: Eye,
      title: "Right to Access",
      description: "Request a copy of all personal data we hold about you"
    },
    {
      icon: Lock,
      title: "Right to Rectification",
      description: "Correct any inaccurate or incomplete personal information"
    },
    {
      icon: Trash2,
      title: "Right to Erasure",
      description: "Request deletion of your personal data ('right to be forgotten')"
    },
    {
      icon: UserCheck,
      title: "Right to Restriction",
      description: "Limit how we process your personal data in certain circumstances"
    },
    {
      icon: Download,
      title: "Right to Data Portability",
      description: "Receive your data in a structured, commonly used format"
    },
    {
      icon: Shield,
      title: "Right to Object",
      description: "Object to processing of your data for specific purposes"
    }
  ];

  return (
    <div className="min-h-screen">
      <AnimatedBackground />
      <Navigation />

      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">
              <Shield className="w-3 h-3 mr-1" />
              GDPR Compliance
            </Badge>
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-red-500 bg-clip-text text-transparent">
              GDPR & Data Rights
            </h1>
            <p className="text-xl text-muted-foreground">
              Your data protection rights under the General Data Protection Regulation
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-8"
          >
            {/* Introduction */}
            <div className="glass-card rounded-xl p-8">
              <h2 className="text-2xl font-bold mb-4">Our Commitment to GDPR</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Neura AI is committed to protecting your personal data and respecting your privacy rights under the General Data Protection Regulation (GDPR). We ensure that all personal data is processed lawfully, fairly, and transparently.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                If you are a resident of the European Economic Area (EEA), United Kingdom, or Switzerland, you have specific rights regarding your personal data as outlined below.
              </p>
            </div>

            {/* Your Rights */}
            <div className="glass-card rounded-xl p-8">
              <h2 className="text-2xl font-bold mb-6">Your Data Protection Rights</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {rights.map((right, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.05 }}
                    className="glass rounded-lg p-4"
                  >
                    <div className="flex items-start gap-3">
                      <div className="bg-primary/10 w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <right.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-bold mb-1">{right.title}</h3>
                        <p className="text-sm text-muted-foreground">{right.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* How We Process Data */}
            <div className="glass-card rounded-xl p-8">
              <h2 className="text-2xl font-bold mb-6">How We Process Your Data</h2>
              <div className="space-y-4">
                <div className="glass rounded-lg p-4">
                  <h3 className="font-bold mb-2 flex items-center gap-2">
                    <Check className="w-5 h-5 text-primary" />
                    Lawful Basis
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    We process your data based on: your consent, contractual necessity, legal obligations, legitimate interests, or vital interests.
                  </p>
                </div>

                <div className="glass rounded-lg p-4">
                  <h3 className="font-bold mb-2 flex items-center gap-2">
                    <Check className="w-5 h-5 text-primary" />
                    Data Minimization
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    We only collect and process data that is necessary for our services and delete it when no longer needed.
                  </p>
                </div>

                <div className="glass rounded-lg p-4">
                  <h3 className="font-bold mb-2 flex items-center gap-2">
                    <Check className="w-5 h-5 text-primary" />
                    Security Measures
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    We implement industry-standard security measures including encryption, access controls, and regular security audits.
                  </p>
                </div>

                <div className="glass rounded-lg p-4">
                  <h3 className="font-bold mb-2 flex items-center gap-2">
                    <Check className="w-5 h-5 text-primary" />
                    Data Retention
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    We retain your data only as long as necessary to provide services or as required by law (typically 3-7 years for business records).
                  </p>
                </div>
              </div>
            </div>

            {/* International Transfers */}
            <div className="glass-card rounded-xl p-8">
              <h2 className="text-2xl font-bold mb-4">International Data Transfers</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Your personal data may be transferred to and processed in countries outside the EEA. When we do this, we ensure:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-muted-foreground">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Use of Standard Contractual Clauses approved by the European Commission</span>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Transfers only to countries with adequate data protection laws</span>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Implementation of appropriate safeguards to protect your data</span>
                </li>
              </ul>
            </div>

            {/* Exercising Your Rights */}
            <div className="glass-card rounded-xl p-8">
              <h2 className="text-2xl font-bold mb-4">How to Exercise Your Rights</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                To exercise any of your data protection rights, you can:
              </p>

              <div className="space-y-3 mb-6">
                <div className="glass rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-bold">Email Our DPO</p>
                      <p className="text-sm text-primary">dpo@neura-ai.com</p>
                    </div>
                  </div>
                </div>

                <div className="glass rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <UserCheck className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-bold">Visit Your Account Settings</p>
                      <p className="text-sm text-muted-foreground">Manage preferences directly in your dashboard</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass rounded-lg p-4 bg-primary/5">
                <p className="text-sm text-muted-foreground mb-3">
                  <strong>Response Time:</strong> We will respond to your request within 30 days. If we need more time, we'll let you know why and when you can expect a response.
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>Verification:</strong> We may need to verify your identity before processing your request to ensure data security.
                </p>
              </div>
            </div>

            {/* Complaints */}
            <div className="glass-card rounded-xl p-8">
              <h2 className="text-2xl font-bold mb-4">Right to Lodge a Complaint</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                If you believe we haven't handled your personal data properly, you have the right to lodge a complaint with:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Your local data protection authority in the EEA</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>The Information Commissioner's Office (ICO) in the UK</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>The Federal Data Protection and Information Commissioner (FDPIC) in Switzerland</span>
                </li>
              </ul>
            </div>

            {/* CTA */}
            <div className="glass-card rounded-xl p-8 text-center">
              <Shield className="w-16 h-16 text-primary mx-auto mb-6" />
              <h2 className="text-2xl font-bold mb-4">Need Help?</h2>
              <p className="text-muted-foreground mb-6">
                Our Data Protection Officer is here to assist you with any questions or concerns
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Button className="red-glow">
                  Contact DPO
                </Button>
                <Button variant="outline" className="glass">
                  Download My Data
                </Button>
                <Button variant="outline" className="glass">
                  Delete My Account
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
