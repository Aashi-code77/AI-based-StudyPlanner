import React from 'react';
import { 
  Bell, 
  Calendar, 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  BrainCircuit, 
  X 
} from 'lucide-react';

// Mock data for notifications
const notifications = [
  {
    id: 1,
    type: 'reminder',
    title: 'Study Session Reminder',
    message: 'Your Data Structures study session starts in 30 minutes.',
    icon: <Calendar size={18} />,
    time: '10 minutes ago',
    read: false,
  },
  {
    id: 2,
    type: 'deadline',
    title: 'Assignment Due Soon',
    message: 'Your Physics problem set is due tomorrow at 11:59 PM.',
    icon: <AlertTriangle size={18} />,
    time: '1 hour ago',
    read: true,
  },
  {
    id: 3,
    type: 'ai',
    title: 'Study Suggestion',
    message: 'Based on your recent activity, consider reviewing Calculus chapter 5 today.',
    icon: <BrainCircuit size={18} />,
    time: '3 hours ago',
    read: false,
  },
  {
    id: 4,
    type: 'break',
    title: 'Break Reminder',
    message: "You've been studying for 2 hours. Time for a 15-minute break!",
    icon: <Clock size={18} />,
    time: '5 hours ago',
    read: true,
  },
  {
    id: 5,
    type: 'completion',
    title: 'Task Completed',
    message: 'You completed your Literature review task. Great job!',
    icon: <CheckCircle size={18} />,
    time: '1 day ago',
    read: true,
  },
  {
    id: 6,
    type: 'reminder',
    title: 'Upcoming Exam',
    message: 'Your Biology midterm exam is in 3 days. Time to start reviewing!',
    icon: <Calendar size={18} />,
    time: '1 day ago',
    read: true,
  },
  {
    id: 7,
    type: 'ai',
    title: 'Study Pattern Insight',
    message: "You're most productive in the mornings. Consider scheduling difficult topics before noon.",
    icon: <BrainCircuit size={18} />,
    time: '2 days ago',
    read: true,
  },
];

const Notifications: React.FC = () => {
  const unreadCount = notifications.filter(n => !n.read).length;
  
  const getIconBackground = (type: string) => {
    switch (type) {
      case 'reminder':
        return 'bg-primary-100 text-primary-700';
      case 'deadline':
        return 'bg-error-100 text-error-700';
      case 'ai':
        return 'bg-secondary-100 text-secondary-700';
      case 'break':
        return 'bg-accent-100 text-accent-700';
      case 'completion':
        return 'bg-success-100 text-success-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="card">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center">
            <Bell size={22} className="mr-2 text-primary-600" />
            <h2 className="text-xl font-semibold text-gray-900">Notifications</h2>
            {unreadCount > 0 && (
              <span className="ml-2 rounded-full bg-primary-100 px-2 py-0.5 text-xs font-medium text-primary-800">
                {unreadCount} new
              </span>
            )}
          </div>
          
          <div className="flex space-x-2">
            <button className="text-sm font-medium text-primary-600 hover:text-primary-700">
              Mark all as read
            </button>
          </div>
        </div>
        
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div 
              key={notification.id} 
              className={`relative rounded-lg border p-4 transition duration-150 hover:bg-gray-50 ${
                notification.read ? 'border-gray-200' : 'border-primary-200 bg-primary-50'
              }`}
            >
              <div className="flex">
                <div className={`mr-4 flex h-10 w-10 items-center justify-center rounded-full ${getIconBackground(notification.type)}`}>
                  {notification.icon}
                </div>
                
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-gray-900">{notification.title}</h3>
                  <p className="text-sm text-gray-600">{notification.message}</p>
                  <span className="mt-1 block text-xs text-gray-500">{notification.time}</span>
                </div>
                
                <button className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-200 hover:text-gray-500">
                  <X size={16} />
                </button>
              </div>
              
              {!notification.read && (
                <div className="absolute right-4 top-4 h-2 w-2 rounded-full bg-primary-500"></div>
              )}
            </div>
          ))}
        </div>
        
        {notifications.length === 0 && (
          <div className="mt-8 flex flex-col items-center justify-center py-12 text-center">
            <Bell size={48} className="mb-4 text-gray-300" />
            <h3 className="mb-2 text-lg font-medium text-gray-900">No notifications</h3>
            <p className="text-sm text-gray-500">You're all caught up! New notifications will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;