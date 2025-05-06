import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  Plus, 
  Filter,
  BrainCircuit
} from 'lucide-react';
import { format, addDays, startOfWeek, addWeeks, subWeeks, isSameDay } from 'date-fns';

// Mock data
const mockSessions = [
  { 
    id: 1, 
    title: 'Data Structures Review', 
    course: 'Computer Science 101', 
    date: new Date(2025, 3, 15), 
    startTime: '15:00', 
    endTime: '16:30',
    color: 'bg-primary-100 border-primary-200 text-primary-800'
  },
  { 
    id: 2, 
    title: 'Physics Problem Set', 
    course: 'Physics 202', 
    date: new Date(2025, 3, 16), 
    startTime: '10:00', 
    endTime: '11:30',
    color: 'bg-secondary-100 border-secondary-200 text-secondary-800'
  },
  { 
    id: 3, 
    title: 'Essay Outline', 
    course: 'English Literature', 
    date: new Date(2025, 3, 16), 
    startTime: '14:00', 
    endTime: '15:00',
    color: 'bg-accent-100 border-accent-200 text-accent-800'
  },
  { 
    id: 4, 
    title: 'Calculus Practice Problems', 
    course: 'Mathematics 201', 
    date: new Date(2025, 3, 17), 
    startTime: '09:00', 
    endTime: '10:30',
    color: 'bg-green-100 border-green-200 text-green-800'
  },
  { 
    id: 5, 
    title: 'Mid-term Exam Prep', 
    course: 'Biology 301', 
    date: new Date(2025, 3, 18), 
    startTime: '16:00', 
    endTime: '18:00',
    color: 'bg-purple-100 border-purple-200 text-purple-800'
  }
];

const mockTasks = [
  { 
    id: 1, 
    title: 'Complete Calculus Problem Set', 
    course: 'Mathematics 201', 
    dueDate: '2025-04-15', 
    priority: 'high',
    completed: false
  },
  { 
    id: 2, 
    title: 'Review Chapter 5 Notes', 
    course: 'History 101', 
    dueDate: '2025-04-16', 
    priority: 'medium',
    completed: false
  },
  { 
    id: 3, 
    title: 'Submit Research Proposal', 
    course: 'Biology 301', 
    dueDate: '2025-04-18', 
    priority: 'low',
    completed: false
  },
  { 
    id: 4, 
    title: 'Practice Lab Experiment', 
    course: 'Chemistry 202', 
    dueDate: '2025-04-17', 
    priority: 'medium',
    completed: true
  },
  { 
    id: 5, 
    title: 'Literature Review', 
    course: 'Psychology 101', 
    dueDate: '2025-04-19', 
    priority: 'high',
    completed: false
  }
];

const aiRecommendations = [
  {
    id: 1,
    text: "You've been struggling with Calculus. Consider allocating 30 more minutes to your next session.",
    type: "time-allocation"
  },
  {
    id: 2,
    text: "Your Biology exam is in 5 days. Start reviewing key concepts today.",
    type: "exam-prep"
  },
  {
    id: 3,
    text: "Based on your study patterns, you're most productive in the morning. Schedule difficult topics before noon.",
    type: "productivity"
  }
];

