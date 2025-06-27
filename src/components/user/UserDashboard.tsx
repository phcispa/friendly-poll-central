
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogOut, Vote, BarChart3, Clock, CheckCircle, Users, AlertCircle } from "lucide-react";

interface UserDashboardProps {
  user: { id: string; email: string; role: 'user' };
  onLogout: () => void;
}

const UserDashboard = ({ user, onLogout }: UserDashboardProps) => {
  // Mock data - this would come from Supabase
  const [userVotes, setUserVotes] = useState<Record<number, number>>({
    3: 0 // User voted for option 0 in poll 3
  });

  const polls = [
    {
      id: 1,
      title: "Favorite Programming Language",
      description: "Which programming language do you prefer for web development?",
      options: ["JavaScript", "Python", "Java"],
      votes: [45, 32, 12],
      status: "active",
      expiryDate: "2024-12-30",
      totalVotes: 89,
      isNew: !userVotes[1]
    },
    {
      id: 2,
      title: "Best Coffee Brand",
      description: "What's your go-to coffee brand for daily consumption?",
      options: ["Starbucks", "Dunkin'", "Local Roaster"],
      votes: [28, 22, 15],
      status: "active",
      expiryDate: "2024-12-28",
      totalVotes: 65,
      isNew: !userVotes[2]
    },
    {
      id: 3,
      title: "Remote Work Preference",
      description: "How do you prefer to work in the post-pandemic era?",
      options: ["Fully Remote", "Hybrid", "Office Only"],
      votes: [68, 42, 14],
      status: "completed",
      expiryDate: "2024-12-20",
      totalVotes: 124,
      isNew: false,
      voters: [
        { id: 1, email: "user1@example.com", choice: 0 },
        { id: 2, email: "user2@example.com", choice: 1 },
        { id: 3, email: "user3@example.com", choice: 0 },
      ]
    }
  ];

  const handleVote = (pollId: number, optionIndex: number) => {
    setUserVotes(prev => ({
      ...prev,
      [pollId]: optionIndex
    }));
  };

  const newPolls = polls.filter(poll => poll.status === "active" && poll.isNew);
  const activePolls = polls.filter(poll => poll.status === "active");
  const completedPolls = polls.filter(poll => poll.status === "completed");

  const PollCard = ({ poll, showResults = false, showVoting = false }: { poll: any, showResults?: boolean, showVoting?: boolean }) => (
    <Card className="mb-4">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <CardTitle className="text-lg">{poll.title}</CardTitle>
              {poll.isNew && (
                <Badge className="bg-red-100 text-red-800 text-xs">New!</Badge>
              )}
            </div>
            <p className="text-sm text-gray-600 mb-2">{poll.description}</p>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">Expires: {poll.expiryDate}</span>
              <Badge 
                variant={poll.status === 'active' ? 'default' : 'secondary'}
                className={poll.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}
              >
                {poll.status}
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {poll.options.map((option: string, index: number) => {
            const percentage = poll.totalVotes > 0 ? (poll.votes[index] / poll.totalVotes) * 100 : 0;
            const isSelected = userVotes[poll.id] === index;
            const hasVoted = userVotes[poll.id] !== undefined;
            
            return (
              <div key={index} className="space-y-2">
                {showVoting && poll.status === 'active' ? (
                  <button
                    onClick={() => handleVote(poll.id, index)}
                    className={`w-full p-3 rounded-lg border-2 text-left transition-all duration-200 ${
                      isSelected 
                        ? 'border-blue-500 bg-blue-50 text-blue-900' 
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-4 h-4 rounded-full border-2 ${
                        isSelected ? 'border-blue-500 bg-blue-500' : 'border-gray-300'
                      }`}>
                        {isSelected && <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>}
                      </div>
                      <span className="font-medium">{option}</span>
                    </div>
                  </button>
                ) : (
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="flex items-center">
                        {option}
                        {hasVoted && isSelected && (
                          <Badge variant="outline" className="ml-2 text-xs bg-blue-50 text-blue-700">
                            Your Vote
                          </Badge>
                        )}
                      </span>
                      {showResults && (
                        <span className="text-gray-600">{poll.votes[index]} votes ({percentage.toFixed(1)}%)</span>
                      )}
                    </div>
                    {showResults && (
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${
                            hasVoted && isSelected ? 'bg-blue-600' : 'bg-gray-400'
                          }`}
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {userVotes[poll.id] !== undefined && poll.status === 'active' && (
          <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center text-green-800">
              <CheckCircle className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">Vote recorded! You can change it anytime before the poll expires.</span>
            </div>
          </div>
        )}

        {showResults && poll.status === 'completed' && poll.voters && (
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <h4 className="font-semibold text-sm mb-2 flex items-center">
              <Users className="w-4 h-4 mr-1" />
              All Voters ({poll.voters.length})
            </h4>
            <div className="space-y-1 max-h-32 overflow-y-auto">
              {poll.voters.map((voter: any) => (
                <div key={voter.id} className="flex justify-between text-xs">
                  <span>{voter.email}</span>
                  <span className="text-gray-600">→ {poll.options[voter.choice]}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="flex items-center justify-between mt-4 pt-3 border-t">
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <span className="flex items-center">
              <BarChart3 className="w-4 h-4 mr-1" />
              {poll.totalVotes} total votes
            </span>
            <span className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {poll.status === 'active' ? 'Active' : 'Completed'}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <Vote className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">PollHub</h1>
                <p className="text-sm text-gray-600">Welcome, {user.email}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-green-100 text-green-800">User</Badge>
              <Button variant="outline" onClick={onLogout} className="text-gray-600 hover:text-gray-800">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* New Polls Alert */}
        {newPolls.length > 0 && (
          <Card className="mb-8 border-orange-200 bg-orange-50">
            <CardContent className="p-6">
              <div className="flex items-center">
                <AlertCircle className="w-6 h-6 text-orange-600 mr-3" />
                <div>
                  <h3 className="font-semibold text-orange-900">New Polls Available!</h3>
                  <p className="text-sm text-orange-700">
                    You have {newPolls.length} new poll{newPolls.length > 1 ? 's' : ''} waiting for your response.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <Tabs defaultValue="new" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="new">
              New Polls 
              {newPolls.length > 0 && (
                <Badge className="ml-2 bg-red-500 text-white text-xs">{newPolls.length}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="active">Active Polls ({activePolls.length})</TabsTrigger>
            <TabsTrigger value="completed">Results ({completedPolls.length})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="new" className="space-y-4">
            {newPolls.length > 0 ? (
              newPolls.map(poll => <PollCard key={poll.id} poll={poll} showVoting />)
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">All Caught Up!</h3>
                  <p className="text-gray-600">You've responded to all available polls. Check back later for new ones!</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="active" className="space-y-4">
            {activePolls.length > 0 ? (
              activePolls.map(poll => <PollCard key={poll.id} poll={poll} showVoting />)
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No active polls at the moment.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="completed" className="space-y-4">
            {completedPolls.length > 0 ? (
              completedPolls.map(poll => <PollCard key={poll.id} poll={poll} showResults />)
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No completed polls to show results for yet.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default UserDashboard;
