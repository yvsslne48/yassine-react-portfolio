import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, Phone, Moon, Sun, ExternalLink, ChevronLeft, ChevronRight, Download, Eye, MessageCircle } from 'lucide-react';

const Portfolio = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState({
    loading: false,
    success: false,
    error: false
  });
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('section[id]').forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const skills = {
    frontend: [
      { name: 'HTML', levelText: 'Advanced', levelValue: 90 },
      { name: 'CSS', levelText: 'Advanced', levelValue: 85 },
      { name: 'JavaScript', levelText: 'Intermediate', levelValue: 75 },
      { name: 'React', levelText: 'Intermediate', levelValue: 70 },
      { name: 'Tailwind CSS', levelText: 'Intermediate', levelValue: 75 },
      { name: 'Bootstrap', levelText: 'Intermediate', levelValue: 70 }
    ],
    backend: [
      { name: 'PHP (Symfony)', levelText: 'Intermediate', levelValue: 80 },
      { name: 'C# (.NET)', levelText: 'Intermediate', levelValue: 75 }
    ],
    databases: [
      { name: 'MySQL', levelText: 'Advanced', levelValue: 85 },
      { name: 'PostgreSQL', levelText: 'Beginner', levelValue: 60 }
    ],
    tools: [
      { name: 'Git/GitHub', levelText: 'Advanced', levelValue: 90 },
      { name: 'Docker', levelText: 'Intermediate', levelValue: 75 },
      { name: 'Linux', levelText: 'Intermediate', levelValue: 70 },
      { name: 'Jira', levelText: 'Intermediate', levelValue: 80 }
    ]
  };

  const projects = [
    {
      title: 'EHEI ChatHub',
      subtitle: 'Academic Communication Platform',
      type: 'Academic Project (2024–2025)',
      description: 'EHEI ChatHub is a full-stack web application designed to centralize internal communication between students and teachers, improving communication efficiency and reducing response time within the academic environment.',
      features: [
        'User authentication and role management',
        'Internal messaging system',
        'Conferences and announcements',
        'Notification system',
        'Admin dashboard',
        'MySQL database modeling',
        'AJAX-based dynamic interactions',
        'Tailwind CSS responsive UI'
      ],
      technologies: ['HTML', 'CSS', 'Tailwind CSS', 'JavaScript', 'PHP', 'MySQL', 'AJAX'],
      github: 'https://github.com/Loqmanmk/chatapp.git',
      images: [
        'images/chat-app1.png',
        'images/chat-app2.png',
        'images/chat-app3.png'
      ]
    },
    {
      title: 'Real-Time Messaging Application',
      subtitle: 'Desktop ↔ Android Communication',
      type: 'Personal Project',
      description: 'A real-time messaging system enabling seamless communication between desktop and Android mobile applications using advanced socket programming.',
      features: [
        'Real-time bidirectional messaging',
        'Desktop ↔ Mobile communication',
        'Image & file sharing capabilities',
        'Audio & video call architecture',
        'Online users detection',
        'Robust client-server architecture'
      ],
      technologies: ['Java', 'Android', 'TCP/IP', 'Socket Programming'],
      github: 'https://github.com/yvsslne48/SOCKET_ANDROID',
      images: [
        '/images/desktop-screenshot.png',
        '/images/mobile-screenshot.jpg',
        //'/images/messaging-screenshot-mobile.png'
        '/images/messaging-screenshot-desk.png'
      ]
    }
  ];

  const certifications = [
    {
      title: 'Git Fundamentals',
      issuer: 'Coursera',
      date: 'Dec 28, 2025'
    }
  ];

  const languages = [
    {
      name: 'Arabic',
      nameAr: 'العربية',
      level: 'Native',
      proficiency: 100,
      details: 'Native Speaker'
    },
    {
      name: 'French',
      nameAr: 'الفرنسية',
      level: 'Intermediate',
      proficiency: 70,
      details: 'Read, Write, Speak'
    },
    {
      name: 'English',
      nameAr: 'الإنجليزية',
      level: 'Intermediate',
      proficiency: 75,
      details: 'ALC Certificate (American Language Center)'
    }
  ];


  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % projects[activeProjectIndex].images.length);
  };

  const prevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + projects[activeProjectIndex].images.length) % projects[activeProjectIndex].images.length);
  };

  const nextProjectItem = () => {
    setActiveProjectIndex((prev) => (prev + 1) % projects.length);
    setActiveImageIndex(0);
  };

  const prevProjectItem = () => {
    setActiveProjectIndex((prev) => (prev - 1 + projects.length) % projects.length);
    setActiveImageIndex(0);
  };

  const currentProject = projects[activeProjectIndex];
  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ loading: true, success: false, error: false });

    // EmailJS configuration - REPLACE THESE WITH YOUR IDs
    const serviceID = 'service_abc123'; // Replace with your EmailJS Service ID
    const templateID = 'template_g8e66zs'; // Replace with your EmailJS Template ID
    const publicKey = 'z915xx7m8MZPI0pjl'; // Replace with your EmailJS Public Key

    try {
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service_id: serviceID,
          template_id: templateID,
          user_id: publicKey,
          template_params: {
            name: formData.name,
            email: formData.email,
            subject: formData.subject,
            message: formData.message,
            to_email: 'yassineamrani.dev@gmail.com' // Your email
          }
        })
      });

      if (response.ok) {
        setFormStatus({ loading: false, success: true, error: false });
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => {
          setFormStatus({ loading: false, success: false, error: false });
        }, 5000);
      } else {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setFormStatus({ loading: false, success: false, error: true });
      setTimeout(() => {
        setFormStatus({ loading: false, success: false, error: false });
      }, 5000);
    }
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ${darkMode ? 'bg-zinc-950 text-zinc-100' : 'bg-stone-50 text-stone-950'}`}>
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 backdrop-blur-xl ${darkMode ? 'bg-zinc-950/80 border-zinc-800' : 'bg-stone-50/80 border-stone-200'} border-b`}>
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-12
 py-6 flex justify-between items-center">
          <a href="#home" className="text-2xl font-light tracking-tight hover:opacity-70 transition-opacity">
            YA
          </a>
          <div className="flex items-center gap-8">
            <a href="#about" className="text-sm tracking-wide hover:opacity-70 transition-opacity hidden md:block">About</a>
            <a href="#skills" className="text-sm tracking-wide hover:opacity-70 transition-opacity hidden md:block">Skills</a>
            <a href="#projects" className="text-sm tracking-wide hover:opacity-70 transition-opacity hidden md:block">Projects</a>
            <a href="#contact" className="text-sm tracking-wide hover:opacity-70 transition-opacity hidden md:block">Contact</a>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-full transition-all ${darkMode ? 'bg-zinc-800 hover:bg-zinc-700' : 'bg-stone-200 hover:bg-stone-300'}`}
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center px-6 md:px-10 lg:px-12
 pt-20">
        <div className="max-w-7xl w-full">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-6xl md:text-8xl font-light tracking-tighter leading-none">
                  Yassine
                  <br />
                  <span className={`${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>Amrani</span>
                </h1>
                <p className={`text-xl md:text-2xl font-light ${darkMode ? 'text-zinc-400' : 'text-stone-600'}`}>
                  Engineering Student | Software Developer
                </p>
              </div>
              <div className={`h-px w-32 ${darkMode ? 'bg-zinc-700' : 'bg-stone-300'}`}></div>
              <p className={`text-lg leading-relaxed max-w-xl ${darkMode ? 'text-zinc-300' : 'text-stone-700'}`}>
                Specializing in backend development with Symfony and .NET, building scalable and secure applications using modern architectures.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <a
                  href="#contact"
                  className={`px-8 py-3 ${darkMode ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-emerald-600 hover:bg-emerald-700'} text-white transition-colors rounded-full`}
                >
                  Get in touch
                </a>
                <a
                  href="#projects"
                  className={`px-8 py-3 border ${darkMode ? 'border-zinc-700 hover:border-zinc-600' : 'border-stone-300 hover:border-stone-400'} transition-colors rounded-full`}
                >
                  View work
                </a>
                <a
                  href="/cv/Yassine_Amrani_CV.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`px-8 py-3 border ${darkMode
                    ? 'border-emerald-500 hover:bg-emerald-500/10 text-emerald-400'
                    : 'border-emerald-600 hover:bg-emerald-600/10 text-emerald-700'
                    } transition-colors rounded-full flex items-center gap-2`}
                >
                  <Eye size={18} />
                  View CV
                </a>

              </div>
            </div>
            <div className="relative">
              <div className={`absolute inset-0 blur-3xl opacity-50 ${darkMode ? 'bg-gradient-to-br from-emerald-500/20 to-blue-500/20' : 'bg-gradient-to-br from-emerald-300/30 to-blue-300/30'}`}></div>
              <div className={`relative aspect-square rounded-3xl overflow-hidden ${darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-stone-200 border-stone-300'} border`}>
                <div className="absolute inset-0 flex items-center justify-center p-8">
                  <div className="w-52 h-52 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-emerald-500 shadow-xl
                transition-transform duration-300 ease-out
                md:hover:scale-105 md:hover:shadow-emerald-500/40">
                    <img
                      src="/images/profile-1.jpg"
                      alt="Yassine Amrani"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className={`py-32 px-6 md:px-10 lg:px-12
 transition-all duration-1000 ${isVisible.about ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-5 gap-16">
            <div className="md:col-span-2">
              <h2 className={`text-5xl md:text-6xl font-light tracking-tight ${darkMode ? 'text-zinc-400' : 'text-stone-400'}`}>
                About
              </h2>
            </div>
            <div className="md:col-span-3 space-y-6">
              <p className={`text-xl leading-relaxed ${darkMode ? 'text-zinc-300' : 'text-stone-700'}`}>
                I am an engineering student at <span className={darkMode ? 'text-emerald-400' : 'text-emerald-600'}>EHEI Oujda</span> specializing in software development.
              </p>
              <p className={`text-xl leading-relaxed ${darkMode ? 'text-zinc-300' : 'text-stone-700'}`}>
                I enjoy working with backend technologies such as Symfony and .NET. My goal is to build scalable and secure applications using modern architectures and real-world engineering practices.
              </p>
              <div className={`h-px w-full ${darkMode ? 'bg-zinc-800' : 'bg-stone-300'} my-8`}></div>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h3 className={`text-sm uppercase tracking-wider mb-2 ${darkMode ? 'text-zinc-500' : 'text-stone-500'}`}>Education</h3>
                  <p className="text-lg">EHEI Oujda</p>
                  <p className={darkMode ? 'text-zinc-400' : 'text-stone-600'}>Engineering Student</p>
                </div>
                <div>
                  <h3 className={`text-sm uppercase tracking-wider mb-2 ${darkMode ? 'text-zinc-500' : 'text-stone-500'}`}>Focus</h3>
                  <p className="text-lg">Software Development</p>
                  <p className={darkMode ? 'text-zinc-400' : 'text-stone-600'}>Backend Architecture</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section
        id="skills"
        className={`py-32  px-6 md:px-10 lg:px-12

 ${darkMode ? 'bg-zinc-900' : 'bg-stone-100'} transition-all duration-1000 ${isVisible.skills ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <div className="max-w-7xl mx-auto">
          <h2 className={`text-5xl md:text-6xl font-light tracking-tight mb-20 ${darkMode ? 'text-zinc-400' : 'text-stone-400'}`}>
            Skills
          </h2>

          <div className="grid md:grid-cols-2 gap-16">
            {/* Frontend */}
            <div className="space-y-6">
              <h3 className={`text-2xl font-light mb-8 ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>Frontend</h3>
              {skills.frontend.map((skill, idx) => (
                <div key={idx} className="space-y-2">
                  {/* <div className="flex justify-between items-center">
                    <span className="text-lg">{skill.name}</span>
                    <span className={darkMode ? 'text-zinc-500' : 'text-stone-500'}>
                      {skill.levelText}
                      </span>

                  </div> */}
                  <div key={idx} className="flex justify-between items-center py-2 border-b border-zinc-800/40">
                    <span className="text-lg">{skill.name}</span>
                    <span
                      className={`text-sm px-3 py-1 rounded-full ${skill.levelText === 'Advanced'
                        ? 'bg-emerald-500/15 text-emerald-400'
                        : skill.levelText === 'Intermediate'
                          ? 'bg-blue-500/15 text-blue-400'
                          : 'bg-orange-500/15 text-orange-400'
                        }`}
                    >
                      {skill.levelText}
                    </span>
                  </div>

                  {/* <div className={`h-1 rounded-full overflow-hidden ${darkMode ? 'bg-zinc-800' : 'bg-stone-300'}`}>
                    <div 
                      className={`h-full rounded-full transition-all duration-1000 ${darkMode ? 'bg-emerald-500' : 'bg-emerald-600'}`}
                      style={{ width: isVisible.skills ? `${skill.levelValue}%` : '0%' }}
                    ></div>
                  </div> */}
                </div>
              ))}
            </div>

            {/* Backend */}
            <div className="space-y-6">
              <h3 className={`text-2xl font-light mb-8 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>Backend</h3>
              {skills.backend.map((skill, idx) => (
                <div key={idx} className="space-y-2">
                  {/* <div className="flex justify-between items-center">
                    <span className="text-lg">{skill.name}</span>
                    <span className={darkMode ? 'text-zinc-500' : 'text-stone-500'}>
                      {skill.levelText}
                    </span>

                  </div> */}
                  <div key={idx} className="flex justify-between items-center py-2 border-b border-zinc-800/40">
                    <span className="text-lg">{skill.name}</span>
                    <span
                      className={`text-sm px-3 py-1 rounded-full ${skill.levelText === 'Advanced'
                        ? 'bg-emerald-500/15 text-emerald-400'
                        : skill.levelText === 'Intermediate'
                          ? 'bg-blue-500/15 text-blue-400'
                          : 'bg-orange-500/15 text-orange-400'
                        }`}
                    >
                      {skill.levelText}
                    </span>
                  </div>

                  {/* <div className={`h-1 rounded-full overflow-hidden ${darkMode ? 'bg-zinc-800' : 'bg-stone-300'}`}>
                    <div 
                      className={`h-full rounded-full transition-all duration-1000 ${darkMode ? 'bg-blue-500' : 'bg-blue-600'}`}
                      style={{ width: isVisible.skills ? `${skill.levelValue}%` : '0%' }}
                    ></div>
                  </div> */}
                </div>
              ))}
            </div>

            {/* Databases */}
            <div className="space-y-6">
              <h3 className={`text-2xl font-light mb-8 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`}>Databases</h3>
              {skills.databases.map((skill, idx) => (
                <div key={idx} className="space-y-2">
                  {/* <div className="flex justify-between items-center">
                    <span className="text-lg">{skill.name}</span>
                    <span className={darkMode ? 'text-zinc-500' : 'text-stone-500'}>
                      {skill.levelText}
                    </span>

                  </div> */}
                  <div key={idx} className="flex justify-between items-center py-2 border-b border-zinc-800/40">
                    <span className="text-lg">{skill.name}</span>
                    <span
                      className={`text-sm px-3 py-1 rounded-full ${skill.levelText === 'Advanced'
                        ? 'bg-emerald-500/15 text-emerald-400'
                        : skill.levelText === 'Intermediate'
                          ? 'bg-blue-500/15 text-blue-400'
                          : 'bg-orange-500/15 text-orange-400'
                        }`}
                    >
                      {skill.levelText}
                    </span>
                  </div>

                  {/* <div className={`h-1 rounded-full overflow-hidden ${darkMode ? 'bg-zinc-800' : 'bg-stone-300'}`}>
                    <div 
                      className={`h-full rounded-full transition-all duration-1000 ${darkMode ? 'bg-purple-500' : 'bg-purple-600'}`}
                      style={{ width: isVisible.skills ? `${skill.levelValue}%` : '0%' }}
                    ></div>
                  </div> */}
                </div>
              ))}
            </div>

            {/* Tools */}
            <div className="space-y-6">
              <h3 className={`text-2xl font-light mb-8 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`}>Tools & DevOps</h3>
              {skills.tools.map((skill, idx) => (
                <div key={idx} className="space-y-2">
                  {/* <div className="flex justify-between items-center">
                    <span className="text-lg">{skill.name}</span>
                    <span className={darkMode ? 'text-zinc-500' : 'text-stone-500'}>
                      {skill.levelText}
                    </span>

                  </div> */}
                  <div key={idx} className="flex justify-between items-center py-2 border-b border-zinc-800/40">
                    <span className="text-lg">{skill.name}</span>
                    <span
                      className={`text-sm px-3 py-1 rounded-full ${skill.levelText === 'Advanced'
                        ? 'bg-emerald-500/15 text-emerald-400'
                        : skill.levelText === 'Intermediate'
                          ? 'bg-blue-500/15 text-blue-400'
                          : 'bg-orange-500/15 text-orange-400'
                        }`}
                    >
                      {skill.levelText}
                    </span>
                  </div>

                  {/* <div className={`h-1 rounded-full overflow-hidden ${darkMode ? 'bg-zinc-800' : 'bg-stone-300'}`}>
                    <div 
                      className={`h-full rounded-full transition-all duration-1000 ${darkMode ? 'bg-orange-500' : 'bg-orange-600'}`}
                      style={{ width: isVisible.skills ? `${skill.levelValue}%` : '0%' }}
                    ></div>
                  </div> */}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section
        id="projects"
        className={`py-32 px-6 md:px-10 lg:px-12
 transition-all duration-1000 ${isVisible.projects ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-20">
            <h2 className={`text-5xl md:text-6xl font-light tracking-tight ${darkMode ? 'text-zinc-400' : 'text-stone-400'}`}>
              Projects
            </h2>
            <div className="flex items-center gap-4">
              <button
                onClick={prevProjectItem}
                className={`p-3 rounded-full transition-colors ${darkMode ? 'bg-zinc-800 hover:bg-zinc-700' : 'bg-stone-200 hover:bg-stone-300'}`}
                aria-label="Previous project"
              >
                <ChevronLeft size={20} />
              </button>
              <span className={`text-sm ${darkMode ? 'text-zinc-500' : 'text-stone-500'}`}>
                {activeProjectIndex + 1} / {projects.length}
              </span>
              <button
                onClick={nextProjectItem}
                className={`p-3 rounded-full transition-colors ${darkMode ? 'bg-zinc-800 hover:bg-zinc-700' : 'bg-stone-200 hover:bg-stone-300'}`}
                aria-label="Next project"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Project Image Carousel */}
            <div className="relative">
              <div className={`relative aspect-video rounded-2xl overflow-hidden border ${darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-stone-200 border-stone-300'}`}>
                <img
                  src={currentProject.images[activeImageIndex]}
                  alt={`${currentProject.title} screenshot ${activeImageIndex + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Carousel Controls */}
              <div className="flex justify-center gap-4 mt-6">
                <button
                  onClick={prevImage}
                  className={`p-3 rounded-full transition-colors ${darkMode ? 'bg-zinc-800 hover:bg-zinc-700' : 'bg-stone-200 hover:bg-stone-300'}`}
                  aria-label="Previous image"
                >
                  <ChevronLeft size={20} />
                </button>
                <div className="flex items-center gap-2">
                  {currentProject.images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`h-2 rounded-full transition-all ${activeImageIndex === idx
                        ? `w-8 ${darkMode ? 'bg-emerald-500' : 'bg-emerald-600'}`
                        : `w-2 ${darkMode ? 'bg-zinc-700' : 'bg-stone-300'}`
                        }`}
                      aria-label={`Go to image ${idx + 1}`}
                    />
                  ))}
                </div>
                <button
                  onClick={nextImage}
                  className={`p-3 rounded-full transition-colors ${darkMode ? 'bg-zinc-800 hover:bg-zinc-700' : 'bg-stone-200 hover:bg-stone-300'}`}
                  aria-label="Next image"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>

            {/* Project Details */}
            <div className="space-y-6">
              {currentProject.type && (
                <div className={`inline-block px-4 py-2 rounded-full text-sm ${darkMode ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' : 'bg-blue-600/20 text-blue-700 border border-blue-600/30'}`}>
                  {currentProject.type}
                </div>
              )}
              <div>
                <h3 className="text-3xl font-light mb-2">{currentProject.title}</h3>
                <p className={`text-lg ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>{currentProject.subtitle}</p>
              </div>

              <p className={`text-lg leading-relaxed ${darkMode ? 'text-zinc-300' : 'text-stone-700'}`}>
                {currentProject.description}
              </p>

              <div>
                <h4 className={`text-sm uppercase tracking-wider mb-4 ${darkMode ? 'text-zinc-500' : 'text-stone-500'}`}>Key Features</h4>
                <ul className="space-y-2">
                  {currentProject.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${darkMode ? 'bg-emerald-500' : 'bg-emerald-600'}`}></span>
                      <span className={darkMode ? 'text-zinc-300' : 'text-stone-700'}>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className={`text-sm uppercase tracking-wider mb-4 ${darkMode ? 'text-zinc-500' : 'text-stone-500'}`}>Technologies</h4>
                <div className="flex flex-wrap gap-2">
                  {currentProject.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className={`px-4 py-2 rounded-full text-sm ${darkMode ? 'bg-zinc-800 text-zinc-300' : 'bg-stone-200 text-stone-700'}`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {currentProject.github && (
                <a
                  href={currentProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 px-6 py-3 rounded-full transition-colors text-white ${darkMode ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-emerald-600 hover:bg-emerald-700'}`}
                >
                  <Github size={18} />
                  View on GitHub
                  <ExternalLink size={16} />
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section
        id="certifications"
        className={`py-32 px-6 md:px-10 lg:px-12
 ${darkMode ? 'bg-zinc-900' : 'bg-stone-100'} transition-all duration-1000 ${isVisible.certifications ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <div className="max-w-7xl mx-auto">
          <h2 className={`text-5xl md:text-6xl font-light tracking-tight mb-20 ${darkMode ? 'text-zinc-400' : 'text-stone-400'}`}>
            Certifications
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {certifications.map((cert, idx) => (
              <div
                key={idx}
                className={`p-8 rounded-2xl border transition-transform duration-300 hover:scale-105 ${darkMode ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-stone-300'}`}
              >
                <div className={`text-3xl mb-4 ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>🏆</div>
                <h3 className="text-xl font-light mb-2">{cert.title}</h3>
                <p className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-stone-600'}`}>{cert.issuer}</p>
                <p className={`text-sm mt-2 ${darkMode ? 'text-zinc-500' : 'text-stone-500'}`}>{cert.date}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Languages Section */}
      <section
        id="languages"
        className={`py-32 px-6 transition-all duration-1000 ${isVisible.languages ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <div className="max-w-7xl mx-auto">
          <h2 className={`text-5xl md:text-6xl font-light tracking-tight mb-20 ${darkMode ? 'text-zinc-400' : 'text-stone-400'}`}>
            Languages
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {languages.map((lang, idx) => (
              <div
                key={idx}
                className={`p-8 rounded-2xl border transition-transform duration-300 hover:scale-105 ${darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-stone-300'}`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-light mb-1">{lang.name}</h3>
                    <p className={`text-sm ${darkMode ? 'text-zinc-500' : 'text-stone-500'}`}>{lang.nameAr}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm ${lang.level === 'Native'
                    ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                    : lang.proficiency >= 75
                      ? 'bg-blue-500/15 text-blue-400 border border-blue-500/30'
                      : 'bg-orange-500/15 text-orange-400 border border-orange-500/30'
                    }`}>
                    {lang.level}
                  </span>
                </div>
                <p className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-stone-600'}`}>{lang.details}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className={`py-32 px-6 transition-all duration-1000 ${isVisible.contact ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <div className="max-w-7xl mx-auto">
          <h2 className={`text-5xl md:text-6xl font-light tracking-tight mb-8 ${darkMode ? 'text-zinc-400' : 'text-stone-400'} text-center`}>
            Let's Connect
          </h2>
          <p className={`text-xl leading-relaxed mb-16 ${darkMode ? 'text-zinc-300' : 'text-stone-700'} text-center max-w-2xl mx-auto`}>
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
          </p>

          {/* Contact Form */}

          {/* Contact Form */}
          <div className="max-w-3xl mx-auto mb-16">
            <form onSubmit={handleSubmit} className={`p-8 rounded-2xl border ${darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-stone-300'}`}>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className={`block text-sm mb-2 ${darkMode ? 'text-zinc-400' : 'text-stone-600'}`}>Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    required
                    disabled={formStatus.loading}
                    className={`w-full px-4 py-3 rounded-lg border transition-colors ${darkMode
                      ? 'bg-zinc-950 border-zinc-700 text-zinc-100 focus:border-emerald-500'
                      : 'bg-stone-50 border-stone-300 text-stone-900 focus:border-emerald-600'
                      } outline-none disabled:opacity-50`}
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className={`block text-sm mb-2 ${darkMode ? 'text-zinc-400' : 'text-stone-600'}`}>Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    required
                    disabled={formStatus.loading}
                    className={`w-full px-4 py-3 rounded-lg border transition-colors ${darkMode
                      ? 'bg-zinc-950 border-zinc-700 text-zinc-100 focus:border-emerald-500'
                      : 'bg-stone-50 border-stone-300 text-stone-900 focus:border-emerald-600'
                      } outline-none disabled:opacity-50`}
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className={`block text-sm mb-2 ${darkMode ? 'text-zinc-400' : 'text-stone-600'}`}>Subject *</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleFormChange}
                  required
                  disabled={formStatus.loading}
                  className={`w-full px-4 py-3 rounded-lg border transition-colors ${darkMode
                    ? 'bg-zinc-950 border-zinc-700 text-zinc-100 focus:border-emerald-500'
                    : 'bg-stone-50 border-stone-300 text-stone-900 focus:border-emerald-600'
                    } outline-none disabled:opacity-50`}
                  placeholder="Project inquiry, collaboration, etc."
                />
              </div>

              <div className="mb-6">
                <label className={`block text-sm mb-2 ${darkMode ? 'text-zinc-400' : 'text-stone-600'}`}>Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleFormChange}
                  required
                  disabled={formStatus.loading}
                  rows="6"
                  className={`w-full px-4 py-3 rounded-lg border transition-colors resize-none ${darkMode
                    ? 'bg-zinc-950 border-zinc-700 text-zinc-100 focus:border-emerald-500'
                    : 'bg-stone-50 border-stone-300 text-stone-900 focus:border-emerald-600'
                    } outline-none disabled:opacity-50`}
                  placeholder="Tell me about your project..."
                ></textarea>
              </div>

              {/* Status Messages */}
              {formStatus.success && (
                <div className="mb-6 p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                  ✓ Message sent successfully! I'll get back to you soon.
                </div>
              )}

              {formStatus.error && (
                <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400">
                  ✗ Failed to send message. Please try again or contact me directly.
                </div>
              )}

              <button
                type="submit"
                disabled={formStatus.loading}
                className={`w-full px-8 py-4 rounded-lg transition-colors text-white font-medium ${darkMode
                  ? 'bg-emerald-500 hover:bg-emerald-600'
                  : 'bg-emerald-600 hover:bg-emerald-700'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {formStatus.loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>

          {/* Contact Cards */}
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <h3 className={`text-2xl font-light mb-6 ${darkMode ? 'text-zinc-300' : 'text-stone-700'}`}>
                Or reach me directly
              </h3>
            </div>

            <div className="space-y-6">
              <a
                href="mailto:yassineamrani.dev@gmail.com"
                className={`flex items-center gap-4 p-6 rounded-2xl border transition-all group ${darkMode ? 'bg-zinc-900 border-zinc-800 hover:border-emerald-500' : 'bg-white border-stone-300 hover:border-emerald-600'}`}
              >
                <div className={`p-3 rounded-full transition-colors ${darkMode ? 'bg-zinc-800 group-hover:bg-emerald-500' : 'bg-stone-200 group-hover:bg-emerald-600'}`}>
                  <Mail size={24} className="group-hover:text-white transition-colors" />
                </div>
                <div>
                  <p className={`text-sm ${darkMode ? 'text-zinc-500' : 'text-stone-500'}`}>Email</p>
                  <p className="text-lg">yassineamrani.dev@gmail.com</p>
                </div>
              </a>

              <a
                href="tel:+212762762846"
                className={`flex items-center gap-4 p-6 rounded-2xl border transition-all group ${darkMode ? 'bg-zinc-900 border-zinc-800 hover:border-blue-500' : 'bg-white border-stone-300 hover:border-blue-600'}`}
              >
                <div className={`p-3 rounded-full transition-colors ${darkMode ? 'bg-zinc-800 group-hover:bg-blue-500' : 'bg-stone-200 group-hover:bg-blue-600'}`}>
                  <Phone size={24} className="group-hover:text-white transition-colors" />
                </div>
                <div>
                  <p className={`text-sm ${darkMode ? 'text-zinc-500' : 'text-stone-500'}`}>Phone</p>
                  <p className="text-lg">+212 762 762 846</p>
                </div>
              </a>

              <a
                href="https://github.com/yvsslne48"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-4 p-6 rounded-2xl border transition-all group ${darkMode ? 'bg-zinc-900 border-zinc-800 hover:border-purple-500' : 'bg-white border-stone-300 hover:border-purple-600'}`}
              >
                <div className={`p-3 rounded-full transition-colors ${darkMode ? 'bg-zinc-800 group-hover:bg-purple-500' : 'bg-stone-200 group-hover:bg-purple-600'}`}>
                  <Github size={24} className="group-hover:text-white transition-colors" />
                </div>
                <div>
                  <p className={`text-sm ${darkMode ? 'text-zinc-500' : 'text-stone-500'}`}>GitHub</p>
                  <p className="text-lg">yvsslne48</p>
                </div>
              </a>

              <a
                href="https://www.linkedin.com/in/yassine---amrani/"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-4 p-6 rounded-2xl border transition-all group ${darkMode ? 'bg-zinc-900 border-zinc-800 hover:border-orange-500' : 'bg-white border-stone-300 hover:border-orange-600'}`}
              >
                <div className={`p-3 rounded-full transition-colors ${darkMode ? 'bg-zinc-800 group-hover:bg-orange-500' : 'bg-stone-200 group-hover:bg-orange-600'}`}>
                  <Linkedin size={24} className="group-hover:text-white transition-colors" />
                </div>
                <div>
                  <p className={`text-sm ${darkMode ? 'text-zinc-500' : 'text-stone-500'}`}>LinkedIn</p>
                  <p className="text-lg">yassine---amrani</p>
                </div>
              </a>

              {/* <a 
                href="/cv/Yassine_Amrani_CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-4 p-6 rounded-2xl border transition-all group ${darkMode ? 'bg-zinc-900 border-zinc-800 hover:border-emerald-500' : 'bg-white border-stone-300 hover:border-emerald-600'}`}
              >
                <div className={`p-3 rounded-full transition-colors ${darkMode ? 'bg-zinc-800 group-hover:bg-emerald-500' : 'bg-stone-200 group-hover:bg-emerald-600'}`}>
                  <Eye size={24} className="group-hover:text-white transition-colors" />
                </div>
                <div>
                  <p className={`text-sm ${darkMode ? 'text-zinc-500' : 'text-stone-500'}`}>View CV</p>
                  <p className="text-lg">Resume / Curriculum Vitae</p>
                </div>
              </a> */}
              
              <a
                href="https://wa.me/212762762846?text=Hello%20Yassine%2C%20I%20saw%20your%20portfolio"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-4 p-6 rounded-2xl border transition-all group ${darkMode ? 'bg-zinc-900 border-zinc-800 hover:border-emerald-500' : 'bg-white border-stone-300 hover:border-emerald-600'}`}

              >
                {/* Icon */}
                <div className={`p-3 rounded-full transition-colors ${darkMode ? 'bg-zinc-800 group-hover:bg-emerald-500' : 'bg-stone-200 group-hover:bg-emerald-600'}`}>
                  <MessageCircle size={24} className="group-hover:text-white transition-colors" />
                </div>
                {/* Text */}
                <div>
                  <p className={`text-sm ${darkMode ? 'text-zinc-500' : 'text-stone-500'}`}>WhatsApp</p>
                  <p className="text-lg">Contact me on WhatsApp</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-12 px-6 md:px-10 lg:px-12
 border-t ${darkMode ? 'border-zinc-800' : 'border-stone-300'}`}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className={`text-sm ${darkMode ? 'text-zinc-500' : 'text-stone-500'}`}>
            © 2026 Yassine Amrani. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="https://github.com/yvsslne48" target="_blank" rel="noopener noreferrer" className={`transition-colors ${darkMode ? 'text-zinc-500 hover:text-zinc-300' : 'text-stone-500 hover:text-stone-700'}`}>
              <Github size={20} />
            </a>
            <a href="https://www.linkedin.com/in/yassine---amrani/" target="_blank" rel="noopener noreferrer" className={`transition-colors ${darkMode ? 'text-zinc-500 hover:text-zinc-300' : 'text-stone-500 hover:text-stone-700'}`}>
              <Linkedin size={20} />
            </a>
            <a href="https://wa.me/212762762846" target="_blank" rel="noopener noreferrer" className={`transition-colors ${darkMode ? 'text-zinc-500 hover:text-emerald-400' : 'text-stone-500 hover:text-emerald-600'}`}>
              <MessageCircle size={20} />
            </a>
            <a href="mailto:yassineamrani.dev@gmail.com" className={`transition-colors ${darkMode ? 'text-zinc-500 hover:text-zinc-300' : 'text-stone-500 hover:text-stone-700'}`}>
              <Mail size={20} />
            </a>
          </div>
          <div className={`h-6 w-px ${darkMode ? 'bg-zinc-700' : 'bg-stone-300'}`}></div>

          <a
            href="/cv/Yassine_Amrani_CV.pdf"
            download
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-colors ${darkMode ? 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/30' : 'bg-emerald-600/10 text-emerald-700 hover:bg-emerald-600/20 border border-emerald-600/30'}`}
          >
            <Download size={16} />
            Download CV
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;