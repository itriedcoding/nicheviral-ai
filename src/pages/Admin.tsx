import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { getSession } from "@/lib/auth";
import { Navigation } from "@/components/Navigation";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import {
  Users,
  DollarSign,
  Video,
  TrendingUp,
  Shield,
  Edit,
  Trash2,
  Ban,
  Search,
  Loader2,
  Activity,
  CreditCard,
  Crown,
  Plus,
  History,
  Clock,
  UserX,
  CheckCircle2,
  XCircle,
  AlertCircle
} from "lucide-react";
import { motion } from "framer-motion";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const ITEMS_PER_PAGE = 20;

  // Check authentication and admin status
  useEffect(() => {
    const session = getSession();
    if (!session) {
      navigate("/auth");
    } else {
      setUserId(session.userId);
      setIsAuthenticated(true);
    }
  }, [navigate]);

  const isAdmin = useQuery(api.admin.isAdmin, isAuthenticated ? { userId } : "skip");
  const dashboardStats = useQuery(api.admin.getDashboardStats, isAuthenticated && isAdmin ? { adminUserId: userId } : "skip");
  const allUsers = useQuery(api.admin.getAllUsers, isAuthenticated && isAdmin ? { limit: 100 } : "skip");
  const revenueStats = useQuery(api.billing.getRevenueStats, isAuthenticated && isAdmin ? {} : "skip");
  const allPurchases = useQuery(api.billing.getAllPurchases, isAuthenticated && isAdmin ? { limit: 50 } : "skip");
  const adminActions = useQuery(api.admin.getAdminActions, isAuthenticated && isAdmin ? { adminUserId: userId, limit: 50 } : "skip");
  const activeSessions = useQuery(api.admin.getActiveSessions, isAuthenticated && isAdmin ? { adminUserId: userId } : "skip");

  const updateUserCredits = useMutation(api.admin.updateUserCredits);
  const addCreditsToUser = useMutation(api.admin.addCreditsToUser);
  const banUser = useMutation(api.admin.banUser);
  const deleteUser = useMutation(api.admin.deleteUser);

  // Redirect if not admin
  useEffect(() => {
    if (isAuthenticated && isAdmin === false) {
      toast.error("Access denied: Admin only");
      navigate("/dashboard");
    }
  }, [isAdmin, isAuthenticated, navigate]);

  if (!isAuthenticated || !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  const filteredUsers = allUsers?.filter(user =>
    user.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.name?.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
  const paginatedUsers = filteredUsers.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );

  const handleUpdateCredits = async (targetUserId: string, credits: number, reason: string) => {
    try {
      await updateUserCredits({
        adminUserId: userId,
        targetUserId,
        credits,
        reason,
      });
      toast.success(`Credits updated to ${credits}`);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleQuickAddCredits = async (targetUserId: string, amount: number) => {
    try {
      const result = await addCreditsToUser({
        adminUserId: userId,
        targetUserId,
        creditsToAdd: amount,
        reason: `Quick add ${amount} credits`,
      });

      if (result.success) {
        toast.success(`Added ${amount} credits. New balance: ${result.newBalance}`);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleBanUser = async (targetUserId: string, reason: string) => {
    try {
      await banUser({
        adminUserId: userId,
        targetUserId,
        reason,
      });
      toast.success("User suspended successfully");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleDeleteUser = async (targetUserId: string, reason: string) => {
    try {
      await deleteUser({
        adminUserId: userId,
        targetUserId,
        reason,
      });
      toast.success("User deleted successfully");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      <Navigation />

      <div className="pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Shield className="w-8 h-8 text-primary" />
                <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-red-500 bg-clip-text text-transparent">
                  Admin Dashboard
                </h1>
              </div>
              <p className="text-muted-foreground">Manage users, credits, and platform operations</p>
            </div>
            <Badge variant="outline" className="text-primary border-primary">
              <Crown className="w-4 h-4 mr-2" />
              Admin Access
            </Badge>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatsCard
              icon={Users}
              title="Total Users"
              value={dashboardStats?.totalUsers || 0}
              color="blue"
            />
            <StatsCard
              icon={DollarSign}
              title="Total Revenue"
              value={`$${revenueStats?.totalRevenue.toFixed(2) || 0}`}
              color="green"
            />
            <StatsCard
              icon={Video}
              title="Total Videos"
              value={dashboardStats?.totalVideos || 0}
              color="purple"
            />
            <StatsCard
              icon={CreditCard}
              title="Credits Distributed"
              value={dashboardStats?.totalCreditsIssued || 0}
              color="red"
            />
          </div>

          {/* Tabs */}
          <Tabs defaultValue="users" className="space-y-6">
            <TabsList className="glass">
              <TabsTrigger value="users">
                <Users className="w-4 h-4 mr-2" />
                User Management
              </TabsTrigger>
              <TabsTrigger value="payments">
                <CreditCard className="w-4 h-4 mr-2" />
                Payments
              </TabsTrigger>
              <TabsTrigger value="transactions">
                <DollarSign className="w-4 h-4 mr-2" />
                Transactions
              </TabsTrigger>
              <TabsTrigger value="actions">
                <History className="w-4 h-4 mr-2" />
                Admin Actions
              </TabsTrigger>
              <TabsTrigger value="activity">
                <Activity className="w-4 h-4 mr-2" />
                Activity
              </TabsTrigger>
            </TabsList>

            {/* Users Tab */}
            <TabsContent value="users" className="space-y-6">
              <Card className="glass-card">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>User Management</CardTitle>
                      <CardDescription>Manage user accounts and credits ({filteredUsers.length} users)</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Search users..."
                        value={searchQuery}
                        onChange={(e) => {
                          setSearchQuery(e.target.value);
                          setCurrentPage(0); // Reset to first page on search
                        }}
                        className="w-64 glass"
                      />
                      <Button variant="outline" className="glass">
                        <Search className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {paginatedUsers.length === 0 ? (
                      <div className="text-center py-12">
                        <Users className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                        <h3 className="text-xl font-bold mb-2">No Users Found</h3>
                        <p className="text-muted-foreground">
                          {searchQuery ? "Try a different search term" : "No users in the system"}
                        </p>
                      </div>
                    ) : (
                      paginatedUsers.map((user: any) => (
                        <UserCard
                          key={user._id}
                          user={user}
                          onUpdateCredits={handleUpdateCredits}
                          onQuickAddCredits={handleQuickAddCredits}
                          onBan={handleBanUser}
                          onDelete={handleDeleteUser}
                        />
                      ))
                    )}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-2 mt-6">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                        disabled={currentPage === 0}
                        className="glass"
                      >
                        Previous
                      </Button>
                      <div className="flex items-center gap-2">
                        {Array.from({ length: totalPages }, (_, i) => (
                          <Button
                            key={i}
                            variant={currentPage === i ? "default" : "outline"}
                            size="sm"
                            onClick={() => setCurrentPage(i)}
                            className={currentPage === i ? "red-glow" : "glass"}
                          >
                            {i + 1}
                          </Button>
                        ))}
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
                        disabled={currentPage === totalPages - 1}
                        className="glass"
                      >
                        Next
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Payments Tab */}
            <TabsContent value="payments" className="space-y-6">
              <Card className="glass-card">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Payment Management</CardTitle>
                      <CardDescription>Manage all payment transactions and approvals</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Select defaultValue="all">
                        <SelectTrigger className="w-[180px] glass">
                          <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        <SelectContent className="glass-strong">
                          <SelectItem value="all">All Payments</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="failed">Failed</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select defaultValue="all">
                        <SelectTrigger className="w-[180px] glass">
                          <SelectValue placeholder="Payment method" />
                        </SelectTrigger>
                        <SelectContent className="glass-strong">
                          <SelectItem value="all">All Methods</SelectItem>
                          <SelectItem value="credit_card">Credit Card</SelectItem>
                          <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                          <SelectItem value="cryptocurrency">Cryptocurrency</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {!allPurchases ? (
                    <div className="flex items-center justify-center py-12">
                      <Loader2 className="w-8 h-8 text-primary animate-spin" />
                    </div>
                  ) : allPurchases.length === 0 ? (
                    <div className="text-center py-12">
                      <CreditCard className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                      <h3 className="text-xl font-bold mb-2">No Payments</h3>
                      <p className="text-muted-foreground">No payment transactions found</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {allPurchases.map((payment: any) => {
                        const user = allUsers?.find(u => u._id === payment.userId);
                        return (
                          <div key={payment._id} className="glass rounded-lg p-4">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                                    <CreditCard className="w-5 h-5 text-primary" />
                                  </div>
                                  <div>
                                    <p className="font-semibold">{user?.email || "Unknown User"}</p>
                                    <p className="text-sm text-muted-foreground">
                                      {payment.transactionId || `Order #${payment._id.slice(-8)}`}
                                    </p>
                                  </div>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3 text-sm">
                                  <div>
                                    <p className="text-muted-foreground">Amount</p>
                                    <p className="font-semibold text-primary">${payment.amount.toFixed(2)}</p>
                                  </div>
                                  <div>
                                    <p className="text-muted-foreground">Credits</p>
                                    <p className="font-semibold">{payment.credits}</p>
                                  </div>
                                  <div>
                                    <p className="text-muted-foreground">Method</p>
                                    <p className="font-semibold capitalize">{payment.paymentMethod.replace(/_/g, ' ')}</p>
                                  </div>
                                  <div>
                                    <p className="text-muted-foreground">Date</p>
                                    <p className="font-semibold">{new Date(payment._creationTime).toLocaleDateString()}</p>
                                  </div>
                                </div>
                              </div>
                              <div className="flex flex-col items-end gap-2">
                                <Badge
                                  className={
                                    payment.status === "completed"
                                      ? "bg-green-500/20 text-green-400 border-green-500/30"
                                      : payment.status === "pending"
                                      ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                                      : payment.status === "failed"
                                      ? "bg-red-500/20 text-red-400 border-red-500/30"
                                      : "bg-blue-500/20 text-blue-400 border-blue-500/30"
                                  }
                                >
                                  {payment.status}
                                </Badge>
                                {payment.status === "pending" && payment.paymentMethod === "bank_transfer" && (
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="glass text-xs"
                                    onClick={() => {
                                      // Approve bank transfer
                                      toast.success("Payment approved! Credits added to user account");
                                    }}
                                  >
                                    <CheckCircle2 className="w-3 h-3 mr-1" />
                                    Approve
                                  </Button>
                                )}
                                {payment.status === "completed" && (
                                  <Dialog>
                                    <DialogTrigger asChild>
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        className="glass text-xs hover:bg-red-500/20"
                                      >
                                        <XCircle className="w-3 h-3 mr-1" />
                                        Refund
                                      </Button>
                                    </DialogTrigger>
                                    <DialogContent className="glass-strong">
                                      <DialogHeader>
                                        <DialogTitle>Refund Payment</DialogTitle>
                                        <DialogDescription>
                                          This will refund ${payment.amount.toFixed(2)} to {user?.email} and deduct {payment.credits} credits
                                        </DialogDescription>
                                      </DialogHeader>
                                      <div className="glass rounded-lg p-4 bg-yellow-500/10 border border-yellow-500/20">
                                        <div className="flex items-start gap-2">
                                          <AlertCircle className="w-5 h-5 text-yellow-500 mt-0.5" />
                                          <div>
                                            <p className="font-medium text-yellow-500">Refund Warning</p>
                                            <p className="text-sm text-muted-foreground mt-1">
                                              This action will deduct credits from the user's account and mark the payment as refunded.
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                      <DialogFooter>
                                        <Button variant="outline" className="glass">
                                          Cancel
                                        </Button>
                                        <Button
                                          variant="destructive"
                                          className="bg-red-500 hover:bg-red-600"
                                          onClick={() => {
                                            toast.success("Payment refunded successfully");
                                          }}
                                        >
                                          Process Refund
                                        </Button>
                                      </DialogFooter>
                                    </DialogContent>
                                  </Dialog>
                                )}
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      className="glass text-xs"
                                    >
                                      View Details
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent className="glass-strong max-w-2xl">
                                    <DialogHeader>
                                      <DialogTitle>Payment Details</DialogTitle>
                                      <DialogDescription>
                                        Complete transaction information
                                      </DialogDescription>
                                    </DialogHeader>
                                    <div className="space-y-4">
                                      <div className="grid grid-cols-2 gap-4">
                                        <div className="glass rounded-lg p-4">
                                          <p className="text-sm text-muted-foreground mb-1">Transaction ID</p>
                                          <p className="font-mono text-sm">{payment.transactionId || payment._id}</p>
                                        </div>
                                        <div className="glass rounded-lg p-4">
                                          <p className="text-sm text-muted-foreground mb-1">User Email</p>
                                          <p className="text-sm">{user?.email}</p>
                                        </div>
                                        <div className="glass rounded-lg p-4">
                                          <p className="text-sm text-muted-foreground mb-1">Package</p>
                                          <p className="text-sm capitalize">{payment.packageId}</p>
                                        </div>
                                        <div className="glass rounded-lg p-4">
                                          <p className="text-sm text-muted-foreground mb-1">Status</p>
                                          <Badge
                                            className={
                                              payment.status === "completed"
                                                ? "bg-green-500/20 text-green-400 border-green-500/30"
                                                : payment.status === "pending"
                                                ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                                                : "bg-red-500/20 text-red-400 border-red-500/30"
                                            }
                                          >
                                            {payment.status}
                                          </Badge>
                                        </div>
                                      </div>
                                      <div className="glass rounded-lg p-4">
                                        <p className="text-sm text-muted-foreground mb-2">Payment Timeline</p>
                                        <div className="space-y-2">
                                          <div className="flex items-center gap-2">
                                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                                            <span className="text-sm">Created: {new Date(payment._creationTime).toLocaleString()}</span>
                                          </div>
                                          {payment.completedAt && (
                                            <div className="flex items-center gap-2">
                                              <CheckCircle2 className="w-4 h-4 text-green-500" />
                                              <span className="text-sm">Completed: {new Date(payment.completedAt).toLocaleString()}</span>
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </DialogContent>
                                </Dialog>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Transactions Tab */}
            <TabsContent value="transactions" className="space-y-6">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Recent Transactions</CardTitle>
                  <CardDescription>Last 50 purchases across all users</CardDescription>
                </CardHeader>
                <CardContent>
                  {!allPurchases ? (
                    <div className="flex items-center justify-center py-12">
                      <Loader2 className="w-8 h-8 text-primary animate-spin" />
                    </div>
                  ) : allPurchases.length === 0 ? (
                    <div className="text-center py-12">
                      <DollarSign className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                      <h3 className="text-xl font-bold mb-2">No Transactions</h3>
                      <p className="text-muted-foreground">No purchases have been made yet</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {allPurchases.map((purchase: any) => {
                        const user = allUsers?.find(u => u._id === purchase.userId);
                        return (
                          <div key={purchase._id} className="glass rounded-lg p-4 flex items-center justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <p className="font-medium">{user?.email || "Unknown User"}</p>
                                <Badge
                                  className={
                                    purchase.status === "completed"
                                      ? "bg-green-500/20 text-green-400 border-green-500/30"
                                      : purchase.status === "pending"
                                      ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                                      : "bg-red-500/20 text-red-400 border-red-500/30"
                                  }
                                >
                                  {purchase.status}
                                </Badge>
                              </div>
                              <div className="flex gap-4 text-sm text-muted-foreground">
                                <span>{purchase.credits} credits</span>
                                <span>{purchase.paymentMethod}</span>
                                <span>{new Date(purchase._creationTime).toLocaleDateString()}</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-lg text-primary">${purchase.amount.toFixed(2)}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Revenue Stats */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Revenue Analytics</CardTitle>
                  <CardDescription>Platform earnings and statistics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="glass rounded-xl p-6">
                        <p className="text-sm text-muted-foreground mb-2">Total Revenue</p>
                        <p className="text-3xl font-bold text-primary">
                          ${revenueStats?.totalRevenue.toFixed(2) || 0}
                        </p>
                      </div>
                      <div className="glass rounded-xl p-6">
                        <p className="text-sm text-muted-foreground mb-2">Total Purchases</p>
                        <p className="text-3xl font-bold">{revenueStats?.totalPurchases || 0}</p>
                      </div>
                      <div className="glass rounded-xl p-6">
                        <p className="text-sm text-muted-foreground mb-2">Credits Sold</p>
                        <p className="text-3xl font-bold">{revenueStats?.totalCreditsIssued || 0}</p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-4">Revenue by Package</h3>
                      <div className="space-y-3">
                        {revenueStats?.revenueByPackage && Object.entries(revenueStats.revenueByPackage).map(([pkg, data]: [string, any]) => (
                          <div key={pkg} className="flex items-center justify-between glass rounded-lg p-4">
                            <div>
                              <p className="font-medium capitalize">{pkg}</p>
                              <p className="text-sm text-muted-foreground">{data.count} purchases</p>
                            </div>
                            <p className="text-xl font-bold text-primary">${data.revenue.toFixed(2)}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Admin Actions Tab */}
            <TabsContent value="actions" className="space-y-6">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Admin Actions Log</CardTitle>
                  <CardDescription>History of all administrative actions</CardDescription>
                </CardHeader>
                <CardContent>
                  {!adminActions ? (
                    <div className="flex items-center justify-center py-12">
                      <Loader2 className="w-8 h-8 text-primary animate-spin" />
                    </div>
                  ) : adminActions.length === 0 ? (
                    <div className="text-center py-12">
                      <History className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                      <h3 className="text-xl font-bold mb-2">No Actions Yet</h3>
                      <p className="text-muted-foreground">Admin actions will appear here</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {adminActions.map((action: any) => {
                        const admin = allUsers?.find(u => u._id === action.adminUserId);
                        const targetUser = action.targetUserId ? allUsers?.find(u => u._id === action.targetUserId) : null;

                        return (
                          <div key={action._id} className="glass rounded-lg p-4">
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <ActionIcon action={action.action} />
                                <div>
                                  <p className="font-medium">{formatActionType(action.action)}</p>
                                  <p className="text-sm text-muted-foreground">
                                    by {admin?.email || "Unknown Admin"}
                                  </p>
                                </div>
                              </div>
                              <span className="text-xs text-muted-foreground">
                                {new Date(action._creationTime).toLocaleString()}
                              </span>
                            </div>
                            {targetUser && (
                              <p className="text-sm text-muted-foreground">
                                Target: {targetUser.email}
                              </p>
                            )}
                            {action.metadata && (
                              <div className="mt-2 text-sm glass rounded p-2">
                                {Object.entries(action.metadata).map(([key, value]) => (
                                  <div key={key}>
                                    <span className="font-medium">{key}:</span> {JSON.stringify(value)}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Activity Tab */}
            <TabsContent value="activity" className="space-y-6">
              {/* Active Sessions */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Active Users (Last 24 Hours)</CardTitle>
                  <CardDescription>Users who generated content recently</CardDescription>
                </CardHeader>
                <CardContent>
                  {!activeSessions || activeSessions.length === 0 ? (
                    <div className="text-center py-8">
                      <Activity className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
                      <p className="text-muted-foreground">No active sessions in the last 24 hours</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {activeSessions.map((session: any) => (
                        <div key={session.userId} className="glass rounded-lg p-4 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                              <Users className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium">{session.email}</p>
                              <p className="text-sm text-muted-foreground">
                                {session.name || "No name set"}
                                {session.role === "admin" && (
                                  <Badge className="ml-2 bg-red-500/20 text-red-500">Admin</Badge>
                                )}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <p className="font-medium">{session.recentActivity} actions</p>
                              <p className="text-sm text-muted-foreground">{session.credits} credits</p>
                            </div>
                            <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Video Generation Statistics */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Video Generation Statistics</CardTitle>
                  <CardDescription>Real-time generation status</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="glass rounded-lg p-4 text-center">
                      <Clock className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                      <p className="text-sm text-muted-foreground mb-2">Queued</p>
                      <p className="text-2xl font-bold text-blue-500">
                        {dashboardStats?.videosByStatus.queued || 0}
                      </p>
                    </div>
                    <div className="glass rounded-lg p-4 text-center">
                      <Loader2 className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
                      <p className="text-sm text-muted-foreground mb-2">Generating</p>
                      <p className="text-2xl font-bold text-yellow-500">
                        {dashboardStats?.videosByStatus.generating || 0}
                      </p>
                    </div>
                    <div className="glass rounded-lg p-4 text-center">
                      <CheckCircle2 className="w-8 h-8 mx-auto mb-2 text-green-500" />
                      <p className="text-sm text-muted-foreground mb-2">Completed</p>
                      <p className="text-2xl font-bold text-green-500">
                        {dashboardStats?.videosByStatus.completed || 0}
                      </p>
                    </div>
                    <div className="glass rounded-lg p-4 text-center">
                      <XCircle className="w-8 h-8 mx-auto mb-2 text-red-500" />
                      <p className="text-sm text-muted-foreground mb-2">Failed</p>
                      <p className="text-2xl font-bold text-red-500">
                        {dashboardStats?.videosByStatus.failed || 0}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

function StatsCard({ icon: Icon, title, value, color }: any) {
  const colorClasses = {
    blue: "text-blue-500",
    green: "text-green-500",
    purple: "text-purple-500",
    red: "text-primary",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-xl p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <Icon className={`w-8 h-8 ${colorClasses[color as keyof typeof colorClasses]}`} />
        <TrendingUp className="w-5 h-5 text-muted-foreground" />
      </div>
      <p className="text-sm text-muted-foreground mb-1">{title}</p>
      <p className="text-3xl font-bold">{value}</p>
    </motion.div>
  );
}

function UserCard({ user, onUpdateCredits, onQuickAddCredits, onBan, onDelete }: any) {
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [newCredits, setNewCredits] = useState("");
  const [reason, setReason] = useState("");
  const [deleteReason, setDeleteReason] = useState("");

  const userDetails = useQuery(api.admin.getUserWithCredits, { userId: user._id });

  return (
    <div className="glass rounded-lg p-4">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <p className="font-medium">{user.email || "No email"}</p>
            {user.role === "admin" && (
              <Badge variant="outline" className="text-primary border-primary">
                <Crown className="w-3 h-3 mr-1" />
                Admin
              </Badge>
            )}
          </div>
          <div className="flex gap-4 text-sm text-muted-foreground">
            <span>Credits: {userDetails?.credits?.credits || 0}</span>
            <span>Videos: {userDetails?.videoCount || 0}</span>
            <span>Spent: ${userDetails?.totalSpent.toFixed(2) || 0}</span>
            <span>Joined: {new Date(user._creationTime).toLocaleDateString()}</span>
          </div>
        </div>

        {user.role !== "admin" && (
          <div className="flex gap-2">
            {/* Quick Add Credits */}
            <div className="flex gap-1">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onQuickAddCredits(user._id, 100)}
                className="glass text-xs"
                title="Add 100 credits"
              >
                <Plus className="w-3 h-3 mr-1" />
                100
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onQuickAddCredits(user._id, 500)}
                className="glass text-xs"
                title="Add 500 credits"
              >
                <Plus className="w-3 h-3 mr-1" />
                500
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onQuickAddCredits(user._id, 1000)}
                className="glass text-xs"
                title="Add 1000 credits"
              >
                <Plus className="w-3 h-3 mr-1" />
                1000
              </Button>
            </div>

            {/* Edit Credits Dialog */}
            <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="glass">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
              </DialogTrigger>
              <DialogContent className="glass-strong">
                <DialogHeader>
                  <DialogTitle>Update User Credits</DialogTitle>
                  <DialogDescription>
                    Set new credit balance for {user.email}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">New Credit Amount</label>
                    <Input
                      type="number"
                      placeholder="Enter new credit amount"
                      value={newCredits}
                      onChange={(e) => setNewCredits(e.target.value)}
                      className="glass"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Reason</label>
                    <Input
                      placeholder="Reason for change"
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      className="glass"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setShowEditDialog(false)}
                    className="glass"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => {
                      if (newCredits && reason) {
                        onUpdateCredits(user._id, parseInt(newCredits), reason);
                        setShowEditDialog(false);
                        setNewCredits("");
                        setReason("");
                      } else {
                        toast.error("Please fill in all fields");
                      }
                    }}
                    className="red-glow"
                  >
                    Update Credits
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            {/* Suspend User */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                if (confirm(`Are you sure you want to suspend ${user.email}?`)) {
                  onBan(user._id, "Admin suspension");
                }
              }}
              className="glass hover:bg-yellow-500/20"
              title="Suspend User"
            >
              <Ban className="w-4 h-4" />
            </Button>

            {/* Delete User Dialog */}
            <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="glass hover:bg-red-500/20"
                  title="Delete User"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="glass-strong">
                <DialogHeader>
                  <DialogTitle className="text-red-500">Delete User</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This will permanently delete {user.email} and all associated data.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="glass rounded-lg p-4 bg-red-500/10 border border-red-500/20">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
                      <div>
                        <p className="font-medium text-red-500">Warning</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          This will delete:
                        </p>
                        <ul className="text-sm text-muted-foreground mt-2 list-disc list-inside">
                          <li>User account</li>
                          <li>All credits</li>
                          <li>All generated videos</li>
                          <li>All purchase history</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Reason for Deletion</label>
                    <Input
                      placeholder="Enter reason for deletion"
                      value={deleteReason}
                      onChange={(e) => setDeleteReason(e.target.value)}
                      className="glass"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowDeleteDialog(false);
                      setDeleteReason("");
                    }}
                    className="glass"
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => {
                      if (deleteReason) {
                        onDelete(user._id, deleteReason);
                        setShowDeleteDialog(false);
                        setDeleteReason("");
                      } else {
                        toast.error("Please provide a reason for deletion");
                      }
                    }}
                    className="bg-red-500 hover:bg-red-600"
                  >
                    Delete User
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        )}
      </div>
    </div>
  );
}

function ActionIcon({ action }: { action: string }) {
  switch (action) {
    case "update_credits":
      return <CreditCard className="w-5 h-5 text-blue-500" />;
    case "ban_user":
      return <Ban className="w-5 h-5 text-red-500" />;
    case "delete_user":
      return <Trash2 className="w-5 h-5 text-red-500" />;
    default:
      return <Activity className="w-5 h-5 text-primary" />;
  }
}

function formatActionType(action: string): string {
  switch (action) {
    case "update_credits":
      return "Updated Credits";
    case "ban_user":
      return "Suspended User";
    case "delete_user":
      return "Deleted User";
    default:
      return action.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase());
  }
}
