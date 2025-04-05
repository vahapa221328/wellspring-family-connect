
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import { Heart, Users, ChevronRight, ChevronLeft } from "lucide-react";

const OnboardingPage = () => {
  const [step, setStep] = useState(1);
  const totalSteps = 4;
  const navigate = useNavigate();

  const nextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      navigate('/');
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center p-4">
      <Card className="w-full max-w-xl">
        <CardContent className="pt-6">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Step {step} of {totalSteps}</span>
              <span className="text-sm">{Math.round((step / totalSteps) * 100)}% Complete</span>
            </div>
            <Progress value={(step / totalSteps) * 100} className="h-2" />
          </div>

          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="inline-flex items-center justify-center bg-purple-100 rounded-full p-3 mb-4">
                  <img
                    src="/public/lovable-uploads/bb92a12a-903b-4294-b05d-81b783c1576f.png"
                    alt="Wellspring Family"
                    className="h-12 w-12"
                  />
                </div>
                <h1 className="text-2xl font-bold mb-2">Welcome to Wellspring</h1>
                <p className="text-gray-600 mb-4">Let's set up your family wellbeing hub.</p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="family-name">What's your family's name?</Label>
                  <Input id="family-name" placeholder="e.g. The Jackson Family" />
                </div>

                <div>
                  <Label>How many people are in your family?</Label>
                  <RadioGroup defaultValue="4" className="grid grid-cols-4 gap-2 mt-2">
                    <div>
                      <RadioGroupItem value="2" id="family-2" className="peer sr-only" />
                      <Label
                        htmlFor="family-2"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <Users className="mb-2 h-6 w-6" />
                        <span className="text-sm">2</span>
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="3" id="family-3" className="peer sr-only" />
                      <Label
                        htmlFor="family-3"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <Users className="mb-2 h-6 w-6" />
                        <span className="text-sm">3</span>
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="4" id="family-4" className="peer sr-only" />
                      <Label
                        htmlFor="family-4"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <Users className="mb-2 h-6 w-6" />
                        <span className="text-sm">4</span>
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="5+" id="family-5plus" className="peer sr-only" />
                      <Label
                        htmlFor="family-5plus"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <Users className="mb-2 h-6 w-6" />
                        <span className="text-sm">5+</span>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="inline-flex items-center justify-center bg-purple-100 rounded-full p-3 mb-4">
                  <Heart className="h-10 w-10 text-purple-600" />
                </div>
                <h1 className="text-2xl font-bold mb-2">What are your family goals?</h1>
                <p className="text-gray-600 mb-4">Select what matters most to your family.</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="goal1" className="h-4 w-4 text-purple-600 rounded" />
                  <label htmlFor="goal1" className="text-gray-800">Spend more quality time together</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="goal2" className="h-4 w-4 text-purple-600 rounded" />
                  <label htmlFor="goal2" className="text-gray-800">Improve communication</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="goal3" className="h-4 w-4 text-purple-600 rounded" />
                  <label htmlFor="goal3" className="text-gray-800">Plan and save for family trips</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="goal4" className="h-4 w-4 text-purple-600 rounded" />
                  <label htmlFor="goal4" className="text-gray-800">Develop healthy habits together</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="goal5" className="h-4 w-4 text-purple-600 rounded" />
                  <label htmlFor="goal5" className="text-gray-800">Balance screen time and family time</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="goal6" className="h-4 w-4 text-purple-600 rounded" />
                  <label htmlFor="goal6" className="text-gray-800">Manage household tasks better</label>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="text-center">
                <h1 className="text-2xl font-bold mb-2">Create your family avatar</h1>
                <p className="text-gray-600 mb-4">Choose an avatar that represents your family.</p>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="border-2 border-purple-500 rounded-lg p-2 flex justify-center">
                  <img 
                    src="/public/lovable-uploads/ba49412f-5401-4238-af2b-fb6bb3b13a54.png" 
                    alt="Family Avatar 1" 
                    className="h-24 w-24 object-contain"
                  />
                </div>
                <div className="border-2 border-gray-200 rounded-lg p-2 flex justify-center">
                  <div className="h-24 w-24 bg-gray-100 flex items-center justify-center rounded-lg">
                    <span className="text-gray-400">Avatar 2</span>
                  </div>
                </div>
                <div className="border-2 border-gray-200 rounded-lg p-2 flex justify-center">
                  <div className="h-24 w-24 bg-gray-100 flex items-center justify-center rounded-lg">
                    <span className="text-gray-400">Avatar 3</span>
                  </div>
                </div>
                <div className="border-2 border-gray-200 rounded-lg p-2 flex justify-center">
                  <div className="h-24 w-24 bg-gray-100 flex items-center justify-center rounded-lg">
                    <span className="text-gray-400">Avatar 4</span>
                  </div>
                </div>
                <div className="border-2 border-gray-200 rounded-lg p-2 flex justify-center">
                  <div className="h-24 w-24 bg-gray-100 flex items-center justify-center rounded-lg">
                    <span className="text-gray-400">Avatar 5</span>
                  </div>
                </div>
                <div className="border-2 border-gray-200 rounded-lg p-2 flex justify-center">
                  <div className="h-24 w-24 bg-gray-100 flex items-center justify-center rounded-lg">
                    <span className="text-gray-400">Avatar 6</span>
                  </div>
                </div>
              </div>

              <div className="text-center text-sm text-gray-600 mt-4">
                You can customize your avatar more later.
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="inline-flex items-center justify-center bg-green-100 rounded-full p-3 mb-4">
                  <svg className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h1 className="text-2xl font-bold mb-2">You're all set!</h1>
                <p className="text-gray-600 mb-4">
                  Get ready to strengthen your family relationships and have fun together.
                </p>
              </div>

              <div className="bg-purple-50 rounded-lg p-4 space-y-3">
                <h3 className="font-medium text-purple-800">Here's what you can do next:</h3>
                <div className="flex items-start">
                  <div className="bg-purple-200 rounded-full p-1 mr-3 mt-0.5">
                    <ChevronRight className="h-4 w-4 text-purple-700" />
                  </div>
                  <p className="text-sm text-gray-700">Set up your first family challenge</p>
                </div>
                <div className="flex items-start">
                  <div className="bg-purple-200 rounded-full p-1 mr-3 mt-0.5">
                    <ChevronRight className="h-4 w-4 text-purple-700" />
                  </div>
                  <p className="text-sm text-gray-700">Invite your family members to join</p>
                </div>
                <div className="flex items-start">
                  <div className="bg-purple-200 rounded-full p-1 mr-3 mt-0.5">
                    <ChevronRight className="h-4 w-4 text-purple-700" />
                  </div>
                  <p className="text-sm text-gray-700">Create your first shared task</p>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between mt-8">
            {step > 1 ? (
              <Button variant="outline" onClick={prevStep}>
                <ChevronLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            ) : (
              <div></div>
            )}
            <Button onClick={nextStep}>
              {step < totalSteps ? (
                <>
                  Next
                  <ChevronRight className="h-4 w-4 ml-2" />
                </>
              ) : (
                "Get Started"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnboardingPage;
