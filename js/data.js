/**
 * CAMPUS PULSE - STUDENT DASHBOARD DATA STORE
 * Comprehensive, realistic academic data structure
 */

const StudentData = {
  profile: {
    name: "Nissi Kratos",
    preferredName: "Nissi",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250",
    rollNumber: "CS-2023-048",
    prnNumber: "917620104088",
    department: "Computer Science & Engineering",
    specialization: "Artificial Intelligence & Distributed Systems",
    degree: "Bachelor of Technology (B.Tech)",
    batch: "2023 - 2027",
    semester: "Semester VII",
    semesterNum: 7,
    section: "CSE - Alpha (Room 402)",
    academicYear: "2026 - 2027",
    status: "Active / Regular",
    academicStanding: "Dean's Honor List (Top 2%)",
    standingBadge: "Merit Scholar",
    
    // Academic metrics
    cgpa: 3.84,
    cgpaMax: 4.00,
    cgpaPercentage: "92.1%",
    rank: "4th / 148 Students",
    totalCreditsEarned: 112,
    totalCreditsRequired: 136,
    creditsProgress: 82.4, // percentage
    
    // Contact & Personal Info
    universityEmail: "nissi.kratos@apex.edu",
    personalEmail: "nissikratos@gmail.com",
    phone: "+1 (555) 389-7241",
    dateOfBirth: "October 14, 2004",
    bloodGroup: "O+ Positive",
    gender: "Non-Binary / He-They",
    nationality: "United States",
    residentialStatus: "Campus Resident (Block C, Room 312)",
    homeAddress: "442 Academic Ridge, Tech Park Campus, CA 94025",
    
    // Guardian & Emergency
    emergencyContact: {
      name: "Dr. Elena Kratos",
      relation: "Mother / Guardian",
      phone: "+1 (555) 890-1234",
      email: "elena.kratos@stanford.edu"
    },
    
    // Mentor & Faculty Advisor
    advisor: {
      name: "Prof. Marcus Vance, Ph.D.",
      role: "Associate Professor & Chair of Distributed Systems",
      office: "Engineering Tower, Room 518",
      email: "m.vance@apex.edu",
      phone: "+1 (555) 019-4822",
      officeHours: "Tue & Thu: 2:00 PM - 4:30 PM",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150"
    },

    // Badges & Honors
    badges: [
      { name: "Dean's List", icon: "award", color: "purple" },
      { name: "Hackathon Winner '25", icon: "trophy", color: "amber" },
      { name: "GDSC Lead", icon: "code", color: "blue" },
      { name: "AWS Certified", icon: "shield-check", color: "emerald" }
    ],

    // Skills & Focus Areas
    skills: ["Distributed Systems", "Deep Learning", "Go & Rust", "Kubernetes", "PyTorch", "Network Security"]
  },

  attendance: {
    overallPercentage: 88.4,
    totalHeld: 328,
    totalAttended: 290,
    totalAbsent: 38,
    minimumRequired: 75,
    safeMarginBuffer: 16, // classes student can miss safely overall without falling below 75%
    
    // Monthly history for trend chart
    monthlyTrend: [
      { month: "July", percentage: 94.2 },
      { month: "August", percentage: 91.0 },
      { month: "September", percentage: 86.8 },
      { month: "October", percentage: 88.4 },
      { month: "November", percentage: 89.1 }
    ],

    // Subject-wise detailed breakdown
    subjects: [
      {
        code: "CS701",
        title: "Distributed Systems & Cloud Architecture",
        faculty: "Prof. Marcus Vance",
        held: 52,
        attended: 48,
        percentage: 92.3,
        status: "Safe",
        statusColor: "emerald",
        safeToMiss: 12,
        classesNeeded: 0
      },
      {
        code: "CS702",
        title: "Neural Networks & Deep Learning",
        faculty: "Dr. Anya Sharma",
        held: 48,
        attended: 44,
        percentage: 91.7,
        status: "Safe",
        statusColor: "emerald",
        safeToMiss: 10,
        classesNeeded: 0
      },
      {
        code: "CS703",
        title: "Advanced Compiler Architecture",
        faculty: "Dr. Richard Thorne",
        held: 44,
        attended: 38,
        percentage: 86.4,
        status: "Safe",
        statusColor: "emerald",
        safeToMiss: 6,
        classesNeeded: 0
      },
      {
        code: "CS704",
        title: "Applied Cryptography & Cyber Defense",
        faculty: "Prof. Samantha Wu",
        held: 50,
        attended: 42,
        percentage: 84.0,
        status: "Safe",
        statusColor: "emerald",
        safeToMiss: 6,
        classesNeeded: 0
      },
      {
        code: "CS705",
        title: "Agile DevOps & Site Reliability",
        faculty: "Er. Michael Chang",
        held: 40,
        attended: 33,
        percentage: 82.5,
        status: "Moderate",
        statusColor: "blue",
        safeToMiss: 4,
        classesNeeded: 0
      },
      {
        code: "CS708",
        title: "Deep Learning Research Practicum",
        faculty: "Dr. Anya Sharma",
        held: 24,
        attended: 21,
        percentage: 87.5,
        status: "Safe",
        statusColor: "emerald",
        safeToMiss: 4,
        classesNeeded: 0
      },
      {
        code: "CS709",
        title: "Distributed Systems Cloud Lab",
        faculty: "Prof. Marcus Vance",
        held: 24,
        attended: 22,
        percentage: 91.7,
        status: "Safe",
        statusColor: "emerald",
        safeToMiss: 5,
        classesNeeded: 0
      },
      {
        code: "CS710",
        title: "Senior Capstone Project - Phase I",
        faculty: "Review Committee",
        held: 46,
        attended: 42,
        percentage: 91.3,
        status: "Safe",
        statusColor: "emerald",
        safeToMiss: 10,
        classesNeeded: 0
      }
    ]
  },

  marks: {
    cgpaHistory: [
      { semester: "Sem 1", sgpa: 3.65, cgpa: 3.65, credits: 20 },
      { semester: "Sem 2", sgpa: 3.72, cgpa: 3.69, credits: 20 },
      { semester: "Sem 3", sgpa: 3.80, cgpa: 3.73, credits: 19 },
      { semester: "Sem 4", sgpa: 3.78, cgpa: 3.74, credits: 19 },
      { semester: "Sem 5", sgpa: 3.88, cgpa: 3.77, credits: 18 },
      { semester: "Sem 6", sgpa: 3.92, cgpa: 3.82, credits: 16 },
      { semester: "Sem 7 (Current)", sgpa: 3.85, cgpa: 3.84, credits: 20 }
    ],

    currentSemesterCourses: [
      {
        code: "CS701",
        title: "Distributed Systems & Cloud Architecture",
        credits: 4,
        ia1: 19, // out of 20
        ia2: 18.5, // out of 20
        assignment: 9.5, // out of 10
        practical: 24, // out of 25
        totalInternal: 47, // out of 50 normalized
        predictedGrade: "A+",
        gradePoints: 10,
        remarks: "Exemplary performance in consensus algorithms module."
      },
      {
        code: "CS702",
        title: "Neural Networks & Deep Learning",
        credits: 4,
        ia1: 18,
        ia2: 19,
        assignment: 10,
        practical: 24.5,
        totalInternal: 47.5,
        predictedGrade: "A+",
        gradePoints: 10,
        remarks: "Highest score in Transformer architecture assignment."
      },
      {
        code: "CS703",
        title: "Advanced Compiler Architecture",
        credits: 3,
        ia1: 16.5,
        ia2: 17,
        assignment: 9,
        practical: 22,
        totalInternal: 42.5,
        predictedGrade: "A",
        gradePoints: 9,
        remarks: "Strong conceptual understanding of LLVM IR optimization."
      },
      {
        code: "CS704",
        title: "Applied Cryptography & Cyber Defense",
        credits: 3,
        ia1: 17,
        ia2: 18,
        assignment: 9,
        practical: 23,
        totalInternal: 44,
        predictedGrade: "A",
        gradePoints: 9,
        remarks: "Demonstrated thorough grasp of Zero-Knowledge proofs."
      },
      {
        code: "CS705",
        title: "Agile DevOps & Site Reliability",
        credits: 3,
        ia1: 18,
        ia2: 17.5,
        assignment: 9.5,
        practical: 23.5,
        totalInternal: 45,
        predictedGrade: "A+",
        gradePoints: 10,
        remarks: "Excellent CI/CD pipeline automation project."
      },
      {
        code: "CS708",
        title: "Deep Learning Research Practicum",
        credits: 1.5,
        ia1: 19.5,
        ia2: 19,
        assignment: 10,
        practical: 25,
        totalInternal: 48.5,
        predictedGrade: "A+",
        gradePoints: 10,
        remarks: "Outstanding PyTorch implementation of diffusion models."
      },
      {
        code: "CS709",
        title: "Distributed Systems Cloud Lab",
        credits: 1.5,
        ia1: 19,
        ia2: 20,
        assignment: 10,
        practical: 24.5,
        totalInternal: 49,
        predictedGrade: "A+",
        gradePoints: 10,
        remarks: "Perfect raft consensus cluster implementation."
      }
    ]
  },

  timetable: {
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    timeSlots: [
      "09:00 - 10:00",
      "10:05 - 11:05",
      "11:20 - 12:20",
      "12:20 - 01:15", // Lunch
      "01:15 - 02:15",
      "02:20 - 03:20",
      "03:25 - 04:25"
    ],
    schedule: {
      Monday: [
        { time: "09:00 - 10:00", code: "CS701", title: "Distributed Systems", type: "Lecture", room: "Hall B-302", faculty: "Prof. M. Vance", color: "indigo" },
        { time: "10:05 - 11:05", code: "CS702", title: "Neural Networks", type: "Lecture", room: "Hall B-302", faculty: "Dr. A. Sharma", color: "violet" },
        { time: "11:20 - 12:20", code: "CS703", title: "Compiler Design", type: "Lecture", room: "Auditorium 2", faculty: "Dr. R. Thorne", color: "amber" },
        { time: "12:20 - 01:15", code: "BREAK", title: "Campus Lunch & Refreshment", type: "Break", room: "Student Union Diner", faculty: "-", color: "slate" },
        { time: "01:15 - 03:20", code: "CS709", title: "Cloud Systems Lab", type: "Practical", room: "High-Perf Cloud Lab 4", faculty: "Prof. M. Vance", color: "emerald", duration: "2 Hours" },
        { time: "03:25 - 04:25", code: "CS705", title: "Agile DevOps", type: "Lecture", room: "Tech Annex 104", faculty: "Er. M. Chang", color: "blue" }
      ],
      Tuesday: [
        { time: "09:00 - 10:00", code: "CS704", title: "Applied Cryptography", type: "Lecture", room: "Hall B-302", faculty: "Prof. S. Wu", color: "rose" },
        { time: "10:05 - 11:05", code: "CS701", title: "Distributed Systems", type: "Lecture", room: "Hall B-302", faculty: "Prof. M. Vance", color: "indigo" },
        { time: "11:20 - 12:20", code: "CS702", title: "Neural Networks", type: "Lecture", room: "Auditorium 2", faculty: "Dr. A. Sharma", color: "violet" },
        { time: "12:20 - 01:15", code: "BREAK", title: "Campus Lunch & Refreshment", type: "Break", room: "Student Union Diner", faculty: "-", color: "slate" },
        { time: "01:15 - 03:20", code: "CS708", title: "Deep Learning Lab", type: "Practical", room: "AI GPU Cluster Lab 1", faculty: "Dr. A. Sharma", color: "emerald", duration: "2 Hours" },
        { time: "03:25 - 04:25", code: "LIB", title: "Self Study & Research", type: "Library", room: "Central Digital Library", faculty: "-", color: "cyan" }
      ],
      Wednesday: [
        { time: "09:00 - 10:00", code: "CS703", title: "Compiler Design", type: "Lecture", room: "Hall B-302", faculty: "Dr. R. Thorne", color: "amber" },
        { time: "10:05 - 11:05", code: "CS704", title: "Applied Cryptography", type: "Lecture", room: "Hall B-302", faculty: "Prof. S. Wu", color: "rose" },
        { time: "11:20 - 12:20", code: "CS705", title: "Agile DevOps", type: "Lecture", room: "Tech Annex 104", faculty: "Er. M. Chang", color: "blue" },
        { time: "12:20 - 01:15", code: "BREAK", title: "Campus Lunch & Refreshment", type: "Break", room: "Student Union Diner", faculty: "-", color: "slate" },
        { time: "01:15 - 02:15", code: "CS701", title: "Distributed Systems (Tutorial)", type: "Tutorial", room: "Seminar Room 12", faculty: "Prof. M. Vance", color: "indigo" },
        { time: "02:20 - 04:25", code: "CS710", title: "Senior Capstone Mentoring", type: "Project", room: "Innovation Incubator", faculty: "Dr. M. Vance & Board", color: "purple", duration: "2 Hours" }
      ],
      Thursday: [
        { time: "09:00 - 10:00", code: "CS702", title: "Neural Networks", type: "Lecture", room: "Hall B-302", faculty: "Dr. A. Sharma", color: "violet" },
        { time: "10:05 - 11:05", code: "CS701", title: "Distributed Systems", type: "Lecture", room: "Hall B-302", faculty: "Prof. M. Vance", color: "indigo" },
        { time: "11:20 - 12:20", code: "CS704", title: "Applied Cryptography", type: "Lecture", room: "Hall B-302", faculty: "Prof. S. Wu", color: "rose" },
        { time: "12:20 - 01:15", code: "BREAK", title: "Campus Lunch & Refreshment", type: "Break", room: "Student Union Diner", faculty: "-", color: "slate" },
        { time: "01:15 - 02:15", code: "CS703", title: "Compiler Design", type: "Lecture", room: "Hall B-302", faculty: "Dr. R. Thorne", color: "amber" },
        { time: "02:20 - 04:25", code: "SEMINAR", title: "Guest Speaker: Scalable Systems at Scale", type: "Seminar", room: "Kavli Auditorium", faculty: "Industry Guests", color: "teal", duration: "2 Hours" }
      ],
      Friday: [
        { time: "09:00 - 10:00", code: "CS705", title: "Agile DevOps", type: "Lecture", room: "Tech Annex 104", faculty: "Er. M. Chang", color: "blue" },
        { time: "10:05 - 11:05", code: "CS703", title: "Compiler Design", type: "Lecture", room: "Hall B-302", faculty: "Dr. R. Thorne", color: "amber" },
        { time: "11:20 - 12:20", code: "CS702", title: "Neural Networks (Tutorial)", type: "Tutorial", room: "Hall B-302", faculty: "Dr. A. Sharma", color: "violet" },
        { time: "12:20 - 01:15", code: "BREAK", title: "Campus Lunch & Refreshment", type: "Break", room: "Student Union Diner", faculty: "-", color: "slate" },
        { time: "01:15 - 03:20", code: "CLUB", title: "GDSC Student Chapter Workshop", type: "Extra-Curricular", room: "Student Activity Center", faculty: "Nissi Kratos (Lead)", color: "purple", duration: "2 Hours" },
        { time: "03:25 - 04:25", code: "ADV", title: "Advisor Office Hours & Check-in", type: "Mentoring", room: "Engineering Tower 518", faculty: "Prof. M. Vance", color: "cyan" }
      ],
      Saturday: [
        { time: "09:30 - 11:30", code: "HACK", title: "Autonomous Robotics Lab Sprint", type: "Lab Work", room: "Robotics Arena Bay 3", faculty: "Student Led", color: "emerald", duration: "2 Hours" },
        { time: "11:45 - 01:15", code: "WEB", title: "ACM Distinguished Colloquium", type: "Webinar", room: "Virtual / Hall A", faculty: "ACM Officers", color: "indigo" }
      ]
    }
  },

  subjects: [
    {
      code: "CS701",
      title: "Distributed Systems & Cloud Architecture",
      credits: 4,
      type: "Core Professional Theory",
      faculty: "Prof. Marcus Vance, Ph.D.",
      facultyEmail: "m.vance@apex.edu",
      syllabusProgress: 85,
      attendance: 92.3,
      currentTopic: "Paxos & Raft Consensus Mechanisms",
      description: "Covers fundamental principles of distributed computing: fault tolerance, consensus models, clock synchronization, distributed file systems, and large-scale cloud topologies.",
      modules: [
        { title: "Unit 1: Architectures & IPC Mechanisms", status: "Completed" },
        { title: "Unit 2: Clock Sync & Global State Detection", status: "Completed" },
        { title: "Unit 3: Consensus (Paxos, Raft, Byzantine Faults)", status: "In Progress" },
        { title: "Unit 4: Distributed Storage & Bigtable Architectures", status: "Upcoming" },
        { title: "Unit 5: Cloud Native Serverless Microservices", status: "Upcoming" }
      ],
      resources: [
        { name: "Lecture Notes: Consensus Protocols.pdf", size: "3.4 MB", type: "pdf" },
        { name: "Assignment 3: Raft Cluster Implementation.zip", size: "1.2 MB", type: "code" },
        { name: "Recommended Book: Designing Data-Intensive Apps", size: "Reference", type: "book" }
      ]
    },
    {
      code: "CS702",
      title: "Neural Networks & Deep Learning",
      credits: 4,
      type: "Core Professional Theory",
      faculty: "Dr. Anya Sharma",
      facultyEmail: "a.sharma@apex.edu",
      syllabusProgress: 90,
      attendance: 91.7,
      currentTopic: "Diffusion Models & Latent Spaces",
      description: "Explores modern deep architectures: CNNs, Sequence Transformers, Self-Supervised Models, Latent Diffusion, and Generative Adversarial Networks.",
      modules: [
        { title: "Unit 1: Backpropagation & Optimization Algorithms", status: "Completed" },
        { title: "Unit 2: Vision Transformers & Attention Networks", status: "Completed" },
        { title: "Unit 3: Generative Models (VAEs & Diffusion)", status: "In Progress" },
        { title: "Unit 4: Reinforcement Learning from Human Feedback (RLHF)", status: "Upcoming" }
      ],
      resources: [
        { name: "Transformer Attention Visualization Deck.pdf", size: "5.1 MB", type: "pdf" },
        { name: "PyTorch Starter Code for Assignment 4.ipynb", size: "820 KB", type: "code" },
        { name: "MIT Deep Learning Comprehensive Compendium", size: "Reference", type: "book" }
      ]
    },
    {
      code: "CS703",
      title: "Advanced Compiler Architecture",
      credits: 3,
      type: "Professional Elective",
      faculty: "Dr. Richard Thorne",
      facultyEmail: "r.thorne@apex.edu",
      syllabusProgress: 75,
      attendance: 86.4,
      currentTopic: "Static Single Assignment (SSA) Transformations",
      description: "Principles of modern compiler optimizations, intermediate representations (LLVM), data-flow analysis, SSA form, and instruction scheduling.",
      modules: [
        { title: "Unit 1: Lexical & Syntactic Analysis Revisit", status: "Completed" },
        { title: "Unit 2: LLVM IR & Control Flow Graph Generation", status: "Completed" },
        { title: "Unit 3: SSA Form & Loop Optimizations", status: "In Progress" },
        { title: "Unit 4: Code Generation & Register Allocation", status: "Upcoming" }
      ],
      resources: [
        { name: "LLVM Pass Development Tutorial.pdf", size: "2.8 MB", type: "pdf" },
        { name: "Compiler Lab Framework v2.zip", size: "4.5 MB", type: "code" }
      ]
    },
    {
      code: "CS704",
      title: "Applied Cryptography & Cyber Defense",
      credits: 3,
      type: "Professional Elective",
      faculty: "Prof. Samantha Wu",
      facultyEmail: "s.wu@apex.edu",
      syllabusProgress: 80,
      attendance: 84.0,
      currentTopic: "Zero Knowledge Proofs & Elliptic Curves",
      description: "Mathematical cryptography, public-key cryptosystems, post-quantum cryptography, side-channel analysis, and modern authenticated encryption protocols.",
      modules: [
        { title: "Unit 1: Symmetric Ciphers & Block Ciphers", status: "Completed" },
        { title: "Unit 2: ECC & Diffie-Hellman Key Exchange", status: "Completed" },
        { title: "Unit 3: Zero Knowledge Proofs (zk-SNARKs)", status: "In Progress" },
        { title: "Unit 4: Lattice-based Post-Quantum Cryptography", status: "Upcoming" }
      ],
      resources: [
        { name: "Cryptographic Protocols Reference Manual.pdf", size: "6.2 MB", type: "pdf" },
        { name: "Lab Manual: Wireshark Packet Cryptanalysis.pdf", size: "1.9 MB", type: "pdf" }
      ]
    },
    {
      code: "CS705",
      title: "Agile DevOps & Site Reliability",
      credits: 3,
      type: "Professional Elective",
      faculty: "Er. Michael Chang",
      facultyEmail: "m.chang@apex.edu",
      syllabusProgress: 85,
      attendance: 82.5,
      currentTopic: "GitOps with ArgoCD & Prometheus Observability",
      description: "End-to-end DevOps lifecycle: infrastructure-as-code with Terraform, container orchestration with Kubernetes, continuous integration, and chaos engineering.",
      modules: [
        { title: "Unit 1: Containerization & Docker Internals", status: "Completed" },
        { title: "Unit 2: Kubernetes Orchestration & Helm Charts", status: "Completed" },
        { title: "Unit 3: GitOps & Site Reliability Engineering (SRE)", status: "In Progress" },
        { title: "Unit 4: Distributed Tracing & Chaos Engineering", status: "Upcoming" }
      ],
      resources: [
        { name: "Kubernetes Production Patterns.pdf", size: "4.1 MB", type: "pdf" },
        { name: "Terraform Multi-Cloud Manifests.zip", size: "3.1 MB", type: "code" }
      ]
    },
    {
      code: "CS710",
      title: "Senior Capstone Project - Phase I",
      credits: 3,
      type: "Project / Research",
      faculty: "Prof. Marcus Vance (Guide)",
      facultyEmail: "m.vance@apex.edu",
      syllabusProgress: 70,
      attendance: 91.3,
      currentTopic: "High-Throughput Decentralized Message Queue Architecture",
      description: "Independent research and software construction project under academic faculty supervision. Deliverables include design specification, prototype, and evaluation benchmarks.",
      modules: [
        { title: "Phase 1: Problem Definition & Literature Review", status: "Completed" },
        { title: "Phase 2: Architectural Specification & RFC", status: "Completed" },
        { title: "Phase 3: Prototype Engine & Benchmark Suite", status: "In Progress" },
        { title: "Phase 4: Mid-Term Defense & Demonstration", status: "Upcoming" }
      ],
      resources: [
        { name: "Capstone Thesis Draft v1.2.pdf", size: "8.7 MB", type: "pdf" },
        { name: "Benchmark Results & Grafana Export.json", size: "450 KB", type: "code" }
      ]
    }
  ],

  announcements: [
    {
      id: "ann-01",
      title: "Fall 2026 End-Semester Final Examination Schedule Released",
      category: "Examination",
      badgeColor: "rose",
      date: "Nov 22, 2026",
      urgent: true,
      sender: "Office of the Controller of Examinations",
      summary: "The official timetable for Fall 2026 End-Semester Examinations is now live. Exams commence on December 14, 2026. Hall tickets will be released on Dec 5.",
      content: "All 7th-semester students must verify their registered elective codes before November 30. Any clash in dates must be reported immediately to the Examination Cell. Admit cards / Hall tickets will be issued electronically through this dashboard starting December 5, 2026. Minimum attendance threshold of 75% is strictly enforced to be eligible for hall ticket generation.",
      attachments: ["Fall_2026_Final_Exam_Datesheet_v1.pdf", "Exam_Hall_Regulations.pdf"]
    },
    {
      id: "ann-02",
      title: "Google & Microsoft Campus Placement Drive Registration",
      category: "Placements",
      badgeColor: "emerald",
      date: "Nov 20, 2026",
      urgent: true,
      sender: "University Career & Placement Cell",
      summary: "Registration deadline for Phase-1 Campus Interviews is Nov 28. Eligible students with CGPA >= 3.50 can submit their verified resumes.",
      content: "We are pleased to announce the schedule for Google Cloud and Microsoft Core Engineering interviews for the graduating batch of 2027. Shortlisted candidates will undergo an online algorithmic assessment followed by system design interviews. Ensure your profile, portfolio links, and academic transcripts are up to date.",
      attachments: ["Job_Description_Google_SWE2027.pdf", "Resume_Format_Guideline.docx"]
    },
    {
      id: "ann-03",
      title: "Annual International Hackathon 'CodePulse 2026' Open for Teams",
      category: "Events",
      badgeColor: "purple",
      date: "Nov 18, 2026",
      urgent: false,
      sender: "ACM & GDSC Student Chapters",
      summary: "36-hour physical hackathon with $25,000 in prizes and direct mentorship from venture capitalists. Register your team of 3-4 by Dec 2.",
      content: "CodePulse 2026 will be hosted at the Innovation Hub on December 8-9. Tracks include Distributed Systems, AI for Healthcare, Decentralized Finance, and Sustainable Tech. Free meals, sleeping pods, and swags provided for all participants.",
      attachments: ["Hackathon_Brochure_Rules.pdf"]
    },
    {
      id: "ann-04",
      title: "Capstone Project Phase-I Progress Review Panel Schedule",
      category: "Academic",
      badgeColor: "indigo",
      date: "Nov 16, 2026",
      urgent: false,
      sender: "Department of Computer Science",
      summary: "Panel presentations for Capstone Project Phase 1 are scheduled for Dec 1 - Dec 3. Prepare 15-minute slide deck and live prototype demo.",
      content: "All project groups must submit their Interim Project Report signed by faculty guide on or before November 29. Rubrics include: Clarity of Problem Statement (20%), Architectural Design (30%), Prototype Demonstration (30%), and Q&A Defense (20%).",
      attachments: ["Capstone_Evaluation_Rubric_Phase1.pdf"]
    },
    {
      id: "ann-05",
      title: "Spring 2027 Semester Fee Payment & Course Pre-registration",
      category: "Administrative",
      badgeColor: "amber",
      date: "Nov 12, 2026",
      urgent: false,
      sender: "Bursar's Office & Registrar",
      summary: "Early bird fee payment portal opens on Dec 10. Installment plans available upon request.",
      content: "Tuition and lab fees for Semester VIII must be settled by January 5, 2027. Course pre-registration for capstone continuation and final semester humanities electives will be opened subsequently.",
      attachments: ["Fee_Structure_Academic_Year_2026_27.pdf"]
    }
  ],

  notifications: [
    {
      id: "notif-1",
      title: "Attendance Warning Buffer",
      description: "Your attendance in CS705 (DevOps) is at 82.5%. You have 4 safe absences remaining.",
      time: "10 mins ago",
      icon: "alert-triangle",
      type: "warning",
      unread: true
    },
    {
      id: "notif-2",
      title: "Assignment Graded: PyTorch Transformers",
      description: "Dr. Anya Sharma awarded you 10/10 with remarks: 'Flawless multi-head implementation'.",
      time: "2 hours ago",
      icon: "check-circle",
      type: "success",
      unread: true
    },
    {
      id: "notif-3",
      title: "Timetable Adjustment for Tomorrow",
      description: "Advanced Compiler Architecture moved to Auditorium 2 due to AV maintenance.",
      time: "Yesterday",
      icon: "calendar",
      type: "info",
      unread: false
    },
    {
      id: "notif-4",
      title: "Library Book Due Reminder",
      description: "'Designing Data-Intensive Applications' by Martin Kleppmann is due in 3 days.",
      time: "2 days ago",
      icon: "book-open",
      type: "info",
      unread: false
    }
  ],

  upcomingDeadlines: [
    {
      title: "Raft Consensus Protocol Milestone",
      course: "CS701 - Distributed Systems",
      dueDate: "Tomorrow, 11:59 PM",
      status: "Due Soon",
      statusColor: "rose"
    },
    {
      title: "Zero-Knowledge Proofs Assignment",
      course: "CS704 - Applied Cryptography",
      dueDate: "In 3 Days (Nov 27)",
      status: "In Progress",
      statusColor: "amber"
    },
    {
      title: "Capstone Interim Report Submission",
      course: "CS710 - Senior Capstone",
      dueDate: "Nov 29, 05:00 PM",
      status: "Pending Review",
      statusColor: "indigo"
    }
  ]
};
