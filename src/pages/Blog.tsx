import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BookOpen, Search, Calendar, User, Clock, TrendingUp, Sparkles, Zap } from "lucide-react";

const posts = [
  {
    title: "Introducing Unified AI Model v1: The Future of Content Generation",
    excerpt: "Learn how our revolutionary unified AI pipeline is transforming the way creators generate content with coordinated multi-modal AI.",
    author: "Sarah Chen",
    date: "January 18, 2026",
    readTime: "5 min read",
    category: "Product Updates",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop",
    featured: true
  },
  {
    title: "10 Tips for Creating Viral YouTube Content with AI",
    excerpt: "Discover proven strategies for using AI-generated content to grow your YouTube channel and engage your audience.",
    author: "Marcus Rodriguez",
    date: "January 15, 2026",
    readTime: "8 min read",
    category: "Creator Tips",
    image: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=800&h=400&fit=crop"
  },
  {
    title: "The Science Behind Our AI Video Generation",
    excerpt: "A deep dive into the machine learning models and techniques that power Neura AI's video generation capabilities.",
    author: "David Kim",
    date: "January 12, 2026",
    readTime: "12 min read",
    category: "Technical",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&h=400&fit=crop"
  },
  {
    title: "How We Built a Real-Time AI Pipeline That Scales",
    excerpt: "Learn about the engineering challenges and solutions behind building a unified AI system that processes millions of requests.",
    author: "Marcus Rodriguez",
    date: "January 10, 2026",
    readTime: "10 min read",
    category: "Engineering",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=400&fit=crop"
  },
  {
    title: "AI Content Creation: Trends to Watch in 2026",
    excerpt: "Explore the emerging trends in AI-powered content creation and what they mean for creators and businesses.",
    author: "Elena Popov",
    date: "January 8, 2026",
    readTime: "6 min read",
    category: "Industry Insights",
    image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?w=800&h=400&fit=crop"
  },
  {
    title: "From Idea to Video: A Creator's Journey with Neura AI",
    excerpt: "Follow one creator's experience using Neura AI to build a successful YouTube channel from scratch.",
    author: "Sarah Chen",
    date: "January 5, 2026",
    readTime: "7 min read",
    category: "Case Studies",
    image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&h=400&fit=crop"
  }
];

export default function Blog() {
  const featuredPost = posts.find(p => p.featured);
  const regularPosts = posts.filter(p => !p.featured);

  return (
    <div className="min-h-screen">
      <AnimatedBackground />
      <Navigation />

      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">
              <BookOpen className="w-3 h-3 mr-1" />
              Our Blog
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-red-500 bg-clip-text text-transparent">
              Insights & Updates
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Stories, tutorials, and insights from the Neura AI team
            </p>
          </motion.div>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-2xl mx-auto mb-16"
          >
            <div className="glass-card rounded-xl p-2 flex gap-2">
              <Input
                placeholder="Search articles..."
                className="glass border-0 focus-visible:ring-0"
              />
              <Button className="red-glow">
                <Search className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>

          {/* Featured Post */}
          {featuredPost && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-16"
            >
              <div className="glass-card rounded-2xl overflow-hidden hover:red-glow transition-all group cursor-pointer">
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="aspect-video md:aspect-auto overflow-hidden">
                    <img
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-8 md:p-12 flex flex-col justify-center">
                    <Badge className="bg-primary/20 text-primary border-primary/30 mb-4 w-fit">
                      <Sparkles className="w-3 h-3 mr-1" />
                      Featured
                    </Badge>
                    <h2 className="text-3xl font-bold mb-4 group-hover:text-primary transition-colors">
                      {featuredPost.title}
                    </h2>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        {featuredPost.author}
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {featuredPost.date}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {featuredPost.readTime}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Recent Posts */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-8">Recent Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularPosts.map((post, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="glass-card rounded-xl overflow-hidden hover:red-glow transition-all group cursor-pointer"
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <Badge variant="outline" className="glass mb-3">
                      {post.category}
                    </Badge>
                    <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {post.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Newsletter CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="glass-card rounded-2xl p-12 text-center"
          >
            <Zap className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Never Miss an Update</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter for the latest AI insights, product updates, and creator tips
            </p>
            <div className="max-w-md mx-auto flex gap-2">
              <Input
                placeholder="Enter your email"
                type="email"
                className="glass"
              />
              <Button className="red-glow whitespace-nowrap">
                Subscribe
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
