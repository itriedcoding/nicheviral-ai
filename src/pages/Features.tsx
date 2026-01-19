import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Video, Zap, TrendingUp, Globe, Sparkles, Lock, Smartphone, BarChart, Gamepad2, Image as ImageIcon } from "lucide-react";
import { Link } from "react-router";

export default function Features() {
  const features = [
    {
      icon: <TrendingUp className="h-8 w-8 text-primary" />,
      title: "Roblox Trend Discovery",
      description: "Real-time analysis of the Roblox marketplace. Identify breakout games and trending genres before they go viral."
    },
    {
      icon: <ImageIcon className="h-8 w-8 text-primary" />,
      title: "AI Thumbnail Studio",
      description: "Generate high-CTR 3D thumbnails for your Roblox games in seconds. Supports multiple styles including DALL-E 3 and Midjourney-style rendering."
    },
    {
      icon: <Gamepad2 className="h-8 w-8 text-primary" />,
      title: "Game Analytics",
      description: "Deep dive into game performance metrics. Track concurrent players, visits, and growth rates to optimize your strategy."
    },
    {
      icon: <Video className="h-8 w-8 text-primary" />,
      title: "AI Video Trailers",
      description: "Create cinematic trailers for your games using advanced video generation models like Runway Gen-3 and Luma Dream Machine."
    },
    {
      icon: <Smartphone className="h-8 w-8 text-primary" />,
      title: "Shorts & TikToks",
      description: "Automatically generate vertical video content to promote your game on social media platforms like TikTok and YouTube Shorts."
    },
    {
      icon: <Zap className="h-8 w-8 text-primary" />,
      title: "Instant Asset Generation",
      description: "Generate game icons, badges, and promotional art instantly. Streamline your workflow and focus on development."
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
            The Ultimate Toolkit for Roblox Developers
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted-foreground mb-10"
          >
            Explode your game's growth with AI-powered insights, thumbnail generation, and marketing tools.
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
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to dominate the front page?</h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Join thousands of top developers using NicheViral AI to grow their games.
          </p>
          <Link to="/auth">
            <Button size="lg" className="h-14 px-10 text-lg rounded-full shadow-xl shadow-primary/20">
              Start Growing Now
              <Sparkles className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}