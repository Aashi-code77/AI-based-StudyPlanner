import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Calendar, 
  CheckCircle2, 
  BrainCircuit, 
  Bell, 
  Zap 
} from 'lucide-react';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white">
      {/* Navigation */}
      <nav className="container mx-auto flex items-center justify-between p-6">
        <div className="flex items-center space-x-2">
          <div className="flex h-9 w-9 items-center justify-center rounded bg-primary-500">
            <svg width="24" height="24" viewBox="0 0 24 24" className="text-white">
              <rect width="18" height="4" x="3" y="8" rx="1" fill="currentColor" />
              <rect width="12" height="4" x="3" y="16" rx="1" fill="currentColor" />
            </svg>
          </div>
          <span className="text-xl font-semibold text-primary-700">NotePlan</span>
        </div>
        <div className="hidden space-x-4 md:flex">
          <Link to="/login" className="btn btn-secondary">
            Sign in
          </Link>
          <Link to="/register" className="btn btn-primary">
            Get Started
          </Link>
        </div>
        <div className="md:hidden">
          <Link to="/login" className="btn btn-primary">
            Sign in
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-12 md:py-24">
        <div className="flex flex-col items-center text-center">
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
            Study Smarter, Not Harder
          </h1>
          <p className="mb-8 max-w-2xl text-lg text-gray-600">
            NotePlan is your AI-powered study assistant that creates personalized study plans,
            sends timely reminders, and helps you achieve your academic goals.
          </p>
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
            <Link to="/register" className="btn btn-primary px-8 py-3 text-base">
              Start for Free
            </Link>
            <a href="#features" className="btn btn-secondary px-8 py-3 text-base">
              Learn More
            </a>
          </div>
        </div>
        
        {/* Hero Image */}
        <div className="mt-12 flex justify-center">
          <div className="relative w-full max-w-4xl overflow-hidden rounded-lg shadow-xl">
            <img 
              src="https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
              alt="Student using NotePlan" 
              className="w-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6 text-white">
              <p className="text-2xl font-bold">AI-Powered Study Plans</p>
              <p className="text-lg">Personalized for your learning style and goals</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-white py-16">
        <div className="container mx-auto px-6">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">
              Features Designed for Student Success
            </h2>
            <p className="text-lg text-gray-600">
              Everything you need to organize your coursework, plan your study sessions, and stay on track.
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <div className="rounded-lg bg-primary-50 p-6 transition duration-300 hover:shadow-md">
              <div className="mb-4 rounded-full bg-primary-100 p-3 inline-block">
                <Calendar className="h-6 w-6 text-primary-700" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900">Smart Study Planner</h3>
              <p className="text-gray-600">
                Create and manage personalized study schedules based on your learning style, course load, and deadlines.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="rounded-lg bg-primary-50 p-6 transition duration-300 hover:shadow-md">
              <div className="mb-4 rounded-full bg-primary-100 p-3 inline-block">
                <BrainCircuit className="h-6 w-6 text-primary-700" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900">AI Recommendations</h3>
              <p className="text-gray-600">
                Receive AI-powered suggestions to optimize your study time, improve retention, and prepare effectively for exams.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="rounded-lg bg-primary-50 p-6 transition duration-300 hover:shadow-md">
              <div className="mb-4 rounded-full bg-primary-100 p-3 inline-block">
                <Bell className="h-6 w-6 text-primary-700" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900">Smart Notifications</h3>
              <p className="text-gray-600">
                Stay on track with timely reminders for upcoming sessions, deadlines, and recommended study breaks.
              </p>
            </div>
            
            {/* Feature 4 */}
            <div className="rounded-lg bg-primary-50 p-6 transition duration-300 hover:shadow-md">
              <div className="mb-4 rounded-full bg-primary-100 p-3 inline-block">
                <CheckCircle2 className="h-6 w-6 text-primary-700" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900">Task Management</h3>
              <p className="text-gray-600">
                Organize assignments and exams with priority levels, due dates, and progress tracking.
              </p>
            </div>
            
            {/* Feature 5 */}
            <div className="rounded-lg bg-primary-50 p-6 transition duration-300 hover:shadow-md">
              <div className="mb-4 rounded-full bg-primary-100 p-3 inline-block">
                <BookOpen className="h-6 w-6 text-primary-700" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900">Course Organization</h3>
              <p className="text-gray-600">
                Keep all your course materials, schedules, and deadlines in one centralized location.
              </p>
            </div>
            
            {/* Feature 6 */}
            <div className="rounded-lg bg-primary-50 p-6 transition duration-300 hover:shadow-md">
              <div className="mb-4 rounded-full bg-primary-100 p-3 inline-block">
                <Zap className="h-6 w-6 text-primary-700" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900">Productivity Insights</h3>
              <p className="text-gray-600">
                Gain visibility into your study patterns and receive suggestions to boost your productivity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-600 py-16 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="mb-6 text-3xl font-bold">Ready to Transform Your Study Habits?</h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-primary-100">
            Join thousands of students who are achieving their academic goals with NotePlan.
          </p>
          <Link to="/register" className="btn bg-white px-8 py-3 text-base font-medium text-primary-700 hover:bg-primary-50">
            Get Started for Free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-12 text-gray-400">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center justify-between space-y-6 md:flex-row md:space-y-0">
            <div className="flex items-center space-x-2">
              <div className="flex h-9 w-9 items-center justify-center rounded bg-primary-500">
                <svg width="24" height="24" viewBox="0 0 24 24" className="text-white">
                  <rect width="18" height="4" x="3" y="8" rx="1" fill="currentColor" />
                  <rect width="12" height="4" x="3" y="16" rx="1" fill="currentColor" />
                </svg>
              </div>
              <span className="text-xl font-semibold text-white">NotePlan</span>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="hover:text-white">Privacy</a>
              <a href="#" className="hover:text-white">Terms</a>
              <a href="#" className="hover:text-white">Contact</a>
            </div>
            <div className="text-sm">
              &copy; {new Date().getFullYear()} NotePlan. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;