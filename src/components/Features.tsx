
import React, { useState } from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, Layers, Grid3x3, ListCheck, BookOpen, Star, LayoutDashboard } from "lucide-react";

const Features = () => {
  const [openFeature, setOpenFeature] = useState<number | null>(null);
  
  const features = [
    {
      title: "Real-time AI Suggestions",
      description: "Get intelligent question suggestions during live meetings based on conversation context.",
      expandedDescription: "Our AI listens to your refinement sessions and provides contextually relevant questions in real-time. Never miss important technical details, edge cases, or user story clarifications. The AI learns from your team's patterns to provide increasingly accurate suggestions.",
      icon: (
        <Layers size={24} className="text-cosmic-accent" />
      )
    },
    {
      title: "Automated Meeting Notes",
      description: "Generate comprehensive meeting summaries and action items automatically.",
      expandedDescription: "Focus on the conversation while our AI captures detailed notes, key decisions, and action items. Automatic transcription with speaker identification, key topic extraction, and formatted summaries ready for sharing with stakeholders.",
      icon: (
        <Grid3x3 size={24} className="text-cosmic-accent" />
      )
    },
    {
      title: "Smart Question Library",
      description: "Access curated question templates based on industry best practices.",
      expandedDescription: "Leverage our extensive library of proven refinement questions categorized by user story type, complexity, and domain. Customizable templates that adapt to your team's specific needs and product context.",
      icon: (
        <LayoutDashboard size={24} className="text-cosmic-accent" />
      )
    },
    {
      title: "Meeting Analytics",
      description: "Track refinement effectiveness and identify improvement opportunities.",
      expandedDescription: "Analyze meeting patterns, question effectiveness, and refinement quality over time. Identify bottlenecks, measure time savings, and optimize your refinement process with data-driven insights.",
      icon: (
        <ListCheck size={24} className="text-cosmic-accent" />
      )
    },
    {
      title: "Native Integrations",
      description: "Seamlessly connect with your existing tools and workflows.",
      expandedDescription: "Direct integration with Jira, Confluence, Teams, Outlook, and other popular tools. Automatically sync meeting outcomes, create tickets, and update documentation without context switching.",
      icon: (
        <Star size={24} className="text-cosmic-accent" />
      )
    },
    {
      title: "Team Collaboration",
      description: "Enhanced collaboration features for distributed and hybrid teams.",
      expandedDescription: "Real-time collaboration tools including shared whiteboards, voting mechanisms, and consensus tracking. Perfect for remote teams who need structured refinement processes with clear outcomes.",
      icon: (
        <BookOpen size={24} className="text-cosmic-accent" />
      )
    }
  ];
  
  const toggleFeature = (index: number) => {
    setOpenFeature(openFeature === index ? null : index);
  };
  
  return (
    <section id="features" className="w-full py-12 md:py-16 px-6 md:px-12">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-medium tracking-tighter">
            Everything your team needs for better refinements
          </h2>
          <p className="text-muted-foreground text-lg">
            Comprehensive AI-powered tools to enhance your refinement meetings and reduce preparation time
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Collapsible
              key={index}
              open={openFeature === index}
              onOpenChange={() => toggleFeature(index)}
              className={`rounded-xl border ${openFeature === index ? 'border-cosmic-light/40' : 'border-cosmic-light/20'} cosmic-gradient transition-all duration-300`}
            >
              <CollapsibleTrigger className="w-full text-left p-6 flex flex-col">
                <div className="flex justify-between items-start">
                  <div className="h-16 w-16 rounded-full bg-cosmic-light/10 flex items-center justify-center mb-6">
                    {feature.icon}
                  </div>
                  <ChevronDown
                    className={`h-5 w-5 text-cosmic-muted transition-transform duration-200 ${
                      openFeature === index ? 'rotate-180' : ''
                    }`}
                  />
                </div>
                <h3 className="text-xl font-medium tracking-tighter mb-3">{feature.title}</h3>
                <p className="text-cosmic-muted">{feature.description}</p>
              </CollapsibleTrigger>
              <CollapsibleContent className="px-6 pb-6 pt-2">
                <div className="pt-3 border-t border-cosmic-light/10">
                  <p className="text-cosmic-muted">{feature.expandedDescription}</p>
                  <div className="mt-4 flex justify-end">
                    <button className="text-cosmic-accent hover:text-cosmic-accent/80 text-sm font-medium">
                      Learn more →
                    </button>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
