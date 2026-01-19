import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Bell, Shield, CreditCard, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export function Settings() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut();
    navigate("/");
    toast.success("Logged out successfully");
  };

  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Settings</h1>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="mb-8">
          <TabsTrigger value="profile">
            <User className="w-4 h-4 mr-2" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="w-4 h-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="billing">
            <CreditCard className="w-4 h-4 mr-2" />
            Billing
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <div className="glass-card p-6 rounded-xl border border-border">
            <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" value={user?.email || ""} disabled />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="roblox">Roblox Username</Label>
                <Input id="roblox" placeholder="Enter your Roblox username" />
              </div>
              <Button>Save Changes</Button>
            </div>
          </div>

          <div className="glass-card p-6 rounded-xl border border-border">
            <h2 className="text-xl font-semibold mb-4 text-red-500">Danger Zone</h2>
            <Button variant="destructive" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Log Out
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <div className="glass-card p-6 rounded-xl border border-border">
            <h2 className="text-xl font-semibold mb-4">Email Notifications</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Product Updates</Label>
                  <p className="text-sm text-muted-foreground">Receive updates about new features</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Marketing Tips</Label>
                  <p className="text-sm text-muted-foreground">Receive tips for growing your Roblox games</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="billing">
          <div className="glass-card p-6 rounded-xl border border-border text-center py-12">
            <CreditCard className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Manage Subscription</h3>
            <p className="text-muted-foreground mb-6">
              View your billing history and manage your subscription plan.
            </p>
            <Button onClick={() => navigate("/billing")}>
              Go to Billing Portal
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}