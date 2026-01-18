import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Badge } from "@/components/ui/badge";
import { Shield } from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function Privacy() {
  const lastUpdated = "January 18, 2026";

  return (
    <div className="min-h-screen">
      <AnimatedBackground />
      <Navigation />

      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 glass-light rounded-full px-6 py-3 mb-8">
              <Shield className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Privacy & Security</span>
            </div>

            <h1 className="text-5xl sm:text-6xl font-bold mb-6">
              Privacy
              <span className="text-primary"> Policy</span>
            </h1>

            <p className="text-muted-foreground">
              Last updated: {lastUpdated}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card rounded-2xl p-8 md:p-12"
          >
            <div className="prose prose-invert max-w-none">
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                At Neura AI, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose,
                and safeguard your information when you use our service.
              </p>

              <h2 className="text-2xl font-bold mb-4 text-foreground">1. Information We Collect</h2>

              <h3 className="text-xl font-semibold mb-3 text-foreground">Personal Information</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                When you register for an account, we collect:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-6 ml-4">
                <li>Email address</li>
                <li>Name (if provided)</li>
                <li>Password (encrypted)</li>
                <li>Payment information (processed securely)</li>
                <li>IP address and device information</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 text-foreground">Usage Data</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We automatically collect information about your use of the Service:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-6 ml-4">
                <li>Videos, thumbnails, and voiceovers generated</li>
                <li>Prompts and inputs you provide</li>
                <li>Feature usage and interaction patterns</li>
                <li>Browser type and operating system</li>
                <li>Page views and navigation paths</li>
                <li>Time spent on pages</li>
              </ul>

              <h2 className="text-2xl font-bold mb-4 text-foreground">2. How We Use Your Information</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-6 ml-4">
                <li>Provide, maintain, and improve our Service</li>
                <li>Process your transactions and manage your account</li>
                <li>Generate AI content based on your inputs</li>
                <li>Train and improve our AI models</li>
                <li>Send you technical notices and support messages</li>
                <li>Respond to your comments and questions</li>
                <li>Detect and prevent fraud, abuse, and security incidents</li>
                <li>Analyze usage trends and optimize user experience</li>
              </ul>

              <h2 className="text-2xl font-bold mb-4 text-foreground">3. Data Sharing and Disclosure</h2>

              <h3 className="text-xl font-semibold mb-3 text-foreground">Third-Party Services</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We may share your information with:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-6 ml-4">
                <li><strong>AI Service Providers:</strong> OpenAI, Anthropic, ElevenLabs for content generation</li>
                <li><strong>Payment Processors:</strong> For secure payment processing</li>
                <li><strong>Cloud Infrastructure:</strong> For hosting and data storage</li>
                <li><strong>Analytics Providers:</strong> For usage analytics and performance monitoring</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 text-foreground">Legal Requirements</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                We may disclose your information if required to do so by law or in response to valid requests by
                public authorities (e.g., a court or government agency).
              </p>

              <h2 className="text-2xl font-bold mb-4 text-foreground">4. Data Security</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We implement industry-standard security measures to protect your data:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-6 ml-4">
                <li>256-bit SSL/TLS encryption for data in transit</li>
                <li>AES-256 encryption for data at rest</li>
                <li>Regular security audits and penetration testing</li>
                <li>Multi-factor authentication options</li>
                <li>Secure password hashing with bcrypt</li>
                <li>Access controls and role-based permissions</li>
              </ul>

              <h2 className="text-2xl font-bold mb-4 text-foreground">5. Data Retention</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                We retain your personal information for as long as your account is active or as needed to provide you services.
                You may request deletion of your account and data at any time. Some data may be retained for legal or
                business purposes after account deletion.
              </p>

              <h2 className="text-2xl font-bold mb-4 text-foreground">6. Your Rights</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Depending on your location, you may have the following rights:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-6 ml-4">
                <li><strong>Access:</strong> Request a copy of your personal data</li>
                <li><strong>Correction:</strong> Update or correct inaccurate data</li>
                <li><strong>Deletion:</strong> Request deletion of your data</li>
                <li><strong>Portability:</strong> Receive your data in a structured format</li>
                <li><strong>Objection:</strong> Object to processing of your data</li>
                <li><strong>Restriction:</strong> Request restriction of processing</li>
                <li><strong>Withdraw Consent:</strong> Withdraw consent for data processing</li>
              </ul>

              <h2 className="text-2xl font-bold mb-4 text-foreground">7. Cookies and Tracking</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We use cookies and similar technologies to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-6 ml-4">
                <li>Keep you signed in</li>
                <li>Remember your preferences</li>
                <li>Understand how you use our Service</li>
                <li>Improve performance and user experience</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mb-6">
                You can control cookies through your browser settings.
              </p>

              <h2 className="text-2xl font-bold mb-4 text-foreground">8. Children's Privacy</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Our Service is not intended for children under 13 years of age. We do not knowingly collect personal
                information from children under 13. If you are a parent or guardian and believe your child has provided
                us with personal information, please contact us.
              </p>

              <h2 className="text-2xl font-bold mb-4 text-foreground">9. International Data Transfers</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Your information may be transferred to and maintained on servers located outside of your jurisdiction where
                data protection laws may differ. By using our Service, you consent to this transfer.
              </p>

              <h2 className="text-2xl font-bold mb-4 text-foreground">10. GDPR Compliance</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                For users in the European Union, we comply with GDPR requirements. You have the right to lodge a complaint
                with a supervisory authority if you believe our processing of your data violates GDPR.
              </p>

              <h2 className="text-2xl font-bold mb-4 text-foreground">11. CCPA Compliance</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                For California residents, we comply with the California Consumer Privacy Act (CCPA). You have the right to
                know what personal information we collect, use, and disclose, and the right to request deletion of your data.
              </p>

              <h2 className="text-2xl font-bold mb-4 text-foreground">12. Changes to This Privacy Policy</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new
                Privacy Policy on this page and updating the "Last updated" date. Significant changes will be communicated
                via email.
              </p>

              <h2 className="text-2xl font-bold mb-4 text-foreground">13. Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                If you have questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="glass rounded-lg p-6">
                <p className="text-foreground font-medium mb-2">Neura AI Privacy Team</p>
                <p className="text-muted-foreground text-sm">Email: privacy@neuraai.cyou</p>
                <p className="text-muted-foreground text-sm">Address: San Francisco, CA, United States</p>
                <p className="text-muted-foreground text-sm mt-2">Data Protection Officer: dpo@neuraai.cyou</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
