import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { Loader2, Youtube, CreditCard, User, Bell, Moon, Sun, Download } from "lucide-react";
import { getSession } from "@/lib/auth";

export function Settings() {
  const [userId, setUserId] = useState<string | null>(null);
  
  useEffect(() => {
    const session = getSession();
    if (session) {
      setUserId(session.userId);
    }
  }, []);

  const user = useQuery(api.users.getUserById, userId ? { userId } : "skip");
  const updateChannel = useMutation(api.users.updateChannel);
  const userCredits = useQuery(api.billing.getUserPurchases, userId ? { userId } : "skip");
  
  const [channelId, setChannelId] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdateChannel = async () => {
    if (!channelId) {
      toast.error("Please enter a Channel ID");
      return;
    }
    setIsUpdating(true);
    try {
      await updateChannel({ channelId });
      toast.success("Channel connected successfully!");
      setChannelId(""); // Clear input
    } catch (error) {
      toast.error("Failed to connect channel");
    } finally {
      setIsUpdating(false);
    }
  };

  if (userId && user === undefined) {
    return <div className="p-8 flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  }

  if (!userId || user === null) {
     // Handle case where user is not found or not logged in
     return (
        <div className="p-8 flex flex-col items-center justify-center space-y-4">
            <p className="text-muted-foreground">Please log in to view settings.</p>
            <Button onClick={() => window.location.href = "/auth"}>Log In</Button>
        </div>
     );
  }

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">Manage your account, subscription, and preferences.</p>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-4 lg:w-[400px]">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your personal details.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={user?.image} />
                  <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
                </Avatar>
                <Button variant="outline">Change Avatar</Button>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input defaultValue={user?.name} />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input defaultValue={user?.email} disabled />
                </div>
              </div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>Customize your interface experience.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Moon className="h-4 w-4" />
                  <Label>Dark Mode</Label>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Current Subscription</CardTitle>
              <CardDescription>Manage your plan and billing details.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 border rounded-lg bg-secondary/10">
                <div>
                  <p className="font-medium">Plan Status</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="default" className="capitalize">
                      {user?.subscriptionId ? "Active Subscription" : "Free Plan"}
                    </Badge>
                    {/* Placeholder for trial status */}
                  </div>
                </div>
                <Button variant="outline" onClick={() => window.location.href = "/billing"}>Manage Subscription</Button>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-medium">Payment Method</h4>
                <div className="flex items-center gap-4">
                  <div className="h-10 w-16 bg-secondary rounded flex items-center justify-center">
                    <CreditCard className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Visa ending in 4242</p>
                    <p className="text-xs text-muted-foreground">Expires 12/24</p>
                  </div>
                  <Button variant="ghost" size="sm" className="ml-auto">Edit</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Billing History</CardTitle>
              <CardDescription>View your past transactions.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {userCredits && userCredits.length > 0 ? (
                  userCredits.map((purchase) => (
                    <div key={purchase._id} className="flex items-center justify-between py-2 border-b last:border-0">
                      <div>
                        <p className="font-medium">{purchase.packageId}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(purchase._creationTime).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${purchase.amount}</p>
                        <Badge variant={purchase.status === "completed" ? "outline" : "secondary"}>
                          {purchase.status}
                        </Badge>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">No billing history available.</p>
                )}
              </div>
              <Button variant="outline" className="w-full mt-4">
                <Download className="mr-2 h-4 w-4" />
                Download Invoices
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Connected Accounts</CardTitle>
              <CardDescription>Manage your external connections.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 bg-red-600 rounded-full flex items-center justify-center text-white">
                    <Youtube className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-medium">YouTube Channel</p>
                    <p className="text-sm text-muted-foreground">
                      {user?.youtubeChannelId ? `Connected: ${user.youtubeChannelId}` : "Not connected"}
                    </p>
                  </div>
                </div>
                {user?.youtubeChannelId ? (
                  <Button variant="outline" onClick={() => updateChannel({ channelId: "" })}>Disconnect</Button>
                ) : (
                  <div className="flex gap-2 items-center">
                    <Input 
                      placeholder="Channel ID (e.g., UC...)" 
                      value={channelId} 
                      onChange={(e) => setChannelId(e.target.value)}
                      className="w-48"
                    />
                    <Button onClick={handleUpdateChannel} disabled={isUpdating}>
                      {isUpdating ? <Loader2 className="h-4 w-4 animate-spin" /> : "Connect"}
                    </Button>
                  </div>
                )}
              </div>
              <div className="text-sm text-muted-foreground bg-muted p-4 rounded-md">
                <p className="font-medium mb-1">How to find your Channel ID:</p>
                <ol className="list-decimal list-inside space-y-1">
                  <li>Go to your YouTube channel page</li>
                  <li>Click "About" or check the URL</li>
                  <li>It usually starts with "UC" (e.g., UC1234567890)</li>
                </ol>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Choose what you want to be notified about.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive emails about your account activity.</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Trend Alerts</Label>
                  <p className="text-sm text-muted-foreground">Get notified when new niches are discovered.</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Generation Complete</Label>
                  <p className="text-sm text-muted-foreground">Get notified when your video is ready.</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}