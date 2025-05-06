import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, CheckCircle2, Clock, ChevronRight, PlusCircle, BrainCircuit, Zap } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  
  // Mock data for dashboard
  const upcomingSessions = [
    { id: 1, title: 'Data Structures Review', course: 'Computer Science 101', time: '3:00 PM - 4:30 PM', today: true },
    { id: 2, title: 'Physics Problem Set', course: 'Physics 202', time: '10:00 AM - 11:30 AM', today: false },
    { id: 3, title: 'Essay Outline', course: 'English Literature', time: '2:00 PM - 3:00 PM', today: false },
  ];
  
  const tasks = [
    { id: 1, title: 'Complete Calculus Problem Set', course: 'Mathematics 201', due: 'Today', priority: 'high' },
    { id: 2, title: 'Review Chapter 5 Notes', course: 'History 101', due: 'Tomorrow', priority: 'medium' },
    { id: 3, title: 'Submit Research Proposal', course: 'Biology 301', due: 'In 3 days', priority: 'low' },
  ];
  
  const aiSuggestions = [
    { id: 1, text: 'Based on your progress, focus on Data Structures today', icon: <BrainCircuit size={18} /> },
    { id: 2, text: 'You\'ve been studying for 4 hours. Take a 15-minute break.', icon: <Clock size={18} /> },
    { id: 3, text: 'Your Physics exam is in 5 days. Increase study time.', icon: <Zap size={18} /> },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome Section */}
      <div className="rounded-lg bg-gradient-to-r from-primary-600 to-primary-700 p-6 text-white shadow-md">
        <h2 className="text-2xl font-semibold">Welcome back, {user?.name}!</h2>
        <p className="mt-1">Your study journey continues. Here's what's happening today.</p>
        
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-md bg-white/10 p-4 backdrop-blur-sm">
            <div className="flex items-center text-white">
              <Calendar size={20} className="mr-2" />
              <span className="text-sm font-medium">Today's Sessions</span>
            </div>
            <p className="mt-2 text-2xl font-bold">2</p>
          </div>
          
          <div className="rounded-md bg-white/10 p-4 backdrop-blur-sm">
            <div className="flex items-center text-white">
              <CheckCircle2 size={20} className="mr-2" />
              <span className="text-sm font-medium">Tasks Due</span>
            </div>
            <p className="mt-2 text-2xl font-bold">5</p>
          </div>
          
          <div className="rounded-md bg-white/10 p-4 backdrop-blur-sm">
            <div className="flex items-center text-white">
              <Clock size={20} className="mr-2" />
              <span className="text-sm font-medium">Study Hours</span>
            </div>
            <p className="mt-2 text-2xl font-bold">3.5h</p>
          </div>
        </div>
      </div>
      
      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Upcoming Study Sessions */}
        <div className="lg:col-span-2">
          <div className="card h-full">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">Upcoming Study Sessions</h3>
              <Link to="/planner" className="text-sm font-medium text-primary-600 hover:text-primary-700">
                View all
              </Link>
            </div>
            
            <div className="space-y-3">
              {upcomingSessions.map((session) => (
                <div 
                  key={session.id} 
                  className={`relative rounded-md border p-4 ${
                    session.today 
                      ? 'border-primary-200 bg-primary-50' 
                      : 'border-gray-200 bg-white'
                  }`}
                >
                  {session.today && (
                    <span className="absolute right-4 top-4 rounded-full bg-primary-100 px-2 py-1 text-xs font-medium text-primary-800">
                      Today
                    </span>
                  )}
                  <h4 className="text-sm font-medium text-gray-900">{session.title}</h4>
                  <p className="text-xs text-gray-500">{session.course}</p>
                  <div className="mt-2 flex items-center text-sm text-gray-700">
                    <Clock size={16} className="mr-1 text-gray-400" />
                    {session.time}
                  </div>
                </div>
              ))}
              
              <button className="mt-2 flex w-full items-center justify-center rounded-md border border-dashed border-gray-300 p-3 text-sm font-medium text-gray-600 hover:border-primary-300 hover:bg-primary-50 hover:text-primary-600">
                <PlusCircle size={16} className="mr-2" />
                Add Study Session
              </button>
            </div>
          </div>
        </div>
        
        {/* AI Recommendations */}
        <div className="lg:col-span-1">
          <div className="card h-full bg-secondary-50">
            <div className="mb-4 flex items-center">
              <BrainCircuit size={20} className="mr-2 text-secondary-600" />
              <h3 className="text-lg font-medium text-gray-900">AI Recommendations</h3>
            </div>
            
            <div className="space-y-3">
              {aiSuggestions.map((suggestion) => (
                <div 
                  key={suggestion.id} 
                  className="rounded-md bg-white p-3 shadow-sm"
                >
                  <div className="flex">
                    <span className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-secondary-100 text-secondary-600">
                      {suggestion.icon}
                    </span>
                    <div>
                      <p className="text-sm text-gray-700">{suggestion.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Tasks Section */}
      <div className="card">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">Priority Tasks</h3>
          <Link to="/planner" className="text-sm font-medium text-primary-600 hover:text-primary-700">
            View all tasks
          </Link>
        </div>
        
        <div className="divide-y divide-gray-200">
          {tasks.map((task) => (
            <div key={task.id} className="flex items-center py-3">
              <span 
                className={`mr-3 h-2 w-2 rounded-full ${
                  task.priority === 'high' 
                    ? 'bg-error-500' 
                    : task.priority === 'medium' 
                    ? 'bg-warning-500' 
                    : 'bg-success-500'
                }`} 
              />
              <div className="flex-1">
                <h4 className="text-sm font-medium text-gray-900">{task.title}</h4>
                <div className="flex text-xs text-gray-500">
                  <span>{task.course}</span>
                  <span className="mx-2">•</span>
                  <span>Due: {task.due}</span>
                </div>
              </div>
              <button className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500">
                <ChevronRight size={18} />
              </button>
            </div>
          ))}
        </div>
        
        <button className="mt-4 flex w-full items-center justify-center rounded-md border border-dashed border-gray-300 p-2 text-sm font-medium text-gray-600 hover:border-primary-300 hover:bg-primary-50 hover:text-primary-600">
          <PlusCircle size={16} className="mr-2" />
          Add New Task
        </button>
      </div>
    </div>
  );
};

export default Dashboard;