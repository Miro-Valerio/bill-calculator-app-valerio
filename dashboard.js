// Chart.js Bar Chart
const ctx = document.getElementById('usageChart').getContext('2d');

// Create gradient color
const gradient = ctx.createLinearGradient(0, 0, 0, 180);
gradient.addColorStop(0, 'rgba(255,175,58,1)');
gradient.addColorStop(1, 'rgba(255,124,0,0.9)');

new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
    datasets: [{
      data: [60, 140, 220, 300, 380],
      backgroundColor: gradient,
      borderRadius: 8,
      barPercentage: 0.65
    }]
  },
  options: {
    maintainAspectRatio: false,
    plugins: { legend: { display: false }},
    scales: {
      x: {
        ticks: { color: "#fff" },
        grid: { display: false }
      },
      y: {
        ticks: { color: "#fff" },
        grid: { color: "rgba(255,255,255,0.1)" },
        beginAtZero: true,
        max: 400
      }
    }
  }
});
