
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Check, Users, Droplets, Brain } from 'lucide-react';

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-16 md:py-24 animate-fade-in">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/2 mb-10 md:mb-0 md:pr-8">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-brand-blue to-brand-purple">
                Balance Your Work &amp; Family Life
              </h1>
              <p className="text-xl mb-8 text-muted-foreground">
                FamilyWell combines wellness tracking, family connectivity, and self-development tools to help busy professionals thrive.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/register">
                  <Button size="lg" className="bg-gradient-to-r from-brand-blue to-brand-purple hover:opacity-90">
                    Get Started <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/pricing">
                  <Button size="lg" variant="outline">
                    View Pricing
                  </Button>
                </Link>
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <div className="relative">
                <div className="rounded-2xl bg-gradient-to-br from-brand-blue-light to-brand-purple-light p-1">
                  <div className="bg-background rounded-xl overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1516146544193-b54a65682f16?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2000&q=80" 
                      alt="Family wellness" 
                      className="w-full h-[400px] object-cover"
                    />
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 bg-white dark:bg-card p-4 rounded-lg shadow-lg">
                  <div className="flex items-center gap-2">
                    <div className="bg-green-100 rounded-full p-1">
                      <Check className="h-4 w-4 text-green-600" />
                    </div>
                    <span className="text-sm font-medium">Stay connected with family</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Comprehensive Wellness Solution</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our integrated platform helps you maintain wellness, stay connected with family, and grow personally.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-card rounded-xl p-6 shadow-sm card-hover">
              <div className="bg-brand-blue-light p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-brand-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Family Connectivity</h3>
              <p className="text-muted-foreground mb-4">
                Daily reminders to call family members, group messaging support, and prompts for shared activities.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-green-600 mr-2" />
                  <span className="text-sm">Family chat groups</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-green-600 mr-2" />
                  <span className="text-sm">Smart reminders</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-green-600 mr-2" />
                  <span className="text-sm">Shared family activities</span>
                </li>
              </ul>
            </div>

            {/* Feature 2 */}
            <div className="bg-card rounded-xl p-6 shadow-sm card-hover">
              <div className="bg-brand-purple-light p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <Droplets className="h-6 w-6 text-brand-purple" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Wellness Tracking</h3>
              <p className="text-muted-foreground mb-4">
                Monitor water intake, get posture tips, and receive break reminders for better physical wellbeing.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-green-600 mr-2" />
                  <span className="text-sm">Hydration monitoring</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-green-600 mr-2" />
                  <span className="text-sm">Office health reminders</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-green-600 mr-2" />
                  <span className="text-sm">Mood & energy tracking</span>
                </li>
              </ul>
            </div>

            {/* Feature 3 */}
            <div className="bg-card rounded-xl p-6 shadow-sm card-hover">
              <div className="bg-brand-teal-light p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <Brain className="h-6 w-6 text-brand-teal" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Self-Development</h3>
              <p className="text-muted-foreground mb-4">
                Set personal goals, track habits, and access resources for continuous self-improvement.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-green-600 mr-2" />
                  <span className="text-sm">Goal setting & tracking</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-green-600 mr-2" />
                  <span className="text-sm">Habit builder</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-green-600 mr-2" />
                  <span className="text-sm">Progress analytics</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              FamilyWell is helping professionals around the world balance work and personal life.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-card rounded-xl p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-brand-blue-light flex items-center justify-center mr-3">
                  <span className="font-medium text-brand-blue">JD</span>
                </div>
                <div>
                  <p className="font-medium">Jane Dawson</p>
                  <p className="text-sm text-muted-foreground">Marketing Manager</p>
                </div>
              </div>
              <p className="text-muted-foreground">
                "FamilyWell has transformed how I balance my busy work schedule with family time. The reminders to take breaks and stay hydrated have improved my energy levels dramatically."
              </p>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-card rounded-xl p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-brand-purple-light flex items-center justify-center mr-3">
                  <span className="font-medium text-brand-purple">MA</span>
                </div>
                <div>
                  <p className="font-medium">Michael Anderson</p>
                  <p className="text-sm text-muted-foreground">Software Developer</p>
                </div>
              </div>
              <p className="text-muted-foreground">
                "As someone who works long hours coding, the posture reminders and break notifications have been life-changing. Plus, I never forget my mom's birthday anymore!"
              </p>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-card rounded-xl p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-brand-teal-light flex items-center justify-center mr-3">
                  <span className="font-medium text-brand-teal">SL</span>
                </div>
                <div>
                  <p className="font-medium">Sarah Liu</p>
                  <p className="text-sm text-muted-foreground">Financial Analyst</p>
                </div>
              </div>
              <p className="text-muted-foreground">
                "The habit tracking features have helped me develop a consistent meditation practice, and the family chat keeps me connected to my kids while I'm traveling for work."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-brand-blue to-brand-purple">
        <div className="container px-4 mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 text-white">Ready to Transform Your Work-Life Balance?</h2>
          <p className="text-xl mb-8 text-white/80 max-w-2xl mx-auto">
            Join thousands of professionals who are thriving both at work and at home with FamilyWell.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" className="bg-white text-brand-blue hover:bg-white/90">
                Start Your Free Trial
              </Button>
            </Link>
            <Link to="/pricing">
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                View Pricing Plans
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