const StudyPlanner: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState<'day' | 'week'>('week');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tasks, setTasks] = useState(mockTasks);
  
  // Handler for task completion toggle
  const toggleTaskCompletion = (taskId: number) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };
  
  // Week navigation
  const goToPreviousWeek = () => {
    setCurrentDate(subWeeks(currentDate, 1));
  };
  
  const goToNextWeek = () => {
    setCurrentDate(addWeeks(currentDate, 1));
  };
  
  const goToToday = () => {
    setCurrentDate(new Date());
    setSelectedDate(new Date());
  };
  
  // Generate days of the week
  const generateWeekDays = () => {
    const start = startOfWeek(currentDate, { weekStartsOn: 1 }); // Start on Monday
    return Array.from({ length: 7 }).map((_, i) => addDays(start, i));
  };
  
  const weekDays = generateWeekDays();
  
  // Filter sessions for the selected date
  const getSessionsForDate = (date: Date) => {
    return mockSessions.filter(session => isSameDay(session.date, date));
  };
  
  // Format time for display
  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const date = new Date();
    date.setHours(parseInt(hours, 10));
    date.setMinutes(parseInt(minutes, 10));
    return format(date, 'h:mm a');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Calendar header */}
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div className="flex items-center space-x-4">
          <div className="rounded-lg bg-white p-1 shadow-sm">
            <button 
              onClick={() => setCurrentView('day')}
              className={`rounded px-3 py-1 text-sm font-medium ${
                currentView === 'day' 
                  ? 'bg-primary-100 text-primary-800' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Day
            </button>
            <button 
              onClick={() => setCurrentView('week')}
              className={`rounded px-3 py-1 text-sm font-medium ${
                currentView === 'week' 
                  ? 'bg-primary-100 text-primary-800' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Week
            </button>
          </div>
          
          <div className="flex items-center space-x-2">
            <button 
              onClick={goToPreviousWeek}
              className="rounded-full p-1 text-gray-600 hover:bg-gray-100"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={goToToday}
              className="rounded-md bg-white px-3 py-1 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
            >
              Today
            </button>
            <button 
              onClick={goToNextWeek}
              className="rounded-full p-1 text-gray-600 hover:bg-gray-100"
            >
              <ChevronRight size={20} />
            </button>
            <h2 className="text-lg font-semibold text-gray-900">
              {format(currentDate, 'MMMM yyyy')}
            </h2>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <button className="btn btn-secondary flex items-center space-x-1">
            <Filter size={16} />
            <span>Filter</span>
          </button>
          <button className="btn btn-primary flex items-center space-x-1">
            <Plus size={16} />
            <span>Add Session</span>
          </button>
        </div>
      </div>
      
      {/* Main content layout */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        {/* Calendar and sessions */}
        <div className="lg:col-span-3">
          <div className="card">
            {/* Week view */}
            {currentView === 'week' && (
              <div className="overflow-x-auto">
                <div className="grid grid-cols-7 gap-px border-b border-gray-200">
                  {weekDays.map((day, index) => (
                    <div 
                      key={index} 
                      className={`p-2 text-center ${
                        isSameDay(day, new Date()) 
                          ? 'bg-primary-50' 
                          : ''
                      }`}
                      onClick={() => setSelectedDate(day)}
                    >
                      <div className="text-xs font-medium text-gray-500">
                        {format(day, 'EEE')}
                      </div>
                      <div 
                        className={`mx-auto mt-1 flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${
                          isSameDay(day, selectedDate) 
                            ? 'bg-primary-600 text-white' 
                            : isSameDay(day, new Date()) 
                            ? 'bg-primary-100 text-primary-700' 
                            : 'text-gray-900 hover:bg-gray-100'
                        }`}
                      >
                        {format(day, 'd')}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 space-y-4">
                  {weekDays.map((day, index) => {
                    const sessionsForDay = getSessionsForDate(day);
                    if (sessionsForDay.length === 0) return null;
                    
                    return (
                      <div key={index} className="rounded-md bg-gray-50 p-3">
                        <h3 className="mb-2 font-medium text-gray-700">
                          {isSameDay(day, new Date()) 
                            ? 'Today' 
                            : format(day, 'EEEE, MMMM d')}
                        </h3>
                        <div className="space-y-2">
                          {sessionsForDay.map((session) => (
                            <div 
                              key={session.id} 
                              className={`rounded-md border p-3 ${session.color}`}
                            >
                              <h4 className="font-medium">{session.title}</h4>
                              <p className="text-xs text-gray-600">{session.course}</p>
                              <div className="mt-2 flex items-center text-sm">
                                <Clock size={14} className="mr-1" />
                                <span>
                                  {formatTime(session.startTime)} - {formatTime(session.endTime)}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                  
                  {weekDays.every(day => getSessionsForDate(day).length === 0) && (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <CalendarIcon size={48} className="mb-4 text-gray-300" />
                      <h3 className="mb-2 text-lg font-medium text-gray-900">No study sessions scheduled</h3>
                      <p className="mb-4 text-sm text-gray-500">Click the "Add Session" button to create your first study session.</p>
                      <button className="btn btn-primary flex items-center space-x-1">
                        <Plus size={16} />
                        <span>Add Session</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {/* Day view */}
            {currentView === 'day' && (
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900">
                    {isSameDay(selectedDate, new Date()) 
                      ? 'Today' 
                      : format(selectedDate, 'EEEE, MMMM d, yyyy')}
                  </h3>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => setSelectedDate(addDays(selectedDate, -1))}
                      className="rounded-full p-1 text-gray-600 hover:bg-gray-100"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <button 
                      onClick={() => setSelectedDate(addDays(selectedDate, 1))}
                      className="rounded-full p-1 text-gray-600 hover:bg-gray-100"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {getSessionsForDate(selectedDate).map((session) => (
                    <div 
                      key={session.id} 
                      className={`rounded-md border p-4 ${session.color}`}
                    >
                      <h4 className="font-medium">{session.title}</h4>
                      <p className="text-sm text-gray-600">{session.course}</p>
                      <div className="mt-2 flex items-center text-sm">
                        <Clock size={16} className="mr-1" />
                        <span>
                          {formatTime(session.startTime)} - {formatTime(session.endTime)}
                        </span>
                      </div>
                    </div>
                  ))}
                  
                  {getSessionsForDate(selectedDate).length === 0 && (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <CalendarIcon size={48} className="mb-4 text-gray-300" />
                      <h3 className="mb-2 text-lg font-medium text-gray-900">No study sessions scheduled</h3>
                      <p className="mb-4 text-sm text-gray-500">Click the "Add Session" button to schedule a study session for this day.</p>
                      <button className="btn btn-primary flex items-center space-x-1">
                        <Plus size={16} />
                        <span>Add Session</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Sidebar */}
        <div className="space-y-6 lg:col-span-1">
          {/* Tasks */}
          <div className="card">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">Tasks</h3>
              <button className="text-sm font-medium text-primary-600 hover:text-primary-700">
                View all
              </button>
            </div>
            
            <div className="space-y-3">
              {tasks.filter(task => !task.completed).slice(0, 3).map((task) => (
                <div key={task.id} className="flex items-start space-x-3 rounded-md border border-gray-200 p-3">
                  <input 
                    type="checkbox" 
                    checked={task.completed}
                    onChange={() => toggleTaskCompletion(task.id)}
                    className="mt-1 h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-900">{task.title}</h4>
                    <p className="text-xs text-gray-500">{task.course}</p>
                    <div className="mt-1 flex items-center">
                      <span 
                        className={`mr-2 h-2 w-2 rounded-full ${
                          task.priority === 'high' 
                            ? 'bg-error-500' 
                            : task.priority === 'medium' 
                            ? 'bg-warning-500' 
                            : 'bg-success-500'
                        }`} 
                      />
                      <span className="text-xs text-gray-500">
                        Due: {new Date(task.dueDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              
              <button className="flex w-full items-center justify-center rounded-md border border-dashed border-gray-300 p-2 text-sm font-medium text-gray-600 hover:border-primary-300 hover:bg-primary-50 hover:text-primary-600">
                <Plus size={16} className="mr-2" />
                Add Task
              </button>
            </div>
          </div>
          
          {/* AI Recommendations */}
          <div className="card bg-secondary-50">
            <div className="mb-4 flex items-center">
              <BrainCircuit size={18} className="mr-2 text-secondary-600" />
              <h3 className="text-lg font-medium text-gray-900">AI Insights</h3>
            </div>
            
            <div className="space-y-3">
              {aiRecommendations.map(rec => (
                <div key={rec.id} className="rounded-md bg-white p-3 text-sm text-gray-700 shadow-sm">
                  {rec.text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyPlanner;