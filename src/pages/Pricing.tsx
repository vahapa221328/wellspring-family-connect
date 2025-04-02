
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Check, ArrowRight } from 'lucide-react';

const PricingTier = ({ 
  name, 
  price, 
  description, 
  features, 
  highlightedFeatures = [],
  recommended = false 
}: { 
  name: string;
  price: number;
  description: string;
  features: string[];
  highlightedFeatures?: string[];
  recommended?: boolean;
}) => {
  return (
    <div className={`bg-card rounded-xl p-6 shadow-sm relative flex flex-col h-full ${
      recommended ? 'border-2 border-primary' : ''
    }`}>
      {recommended && (
        <div className="absolute top-0 left-0 right-0 bg-primary text-primary-foreground text-sm font-medium py-1 rounded-t-lg text-center">
          Recommended
        </div>
      )}
      <div className="mb-4">
        <h3 className="text-xl font-bold">{name}</h3>
        <div className="mt-2">
          <span className="text-3xl font-bold">${price}</span>
          <span className="text-muted-foreground ml-1">/month</span>
        </div>
        <p className="text-muted-foreground mt-2">{description}</p>
      </div>
      
      <div className="flex-1">
        <ul className="space-y-3 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <div className="mr-2 bg-brand-blue-light rounded-full p-0.5">
                <Check className="h-4 w-4 text-brand-blue" />
              </div>
              <span className="text-sm">{feature}</span>
            </li>
          ))}
          
          {highlightedFeatures.map((feature, index) => (
            <li key={`highlight-${index}`} className="flex items-center font-medium">
              <div className="mr-2 bg-brand-purple-light rounded-full p-0.5">
                <Check className="h-4 w-4 text-brand-purple" />
              </div>
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      
      <Link to="/register" className="mt-auto">
        <Button 
          className={`w-full ${recommended ? 'bg-gradient-to-r from-brand-blue to-brand-purple text-white' : ''}`}
          variant={recommended ? "default" : "outline"}
        >
          Get Started
        </Button>
      </Link>
    </div>
  );
};

const Pricing = () => {
  return (
    <div className="py-16">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that's right for you and your family's wellness journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {/* $1 Plan */}
          <PricingTier
            name="Basic"
            price={1}
            description="Start your wellness journey"
            features={[
              "Daily wellness reminders",
              "Water intake tracker",
              "Single user account"
            ]}
          />
          
          {/* $2 Plan */}
          <PricingTier
            name="Standard"
            price={2}
            description="For individual wellness tracking"
            features={[
              "Daily wellness reminders",
              "Water intake tracker",
              "Single user account",
              "Basic habit tracking"
            ]}
            highlightedFeatures={[
              "Posture reminders"
            ]}
          />
          
          {/* $3 Plan */}
          <PricingTier
            name="Family"
            price={3}
            description="Connect with your loved ones"
            features={[
              "All Standard features",
              "Up to 4 family members",
              "Family chat"
            ]}
            highlightedFeatures={[
              "Family reminders",
              "Shared calendar"
            ]}
            recommended={true}
          />
          
          {/* $4 Plan */}
          <PricingTier
            name="Premium"
            price={4}
            description="Enhanced wellness features"
            features={[
              "All Family features",
              "Up to 6 family members",
              "Advanced analytics"
            ]}
            highlightedFeatures={[
              "Mood tracking",
              "Stress management tools"
            ]}
          />
          
          {/* $5 Plan */}
          <PricingTier
            name="Ultimate"
            price={5}
            description="Complete wellness solution"
            features={[
              "All Premium features",
              "Unlimited family members",
              "Priority support"
            ]}
            highlightedFeatures={[
              "AI wellness coach",
              "Personalized recommendations",
              "Advanced habit analysis"
            ]}
          />
        </div>
        
        <div className="mt-20 text-center">
          <h2 className="text-2xl font-bold mb-6">Ready to transform your family's wellness?</h2>
          <Link to="/register">
            <Button size="lg" className="bg-gradient-to-r from-brand-blue to-brand-purple">
              Get Started Today <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
        
        <div className="mt-12 text-center">
          <h3 className="text-xl font-medium mb-4">Still have questions?</h3>
          <p className="text-muted-foreground mb-6">
            Contact our support team for more information about our plans and features.
          </p>
          <Link to="/contact">
            <Button variant="outline" size="lg">
              Contact Support
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
