import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import gsap from 'gsap';
import { Zap, Users, Trophy, Calendar, MapPin, ArrowRight, LogIn, LayoutDashboard } from 'lucide-react';

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // GSAP Animations
    const tl = gsap.timeline();
    
    tl.fromTo('.hero-title', 
      { opacity: 0, y: 50, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'power3.out' }
    )
    .fromTo('.hero-subtitle',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
      '-=0.5'
    )
    .fromTo('.hero-cta',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
      '-=0.3'
    )
    .fromTo('.feature-card',
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: 'power2.out' },
      '-=0.2'
    );
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
      <div className="fixed inset-0 vignette pointer-events-none" />
      <div className="scanline" />
      
      {/* Grid Pattern */}
      <div className="fixed inset-0 opacity-5" style={{
        backgroundImage: 'linear-gradient(rgba(255,140,0,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,140,0,0.3) 1px, transparent 1px)',
        backgroundSize: '50px 50px'
      }} />

      <div className="relative z-10">
        {/* Navigation */}
        <nav className="border-b border-hackathon-orange/20 bg-black/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Zap className="w-8 h-8 text-hackathon-orange" />
              <span className="text-xl font-cinzel font-bold gradient-text">HackWithIndia</span>
            </div>
            
            <div className="flex items-center gap-4">
              {user ? (
                <Link to="/dashboard" className="btn-secondary flex items-center gap-2 text-sm">
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </Link>
              ) : (
                <Link to="/auth" className="btn-secondary flex items-center gap-2 text-sm">
                  <LogIn className="w-4 h-4" />
                  Login
                </Link>
              )}
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="min-h-[80vh] flex items-center justify-center px-4 py-20">
          <div className="text-center max-w-4xl">
            <div className="hero-title mb-6">
              <p className="text-hackathon-orange font-courier text-sm mb-4 tracking-widest">
                BVUDET NM CHAPTER PRESENTS
              </p>
              <h1 className="text-5xl md:text-7xl font-cinzel font-bold mb-4">
                <span className="gradient-text text-glow-strong">HackWithIndia</span>
              </h1>
              <h2 className="text-2xl md:text-3xl font-orbitron text-hackathon-tva">
                MULTIVERSE EDITION
              </h2>
            </div>
            
            <p className="hero-subtitle text-gray-400 font-courier text-lg md:text-xl max-w-2xl mx-auto mb-8">
              Enter the multiverse of innovation. Build, create, and disrupt reality with your code.
              Join the ultimate hackathon experience.
            </p>

            <div className="hero-cta flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => navigate('/register')}
                className="btn-primary text-lg font-orbitron flex items-center gap-3 px-8 py-4 animate-pulse-glow"
              >
                Register Now
                <ArrowRight className="w-5 h-5" />
              </button>
              
              {user && (
                <Link to="/dashboard" className="btn-secondary text-lg font-orbitron px-8 py-4">
                  View Dashboard
                </Link>
              )}
            </div>

            {/* Event Info */}
            <div className="mt-12 flex flex-wrap justify-center gap-8 text-gray-400 font-courier">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-hackathon-orange" />
                <span>Coming Soon</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-hackathon-orange" />
                <span>BVUDET Campus</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-hackathon-orange" />
                <span>2-4 Members</span>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h3 className="text-3xl font-orbitron text-center text-hackathon-orange mb-12">
              Why Participate?
            </h3>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="feature-card hackathon-card hover:scale-105 transition-transform duration-300">
                <Trophy className="w-12 h-12 text-hackathon-orange mb-4" />
                <h4 className="text-xl font-orbitron text-white mb-2">Amazing Prizes</h4>
                <p className="text-gray-400 font-courier text-sm">
                  Win exciting prizes and recognition for your innovative solutions.
                </p>
              </div>
              
              <div className="feature-card hackathon-card hover:scale-105 transition-transform duration-300">
                <Users className="w-12 h-12 text-hackathon-loki mb-4" />
                <h4 className="text-xl font-orbitron text-white mb-2">Network & Learn</h4>
                <p className="text-gray-400 font-courier text-sm">
                  Connect with fellow developers, mentors, and industry experts.
                </p>
              </div>
              
              <div className="feature-card hackathon-card hover:scale-105 transition-transform duration-300">
                <Zap className="w-12 h-12 text-hackathon-scarlet mb-4" />
                <h4 className="text-xl font-orbitron text-white mb-2">Build & Innovate</h4>
                <p className="text-gray-400 font-courier text-sm">
                  Transform your ideas into reality in an intense coding experience.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-orbitron text-hackathon-orange mb-8">Registration Fee</h3>
            
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { size: 2, price: 1000 },
                { size: 3, price: 1500 },
                { size: 4, price: 2000 },
              ].map(({ size, price }) => (
                <div key={size} className="hackathon-card text-center hover:neon-glow transition-all duration-300">
                  <p className="text-gray-400 font-courier mb-2">Team of</p>
                  <p className="text-4xl font-orbitron text-hackathon-orange mb-2">{size}</p>
                  <p className="text-3xl font-bold font-orbitron text-white">₹{price}</p>
                  <p className="text-sm text-gray-500 font-courier mt-2">₹500 per member</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-hackathon-orange/20 py-8 px-4">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Zap className="w-6 h-6 text-hackathon-orange" />
              <span className="font-cinzel font-bold gradient-text">HackWithIndia</span>
              <span className="text-gray-500 font-courier text-sm">BVUDET NM Chapter</span>
            </div>
            
            <div className="flex items-center gap-6">
              <Link 
                to="/admin" 
                className="text-gray-600 hover:text-hackathon-orange font-courier text-sm transition-colors"
              >
                Reality Control Room
              </Link>
            </div>
            
            <p className="text-gray-500 font-courier text-sm">
              © 2025 HackWithIndia. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
