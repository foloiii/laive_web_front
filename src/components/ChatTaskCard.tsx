import React, { useState, useEffect } from 'react';

export interface ChatTask {
  id: string;
  message: string;
  author: string;
  timestamp: string;
  avatar?: string;
  avatarColor?: string;
  category?: {
    type: string;
    color: string;
  };
  annotations?: {
    text: string;
    tooltip: string;
  }[];
}

interface ChatTaskCardProps {
  task: ChatTask;
  onTypingComplete?: () => void;
}

const ChatTaskCard: React.FC<ChatTaskCardProps> = ({ task, onTypingComplete }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [displayedMessage, setDisplayedMessage] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    // Déclencher l'animation d'apparition après un court délai
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isVisible && !isTypingComplete) {
      let currentIndex = 0;
      const typingInterval = setInterval(() => {
        if (currentIndex < task.message.length) {
          setDisplayedMessage(task.message.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(typingInterval);
          setIsTypingComplete(true);
          // Notifier que la frappe est terminée après un délai
          setTimeout(() => {
            onTypingComplete?.();
          }, 500);
        }
      }, 30); // 30ms entre chaque caractère

      return () => clearInterval(typingInterval);
    }
  }, [isVisible, task.message, isTypingComplete, onTypingComplete]);

  // Générer une couleur d'avatar basée sur le nom de l'auteur ou utiliser la couleur personnalisée
  const getAvatarColor = (name: string, customColor?: string) => {
    if (customColor) {
      return customColor;
    }

    const colors = [
      'bg-blue-500',
      'bg-green-500',
      'bg-purple-500',
      'bg-orange-500',
      'bg-pink-500',
      'bg-indigo-500'
    ];
    const index = name.length % colors.length;
    return colors[index];
  };

  // Obtenir les initiales de l'auteur
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  // Générer la classe CSS pour la catégorie
  const getCategoryClass = (color: string) => {
    const colorMap: { [key: string]: string } = {
      'blue': 'bg-blue-100 text-blue-800 border-blue-200',
      'green': 'bg-green-100 text-green-800 border-green-200',
      'purple': 'bg-purple-100 text-purple-800 border-purple-200',
      'orange': 'bg-orange-100 text-orange-800 border-orange-200',
      'red': 'bg-red-100 text-red-800 border-red-200',
      'yellow': 'bg-yellow-100 text-yellow-800 border-yellow-200'
    };
    return colorMap[color] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  // Traiter le message pour ajouter les annotations
  const processMessage = (message: string) => {
    if (!task.annotations || !isTypingComplete) {
      return message;
    }

    let processedMessage = message;
    const elements: React.ReactNode[] = [];
    let lastIndex = 0;

    task.annotations.forEach((annotation, index) => {
      const textIndex = processedMessage.indexOf(annotation.text, lastIndex);
      if (textIndex !== -1) {
        // Ajouter le texte avant l'annotation
        if (textIndex > lastIndex) {
          elements.push(processedMessage.slice(lastIndex, textIndex));
        }

        // Ajouter l'annotation avec tooltip
        elements.push(
          <span
            key={index}
            className="underline decoration-dotted decoration-2 underline-offset-2 text-primary cursor-help relative group"
          >
            {annotation.text}
            {/* Tooltip en position relative */}
            <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 px-3 py-2 text-xs text-foreground bg-card border border-border rounded-md shadow-xl opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 z-[9999] w-[200px]">
              {annotation.tooltip}
              <div className="absolute right-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-r-4 border-transparent border-r-border"></div>
            </div>
          </span>
        );

        lastIndex = textIndex + annotation.text.length;
      }
    });

    // Ajouter le reste du message
    if (lastIndex < processedMessage.length) {
      elements.push(processedMessage.slice(lastIndex));
    }

    return elements.length > 0 ? elements : message;
  };

  return (
    <div
      className={`p-4 bg-card rounded-md border border-border shadow-sm hover:shadow-md transition-all duration-500 flex gap-3 transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      {/* Avatar */}
      <div className={`h-8 w-8 rounded-full flex items-center justify-center text-white text-xs font-medium flex-shrink-0 ${getAvatarColor(task.author, task.avatarColor)}`}>
        {task.avatar ? (
          <img src={task.avatar} alt={task.author} className="h-full w-full rounded-full object-cover" />
        ) : (
          getInitials(task.author)
        )}
      </div>

      {/* Contenu du message */}
      <div className="flex-1 min-w-0">
        {/* En-tête avec nom, timestamp et catégorie */}
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <span className="font-medium text-foreground text-sm">{task.author}</span>
          <span className="text-muted-foreground text-xs">{task.timestamp}</span>
          {task.category && (
            <span className={`text-xs px-2 py-1 rounded-full border font-medium ${getCategoryClass(task.category.color)}`}>
              {task.category.type}
            </span>
          )}
        </div>

        {/* Message avec effet de frappe et annotations */}
        <div className="text-sm text-foreground leading-relaxed relative overflow-visible">
          {isTypingComplete ? processMessage(displayedMessage) : displayedMessage}
          {!isTypingComplete && (
            <span className="animate-pulse">|</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatTaskCard;
