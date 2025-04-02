
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

const initialMessages: Message[] = [
  {
    id: '1',
    text: 'Hello! I'm your wellness assistant. How can I help you today? I can provide tips on hydration, posture, or family connectivity.',
    sender: 'assistant',
    timestamp: new Date()
  }
];

const WellnessAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');

  const handleSendMessage = () => {
    if (input.trim() === '') return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    
    // Simulate assistant response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: getAssistantResponse(input),
        sender: 'assistant',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    }, 1000);
  };
  
  const getAssistantResponse = (userInput: string): string => {
    const userInputLower = userInput.toLowerCase();
    
    if (userInputLower.includes('water') || userInputLower.includes('hydration')) {
      return "Staying hydrated is essential! Try to drink at least 8 cups of water daily. Would you like me to set water break reminders for you?";
    } else if (userInputLower.includes('posture')) {
      return "Good posture is key for office workers! Remember to sit with your back straight, shoulders relaxed, and computer at eye level. I can remind you to check your posture every hour.";
    } else if (userInputLower.includes('family') || userInputLower.includes('connect')) {
      return "Maintaining family connections is important! I notice you haven't called your mom in 3 days. Would you like to schedule a reminder to call her today?";
    } else if (userInputLower.includes('hello') || userInputLower.includes('hi')) {
      return "Hello there! How can I assist with your wellness today?";
    }
    
    return "I'm here to help with your wellness journey. You can ask me about hydration, posture tips, break reminders, or family connectivity!";
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="bg-gradient-to-r from-brand-purple to-brand-blue text-white">
        <CardTitle className="text-lg">Wellness Assistant</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col pt-4">
        <div className="flex-1 overflow-y-auto mb-4 space-y-4">
          {messages.map(message => (
            <div 
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.sender === 'user' 
                    ? 'bg-brand-blue text-white' 
                    : 'bg-muted'
                }`}
              >
                <p>{message.text}</p>
                <div className="text-xs opacity-70 mt-1 text-right">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex gap-2 mt-auto">
          <Textarea 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask your wellness assistant..."
            className="resize-none"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
          />
          <Button 
            className="flex-shrink-0" 
            onClick={handleSendMessage}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default WellnessAssistant;
