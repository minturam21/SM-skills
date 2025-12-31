
import { AppState } from '../types';

export const INITIAL_CONTENT: AppState = {
  site: {
    name: "Apex International Institute",
    tagline: "Empowering Minds, Shaping Futures",
    logo: "https://picsum.photos/id/1/200/200",
    contact: {
      email: "info@apex-institute.edu",
      phone: "+1 (555) 123-4567",
      address: "123 Academic Way, Education District, City, Country",
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509374!2d144.9537353153166!3d-37.81627977975171!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0x5045675218ce6e0!2zTWVsYm91cm5lIFZJQywgQXVzdHJhbGlh!5e0!3m2!1sen!2sus!4v1634567890123"
    },
    social: [
      { id: 's1', platform: 'Facebook', url: 'https://facebook.com', icon: 'fa-facebook-f' },
      { id: 's2', platform: 'Twitter', url: 'https://twitter.com', icon: 'fa-twitter' },
      { id: 's3', platform: 'LinkedIn', url: 'https://linkedin.com', icon: 'fa-linkedin-in' }
    ],
    navigation: [
      { label: "Home", path: "#/" },
      { label: "About", path: "#/about" },
      { label: "Courses", path: "#/courses" },
      { label: "Notices", path: "#/notices" },
      { label: "Gallery", path: "#/gallery" },
      { label: "Contact", path: "#/contact" }
    ],
    footer: {
      brandDescription: "Empowering professional education for over a decade. Built on quality and results.",
      quickLinksLabel: "Quick Links",
      supportLinksLabel: "Support",
      reachUsLabel: "Reach Us",
      bottomText: "Design & Architecture by Senior Architect",
      supportLinks: [
        { label: "Privacy Policy", path: "#/privacy-policy" },
        { label: "Terms of Service", path: "#/terms-of-service" },
        { label: "Placement Reviews", path: "#/placement-review" },
        { label: "Career Guidance", path: "#/career-guidance" }
      ]
    }
  },
  home: {
    hero: {
      title: "Unlock Your Potential with Modern Learning",
      subtitle: "Industry-standard training programs designed to get you hired and certified within months.",
      ctaText: "Explore Courses",
      ctaLink: "#/courses",
      bgImage: "https://images.unsplash.com/photo-1523050853063-bd8012fec046?auto=format&fit=crop&q=80&w=1600",
      visible: true
    },
    highlights: [
      {
        icon: "fa-graduation-cap",
        title: "Expert Mentors",
        description: "Learn from industry professionals with years of real-world experience."
      },
      {
        icon: "fa-laptop-code",
        title: "Hands-on Training",
        description: "Work on live projects and build a portfolio that stands out to recruiters."
      },
      {
        icon: "fa-certificate",
        title: "Global Certification",
        description: "Earn recognized certificates that validate your skills worldwide."
      }
    ],
    sectionLabels: {
      noticesTitle: "Recent Notices",
      noticesSubtitle: "Stay updated with the latest announcements from our campus.",
      coursesTitle: "Popular Professional Courses",
      coursesSubtitle: "Industry-aligned programs with a focus on practical skills and employability.",
      galleryTitle: "Our Campus Life",
      gallerySubtitle: "Take a visual journey through our state-of-the-art facilities and events.",
      placementsTitle: "Where Our Students Land",
      placementsSubtitle: "From local startups to Global Fortune 500s, our placement cell ensures your career takes off.",
      placementMainLabel: "Placement"
    },
    ctaBlock: {
      title: "Ready to Start Your Career Journey?",
      subtitle: "Join thousands of successful students who have transformed their lives through our training.",
      buttonText: "Talk to an Advisor",
      buttonLink: "#/enroll",
      visible: true
    },
    bigShowcase: {
      visible: true,
      image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=1600",
      title: "Our Academic Excellence Group",
      subtitle: "Celebrating our faculty and staff who make global standard education a reality every day."
    },
    sections: {
      notices: true,
      featuredCourses: true,
      gallery: true,
      contact: true,
      industryTieups: true,
      placementReviews: true
    }
  },
  enrollmentForm: {
    title: "Begin Your Application",
    description: "Fill out the form below to apply for your preferred professional program. Our advisors are here to support your journey.",
    fields: [
      { id: "f1", label: "Full Legal Name", type: "text", placeholder: "e.g. Michael Smith", required: true },
      { id: "f2", label: "Email Address", type: "email", placeholder: "mike@example.com", required: true },
      { id: "f3", label: "Contact Number", type: "tel", placeholder: "+1 (555) 000-0000", required: true },
      { id: "f4", label: "Program of Interest", type: "course-select", placeholder: "Select a Program", required: true },
      { id: "f5", label: "Highest Qualification", type: "text", placeholder: "e.g. Bachelor in Computer Science", required: true },
      { id: "f6", label: "Additional Information", type: "textarea", placeholder: "Any specific goals or questions?", required: false }
    ]
  },
  courses: [
    {
      id: "1",
      name: "Full Stack Web Development",
      duration: "6 Months",
      mode: "Hybrid",
      description: "Master React, Node.js, and modern cloud deployment strategies.",
      status: "Active",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800",
      price: "$1,200"
    },
    {
      id: "2",
      name: "Data Science & AI",
      duration: "8 Months",
      mode: "Online",
      description: "Analyze complex data patterns using Python and Machine Learning.",
      status: "Active",
      image: "https://images.unsplash.com/photo-1551288049-bbbda536ad0a?auto=format&fit=crop&q=80&w=800",
      price: "$1,500"
    },
    {
      id: "3",
      name: "Cyber Security Specialist",
      duration: "4 Months",
      mode: "Offline",
      description: "Learn ethical hacking, network defense, and risk management.",
      status: "Active",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
      price: "$900"
    }
  ],
  notices: [
    {
      id: "n1",
      date: "2024-05-20",
      title: "Summer Admissions Open",
      description: "Enroll now to get a 20% early bird discount on all technical courses.",
      isImportant: true,
      category: 'New',
      link: "#/courses"
    },
    {
      id: "n2",
      date: "2024-05-15",
      title: "Upcoming Career Fair",
      description: "Join us on June 10th for the annual career fair featuring top tech companies.",
      category: 'Urgent',
      isImportant: false
    }
  ],
  gallery: [
    { id: "g1", url: "https://picsum.photos/id/10/800/600", category: "Campus", title: "Library Wing" },
    { id: "g2", url: "https://picsum.photos/id/20/800/600", category: "Events", title: "Tech Fest 2023" },
    { id: "g3", url: "https://picsum.photos/id/30/800/600", category: "Campus", title: "Main Auditorium" }
  ],
  galleryMetadata: {
    "Campus": "https://picsum.photos/id/10/400/400",
    "Events": "https://picsum.photos/id/20/400/400"
  },
  about: {
    intro: "Apex International Institute is a leading provider of technical education, founded in 2010 with a vision to bridge the gap between academia and industry.",
    mission: "To provide accessible, high-quality professional training that transforms lives.",
    vision: "To become the global standard for industry-ready specialized education.",
    timeline: [
      { year: "2010", event: "Institute Founded" },
      { year: "2015", event: "Reached 5,000 Graduates" },
      { year: "2022", event: "Awarded Best Vocational Training Center" }
    ]
  },
  placements: {
    pageDescription: "Real stories from real students who transformed their careers through our industry-leading technical programs.",
    stats: [
      { id: "s1", label: "Placement Rate", value: "94%", icon: "fa-chart-line" },
      { id: "s2", label: "Avg. Salary Hike", value: "65%", icon: "fa-arrow-trend-up" },
      { id: "s3", label: "Partner Companies", value: "250+", icon: "fa-handshake" },
      { id: "s4", label: "Highest Package", value: "$140K", icon: "fa-money-bill-trend-up" }
    ],
    reviews: [
      {
        id: "r1",
        name: "Sarah Jenkins",
        course: "Full Stack Web Development",
        role: "Software Engineer",
        company: "Google",
        companyIcon: "fa-google",
        image: "https://i.pravatar.cc/150?u=sarah",
        text: "The curriculum at Apex is intensely practical. I went from knowing basic HTML to building complex microservices.",
        salaryIncrease: "+80% Hike"
      },
      {
        id: "r2",
        name: "David Chen",
        course: "Data Science & AI",
        role: "Data Scientist",
        company: "Amazon",
        companyIcon: "fa-amazon",
        image: "https://i.pravatar.cc/150?u=david",
        text: "The mentors here simplified complex ML algorithms and helped me build a portfolio that got me 3 job offers.",
        salaryIncrease: "+110% Hike"
      }
    ],
    partners: [
      { id: "p1", name: "Google Cloud", icon: "fa-google" },
      { id: "p2", name: "Amazon AWS", icon: "fa-amazon" },
      { id: "p3", name: "Microsoft", icon: "fa-microsoft" },
      { id: "p4", name: "Meta", icon: "fa-meta" },
      { id: "p5", name: "IBM", icon: "fa-ibm" },
      { id: "p6", name: "Tesla", icon: "fa-bolt-lightning" }
    ]
  },
  legal: {
    privacy: {
      title: "Privacy and Policy",
      subtitle: "Our commitment to your privacy and the security of your data is at the core of our educational values.",
      sections: [
        { id: "lp1", title: "Information Collection", content: "We collect information that you provide directly to us through the enrollment forms, newsletter signups, and contact requests. This may include your name, email address, phone number, and academic history." },
        { id: "lp2", title: "How We Use Data", content: "Your data allows us to process applications, provide academic support, and send relevant updates about your programs. We do not sell your personal information to third parties." }
      ]
    },
    terms: {
      title: "Terms of Service",
      subtitle: "Please read these terms carefully before enrolling in our professional programs.",
      sections: [
        { id: "lt1", title: "Acceptance of Terms", content: "By accessing our campus facilities or digital learning portals, you agree to be bound by these terms. These terms constitute a legally binding agreement between the student and the Institute." },
        { id: "lt2", title: "Academic Integrity", content: "Students are expected to maintain the highest standards of honesty. Plagiarism, cheating, or any form of academic dishonesty will result in immediate disciplinary action." }
      ]
    }
  },
  career: {
    hero: {
      title: "Career Guidance",
      subtitle: "Beyond education, we provide the tools, network, and mentorship to launch your professional career.",
      bgImage: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1600"
    },
    services: [
      { id: "cs1", title: "One-on-One Mentorship", description: "Direct access to industry veterans who provide personalized career roadmaps based on your strengths.", icon: "fa-user-tie" },
      { id: "cs2", title: "Resume Building", description: "Workshops dedicated to crafting high-impact resumes and digital portfolios that catch recruiter attention.", icon: "fa-file-invoice" }
    ],
    cta: {
      title: "Start Your Journey Today",
      subtitle: "Our career advisors are available Monday through Friday to discuss your professional goals."
    }
  }
};
