
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Plus } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const CreatePollForm = () => {
  const [pollData, setPollData] = useState({
    title: "",
    description: "",
    option1: "",
    option2: "",
    option3: "",
    expiryDate: undefined as Date | undefined
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // This would integrate with Supabase to create the poll
    console.log("Creating poll:", pollData);
    
    setTimeout(() => {
      alert("Poll created successfully!");
      setPollData({
        title: "",
        description: "",
        option1: "",
        option2: "",
        option3: "",
        expiryDate: undefined
      });
      setIsSubmitting(false);
    }, 1000);
  };

  const isFormValid = pollData.title && pollData.description && pollData.option1 && pollData.option2 && pollData.option3 && pollData.expiryDate;

  return (
    <Card className="max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Plus className="w-5 h-5 mr-2" />
          Create New Poll
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Poll Title</Label>
            <Input
              id="title"
              placeholder="Enter a clear, descriptive title for your poll"
              value={pollData.title}
              onChange={(e) => setPollData({...pollData, title: e.target.value})}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Provide context and details about what you're asking"
              value={pollData.description}
              onChange={(e) => setPollData({...pollData, description: e.target.value})}
              rows={3}
              required
            />
          </div>

          <div className="space-y-4">
            <Label>Poll Options (3 required)</Label>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 rounded-full bg-blue-500 flex-shrink-0"></div>
                <Input
                  placeholder="Option 1"
                  value={pollData.option1}
                  onChange={(e) => setPollData({...pollData, option1: e.target.value})}
                  required
                />
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 rounded-full bg-green-500 flex-shrink-0"></div>
                <Input
                  placeholder="Option 2"
                  value={pollData.option2}
                  onChange={(e) => setPollData({...pollData, option2: e.target.value})}
                  required
                />
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 rounded-full bg-purple-500 flex-shrink-0"></div>
                <Input
                  placeholder="Option 3"
                  value={pollData.option3}
                  onChange={(e) => setPollData({...pollData, option3: e.target.value})}
                  required
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Expiry Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !pollData.expiryDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {pollData.expiryDate ? format(pollData.expiryDate, "PPP") : "Select expiry date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={pollData.expiryDate}
                  onSelect={(date) => setPollData({...pollData, expiryDate: date})}
                  disabled={(date) => date < new Date()}
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex space-x-4 pt-6">
            <Button 
              type="submit" 
              disabled={!isFormValid || isSubmitting}
              className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            >
              {isSubmitting ? "Creating Poll..." : "Create Poll"}
            </Button>
            <Button 
              type="button" 
              variant="outline"
              onClick={() => setPollData({
                title: "",
                description: "",
                option1: "",
                option2: "",
                option3: "",
                expiryDate: undefined
              })}
            >
              Clear Form
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreatePollForm;
