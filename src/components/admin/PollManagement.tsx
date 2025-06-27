
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, CheckCircle, Users, BarChart3, Trash2, StopCircle } from "lucide-react";

const PollManagement = () => {
  const [polls, setPolls] = useState([
    {
      id: 1,
      title: "Favorite Programming Language",
      description: "Which programming language do you prefer for web development?",
      options: ["JavaScript", "Python", "Java"],
      votes: [45, 32, 12],
      status: "active",
      expiryDate: "2024-12-30",
      totalVotes: 89,
      voters: [
        { id: 1, email: "user1@example.com", choice: 0 },
        { id: 2, email: "user2@example.com", choice: 1 },
        { id: 3, email: "user3@example.com", choice: 0 },
      ]
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
      voters: [
        { id: 4, email: "user4@example.com", choice: 0 },
        { id: 5, email: "user5@example.com", choice: 2 },
      ]
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
      voters: [
        { id: 6, email: "user6@example.com", choice: 0 },
        { id: 7, email: "user7@example.com", choice: 1 },
        { id: 8, email: "user8@example.com", choice: 0 },
      ]
    }
  ]);

  const handleEndPoll = (pollId: number) => {
    setPolls(polls.map(poll => 
      poll.id === pollId ? { ...poll, status: "completed" } : poll
    ));
  };

  const handleDeletePoll = (pollId: number) => {
    if (confirm("Are you sure you want to delete this poll? This action cannot be undone.")) {
      setPolls(polls.filter(poll => poll.id !== pollId));
    }
  };

  const activePolls = polls.filter(poll => poll.status === "active");
  const completedPolls = polls.filter(poll => poll.status === "completed");

  const PollCard = ({ poll, showResults = false }: { poll: any, showResults?: boolean }) => (
    <Card className="mb-4">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg">{poll.title}</CardTitle>
            <p className="text-sm text-gray-600 mt-1">{poll.description}</p>
            <div className="flex items-center space-x-4 mt-2">
              <span className="text-sm text-gray-500">Expires: {poll.expiryDate}</span>
              <Badge 
                variant={poll.status === 'active' ? 'default' : 'secondary'}
                className={poll.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}
              >
                {poll.status}
              </Badge>
            </div>
          </div>
          <div className="flex space-x-2">
            {poll.status === 'active' && (
              <Button size="sm" variant="outline" onClick={() => handleEndPoll(poll.id)}>
                <StopCircle className="w-4 h-4 mr-1" />
                End Poll
              </Button>
            )}
            <Button size="sm" variant="outline" onClick={() => handleDeletePoll(poll.id)} className="text-red-600 hover:text-red-800">
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {poll.options.map((option: string, index: number) => {
            const percentage = poll.totalVotes > 0 ? (poll.votes[index] / poll.totalVotes) * 100 : 0;
            return (
              <div key={index} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>{option}</span>
                  <span className="text-gray-600">{poll.votes[index]} votes ({percentage.toFixed(1)}%)</span>
                </div>
                {showResults && (
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        
        {showResults && poll.status === 'completed' && (
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <h4 className="font-semibold text-sm mb-2 flex items-center">
              <Users className="w-4 h-4 mr-1" />
              Voters ({poll.voters.length})
            </h4>
            <div className="space-y-1">
              {poll.voters.map((voter: any) => (
                <div key={voter.id} className="flex justify-between text-xs">
                  <span>{voter.email}</span>
                  <span className="text-gray-600">voted for: {poll.options[voter.choice]}</span>
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
              <Users className="w-4 h-4 mr-1" />
              {poll.voters.length} voters
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Poll Management</h2>
        <div className="flex space-x-4 text-sm text-gray-600">
          <span className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            {activePolls.length} Active
          </span>
          <span className="flex items-center">
            <CheckCircle className="w-4 h-4 mr-1" />
            {completedPolls.length} Completed
          </span>
        </div>
      </div>

      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="active">Active Polls ({activePolls.length})</TabsTrigger>
          <TabsTrigger value="completed">Completed Polls ({completedPolls.length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="active" className="space-y-4">
          {activePolls.length > 0 ? (
            activePolls.map(poll => <PollCard key={poll.id} poll={poll} />)
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
                <CheckCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No completed polls yet.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PollManagement;
