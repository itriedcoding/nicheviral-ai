import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Badge } from "@/components/ui/badge";
import { Cookie, Shield, Settings, Eye } from "lucide-react";

export default function CookiePolicy() {
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
              <Cookie className="w-3 h-3 mr-1" />
              Last Updated: January 18, 2026
            </Badge>
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-red-500 bg-clip-text text-transparent">
              Cookie Policy
            </h1>
            <p className="text-xl text-muted-foreground">
              How we use cookies and similar technologies
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card rounded-xl p-8 space-y-8"
          >
            {/* Introduction */}
            <section>
              <h2 className="text-2xl font-bold mb-4">What Are Cookies?</h2>
              <p className="text-muted-foreground leading-relaxed">
                Cookies are small text files that are placed on your device when you visit our website. They help us provide you with a better experience by remembering your preferences, understanding how you use our services, and improving our platform.
              </p>
            </section>

            {/* Types of Cookies */}
            <section>
              <h2 className="text-2xl font-bold mb-6">Types of Cookies We Use</h2>

              <div className="space-y-4">
                <div className="glass rounded-lg p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Shield className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2">Essential Cookies</h3>
                      <p className="text-muted-foreground mb-3">
                        Required for the website to function properly. These cannot be disabled.
                      </p>
                      <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                        <li>Authentication and security</li>
                        <li>Session management</li>
                        <li>Load balancing</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="glass rounded-lg p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Settings className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2">Functional Cookies</h3>
                      <p className="text-muted-foreground mb-3">
                        Remember your preferences and choices to provide a personalized experience.
                      </p>
                      <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                        <li>Language preferences</li>
                        <li>UI customization settings</li>
                        <li>Recently viewed content</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="glass rounded-lg p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Eye className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2">Analytics Cookies</h3>
                      <p className="text-muted-foreground mb-3">
                        Help us understand how visitors interact with our website.
                      </p>
                      <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                        <li>Page views and navigation patterns</li>
                        <li>Feature usage statistics</li>
                        <li>Performance monitoring</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Third-Party Cookies */}
            <section>
              <h2 className="text-2xl font-bold mb-4">Third-Party Cookies</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We use services from trusted third parties that may set cookies on your device:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span><strong>Google Analytics:</strong> To understand website usage and improve our services</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span><strong>Authentication Providers:</strong> For secure sign-in functionality</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span><strong>CDN Services:</strong> To deliver content efficiently and securely</span>
                </li>
              </ul>
            </section>

            {/* Managing Cookies */}
            <section>
              <h2 className="text-2xl font-bold mb-4">Managing Your Cookie Preferences</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                You have control over which cookies are set on your device:
              </p>
              <div className="glass rounded-lg p-6">
                <h3 className="font-bold mb-3">Browser Settings</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Most browsers allow you to control cookies through settings. You can:
                </p>
                <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside">
                  <li>Block all cookies</li>
                  <li>Accept only first-party cookies</li>
                  <li>Delete cookies when closing the browser</li>
                  <li>View and delete individual cookies</li>
                </ul>
                <p className="text-sm text-muted-foreground mt-4">
                  Note: Blocking essential cookies may affect website functionality.
                </p>
              </div>
            </section>

            {/* Cookie Duration */}
            <section>
              <h2 className="text-2xl font-bold mb-4">How Long Do Cookies Last?</h2>
              <div className="space-y-3">
                <div className="glass rounded-lg p-4">
                  <h3 className="font-bold mb-2">Session Cookies</h3>
                  <p className="text-sm text-muted-foreground">
                    Temporary cookies that expire when you close your browser
                  </p>
                </div>
                <div className="glass rounded-lg p-4">
                  <h3 className="font-bold mb-2">Persistent Cookies</h3>
                  <p className="text-sm text-muted-foreground">
                    Remain on your device for a set period (up to 12 months) or until you delete them
                  </p>
                </div>
              </div>
            </section>

            {/* Updates */}
            <section>
              <h2 className="text-2xl font-bold mb-4">Changes to This Policy</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may update this Cookie Policy from time to time to reflect changes in our practices or legal requirements. We'll notify you of significant changes by posting a notice on our website or sending you an email.
              </p>
            </section>

            {/* Contact */}
            <section className="glass rounded-lg p-6 bg-primary/5">
              <h2 className="text-2xl font-bold mb-4">Questions?</h2>
              <p className="text-muted-foreground mb-4">
                If you have any questions about our use of cookies, please contact us:
              </p>
              <div className="space-y-2 text-sm">
                <p><span className="text-muted-foreground">Email:</span> <span className="text-primary">privacy@neuraai.cyou</span></p>
                <p><span className="text-muted-foreground">Address:</span> 123 AI Street, San Francisco, CA 94105</p>
              </div>
            </section>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
