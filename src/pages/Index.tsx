
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Users, Vote, BarChart3, Shield } from "lucide-react";
import LoginForm from "@/components/auth/LoginForm";
import AdminDashboard from "@/components/admin/AdminDashboard";
import UserDashboard from "@/components/user/UserDashboard";

const Index = () => {
  const [currentUser, setCurrentUser] = useState<{ id: string; email: string; role: 'admin' | 'user' } | null>(null);
  const [showLogin, setShowLogin] = useState(false);

  const handleLogin = (email: string, password: string) => {
    // This would connect to Supabase authentication
    // For demo purposes, we'll simulate login
    if (email === "admin@poll.com") {
      setCurrentUser({ id: "1", email: email, role: "admin" });
    } else {
      setCurrentUser({ id: "2", email: email, role: "user" });
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setShowLogin(false);
  };

  if (currentUser) {
    return currentUser.role === 'admin' ? 
      <AdminDashboard user={currentUser} onLogout={handleLogout} /> :
      <UserDashboard user={currentUser} onLogout={handleLogout} />;
  }

  if (showLogin) {
    return <LoginForm onLogin={handleLogin} onBack={() => setShowLogin(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mb-8 shadow-lg">
            <Vote className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">PollHub</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Your voice matters! Join our community-driven polling platform where every opinion counts. 
            Participate in meaningful discussions, share your perspectives, and discover what others think.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => setShowLogin(true)}
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 rounded-full shadow-lg transform transition-all duration-200 hover:scale-105"
            >
              Get Started - Login Now
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3 rounded-full transition-all duration-200"
            >
              Learn More
            </Button>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4 mx-auto">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <CardTitle className="text-xl text-gray-900">Community Driven</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Join a vibrant community where every member's opinion contributes to meaningful discussions.</p>
            </CardContent>
          </Card>

          <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4 mx-auto">
                <Vote className="w-6 h-6 text-green-600" />
              </div>
              <CardTitle className="text-xl text-gray-900">Easy Voting</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Simple, intuitive voting interface that makes participating in polls quick and enjoyable.</p>
            </CardContent>
          </Card>

          <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mb-4 mx-auto">
                <BarChart3 className="w-6 h-6 text-purple-600" />
              </div>
              <CardTitle className="text-xl text-gray-900">Real-time Results</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Watch results unfold in real-time and gain insights from comprehensive analytics.</p>
            </CardContent>
          </Card>

          <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-100 rounded-full mb-4 mx-auto">
                <Shield className="w-6 h-6 text-orange-600" />
              </div>
              <CardTitle className="text-xl text-gray-900">Secure & Private</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Your data is protected with enterprise-grade security and privacy measures.</p>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <Card className="max-w-4xl mx-auto border-0 shadow-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <CardContent className="p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Make Your Voice Heard?</h2>
            <p className="text-xl mb-8 text-blue-100">
              Please login to access the polling platform and start participating in engaging discussions.
            </p>
            <Button 
              onClick={() => setShowLogin(true)}
              size="lg" 
              variant="secondary"
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-full shadow-lg transform transition-all duration-200 hover:scale-105"
            >
              Login to Continue
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
