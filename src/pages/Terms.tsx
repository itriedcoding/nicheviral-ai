import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileText } from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function Terms() {
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
              <FileText className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Legal</span>
            </div>

            <h1 className="text-5xl sm:text-6xl font-bold mb-6">
              Terms of
              <span className="text-primary"> Service</span>
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
              <h2 className="text-2xl font-bold mb-4 text-foreground">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                By accessing and using Neura AI ("Service"), you accept and agree to be bound by the terms and provision of this agreement.
                If you do not agree to abide by the above, please do not use this service.
              </p>

              <h2 className="text-2xl font-bold mb-4 text-foreground">2. Use License</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Permission is granted to temporarily use the Service for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-6 ml-4">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose or for any public display</li>
                <li>Attempt to reverse engineer any software contained on Neura AI's platform</li>
                <li>Remove any copyright or other proprietary notations from the materials</li>
                <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
              </ul>

              <h2 className="text-2xl font-bold mb-4 text-foreground">3. Account Terms</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                To access certain features of the Service, you must create an account. When you create an account:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-6 ml-4">
                <li>You must provide accurate and complete information</li>
                <li>You are responsible for maintaining the security of your account and password</li>
                <li>You are responsible for all activities that occur under your account</li>
                <li>You must immediately notify us of any unauthorized uses of your account</li>
                <li>You must not use the Service for any illegal or unauthorized purpose</li>
              </ul>

              <h2 className="text-2xl font-bold mb-4 text-foreground">4. Payment Terms</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                For paid services:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-6 ml-4">
                <li>You agree to pay all fees associated with your selected plan</li>
                <li>All fees are in USD and non-refundable unless otherwise stated</li>
                <li>We reserve the right to change our pricing with 30 days notice</li>
                <li>Credits purchased do not expire but may not be transferred or refunded</li>
                <li>Failure to pay may result in termination of your account</li>
              </ul>

              <h2 className="text-2xl font-bold mb-4 text-foreground">5. Intellectual Property</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Content created using Neura AI:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-6 ml-4">
                <li>You retain ownership of content you create using our Service</li>
                <li>You grant us a license to use your content for improving our AI models</li>
                <li>We retain ownership of our AI models, platform, and underlying technology</li>
                <li>You may not redistribute or resell our AI models or platform features</li>
              </ul>

              <h2 className="text-2xl font-bold mb-4 text-foreground">6. Prohibited Uses</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                You may not use the Service to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-6 ml-4">
                <li>Violate any applicable laws or regulations</li>
                <li>Infringe upon intellectual property rights of others</li>
                <li>Generate illegal, harmful, or malicious content</li>
                <li>Spam, phish, or conduct fraudulent activities</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Interfere with or disrupt the Service or servers</li>
                <li>Create deepfakes or misleading content without disclosure</li>
              </ul>

              <h2 className="text-2xl font-bold mb-4 text-foreground">7. Content Guidelines</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Content generated must not contain illegal material, hate speech, explicit adult content,
                violence, harassment, or violate any person's rights. We reserve the right to remove content
                and terminate accounts that violate these guidelines.
              </p>

              <h2 className="text-2xl font-bold mb-4 text-foreground">8. Service Availability</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                We strive for 99.9% uptime but do not guarantee uninterrupted access. We may temporarily
                suspend the Service for maintenance or updates. We are not liable for any disruption to your use of the Service.
              </p>

              <h2 className="text-2xl font-bold mb-4 text-foreground">9. Limitation of Liability</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                In no event shall Neura AI or its suppliers be liable for any damages (including, without limitation,
                damages for loss of data or profit, or due to business interruption) arising out of the use or inability
                to use the Service, even if Neura AI or an authorized representative has been notified orally or in writing
                of the possibility of such damage.
              </p>

              <h2 className="text-2xl font-bold mb-4 text-foreground">10. Privacy and Data Protection</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Your use of the Service is also governed by our Privacy Policy. We take data protection seriously
                and comply with GDPR, CCPA, and other applicable privacy laws.
              </p>

              <h2 className="text-2xl font-bold mb-4 text-foreground">11. Termination</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                We may terminate or suspend your account immediately, without prior notice or liability,
                for any reason whatsoever, including without limitation if you breach the Terms. Upon termination,
                your right to use the Service will immediately cease.
              </p>

              <h2 className="text-2xl font-bold mb-4 text-foreground">12. Changes to Terms</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                We reserve the right to modify or replace these Terms at any time. We will provide notice of
                significant changes by posting on our website or via email. Your continued use of the Service
                after changes constitutes acceptance of the new Terms.
              </p>

              <h2 className="text-2xl font-bold mb-4 text-foreground">13. Governing Law</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                These Terms shall be governed by and construed in accordance with the laws of California,
                United States, without regard to its conflict of law provisions.
              </p>

              <h2 className="text-2xl font-bold mb-4 text-foreground">14. Dispute Resolution</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Any dispute arising from these Terms will be resolved through binding arbitration in accordance
                with the rules of the American Arbitration Association, rather than in court.
              </p>

              <h2 className="text-2xl font-bold mb-4 text-foreground">15. Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                If you have any questions about these Terms, please contact us at:
              </p>
              <div className="glass rounded-lg p-6">
                <p className="text-foreground font-medium mb-2">Neura AI Legal Department</p>
                <p className="text-muted-foreground text-sm">Email: legal@neuraai.cyou</p>
                <p className="text-muted-foreground text-sm">Address: San Francisco, CA, United States</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
