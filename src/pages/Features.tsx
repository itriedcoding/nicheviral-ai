import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Video, Zap, TrendingUp, Globe, Sparkles, Lock, Smartphone, BarChart } from "lucide-react";
import { Link } from "react-router";

export default function Features() {
  const features = [
    {
      icon: <Video className="h-8 w-8 text-primary" />,
      title: "Multi-Model AI Generation",
      description: "Access the world's best video models including Runway Gen-3, Luma Dream Machine, and more from a single interface."
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-primary" />,
      title: "Niche Discovery Engine",
      description: "Our AI analyzes millions of data points to identify high-growth, low-competition niches for your channel."
    },
    {
      icon: <Zap className="h-8 w-8 text-primary" />,
      title: "Instant Generation",
      description: "Generate videos in minutes, not hours. Our optimized pipeline ensures the fastest possible delivery times."
    },
    {
      icon: <Globe className="h-8 w-8 text-primary" />,
      title: "Global Content",
      description: "Automatically translate and dub your videos into 30+ languages to reach a worldwide audience."
    },
    {
      icon: <Smartphone className="h-8 w-8 text-primary" />,
      title: "Social Optimized",
      description: "Auto-formatting for YouTube Shorts, TikTok, and Instagram Reels with perfect aspect ratios."
    },
    {
      icon: <BarChart className="h-8 w-8 text-primary" />,
      title: "Real-time Analytics",
      description: "Track your video performance and get AI-driven recommendations to improve engagement."
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      {/* Hero */}
      <section className="pt-32 pb-20 px-4 bg-secondary/30">
        <div className="container mx-auto text-center max-w-4xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-6 text-primary"
          >
            Powerful Features for Modern Creators
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted-foreground mb-10"
          >
            Everything you need to build, grow, and monetize your audience using the power of Artificial Intelligence.
          </motion.p>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-8 rounded-2xl border border-border bg-card hover:shadow-lg transition-all hover:border-primary/20"
              >
                <div className="mb-6 p-4 bg-primary/5 rounded-xl inline-block">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-primary/5">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to experience the future?</h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Join thousands of creators who are already using our platform to dominate their niches.
          </p>
          <Link to="/auth">
            <Button size="lg" className="h-14 px-10 text-lg rounded-full shadow-xl shadow-primary/20">
              Start Creating Now
              <Sparkles className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}