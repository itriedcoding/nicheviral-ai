import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Badge } from "@/components/ui/badge";

export default function CookiePolicy() {
  return (
    <div className="min-h-screen">
      <AnimatedBackground />
      <Navigation />

      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">
              Legal
            </Badge>
            <h1 className="text-4xl font-bold mb-4">Cookie Policy</h1>
            <p className="text-muted-foreground">Last updated: January 15, 2026</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card p-8 rounded-2xl space-y-8 text-muted-foreground"
          >
            <section>
              <h2 className="text-xl font-bold text-foreground mb-4">1. What Are Cookies</h2>
              <p>
                Cookies are small text files that are placed on your computer or mobile device when you visit our website. They are widely used to make websites work more efficiently and provide information to the owners of the site.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground mb-4">2. How We Use Cookies</h2>
              <p className="mb-4">We use cookies for the following purposes:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong className="text-foreground">Essential Cookies:</strong> Necessary for the website to function (e.g., authentication).</li>
                <li><strong className="text-foreground">Analytics Cookies:</strong> To understand how visitors interact with our website (e.g., Google Analytics).</li>
                <li><strong className="text-foreground">Preference Cookies:</strong> To remember your settings and preferences.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground mb-4">3. Managing Cookies</h2>
              <p>
                Most web browsers allow you to control cookies through their settings preferences. However, if you limit the ability of websites to set cookies, you may worsen your overall user experience, since it will no longer be personalized to you.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground mb-4">4. Contact Us</h2>
              <p>
                If you have any questions about our use of cookies, please contact us at <a href="mailto:privacy@nicheviral.ai" className="text-primary hover:underline">privacy@nicheviral.ai</a>.
              </p>
            </section>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}