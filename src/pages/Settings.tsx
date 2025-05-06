import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { 
  User, 
  Bell, 
  Clock, 
  Moon, 
  Sun, 
  Calendar, 
  BrainCircuit, 
  Sliders, 
  ChevronRight 
} from 'lucide-react';

const Settings: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('studyPreferences');
  
  // Mock settings
  const [studyPreferences, setStudyPreferences] = useState({
    preferredStudyTime: 'morning',
    maxDailyHours: 6,
    breakFrequency: 60,
    breakDuration: 15,
    preferredStudyDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
    notifyBeforeSession: 15
  });
  
  const [aiSettings, setAiSettings] = useState({
    adaptabilityLevel: 'medium',
    aiTone: 'encouraging',
    insightFrequency: 'moderate',
    enablePersonalizedSuggestions: true,
    suggestBreaks: true
  });
  
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    sessionReminders: true,
    deadlineReminders: true,
    completionCelebrations: true,
    aiInsights: true
  });
  
  const [appearanceSettings, setAppearanceSettings] = useState({
    theme: 'light',
    compactMode: false,
    showMotivationalQuotes: true
  });
  
  const tabs = [
    { id: 'studyPreferences', label: 'Study Preferences', icon: <Calendar size={18} /> },
    { id: 'aiSettings', label: 'AI Behavior', icon: <BrainCircuit size={18} /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell size={18} /> },
    { id: 'appearance', label: 'Appearance', icon: <Sliders size={18} /> },
    { id: 'account', label: 'Account', icon: <User size={18} /> },
  ];
  
  return (
    <div className="animate-fade-in">
      <div className="card">
        <h2 className="mb-6 text-xl font-semibold text-gray-900">Settings</h2>
        
        <div className="flex flex-col space-y-6 md:flex-row md:space-x-8 md:space-y-0">
          {/* Tabs */}
          <div className="w-full border-b border-gray-200 md:w-64 md:border-b-0 md:border-r">
            <div className="flex overflow-x-auto pb-3 md:block md:space-y-1 md:pb-0">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex w-full items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium ${
                    activeTab === tab.id
                      ? 'bg-primary-50 text-primary-700 md:border-r-2 md:border-primary-500'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
          
          {/* Content */}
          <div className="flex-1">
            {/* Study Preferences */}
            {activeTab === 'studyPreferences' && (
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-gray-900">Study Preferences</h3>
                <p className="text-sm text-gray-500">Customize how you prefer to study and manage your time.</p>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Preferred Study Time</label>
                    <select 
                      value={studyPreferences.preferredStudyTime}
                      onChange={(e) => setStudyPreferences({...studyPreferences, preferredStudyTime: e.target.value})}
                      className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
                    >
                      <option value="morning">Morning (6AM - 12PM)</option>
                      <option value="afternoon">Afternoon (12PM - 5PM)</option>
                      <option value="evening">Evening (5PM - 10PM)</option>
                      <option value="night">Night (10PM - 6AM)</option>
                      <option value="any">Any time</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Maximum Daily Study Hours
                    </label>
                    <div className="mt-1 flex items-center">
                      <input
                        type="range"
                        min="1"
                        max="12"
                        value={studyPreferences.maxDailyHours}
                        onChange={(e) => setStudyPreferences({...studyPreferences, maxDailyHours: parseInt(e.target.value)})}
                        className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200"
                      />
                      <span className="ml-3 w-12 text-sm font-medium text-gray-900">
                        {studyPreferences.maxDailyHours}h
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Break Frequency</label>
                      <div className="mt-1 flex items-center">
                        <input
                          type="number"
                          min="15"
                          max="120"
                          step="5"
                          value={studyPreferences.breakFrequency}
                          onChange={(e) => setStudyPreferences({...studyPreferences, breakFrequency: parseInt(e.target.value)})}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                        />
                        <span className="ml-2 text-sm text-gray-500">minutes</span>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Break Duration</label>
                      <div className="mt-1 flex items-center">
                        <input
                          type="number"
                          min="5"
                          max="60"
                          step="5"
                          value={studyPreferences.breakDuration}
                          onChange={(e) => setStudyPreferences({...studyPreferences, breakDuration: parseInt(e.target.value)})}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                        />
                        <span className="ml-2 text-sm text-gray-500">minutes</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Preferred Study Days</label>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map((day) => (
                        <button
                          key={day}
                          onClick={() => {
                            const newDays = studyPreferences.preferredStudyDays.includes(day)
                              ? studyPreferences.preferredStudyDays.filter(d => d !== day)
                              : [...studyPreferences.preferredStudyDays, day];
                            setStudyPreferences({...studyPreferences, preferredStudyDays: newDays});
                          }}
                          className={`rounded-full px-3 py-1 text-xs font-medium ${
                            studyPreferences.preferredStudyDays.includes(day)
                              ? 'bg-primary-100 text-primary-700'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {day.charAt(0).toUpperCase() + day.slice(1, 3)}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Notify me before study sessions
                    </label>
                    <select 
                      value={studyPreferences.notifyBeforeSession}
                      onChange={(e) => setStudyPreferences({...studyPreferences, notifyBeforeSession: parseInt(e.target.value)})}
                      className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
                    >
                      <option value="5">5 minutes before</option>
                      <option value="10">10 minutes before</option>
                      <option value="15">15 minutes before</option>
                      <option value="30">30 minutes before</option>
                      <option value="60">1 hour before</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
            
            {/* AI Settings */}
            {activeTab === 'aiSettings' && (
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-gray-900">AI Behavior</h3>
                <p className="text-sm text-gray-500">Customize how the AI assistant works with your study habits.</p>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">AI Adaptability</label>
                    <p className="text-xs text-gray-500">How quickly should the AI adapt to your changing study patterns?</p>
                    <select 
                      value={aiSettings.adaptabilityLevel}
                      onChange={(e) => setAiSettings({...aiSettings, adaptabilityLevel: e.target.value})}
                      className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
                    >
                      <option value="conservative">Conservative - Adapt slowly, require more evidence</option>
                      <option value="medium">Balanced - Moderate adaptation rate</option>
                      <option value="aggressive">Responsive - Adapt quickly to changes</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">AI Communication Style</label>
                    <select 
                      value={aiSettings.aiTone}
                      onChange={(e) => setAiSettings({...aiSettings, aiTone: e.target.value})}
                      className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
                    >
                      <option value="professional">Professional and direct</option>
                      <option value="encouraging">Encouraging and supportive</option>
                      <option value="challenging">Challenging and motivating</option>
                      <option value="friendly">Friendly and conversational</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">AI Insight Frequency</label>
                    <select 
                      value={aiSettings.insightFrequency}
                      onChange={(e) => setAiSettings({...aiSettings, insightFrequency: e.target.value})}
                      className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
                    >
                      <option value="minimal">Minimal - Only critical insights</option>
                      <option value="moderate">Moderate - Important insights</option>
                      <option value="frequent">Frequent - Regular insights</option>
                    </select>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <div className="flex h-5 items-center">
                        <input
                          id="personalized-suggestions"
                          type="checkbox"
                          checked={aiSettings.enablePersonalizedSuggestions}
                          onChange={(e) => setAiSettings({...aiSettings, enablePersonalizedSuggestions: e.target.checked})}
                          className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="personalized-suggestions" className="font-medium text-gray-700">
                          Enable personalized study suggestions
                        </label>
                        <p className="text-gray-500">Allow AI to suggest adjustments to your study plan based on your performance and habits.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex h-5 items-center">
                        <input
                          id="suggest-breaks"
                          type="checkbox"
                          checked={aiSettings.suggestBreaks}
                          onChange={(e) => setAiSettings({...aiSettings, suggestBreaks: e.target.checked})}
                          className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="suggest-breaks" className="font-medium text-gray-700">
                          Suggest study breaks
                        </label>
                        <p className="text-gray-500">Receive notifications when the AI thinks you should take a break.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Notifications */}
            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-gray-900">Notification Settings</h3>
                <p className="text-sm text-gray-500">Control which notifications you receive and how they are delivered.</p>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex h-5 items-center">
                      <input
                        id="email-notifications"
                        type="checkbox"
                        checked={notificationSettings.emailNotifications}
                        onChange={(e) => setNotificationSettings({...notificationSettings, emailNotifications: e.target.checked})}
                        className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="email-notifications" className="font-medium text-gray-700">
                        Email Notifications
                      </label>
                      <p className="text-gray-500">Receive important notifications via email.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex h-5 items-center">
                      <input
                        id="session-reminders"
                        type="checkbox"
                        checked={notificationSettings.sessionReminders}
                        onChange={(e) => setNotificationSettings({...notificationSettings, sessionReminders: e.target.checked})}
                        className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="session-reminders" className="font-medium text-gray-700">
                        Study Session Reminders
                      </label>
                      <p className="text-gray-500">Get reminded before your scheduled study sessions.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex h-5 items-center">
                      <input
                        id="deadline-reminders"
                        type="checkbox"
                        checked={notificationSettings.deadlineReminders}
                        onChange={(e) => setNotificationSettings({...notificationSettings, deadlineReminders: e.target.checked})}
                        className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="deadline-reminders" className="font-medium text-gray-700">
                        Assignment and Exam Deadline Reminders
                      </label>
                      <p className="text-gray-500">Receive reminders about upcoming deadlines.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex h-5 items-center">
                      <input
                        id="completion-celebrations"
                        type="checkbox"
                        checked={notificationSettings.completionCelebrations}
                        onChange={(e) => setNotificationSettings({...notificationSettings, completionCelebrations: e.target.checked})}
                        className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="completion-celebrations" className="font-medium text-gray-700">
                        Completion Celebrations
                      </label>
                      <p className="text-gray-500">Receive positive reinforcement when you complete tasks.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex h-5 items-center">
                      <input
                        id="ai-insights"
                        type="checkbox"
                        checked={notificationSettings.aiInsights}
                        onChange={(e) => setNotificationSettings({...notificationSettings, aiInsights: e.target.checked})}
                        className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="ai-insights" className="font-medium text-gray-700">
                        AI Insights and Suggestions
                      </label>
                      <p className="text-gray-500">Get notified about AI-generated study insights.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Appearance */}
            {activeTab === 'appearance' && (
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-gray-900">Appearance</h3>
                <p className="text-sm text-gray-500">Customize the look and feel of the application.</p>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Theme</label>
                    <div className="mt-2 grid grid-cols-2 gap-3">
                      <button
                        onClick={() => setAppearanceSettings({...appearanceSettings, theme: 'light'})}
                        className={`flex items-center justify-center rounded-md border p-3 ${
                          appearanceSettings.theme === 'light'
                            ? 'border-primary-500 bg-primary-50 text-primary-700'
                            : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <Sun size={18} className="mr-2" />
                        <span>Light</span>
                      </button>
                      <button
                        onClick={() => setAppearanceSettings({...appearanceSettings, theme: 'dark'})}
                        className={`flex items-center justify-center rounded-md border p-3 ${
                          appearanceSettings.theme === 'dark'
                            ? 'border-primary-500 bg-primary-50 text-primary-700'
                            : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <Moon size={18} className="mr-2" />
                        <span>Dark</span>
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex h-5 items-center">
                      <input
                        id="compact-mode"
                        type="checkbox"
                        checked={appearanceSettings.compactMode}
                        onChange={(e) => setAppearanceSettings({...appearanceSettings, compactMode: e.target.checked})}
                        className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="compact-mode" className="font-medium text-gray-700">
                        Compact Mode
                      </label>
                      <p className="text-gray-500">Use a more condensed layout to fit more information on screen.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex h-5 items-center">
                      <input
                        id="show-quotes"
                        type="checkbox"
                        checked={appearanceSettings.showMotivationalQuotes}
                        onChange={(e) => setAppearanceSettings({...appearanceSettings, showMotivationalQuotes: e.target.checked})}
                        className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="show-quotes" className="font-medium text-gray-700">
                        Show Motivational Quotes
                      </label>
                      <p className="text-gray-500">Display inspirational quotes on your dashboard.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Account */}
            {activeTab === 'account' && (
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-gray-900">Account Settings</h3>
                <p className="text-sm text-gray-500">Manage your account details and preferences.</p>
                
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 overflow-hidden rounded-full bg-gray-200">
                      {user?.avatar ? (
                        <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
                      ) : (
                        <User className="h-full w-full p-2 text-gray-500" />
                      )}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{user?.name}</div>
                      <div className="text-sm text-gray-500">{user?.email}</div>
                    </div>
                    <button className="ml-auto rounded-md bg-white px-3 py-1 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                      Change
                    </button>
                  </div>
                  
                  <div className="space-y-1">
                    <button className="flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">
                      <div className="flex items-center">
                        <span>Email address</span>
                      </div>
                      <div className="flex items-center text-gray-500">
                        <span>{user?.email}</span>
                        <ChevronRight size={16} className="ml-2" />
                      </div>
                    </button>
                    
                    <button className="flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">
                      <div className="flex items-center">
                        <span>Change password</span>
                      </div>
                      <ChevronRight size={16} />
                    </button>
                    
                    <button className="flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">
                      <div className="flex items-center">
                        <span>Connected accounts</span>
                      </div>
                      <ChevronRight size={16} />
                    </button>
                  </div>
                  
                  <div className="pt-4">
                    <div className="rounded-md bg-error-50 p-4">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <AlertTriangle className="h-5 w-5 text-error-400" aria-hidden="true" />
                        </div>
                        <div className="ml-3">
                          <h3 className="text-sm font-medium text-error-800">Danger Zone</h3>
                          <div className="mt-2 text-sm text-error-700">
                            <button className="font-medium text-error-600 hover:text-error-500">
                              Delete my account
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;