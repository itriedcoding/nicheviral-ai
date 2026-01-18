import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Rocket, MapPin, Clock, DollarSign, Heart, Zap, Users, Globe } from "lucide-react";

const openings = [
  {
    title: "Senior AI Engineer",
    department: "Engineering",
    location: "Remote / San Francisco",
    type: "Full-time",
    salary: "$150K - $220K",
    description: "Build cutting-edge AI models for video generation and push the boundaries of what's possible."
  },
  {
    title: "Product Designer",
    department: "Design",
    location: "Remote / New York",
    type: "Full-time",
    salary: "$120K - $180K",
    description: "Design beautiful, intuitive experiences that make AI accessible to millions of creators."
  },
  {
    title: "Full Stack Engineer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    salary: "$130K - $190K",
    description: "Build scalable infrastructure and delightful user experiences for our platform."
  },
  {
    title: "Machine Learning Researcher",
    department: "Research",
    location: "San Francisco",
    type: "Full-time",
    salary: "$160K - $240K",
    description: "Research and develop next-generation AI models for video, audio, and text generation."
  },
  {
    title: "Developer Advocate",
    department: "Developer Relations",
    location: "Remote",
    type: "Full-time",
    salary: "$110K - $160K",
    description: "Help developers build amazing things with our API and grow our developer community."
  },
  {
    title: "Content Marketing Manager",
    department: "Marketing",
    location: "Remote / London",
    type: "Full-time",
    salary: "$90K - $130K",
    description: "Tell our story and connect with creators through compelling content and campaigns."
  }
];

const perks = [
  {
    icon: Heart,
    title: "Health & Wellness",
    description: "Comprehensive health, dental, and vision insurance for you and your family"
  },
  {
    icon: Globe,
    title: "Remote-First",
    description: "Work from anywhere in the world with flexible hours and async culture"
  },
  {
    icon: Zap,
    title: "Learning Budget",
    description: "$5,000 annual budget for courses, conferences, and professional development"
  },
  {
    icon: Users,
    title: "Team Retreats",
    description: "Bi-annual company retreats in amazing locations around the world"
  },
  {
    icon: DollarSign,
    title: "Equity Package",
    description: "Generous stock options so you can share in our success"
  },
  {
    icon: Clock,
    title: "Unlimited PTO",
    description: "Take the time you need to rest, recharge, and do your best work"
  }
];

export default function Careers() {
  return (
    <div className="min-h-screen">
      <AnimatedBackground />
      <Navigation />

      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">
              <Rocket className="w-3 h-3 mr-1" />
              We're Hiring!
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-red-500 bg-clip-text text-transparent">
              Build the Future of AI
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Join our team and help democratize AI video creation for millions of creators worldwide
            </p>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {[
              { value: "50+", label: "Team Members" },
              { value: "15", label: "Countries" },
              { value: "$50M", label: "Series B Funding" },
              { value: "4.9/5", label: "Glassdoor Rating" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                className="glass-card rounded-xl p-6 text-center"
              >
                <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Perks */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-16"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Why Join Neura AI?</h2>
              <p className="text-muted-foreground">Benefits and perks that matter</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {perks.map((perk, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="glass-card rounded-xl p-6 hover:scale-105 transition-all"
                >
                  <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                    <perk.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-bold mb-2">{perk.title}</h3>
                  <p className="text-sm text-muted-foreground">{perk.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Open Positions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Open Positions</h2>
              <p className="text-muted-foreground">{openings.length} opportunities to make an impact</p>
            </div>

            <div className="space-y-4">
              {openings.map((job, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.05 }}
                  className="glass-card rounded-xl p-6 hover:red-glow transition-all group cursor-pointer"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start gap-3 mb-3">
                        <div>
                          <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                            {job.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1">{job.description}</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className="glass">
                          <MapPin className="w-3 h-3 mr-1" />
                          {job.location}
                        </Badge>
                        <Badge variant="outline" className="glass">
                          <Clock className="w-3 h-3 mr-1" />
                          {job.type}
                        </Badge>
                        <Badge variant="outline" className="glass">
                          <DollarSign className="w-3 h-3 mr-1" />
                          {job.salary}
                        </Badge>
                        <Badge className="bg-primary/20 text-primary border-primary/30">
                          {job.department}
                        </Badge>
                      </div>
                    </div>
                    <Button className="red-glow whitespace-nowrap">
                      Apply Now
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="glass-card rounded-2xl p-12 mt-16 text-center"
          >
            <Rocket className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Don't See Your Role?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              We're always looking for exceptional talent. Send us your resume and tell us how you'd like to contribute.
            </p>
            <Button className="red-glow" size="lg">
              Send Open Application
            </Button>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
