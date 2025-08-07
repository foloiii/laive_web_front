
import React, { useState, useEffect } from 'react';

const DashboardPreview = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const assistantQuestions = [
    "What is the timeline of your project?",
    "How can we access the API of the Customer service management?",
    "Do you want your dashboard to have a filter on Customer age?",
    "What are the main user personas for this feature?",
    "Should we implement role-based access controls?",
    "What's the expected data volume for this functionality?",
    "Are there any compliance requirements we need to consider?",
    "How should we handle error scenarios in the user flow?"
  ];

  useEffect(() => {
    // Use IntersectionObserver to trigger animation when component enters viewport
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    const section = document.getElementById('dashboard');
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  // Rotate questions every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuestionIndex((prev) => (prev + 1) % assistantQuestions.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [assistantQuestions.length]);

  return (
    <section id="dashboard" className="w-full py-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto space-y-16">
        <div 
          className={`text-center space-y-4 max-w-3xl mx-auto transition-all duration-700 transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-medium tracking-tighter">
            AI Assistant in Action
          </h2>
          <p className="text-cosmic-muted text-lg">
            Watch how our AI suggests the perfect questions during your refinement meetings
          </p>
        </div>
        
        <div 
          className={`cosmic-glow relative rounded-xl overflow-hidden border border-white/10 backdrop-blur-sm bg-cosmic-darker/70 shadow-[0_0_15px_rgba(203,255,77,0.15)] transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          {/* Mock Dashboard */}
          <div className="bg-cosmic-darker/80 backdrop-blur-md w-full">
            {/* Dashboard Header */}
            <div className="flex items-center justify-between p-4 border-b border-cosmic-light/10">
              <div className="flex items-center gap-4">
                <div className="h-8 w-8 rounded-md bg-cosmic-light/20 flex items-center justify-center">
                  <div className="h-3 w-3 rounded-sm bg-cosmic-accent"></div>
                </div>
                <span className="text-white font-medium">Marketing Campaign Q2</span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  <div className="h-8 w-8 rounded-full bg-cosmic-light/30 border-2 border-cosmic-darker"></div>
                  <div className="h-8 w-8 rounded-full bg-cosmic-light/20 border-2 border-cosmic-darker"></div>
                  <div className="h-8 w-8 rounded-full bg-cosmic-light/40 border-2 border-cosmic-darker"></div>
                  <div className="h-8 w-8 rounded-full bg-cosmic-accent/20 border-2 border-cosmic-darker flex items-center justify-center text-xs text-cosmic-accent">+3</div>
                </div>
                
                <div className="h-8 px-3 rounded-md bg-cosmic-light/10 flex items-center justify-center text-white text-sm">
                  Share
                </div>
              </div>
            </div>
            
            {/* Dashboard Content */}
            <div className="flex h-[500px] overflow-hidden">
              {/* Assistant Section */}
              <div className="flex-1 p-6 flex flex-col">
                <div className="mb-6">
                  <h3 className="text-2xl font-semibold text-white mb-2">Assistant</h3>
                  <p className="text-cosmic-muted">AI-powered questions to guide your refinement meetings</p>
                </div>
                
                {/* Current Question Display */}
                <div className="flex-1 flex items-center justify-center">
                  <div className="max-w-2xl w-full">
                    <div className="bg-cosmic-light/5 border border-cosmic-light/20 rounded-xl p-8 text-center">
                      <div className="mb-4">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-cosmic-accent/20 mb-4">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cosmic-accent"/>
                            <path d="M12 17h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cosmic-accent"/>
                          </svg>
                        </div>
                      </div>
                      
                      <h4 className="text-lg font-medium text-white mb-6">Suggested Question</h4>
                      
                      <div 
                        key={currentQuestionIndex}
                        className="text-xl text-cosmic-accent font-medium leading-relaxed animate-fade-in"
                      >
                        "{assistantQuestions[currentQuestionIndex]}"
                      </div>
                      
                      <div className="mt-8 flex items-center justify-center gap-2">
                        {assistantQuestions.map((_, index) => (
                          <div
                            key={index}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                              index === currentQuestionIndex 
                                ? 'bg-cosmic-accent' 
                                : 'bg-cosmic-light/20'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    
                    <div className="mt-6 text-center">
                      <div className="text-sm text-cosmic-muted mb-2">
                        Meeting status: <span className="text-cosmic-accent">Active</span>
                      </div>
                      <div className="text-xs text-cosmic-muted">
                        Questions rotate automatically every 3 seconds
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardPreview;
