/**
 * CAMPUS PULSE - CORE APPLICATION ENGINE
 * State management, dynamic DOM rendering, interactions, and events
 */

document.addEventListener('DOMContentLoaded', () => {
  App.init();
});

const App = {
  currentTab: 'overview',
  activeTimetableDay: 'Monday',
  activeAnnouncementCategory: 'All',

  init() {
    this.initTheme();
    this.initClock();
    this.initNavigation();
    this.renderAllData();
    this.initInteractions();
    this.initModals();
    this.initCalculator();
    this.renderTopNotifications();

    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }

    // Initialize Charts
    setTimeout(() => {
      ChartsEngine.init();
    }, 150);

    // Initial greeting toast
    setTimeout(() => {
      this.showToast(
        "Welcome back, Nissi!",
        "You have 3 deadlines approaching this week.",
        "info"
      );
    }, 1000);
  },

  /* ===================================================================
     THEME MANAGEMENT (LIGHT / DARK)
     =================================================================== */
  initTheme() {
    const savedTheme = localStorage.getItem('cp_theme') || 'light';
    this.setTheme(savedTheme);

    const themeToggleBtn = document.getElementById('themeToggleBtn');
    if (themeToggleBtn) {
      themeToggleBtn.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme') || 'light';
        const next = current === 'dark' ? 'light' : 'dark';
        this.setTheme(next);
      });
    }
  },

  setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('cp_theme', theme);

    const themeIcon = document.getElementById('themeIcon');
    if (themeIcon) {
      themeIcon.setAttribute('data-lucide', theme === 'dark' ? 'sun' : 'moon');
      if (typeof lucide !== 'undefined') lucide.createIcons();
    }

    if (ChartsEngine && ChartsEngine.instances.attendanceGauge) {
      ChartsEngine.updateTheme();
    }
  },

  /* ===================================================================
     LIVE CLOCK & DATE
     =================================================================== */
  initClock() {
    const clockEl = document.getElementById('liveClockText');
    const dateEl = document.getElementById('liveDateText');

    const updateTime = () => {
      const now = new Date();
      if (clockEl) {
        clockEl.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      }
      if (dateEl) {
        dateEl.textContent = now.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });
      }
    };

    updateTime();
    setInterval(updateTime, 1000);
  },

  /* ===================================================================
     TAB NAVIGATION & ROUTING
     =================================================================== */
  initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link[data-tab]');
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const tab = link.getAttribute('data-tab');
        this.switchTab(tab);

        // Close mobile sidebar if open
        const sidebar = document.querySelector('.app-sidebar');
        const backdrop = document.querySelector('.sidebar-backdrop');
        if (sidebar) sidebar.classList.remove('mobile-open');
        if (backdrop) backdrop.classList.remove('active');
      });
    });

    // Mobile Sidebar Toggle
    const menuBtn = document.getElementById('mobileMenuToggle');
    const sidebar = document.querySelector('.app-sidebar');
    const backdrop = document.querySelector('.sidebar-backdrop');

    if (menuBtn && sidebar) {
      menuBtn.addEventListener('click', () => {
        sidebar.classList.toggle('mobile-open');
        if (backdrop) backdrop.classList.toggle('active');
      });
    }

    if (backdrop) {
      backdrop.addEventListener('click', () => {
        sidebar.classList.remove('mobile-open');
        backdrop.classList.remove('active');
      });
    }

    // Topbar Profile Pill Click
    const profilePill = document.getElementById('topbarProfilePill');
    if (profilePill) {
      profilePill.addEventListener('click', () => {
        this.switchTab('profile');
      });
    }
  },

  switchTab(tabId) {
    if (!tabId) return;
    this.currentTab = tabId;

    // Update active class on nav links
    document.querySelectorAll('.nav-link[data-tab]').forEach(link => {
      if (link.getAttribute('data-tab') === tabId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // Update visible section
    document.querySelectorAll('.dashboard-section').forEach(sec => {
      if (sec.id === `section-${tabId}`) {
        sec.classList.add('active');
      } else {
        sec.classList.remove('active');
      }
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Re-render chart sizes if needed
    if (tabId === 'attendance' || tabId === 'marks' || tabId === 'overview') {
      setTimeout(() => {
        ChartsEngine.init();
      }, 100);
    }

    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  },

  /* ===================================================================
     RENDER COMPLETE DATA STORE
     =================================================================== */
  renderAllData() {
    this.renderProfileData();
    this.renderOverviewTodayClasses();
    this.renderDeadlines();
    this.renderAttendanceTable();
    this.renderMarksData();
    this.renderTimetable(this.activeTimetableDay);
    this.renderSubjects();
    this.renderAnnouncements();
  },

  // 1. Profile Rendering
  renderProfileData() {
    const p = StudentData.profile;

    // Topbar user info
    const topName = document.getElementById('topbarUserName');
    const topRoll = document.getElementById('topbarUserRoll');
    const topAvatar = document.getElementById('topbarUserAvatar');
    if (topName) topName.textContent = p.name;
    if (topRoll) topRoll.textContent = p.rollNumber;
    if (topAvatar) topAvatar.src = p.avatar;

    // Overview Greeting
    const greetName = document.getElementById('overviewStudentName');
    if (greetName) greetName.textContent = p.preferredName;

    // Profile Section Hero
    const profName = document.getElementById('profileHeroName');
    const profRoll = document.getElementById('profileHeroRoll');
    const profDegree = document.getElementById('profileHeroDegree');
    const profAvatar = document.getElementById('profileHeroAvatar');
    if (profName) profName.textContent = p.name;
    if (profRoll) profRoll.textContent = `${p.rollNumber} • PRN: ${p.prnNumber}`;
    if (profDegree) profDegree.textContent = `${p.degree} in ${p.department}`;
    if (profAvatar) profAvatar.src = p.avatar;

    // Profile Details Grid
    const infoGrid = document.getElementById('profileDetailsFields');
    if (infoGrid) {
      infoGrid.innerHTML = `
        <div class="info-field-item">
          <div class="info-field-label">University Email</div>
          <div class="info-field-val">${p.universityEmail}</div>
        </div>
        <div class="info-field-item">
          <div class="info-field-label">Mobile Number</div>
          <div class="info-field-val">${p.phone}</div>
        </div>
        <div class="info-field-item">
          <div class="info-field-label">Current Term & Section</div>
          <div class="info-field-val">${p.semester} • ${p.section}</div>
        </div>
        <div class="info-field-item">
          <div class="info-field-label">Academic Standing</div>
          <div class="info-field-val" style="color: var(--primary-600);">${p.academicStanding}</div>
        </div>
        <div class="info-field-item">
          <div class="info-field-label">Residential Status</div>
          <div class="info-field-val">${p.residentialStatus}</div>
        </div>
        <div class="info-field-item">
          <div class="info-field-label">Blood Group / DOB</div>
          <div class="info-field-val">${p.bloodGroup} • ${p.dateOfBirth}</div>
        </div>
        <div class="info-field-item" style="grid-column: span 2;">
          <div class="info-field-label">Permanent Address</div>
          <div class="info-field-val">${p.homeAddress}</div>
        </div>
      `;
    }

    // Skills Chips
    const skillsWrap = document.getElementById('profileSkillsList');
    if (skillsWrap) {
      skillsWrap.innerHTML = p.skills.map(s => `
        <span class="badge badge-slate" style="font-size: 0.8rem; padding: 0.35rem 0.75rem;">
          <i data-lucide="check" style="width: 14px; height: 14px; margin-right: 4px;"></i>${s}
        </span>
      `).join('');
    }

    // Advisor info
    const adv = p.advisor;
    const advCard = document.getElementById('sidebarAdvisorCard');
    if (advCard) {
      advCard.innerHTML = `
        <div class="advisor-compact-card">
          <div class="advisor-avatar-wrapper">
            <img src="${adv.avatar}" alt="${adv.name}">
          </div>
          <div class="advisor-info">
            <h5>${adv.name}</h5>
            <p>Faculty Advisor • ${adv.office}</p>
          </div>
        </div>
      `;
    }
  },

  // 2. Today's Classes in Overview
  renderOverviewTodayClasses() {
    const container = document.getElementById('overviewTodaySchedule');
    if (!container) return;

    const todayDay = "Monday"; // Default demo schedule
    const schedule = StudentData.timetable.schedule[todayDay] || [];

    if (schedule.length === 0) {
      container.innerHTML = `<p style="color: var(--text-muted); font-size: 0.9rem;">No scheduled lectures for today.</p>`;
      return;
    }

    container.innerHTML = schedule.slice(0, 4).map((slot, index) => {
      const isNow = index === 0;
      return `
        <div class="schedule-item ${isNow ? 'active-now' : ''}">
          <div class="schedule-time-box">
            <div class="time-str">${slot.time}</div>
            <div class="status-pill">${isNow ? 'Ongoing' : 'Upcoming'}</div>
          </div>
          <div class="schedule-info-box">
            <h4>${slot.code} - ${slot.title}</h4>
            <div class="schedule-meta-row">
              <span><i data-lucide="map-pin" style="width: 13px; height: 13px; display: inline-block;"></i> ${slot.room}</span>
              <span><i data-lucide="user" style="width: 13px; height: 13px; display: inline-block;"></i> ${slot.faculty}</span>
            </div>
          </div>
          <div class="schedule-badge-wrap">
            <span class="badge badge-${slot.color || 'indigo'}">${slot.type}</span>
          </div>
        </div>
      `;
    }).join('');
  },

  // 3. Upcoming Deadlines
  renderDeadlines() {
    const container = document.getElementById('overviewDeadlinesList');
    if (!container) return;

    container.innerHTML = StudentData.upcomingDeadlines.map(d => `
      <div class="deadline-item">
        <div class="deadline-text">
          <h5>${d.title}</h5>
          <p>${d.course} • <strong>${d.dueDate}</strong></p>
        </div>
        <span class="badge badge-${d.statusColor}">${d.status}</span>
      </div>
    `).join('');
  },

  // 4. Attendance Breakdown Table
  renderAttendanceTable() {
    const tbody = document.getElementById('attendanceTableBody');
    if (!tbody) return;

    const subjects = StudentData.attendance.subjects;
    tbody.innerHTML = subjects.map(s => {
      let progressColor = 'fill-emerald';
      let badgeClass = 'badge-emerald';

      if (s.percentage < 75) {
        progressColor = 'fill-rose';
        badgeClass = 'badge-rose';
      } else if (s.percentage < 85) {
        progressColor = 'fill-amber';
        badgeClass = 'badge-amber';
      }

      return `
        <tr>
          <td class="strong">
            <div style="font-weight: 700; color: var(--text-primary);">${s.code}</div>
            <div style="font-size: 0.78rem; color: var(--text-tertiary);">${s.title}</div>
          </td>
          <td>${s.faculty}</td>
          <td>${s.attended} / ${s.held}</td>
          <td style="min-width: 140px;">
            <div style="display: flex; align-items: center; gap: 0.75rem;">
              <div class="progress-track" style="flex: 1;">
                <div class="progress-fill ${progressColor}" style="width: ${s.percentage}%;"></div>
              </div>
              <span style="font-weight: 700; font-size: 0.85rem; color: var(--text-primary);">${s.percentage}%</span>
            </div>
          </td>
          <td><span class="badge ${badgeClass}">${s.status}</span></td>
          <td style="font-weight: 600; color: var(--success-text);">
            ${s.safeToMiss > 0 ? `Can miss ${s.safeToMiss} class${s.safeToMiss > 1 ? 'es' : ''}` : 'Must attend next classes'}
          </td>
        </tr>
      `;
    }).join('');
  },

  // 5. Marks & Academic Performance
  renderMarksData() {
    const tbody = document.getElementById('marksTableBody');
    if (!tbody) return;

    const courses = StudentData.marks.currentSemesterCourses;
    tbody.innerHTML = courses.map(c => `
      <tr>
        <td class="strong">
          <div style="font-weight: 700; color: var(--text-primary);">${c.code}</div>
          <div style="font-size: 0.78rem; color: var(--text-tertiary);">${c.title}</div>
        </td>
        <td><span class="badge badge-slate">${c.credits} Credits</span></td>
        <td>${c.ia1} / 20</td>
        <td>${c.ia2} / 20</td>
        <td>${c.assignment} / 10</td>
        <td>${c.practical} / 25</td>
        <td style="font-weight: 800; color: var(--primary-600);">${c.totalInternal} / 50</td>
        <td><span class="badge badge-emerald">${c.predictedGrade}</span></td>
      </tr>
    `).join('');
  },

  // 6. Timetable
  renderTimetable(day) {
    this.activeTimetableDay = day;
    const container = document.getElementById('timetableCardsContainer');
    if (!container) return;

    const daySlots = StudentData.timetable.schedule[day] || [];

    if (daySlots.length === 0) {
      container.innerHTML = `
        <div class="pulse-card" style="grid-column: 1 / -1; text-align: center; padding: 3rem;">
          <i data-lucide="sun" style="width: 48px; height: 48px; color: var(--warning-solid); margin-bottom: 1rem;"></i>
          <h3>No Academic Sessions</h3>
          <p style="color: var(--text-tertiary);">Enjoy your free day or work on project deliverables.</p>
        </div>
      `;
      if (typeof lucide !== 'undefined') lucide.createIcons();
      return;
    }

    container.innerHTML = daySlots.map(slot => `
      <div class="timetable-slot-card">
        <div>
          <div class="slot-time-pill">
            <i data-lucide="clock" style="width: 14px; height: 14px;"></i>
            <span>${slot.time}</span>
            ${slot.duration ? `• <span>${slot.duration}</span>` : ''}
          </div>
          <div class="slot-course-title">${slot.code}: ${slot.title}</div>
          <div class="slot-location-row">
            <i data-lucide="map-pin" style="width: 15px; height: 15px; color: var(--text-muted);"></i>
            <span>${slot.room}</span>
          </div>
        </div>
        <div class="slot-footer-row">
          <span><i data-lucide="user" style="width: 14px; height: 14px; display: inline-block;"></i> ${slot.faculty}</span>
          <span class="badge badge-${slot.color || 'indigo'}">${slot.type}</span>
        </div>
      </div>
    `).join('');

    if (typeof lucide !== 'undefined') lucide.createIcons();
  },

  // 7. Subjects Catalog Grid
  renderSubjects() {
    const container = document.getElementById('subjectsGridContainer');
    if (!container) return;

    container.innerHTML = StudentData.subjects.map(s => `
      <div class="subject-card">
        <div>
          <div class="subject-top-row">
            <span class="subject-code-tag">${s.code}</span>
            <span class="badge badge-slate">${s.credits} Credits</span>
          </div>
          <h3 class="subject-name">${s.title}</h3>
          <p class="subject-desc">${s.description}</p>
          
          <div class="subject-syllabus-meter">
            <div class="syllabus-meter-label">
              <span>Syllabus Coverage</span>
              <span>${s.syllabusProgress}%</span>
            </div>
            <div class="progress-track">
              <div class="progress-fill fill-primary" style="width: ${s.syllabusProgress}%;"></div>
            </div>
          </div>
        </div>

        <div>
          <div class="subject-card-footer">
            <div class="faculty-pill">
              <i data-lucide="user-check" style="width: 16px; height: 16px; color: var(--primary-600);"></i>
              <span>${s.faculty}</span>
            </div>
            <button class="btn btn-secondary btn-sm" onclick="App.openSubjectModal('${s.code}')">
              <span>Details</span>
              <i data-lucide="arrow-right" style="width: 14px; height: 14px;"></i>
            </button>
          </div>
        </div>
      </div>
    `).join('');

    if (typeof lucide !== 'undefined') lucide.createIcons();
  },

  // 8. Announcements Feed
  renderAnnouncements(filterCategory = 'All', searchQuery = '') {
    const container = document.getElementById('announcementsListContainer');
    if (!container) return;

    let items = StudentData.announcements;

    if (filterCategory !== 'All') {
      items = items.filter(a => a.category === filterCategory);
    }

    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      items = items.filter(a => 
        a.title.toLowerCase().includes(q) || 
        a.summary.toLowerCase().includes(q) || 
        a.sender.toLowerCase().includes(q)
      );
    }

    if (items.length === 0) {
      container.innerHTML = `
        <div class="pulse-card" style="text-align: center; padding: 3rem;">
          <i data-lucide="inbox" style="width: 44px; height: 44px; color: var(--text-muted); margin-bottom: 0.5rem;"></i>
          <h4>No Announcements Found</h4>
          <p style="color: var(--text-tertiary); font-size: 0.875rem;">Try adjusting your category filter or search keywords.</p>
        </div>
      `;
      if (typeof lucide !== 'undefined') lucide.createIcons();
      return;
    }

    container.innerHTML = items.map(a => `
      <div class="announcement-card ${a.urgent ? 'urgent-border' : ''}" onclick="App.openAnnouncementModal('${a.id}')">
        <div class="announcement-header">
          <div class="announcement-meta-left">
            <span class="badge badge-${a.badgeColor}">${a.category}</span>
            ${a.urgent ? '<span class="badge badge-rose"><i data-lucide="alert-circle" style="width: 12px; height: 12px;"></i> Urgent</span>' : ''}
          </div>
          <div class="announcement-date">${a.date}</div>
        </div>

        <h3 class="announcement-title">${a.title}</h3>
        <p class="announcement-snippet">${a.summary}</p>

        <div class="announcement-footer-row">
          <span><i data-lucide="building" style="width: 14px; height: 14px; display: inline-block;"></i> ${a.sender}</span>
          <span style="display: inline-flex; align-items: center; gap: 0.35rem; color: var(--primary-600); font-weight: 600;">
            <span>Read Circular</span>
            <i data-lucide="chevron-right" style="width: 15px; height: 15px;"></i>
          </span>
        </div>
      </div>
    `).join('');

    if (typeof lucide !== 'undefined') lucide.createIcons();
  },

  // 9. Notifications in Topbar Dropdown
  renderTopNotifications() {
    const list = document.getElementById('topbarNotificationsList');
    if (!list) return;

    list.innerHTML = StudentData.notifications.map(n => `
      <div class="dropdown-item ${n.unread ? 'unread' : ''}">
        <div class="stat-icon-bubble ${n.type === 'warning' ? 'amber' : (n.type === 'success' ? 'emerald' : 'indigo')}" style="width: 34px; height: 34px;">
          <i data-lucide="${n.icon}" style="width: 16px; height: 16px;"></i>
        </div>
        <div style="flex: 1;">
          <h5 style="font-size: 0.825rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.15rem;">${n.title}</h5>
          <p style="font-size: 0.75rem; color: var(--text-secondary); line-height: 1.35;">${n.description}</p>
          <span style="font-size: 0.68rem; color: var(--text-muted);">${n.time}</span>
        </div>
      </div>
    `).join('');

    const toggleBtn = document.getElementById('notifDropdownBtn');
    const menu = document.getElementById('notifDropdownMenu');

    if (toggleBtn && menu) {
      toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        menu.classList.toggle('open');
      });

      document.addEventListener('click', (e) => {
        if (!menu.contains(e.target) && !toggleBtn.contains(e.target)) {
          menu.classList.remove('open');
        }
      });
    }
  },

  /* ===================================================================
     INTERACTIONS & FILTER EVENT LISTENERS
     =================================================================== */
  initInteractions() {
    // Timetable Day Tabs
    const dayBtns = document.querySelectorAll('.day-tab-btn');
    dayBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        dayBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const day = btn.getAttribute('data-day');
        this.renderTimetable(day);
      });
    });

    // Announcements Category Filter
    const catBtns = document.querySelectorAll('.cat-filter-btn');
    catBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        catBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.activeAnnouncementCategory = btn.getAttribute('data-category');
        const searchVal = document.getElementById('announcementSearchInput')?.value || '';
        this.renderAnnouncements(this.activeAnnouncementCategory, searchVal);
      });
    });

    // Announcements Search
    const searchInput = document.getElementById('announcementSearchInput');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.renderAnnouncements(this.activeAnnouncementCategory, e.target.value);
      });
    }

    // Top Omnisearch Filter
    const omniInput = document.getElementById('globalOmniSearch');
    if (omniInput) {
      omniInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          const val = omniInput.value.trim();
          if (val) {
            this.switchTab('announcements');
            const catBtnAll = document.querySelector('.cat-filter-btn[data-category="All"]');
            if (catBtnAll) catBtnAll.click();
            const annSearch = document.getElementById('announcementSearchInput');
            if (annSearch) {
              annSearch.value = val;
              this.renderAnnouncements('All', val);
            }
            this.showToast("Search Executed", `Displaying matches for "${val}"`, "info");
          }
        }
      });
    }
  },

  /* ===================================================================
     INTERACTIVE ATTENDANCE CALCULATOR
     =================================================================== */
  initCalculator() {
    const subjectSelect = document.getElementById('calcSubjectSelect');
    const targetInput = document.getElementById('calcTargetInput');
    const calcOutput = document.getElementById('calcOutputText');

    if (!subjectSelect || !targetInput || !calcOutput) return;

    // Populate subject select dropdown
    const subjects = StudentData.attendance.subjects;
    subjectSelect.innerHTML = `
      <option value="OVERALL">Overall Attendance (All Subjects)</option>
      ${subjects.map(s => `<option value="${s.code}">${s.code} - ${s.title}</option>`).join('')}
    `;

    const calculate = () => {
      const selected = subjectSelect.value;
      const target = parseFloat(targetInput.value) || 75;

      let attended = StudentData.attendance.totalAttended;
      let held = StudentData.attendance.totalHeld;
      let title = "Overall";

      if (selected !== 'OVERALL') {
        const sub = subjects.find(s => s.code === selected);
        if (sub) {
          attended = sub.attended;
          held = sub.held;
          title = sub.code;
        }
      }

      const currentPct = (attended / held) * 100;

      if (currentPct >= target) {
        // Can miss: attended / (held + X) >= target/100  =>  X <= (100*attended - target*held)/target
        const safeMiss = Math.floor((100 * attended - target * held) / target);
        calcOutput.innerHTML = `
          <span style="color: var(--success-text); font-weight: 700;">Safe!</span>
          In <strong>${title}</strong>, you can safely skip up to <strong>${safeMiss}</strong> more lecture${safeMiss === 1 ? '' : 's'} while staying at or above ${target}%.
        `;
      } else {
        // Must attend: (attended + Y) / (held + Y) >= target/100  =>  Y >= (target*held - 100*attended)/(100 - target)
        const needed = Math.ceil((target * held - 100 * attended) / (100 - target));
        calcOutput.innerHTML = `
          <span style="color: var(--danger-text); font-weight: 700;">Action Needed:</span>
          In <strong>${title}</strong>, you need to attend the next <strong>${needed}</strong> consecutive lecture${needed === 1 ? '' : 's'} to achieve ${target}%.
        `;
      }
    };

    subjectSelect.addEventListener('change', calculate);
    targetInput.addEventListener('input', calculate);
    calculate();
  },

  /* ===================================================================
     MODALS CONTROLLER
     =================================================================== */
  initModals() {
    // Backdrop close handler
    document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
      backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) {
          backdrop.classList.remove('open');
        }
      });
    });

    // Close buttons inside modal headers
    document.querySelectorAll('[data-close-modal]').forEach(btn => {
      btn.addEventListener('click', () => {
        const modal = btn.closest('.modal-backdrop');
        if (modal) modal.classList.remove('open');
      });
    });

    // Escape key listener
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.modal-backdrop.open').forEach(m => m.classList.remove('open'));
      }
    });
  },

  // Open Subject Details Modal
  openSubjectModal(code) {
    const sub = StudentData.subjects.find(s => s.code === code);
    if (!sub) return;

    const modal = document.getElementById('subjectDetailModal');
    const titleEl = document.getElementById('subjectModalTitle');
    const bodyEl = document.getElementById('subjectModalBody');

    if (titleEl) titleEl.textContent = `${sub.code}: ${sub.title}`;
    if (bodyEl) {
      bodyEl.innerHTML = `
        <div style="margin-bottom: 1.25rem;">
          <div style="display: flex; gap: 0.5rem; margin-bottom: 0.75rem;">
            <span class="badge badge-indigo">${sub.type}</span>
            <span class="badge badge-slate">${sub.credits} Credits</span>
            <span class="badge badge-emerald">${sub.attendance}% Attendance</span>
          </div>
          <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.5;">${sub.description}</p>
        </div>

        <div style="margin-bottom: 1.5rem;">
          <h4 style="font-size: 0.95rem; font-weight: 700; margin-bottom: 0.75rem;">Syllabus Modules (${sub.syllabusProgress}% Completed)</h4>
          <div style="display: flex; flex-direction: column; gap: 0.5rem;">
            ${sub.modules.map(m => `
              <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.6rem 0.85rem; background: var(--bg-subtle); border-radius: var(--radius-md); font-size: 0.85rem;">
                <span>${m.title}</span>
                <span class="badge ${m.status === 'Completed' ? 'badge-emerald' : (m.status === 'In Progress' ? 'badge-amber' : 'badge-slate')}">${m.status}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <div>
          <h4 style="font-size: 0.95rem; font-weight: 700; margin-bottom: 0.75rem;">Course Handouts & Study Materials</h4>
          <div style="display: flex; flex-direction: column; gap: 0.5rem;">
            ${sub.resources.map(r => `
              <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.75rem 1rem; border: 1px solid var(--border-default); border-radius: var(--radius-md);">
                <div style="display: flex; align-items: center; gap: 0.65rem;">
                  <i data-lucide="${r.type === 'pdf' ? 'file-text' : (r.type === 'code' ? 'code-2' : 'book')}" style="width: 18px; height: 18px; color: var(--primary-600);"></i>
                  <span style="font-size: 0.85rem; font-weight: 600; color: var(--text-primary);">${r.name}</span>
                </div>
                <button class="btn btn-secondary btn-sm" onclick="App.showToast('File Downloaded', 'Saved to your Downloads folder', 'success')">
                  <i data-lucide="download" style="width: 14px; height: 14px;"></i>
                  <span>${r.size}</span>
                </button>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    modal.classList.add('open');
    if (typeof lucide !== 'undefined') lucide.createIcons();
  },

  // Open Announcement Details Modal
  openAnnouncementModal(id) {
    const a = StudentData.announcements.find(item => item.id === id);
    if (!a) return;

    const modal = document.getElementById('announcementDetailModal');
    const titleEl = document.getElementById('announcementModalTitle');
    const bodyEl = document.getElementById('announcementModalBody');

    if (titleEl) titleEl.textContent = a.title;
    if (bodyEl) {
      bodyEl.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.25rem; flex-wrap: wrap; gap: 0.5rem;">
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <span class="badge badge-${a.badgeColor}">${a.category}</span>
            ${a.urgent ? '<span class="badge badge-rose">Urgent Notice</span>' : ''}
          </div>
          <span style="font-size: 0.8rem; color: var(--text-muted); font-weight: 600;">Issued on: ${a.date}</span>
        </div>

        <div style="padding: 0.85rem; background: var(--bg-subtle); border-radius: var(--radius-md); margin-bottom: 1.25rem;">
          <div style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-muted); font-weight: 700;">Issuing Authority</div>
          <div style="font-size: 0.95rem; font-weight: 700; color: var(--text-primary);">${a.sender}</div>
        </div>

        <div style="font-size: 0.95rem; color: var(--text-secondary); line-height: 1.7; margin-bottom: 1.5rem;">
          ${a.content}
        </div>

        <div>
          <h4 style="font-size: 0.9rem; font-weight: 700; margin-bottom: 0.75rem;">Official Circular Attachments</h4>
          <div style="display: flex; flex-direction: column; gap: 0.5rem;">
            ${a.attachments.map(att => `
              <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.65rem 0.95rem; background: var(--bg-subtle); border-radius: var(--radius-md); font-size: 0.85rem;">
                <span style="font-weight: 600; color: var(--text-primary);"><i data-lucide="paperclip" style="width: 14px; height: 14px; display: inline-block; margin-right: 6px;"></i>${att}</span>
                <button class="btn btn-secondary btn-sm" onclick="App.showToast('Attachment Saved', '${att} downloaded', 'success')">
                  <i data-lucide="download" style="width: 14px; height: 14px;"></i>
                </button>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    modal.classList.add('open');
    if (typeof lucide !== 'undefined') lucide.createIcons();
  },

  // Open Hall Ticket Preview Modal
  openHallTicketModal() {
    const modal = document.getElementById('hallTicketModal');
    const p = StudentData.profile;
    const container = document.getElementById('hallTicketContent');

    if (container) {
      container.innerHTML = `
        <div style="border: 2px dashed var(--primary-300); border-radius: var(--radius-xl); padding: 1.5rem; background-color: var(--bg-surface);">
          <div style="text-align: center; border-bottom: 2px solid var(--border-default); padding-bottom: 1rem; margin-bottom: 1.25rem;">
            <h2 style="font-size: 1.35rem; font-weight: 800; color: var(--text-primary); letter-spacing: -0.02em;">APEX INSTITUTE OF ADVANCED TECHNOLOGY</h2>
            <p style="font-size: 0.85rem; color: var(--text-tertiary); font-weight: 600;">Office of the Controller of Examinations • Fall 2026</p>
            <div style="display: inline-block; margin-top: 0.5rem; padding: 0.2rem 0.85rem; background: var(--primary-100); color: var(--primary-800); border-radius: var(--radius-full); font-size: 0.8rem; font-weight: 800;">
              OFFICIAL EXAMINATION ADMIT CARD / HALL TICKET
            </div>
          </div>

          <div style="display: flex; justify-content: space-between; gap: 1rem; margin-bottom: 1.5rem; flex-wrap: wrap;">
            <div>
              <p style="font-size: 0.8rem; color: var(--text-muted);">Candidate Name:</p>
              <h4 style="font-size: 1.1rem; font-weight: 800; color: var(--text-primary);">${p.name}</h4>
              <p style="font-size: 0.85rem; color: var(--text-secondary); margin-top: 0.25rem;">Roll No: <strong>${p.rollNumber}</strong></p>
              <p style="font-size: 0.85rem; color: var(--text-secondary);">PRN: <strong>${p.prnNumber}</strong></p>
            </div>
            <div>
              <p style="font-size: 0.8rem; color: var(--text-muted);">Department & Term:</p>
              <h4 style="font-size: 1rem; font-weight: 700; color: var(--text-primary);">${p.department}</h4>
              <p style="font-size: 0.85rem; color: var(--text-secondary); margin-top: 0.25rem;">Semester: <strong>${p.semester} (Regular)</strong></p>
              <p style="font-size: 0.85rem; color: var(--text-secondary);">Attendance: <strong style="color: var(--success-text);">${StudentData.attendance.overallPercentage}% (Eligible)</strong></p>
            </div>
            <div style="width: 80px; height: 95px; border: 2px solid var(--border-strong); border-radius: var(--radius-md); overflow: hidden;">
              <img src="${p.avatar}" style="width: 100%; height: 100%; object-fit: cover;" alt="Candidate Photo">
            </div>
          </div>

          <table class="pulse-table" style="font-size: 0.825rem; margin-bottom: 1.25rem;">
            <thead>
              <tr>
                <th>Subject Code</th>
                <th>Subject Title</th>
                <th>Exam Date</th>
                <th>Time Slot</th>
              </tr>
            </thead>
            <tbody>
              <tr><td class="strong">CS701</td><td>Distributed Systems & Cloud</td><td>Dec 14, 2026</td><td>09:30 AM - 12:30 PM</td></tr>
              <tr><td class="strong">CS702</td><td>Neural Networks & Deep Learning</td><td>Dec 17, 2026</td><td>09:30 AM - 12:30 PM</td></tr>
              <tr><td class="strong">CS703</td><td>Advanced Compiler Architecture</td><td>Dec 21, 2026</td><td>09:30 AM - 12:30 PM</td></tr>
              <tr><td class="strong">CS704</td><td>Applied Cryptography</td><td>Dec 24, 2026</td><td>09:30 AM - 12:30 PM</td></tr>
              <tr><td class="strong">CS705</td><td>Agile DevOps & SRE</td><td>Dec 28, 2026</td><td>09:30 AM - 12:30 PM</td></tr>
            </tbody>
          </table>

          <div style="display: flex; justify-content: space-between; align-items: flex-end; border-top: 1px solid var(--border-default); padding-top: 1rem;">
            <div style="font-size: 0.75rem; color: var(--text-muted); line-height: 1.4;">
              • Candidate must report 30 minutes prior to exam hall.<br>
              • Valid University Physical ID card is mandatory along with this admit pass.
            </div>
            <div style="text-align: center;">
              <div style="font-family: var(--font-mono); font-size: 0.8rem; font-weight: 700; color: var(--text-primary);">[DIGITALLY VERIFIED]</div>
              <div style="font-size: 0.7rem; color: var(--text-tertiary);">Controller of Examinations</div>
            </div>
          </div>
        </div>
      `;
    }

    modal.classList.add('open');
  },

  // Open Leave Application Modal
  openLeaveModal() {
    const modal = document.getElementById('leaveModal');
    if (modal) modal.classList.add('open');
  },

  // Submit Leave Action
  submitLeaveRequest(e) {
    e.preventDefault();
    const reason = document.getElementById('leaveReasonInput')?.value;
    const modal = document.getElementById('leaveModal');
    if (modal) modal.classList.remove('open');

    this.showToast(
      "Leave Application Submitted",
      "Sent to Prof. Marcus Vance for approval.",
      "success"
    );
  },

  /* ===================================================================
     TOAST ENGINE
     =================================================================== */
  showToast(title, message, type = 'info') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';

    let iconName = 'info';
    let iconColor = 'indigo';
    if (type === 'success') {
      iconName = 'check-circle';
      iconColor = 'emerald';
    } else if (type === 'warning') {
      iconName = 'alert-triangle';
      iconColor = 'amber';
    } else if (type === 'danger') {
      iconName = 'x-circle';
      iconColor = 'rose';
    }

    toast.innerHTML = `
      <div class="toast-icon stat-icon-bubble ${iconColor}">
        <i data-lucide="${iconName}" style="width: 18px; height: 18px;"></i>
      </div>
      <div class="toast-content" style="flex: 1;">
        <h5>${title}</h5>
        <p>${message}</p>
      </div>
    `;

    container.appendChild(toast);
    if (typeof lucide !== 'undefined') lucide.createIcons();

    setTimeout(() => {
      toast.classList.add('toast-leave');
      setTimeout(() => {
        if (toast.parentElement) toast.parentElement.removeChild(toast);
      }, 300);
    }, 4000);
  }
};
