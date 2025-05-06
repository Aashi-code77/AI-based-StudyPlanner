import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Calendar, Book, Clock, Check, ChevronRight, ChevronLeft } from 'lucide-react';

const Onboarding: React.FC = () => {
  const [step, setStep] = useState(1);
  const [courses, setCourses] = useState<{ name: string; days: string[] }[]>([
    { name: '', days: [] }
  ]);
  const [studyPreferences, setStudyPreferences] = useState({
    preferredTime: 'morning',
    maxHoursPerDay: 4,
    preferredBreakInterval: 45
  });
  const navigate = useNavigate();
  const { user } = useAuth();

  const addCourse = () => {
    setCourses([...courses, { name: '', days: [] }]);
  };

  const updateCourseName = (index: number, name: string) => {
    const newCourses = [...courses];
    newCourses[index].name = name;
    setCourses(newCourses);
  };

  const toggleCourseDay = (courseIndex: number, day: string) => {
    const newCourses = [...courses];
    const dayIndex = newCourses[courseIndex].days.indexOf(day);
    
    if (dayIndex === -1) {
      newCourses[courseIndex].days.push(day);
    } else {
      newCourses[courseIndex].days.splice(dayIndex, 1);
    }
    
    setCourses(newCourses);
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      navigate('/dashboard');
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-3xl space-y-8">
        <div className="text-center">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary-500">
            <svg width="32" height="32" viewBox="0 0 24 24" className="text-white">
              <rect width="18" height="4" x="3" y="8" rx="1" fill="currentColor" />
              <rect width="12" height="4" x="3" y="16" rx="1" fill="currentColor" />
            </svg>
          </div>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
            Let's set up your NotePlan
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            We'll help you get started with a personalized study plan.
          </p>
        </div>

        <div className="mt-10 overflow-hidden rounded-xl bg-white shadow">
          {/* Progress bar */}
          <div className="relative h-2 w-full bg-gray-200">
            <div 
              className="absolute left-0 top-0 h-full bg-primary-500 transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            ></div>
          </div>

          {/* Progress steps */}
          <div className="border-b border-gray-200">
            <div className="flex justify-between px-6 py-4">
              <div className="flex items-center">
                <div className={`flex h-8 w-8 items-center justify-center rounded-full ${
                  step >= 1 ? 'bg-primary-500 text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  {step > 1 ? <Check size={16} /> : '1'}
                </div>
                <span className="ml-2 text-sm font-medium">Your Courses</span>
              </div>
              
              <div className="flex items-center">
                <div className={`flex h-8 w-8 items-center justify-center rounded-full ${
                  step >= 2 ? 'bg-primary-500 text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  {step > 2 ? <Check size={16} /> : '2'}
                </div>
                <span className="ml-2 text-sm font-medium">Study Preferences</span>
              </div>
              
              <div className="flex items-center">
                <div className={`flex h-8 w-8 items-center justify-center rounded-full ${
                  step >= 3 ? 'bg-primary-500 text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  {step > 3 ? <Check size={16} /> : '3'}
                </div>
                <span className="ml-2 text-sm font-medium">Review</span>
              </div>
            </div>
          </div>

          {/* Step content */}
          <div className="px-6 py-8">
            {/* Step 1: Courses */}
            {step === 1 && (
              <div className="space-y-6 animate-fade-in">
                <div className="text-center">
                  <Book size={36} className="mx-auto mb-4 text-primary-500" />
                  <h3 className="text-lg font-medium leading-6 text-gray-900">Add Your Courses</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Enter the courses you're taking this semester to help us create your study plan.
                  </p>
                </div>

                <div className="space-y-4">
                  {courses.map((course, index) => (
                    <div key={index} className="rounded-md border border-gray-200 p-4">
                      <div className="mb-4">
                        <label htmlFor={`course-${index}`} className="block text-sm font-medium text-gray-700">
                          Course Name
                        </label>
                        <input
                          type="text"
                          id={`course-${index}`}
                          value={course.name}
                          onChange={(e) => updateCourseName(index, e.target.value)}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                          placeholder="e.g., Mathematics 101"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">Class Days</label>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((day) => (
                            <button
                              key={day}
                              type="button"
                              onClick={() => toggleCourseDay(index, day)}
                              className={`rounded-full px-3 py-1 text-xs font-medium ${
                                course.days.includes(day)
                                  ? 'bg-primary-100 text-primary-700'
                                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                              }`}
                            >
                              {day.slice(0, 3)}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={addCourse}
                    className="flex w-full items-center justify-center rounded-md border border-dashed border-gray-300 p-3 text-sm font-medium text-gray-600 hover:border-primary-300 hover:bg-primary-50 hover:text-primary-600"
                  >
                    + Add Another Course
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Study Preferences */}
            {step === 2 && (
              <div className="space-y-6 animate-fade-in">
                <div className="text-center">
                  <Clock size={36} className="mx-auto mb-4 text-primary-500" />
                  <h3 className="text-lg font-medium leading-6 text-gray-900">Set Your Study Preferences</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Tell us about your study habits so we can create an optimal schedule for you.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      When do you prefer to study?
                    </label>
                    <select
                      value={studyPreferences.preferredTime}
                      onChange={(e) => setStudyPreferences({...studyPreferences, preferredTime: e.target.value})}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                    >
                      <option value="morning">Morning (6AM - 12PM)</option>
                      <option value="afternoon">Afternoon (12PM - 5PM)</option>
                      <option value="evening">Evening (5PM - 10PM)</option>
                      <option value="night">Night (10PM - 6AM)</option>
                      <option value="any">Any time of day</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Maximum study hours per day
                    </label>
                    <div className="mt-1 flex items-center">
                      <input
                        type="range"
                        min="1"
                        max="10"
                        value={studyPreferences.maxHoursPerDay}
                        onChange={(e) => setStudyPreferences({...studyPreferences, maxHoursPerDay: parseInt(e.target.value)})}
                        className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200"
                      />
                      <span className="ml-3 w-12 text-sm font-medium text-gray-900">
                        {studyPreferences.maxHoursPerDay}h
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Preferred break interval (minutes)
                    </label>
                    <select
                      value={studyPreferences.preferredBreakInterval}
                      onChange={(e) => setStudyPreferences({...studyPreferences, preferredBreakInterval: parseInt(e.target.value)})}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                    >
                      <option value="25">25 (Pomodoro technique)</option>
                      <option value="45">45 minutes</option>
                      <option value="60">60 minutes</option>
                      <option value="90">90 minutes</option>
                      <option value="120">2 hours</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      What days do you prefer to study?
                    </label>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                        <button
                          key={day}
                          type="button"
                          className="rounded-full bg-primary-100 px-3 py-1 text-xs font-medium text-primary-700"
                        >
                          {day.slice(0, 3)}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Review */}
            {step === 3 && (
              <div className="space-y-6 animate-fade-in">
                <div className="text-center">
                  <Calendar size={36} className="mx-auto mb-4 text-primary-500" />
                  <h3 className="text-lg font-medium leading-6 text-gray-900">Ready to Get Started</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    We've set up your NotePlan. You can always adjust these settings later.
                  </p>
                </div>

                <div className="rounded-md bg-primary-50 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <Check className="h-5 w-5 text-primary-400" aria-hidden="true" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-primary-800">Your study plan is ready!</h3>
                      <div className="mt-2 text-sm text-primary-700">
                        <p>
                          We've created a personalized study plan based on your courses and preferences. 
                          You can now start tracking your progress and receive AI-powered recommendations.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="rounded-md border border-gray-200 p-4">
                    <h4 className="text-sm font-medium text-gray-900">Your Courses</h4>
                    <ul className="mt-2 text-sm text-gray-600">
                      {courses.filter(c => c.name).map((course, index) => (
                        <li key={index} className="flex items-center py-1">
                          <Book size={14} className="mr-2 text-gray-400" />
                          {course.name} - {course.days.map(d => d.slice(0, 3)).join(', ')}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-md border border-gray-200 p-4">
                    <h4 className="text-sm font-medium text-gray-900">Study Preferences</h4>
                    <ul className="mt-2 text-sm text-gray-600">
                      <li className="flex items-center py-1">
                        <Clock size={14} className="mr-2 text-gray-400" />
                        Preferred time: {studyPreferences.preferredTime}
                      </li>
                      <li className="flex items-center py-1">
                        <Clock size={14} className="mr-2 text-gray-400" />
                        Max hours per day: {studyPreferences.maxHoursPerDay}
                      </li>
                      <li className="flex items-center py-1">
                        <Clock size={14} className="mr-2 text-gray-400" />
                        Break interval: {studyPreferences.preferredBreakInterval} minutes
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 bg-gray-50 px-6 py-4">
            <div className="flex justify-between">
              <button
                type="button"
                onClick={handleBack}
                disabled={step === 1}
                className={`flex items-center rounded-md px-3 py-2 text-sm font-medium ${
                  step === 1 
                    ? 'cursor-not-allowed text-gray-400' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <ChevronLeft size={16} className="mr-1" />
                Back
              </button>
              
              <button
                type="button"
                onClick={handleNext}
                className="flex items-center rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              >
                {step === 3 ? 'Finish' : 'Next'}
                {step < 3 && <ChevronRight size={16} className="ml-1" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;