/**
 * CAMPUS PULSE - DATA VISUALIZATION ENGINE (CHART.JS)
 * Theme-aware, interactive charts with polished aesthetics
 */

const ChartsEngine = {
  instances: {},

  init() {
    if (typeof Chart === 'undefined') {
      console.warn("Chart.js not loaded. Skipping chart initialization.");
      return;
    }

    // Configure global Chart defaults
    Chart.defaults.font.family = "'Plus Jakarta Sans', -apple-system, sans-serif";
    Chart.defaults.font.size = 12;
    Chart.defaults.color = this.isDarkMode() ? '#94a3b8' : '#64748b';

    this.renderAttendanceGauge();
    this.renderAttendanceTrend();
    this.renderGpaTrend();
    this.renderInternalMarksBar();
  },

  isDarkMode() {
    return document.documentElement.getAttribute('data-theme') === 'dark';
  },

  getColors() {
    const dark = this.isDarkMode();
    return {
      grid: dark ? 'rgba(36, 47, 73, 0.6)' : 'rgba(226, 232, 240, 0.7)',
      text: dark ? '#94a3b8' : '#64748b',
      textStrong: dark ? '#f8fafc' : '#0f172a',
      primary: '#6366f1',
      primaryLight: dark ? 'rgba(99, 102, 241, 0.25)' : 'rgba(99, 102, 241, 0.12)',
      emerald: '#10b981',
      emeraldLight: dark ? 'rgba(16, 185, 129, 0.25)' : 'rgba(16, 185, 129, 0.12)',
      amber: '#f59e0b',
      rose: '#f43f5e',
      surface: dark ? '#111726' : '#ffffff'
    };
  },

  renderAttendanceGauge() {
    const canvas = document.getElementById('attendanceGaugeCanvas');
    if (!canvas) return;

    if (this.instances.attendanceGauge) {
      this.instances.attendanceGauge.destroy();
    }

    const percentage = StudentData.attendance.overallPercentage;
    const remaining = (100 - percentage).toFixed(1);
    const colors = this.getColors();

    this.instances.attendanceGauge = new Chart(canvas, {
      type: 'doughnut',
      data: {
        datasets: [{
          data: [percentage, remaining],
          backgroundColor: [
            colors.emerald,
            this.isDarkMode() ? '#1e293b' : '#f1f5f9'
          ],
          borderWidth: 0,
          borderRadius: 8,
          cutout: '80%'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            enabled: true,
            callbacks: {
              label: (ctx) => `${ctx.label || 'Value'}: ${ctx.raw}%`
            }
          }
        },
        animation: {
          animateScale: true,
          animateRotate: true,
          duration: 1200
        }
      }
    });
  },

  renderAttendanceTrend() {
    const canvas = document.getElementById('attendanceTrendCanvas');
    if (!canvas) return;

    if (this.instances.attendanceTrend) {
      this.instances.attendanceTrend.destroy();
    }

    const colors = this.getColors();
    const trendData = StudentData.attendance.monthlyTrend;

    this.instances.attendanceTrend = new Chart(canvas, {
      type: 'line',
      data: {
        labels: trendData.map(d => d.month),
        datasets: [{
          label: 'Attendance Rate (%)',
          data: trendData.map(d => d.percentage),
          borderColor: colors.emerald,
          backgroundColor: colors.emeraldLight,
          borderWidth: 3,
          fill: true,
          tension: 0.4,
          pointBackgroundColor: colors.emerald,
          pointBorderColor: colors.surface,
          pointBorderWidth: 2,
          pointRadius: 5,
          pointHoverRadius: 7
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            padding: 10,
            cornerRadius: 8,
            callbacks: {
              label: (ctx) => ` Attendance: ${ctx.raw}%`
            }
          }
        },
        scales: {
          y: {
            min: 70,
            max: 100,
            grid: { color: colors.grid },
            ticks: {
              color: colors.text,
              callback: val => `${val}%`
            }
          },
          x: {
            grid: { display: false },
            ticks: { color: colors.text }
          }
        }
      }
    });
  },

  renderGpaTrend() {
    const canvas = document.getElementById('gpaTrendCanvas');
    if (!canvas) return;

    if (this.instances.gpaTrend) {
      this.instances.gpaTrend.destroy();
    }

    const colors = this.getColors();
    const history = StudentData.marks.cgpaHistory;

    this.instances.gpaTrend = new Chart(canvas, {
      type: 'line',
      data: {
        labels: history.map(h => h.semester),
        datasets: [
          {
            label: 'SGPA (Semester GPA)',
            data: history.map(h => h.sgpa),
            borderColor: colors.primary,
            backgroundColor: colors.primaryLight,
            borderWidth: 3,
            fill: true,
            tension: 0.35,
            pointBackgroundColor: colors.primary,
            pointBorderColor: colors.surface,
            pointBorderWidth: 2,
            pointRadius: 5,
            pointHoverRadius: 7
          },
          {
            label: 'Cumulative CGPA',
            data: history.map(h => h.cgpa),
            borderColor: colors.amber,
            borderWidth: 2,
            borderDash: [5, 5],
            fill: false,
            tension: 0.3,
            pointBackgroundColor: colors.amber,
            pointRadius: 4
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'top',
            labels: {
              boxWidth: 12,
              usePointStyle: true,
              color: colors.text
            }
          },
          tooltip: {
            padding: 10,
            cornerRadius: 8
          }
        },
        scales: {
          y: {
            min: 3.2,
            max: 4.0,
            grid: { color: colors.grid },
            ticks: {
              color: colors.text,
              stepSize: 0.2
            }
          },
          x: {
            grid: { display: false },
            ticks: { color: colors.text }
          }
        }
      }
    });
  },

  renderInternalMarksBar() {
    const canvas = document.getElementById('internalMarksBarCanvas');
    if (!canvas) return;

    if (this.instances.internalMarks) {
      this.instances.internalMarks.destroy();
    }

    const colors = this.getColors();
    const courses = StudentData.marks.currentSemesterCourses;

    this.instances.internalMarks = new Chart(canvas, {
      type: 'bar',
      data: {
        labels: courses.map(c => c.code),
        datasets: [
          {
            label: 'IA 1 (Max 20)',
            data: courses.map(c => c.ia1),
            backgroundColor: colors.primary,
            borderRadius: 6
          },
          {
            label: 'IA 2 (Max 20)',
            data: courses.map(c => c.ia2),
            backgroundColor: colors.emerald,
            borderRadius: 6
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'top',
            labels: {
              boxWidth: 12,
              usePointStyle: true,
              color: colors.text
            }
          },
          tooltip: {
            padding: 10,
            cornerRadius: 8,
            callbacks: {
              afterLabel: (ctx) => {
                const course = courses[ctx.dataIndex];
                return `${course.title}`;
              }
            }
          }
        },
        scales: {
          y: {
            min: 0,
            max: 20,
            grid: { color: colors.grid },
            ticks: {
              color: colors.text,
              stepSize: 5
            }
          },
          x: {
            grid: { display: false },
            ticks: { color: colors.text }
          }
        }
      }
    });
  },

  updateTheme() {
    this.init();
  }
};
