
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LogOut, Plus, Users, BarChart3, Settings, Clock, CheckCircle, XCircle } from "lucide-react";
import CreatePollForm from "./CreatePollForm";
import PollManagement from "./PollManagement";

interface AdminDashboardProps {
  user: { id: string; email: string; role: 'admin' };
  onLogout: () => void;
}

const AdminDashboard = ({ user, onLogout }: AdminDashboardProps) => {
  const [activeView, setActiveView] = useState<'overview' | 'create' | 'manage' | 'users'>('overview');
  
  // Mock data - this would come from Supabase
  const mockStats = {
    totalPolls: 12,
    activePolls: 8,
    completedPolls: 4,
    totalUsers: 156,
    totalVotes: 1247
  };

  const mockRecentPolls = [
    { id: 1, title: "Favorite Programming Language", status: "active", votes: 89, expires: "2024-12-30" },
    { id: 2, title: "Best Coffee Brand", status: "active", votes: 65, expires: "2024-12-28" },
    { id: 3, title: "Remote Work Preference", status: "completed", votes: 124, expires: "2024-12-20" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <Settings className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-sm text-gray-600">Welcome back, {user.email}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">Admin</Badge>
              <Button variant="outline" onClick={onLogout} className="text-gray-600 hover:text-gray-800">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="w-64 space-y-2">
            <Button
              variant={activeView === 'overview' ? 'default' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setActiveView('overview')}
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Overview
            </Button>
            <Button
              variant={activeView === 'create' ? 'default' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setActiveView('create')}
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Poll
            </Button>
            <Button
              variant={activeView === 'manage' ? 'default' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setActiveView('manage')}
            >
              <Settings className="w-4 h-4 mr-2" />
              Manage Polls
            </Button>
            <Button
              variant={activeView === 'users' ? 'default' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setActiveView('users')}
            >
              <Users className="w-4 h-4 mr-2" />
              Users
            </Button>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeView === 'overview' && (
              <div className="space-y-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                  <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-blue-100">Total Polls</p>
                          <p className="text-3xl font-bold">{mockStats.totalPolls}</p>
                        </div>
                        <BarChart3 className="w-8 h-8 text-blue-200" />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-green-100">Active Polls</p>
                          <p className="text-3xl font-bold">{mockStats.activePolls}</p>
                        </div>
                        <Clock className="w-8 h-8 text-green-200" />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-purple-100">Completed</p>
                          <p className="text-3xl font-bold">{mockStats.completedPolls}</p>
                        </div>
                        <CheckCircle className="w-8 h-8 text-purple-200" />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-orange-100">Total Users</p>
                          <p className="text-3xl font-bold">{mockStats.totalUsers}</p>
                        </div>
                        <Users className="w-8 h-8 text-orange-200" />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-indigo-100">Total Votes</p>
                          <p className="text-3xl font-bold">{mockStats.totalVotes}</p>
                        </div>
                        <BarChart3 className="w-8 h-8 text-indigo-200" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Recent Polls */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Polls</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockRecentPolls.map((poll) => (
                        <div key={poll.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900">{poll.title}</h4>
                            <p className="text-sm text-gray-600">Expires: {poll.expires}</p>
                          </div>
                          <div className="flex items-center space-x-4">
                            <span className="text-sm text-gray-600">{poll.votes} votes</span>
                            <Badge 
                              variant={poll.status === 'active' ? 'default' : 'secondary'}
                              className={poll.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}
                            >
                              {poll.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeView === 'create' && <CreatePollForm />}
            {activeView === 'manage' && <PollManagement />}
            {activeView === 'users' && (
              <Card>
                <CardHeader>
                  <CardTitle>User Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">User management functionality would be implemented here with Supabase integration.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
