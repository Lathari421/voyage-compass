/* Custom JavaScript for Index Page */

// Random Background Images - From large images directory
const backgroundImages = [
    'large images/bangkok1.jpg',
    'large images/bangkok2.jpg',
    'large images/bangkok3.jpg',
    'large images/bangkok4.jpg',
    'large images/hongkong1.jpg',
    'large images/hongkong2.jpg',
    'large images/hongkong3.jpg',
    'large images/hongkong4.jpg',
    'large images/hongkong5.jpg',
    'large images/tokyo1.jpg',
    'large images/tokyo2.jpg',
    'large images/tokyo3.jpg',
    'large images/tokyo4.jpg',
    'large images/tokyo5.jpg',
    'large images/seoul1.jpg',
    'large images/seoul2.jpg',
    'large images/seoul3.jpg',
    'large images/seoul4.jpg',
    'large images/seoul5.jpg',
    'large images/singapore1.jpg',
    'large images/singapore2.jpg',
    'large images/singapore3.jpg',
    'large images/singapore4.jpg',
    'large images/singapore5.jpg',
    'large images/sydney1.jpg',
    'large images/sydney2.jpg',
    'large images/sydney3.jpg',
    'large images/sydney4.jpg',
    'large images/vancouver1.jpg',
    'large images/vancouver2.jpg',
    'large images/vancouver3.jpg',
    'large images/vancouver4.jpg',
    'large images/vancouver5.jpg',
    'large images/london1.jpg',
    'large images/london2.jpg',
    'large images/london3.jpg',
    'large images/london4.jpg',
    'large images/london5.jpg',
    'large images/sf.jpg',
    'large images/sf2.jpg',
    'large images/sf3.jpg',
    'large images/sf4.jpg',
    'large images/new_york_1.jpeg',
    'large images/nyc2.jpg',
    'large images/nyc3.jpg',
    'large images/nyc4.jpg'
];

// Set random background on page load
document.addEventListener('DOMContentLoaded', function() {
    const randomIndex = Math.floor(Math.random() * backgroundImages.length);
    const heroSection = document.getElementById('hero');
    heroSection.style.backgroundImage = `url('${backgroundImages[randomIndex]}')`;
});



// Smooth scrolling for menu items
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Gallery item click handlers to navigate to city pages
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', function() {
        const cityName = this.querySelector('.gallery-item-title').textContent;
        
        // Map Chinese city names to their respective HTML files
        const cityMap = {
            '紐約': 'new-york-city.html',
            '舊金山': 'san-francisco.html',
            '倫敦': 'london.html',
            '新加坡': 'singapore.html',
            '雪梨': 'sydney.html',
            '溫哥華': 'vancouver.html',
            '首爾': 'seoul.html',
            '東京': 'tokyo.html',
            '曼谷': 'bangkok.html',
            '香港': 'hong-kong.html'
        };
        
        if (cityMap[cityName]) {
            window.location.href = cityMap[cityName];
        }
    });
}); 

// D3.js Salary Bar Chart for city-profile.html
window.createSalaryBarChart = function() {
    const data = [
        { "Metric": "low", "Junior": 53000, "Senior": 95900 },
        { "Metric": "median", "Junior": 62900, "Senior": 131400 },
        { "Metric": "high", "Junior": 89300, "Senior": 209000 }
    ];
    const margin = {top: 50, right: 30, bottom: 40, left: 60};
    const legendHeight = 30;
    const container = document.getElementById('salary-chart');
    if (!container) return;
    const width = Math.min(container.offsetWidth || 500, 600) - margin.left - margin.right;
    const height = 360 - margin.top - margin.bottom;
    d3.select("#salary-chart").html("");
    const svg = d3.select("#salary-chart")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom + legendHeight);
    // legend group在svg最外層
    const legendGroup = svg.append("g")
        .attr("class", "legend")
        .attr("transform", `translate(${(width + margin.left + margin.right)/2 - 60}, 20)`);
    const legendData = [
        {label: 'Junior', color: 'bar-junior'},
        {label: 'Senior', color: 'bar-senior'}
    ];
    const legendItem = legendGroup.selectAll("g")
        .data(legendData)
        .enter().append("g")
        .attr("transform", (d, i) => `translate(${i * 120}, 0)`);
    legendItem.append("rect")
        .attr("width", 19)
        .attr("height", 19)
        .attr("class", d => d.color);
    legendItem.append("text")
        .attr("x", 24)
        .attr("y", 9.5)
        .attr("dy", "0.32em")
        .attr("text-anchor", "start")
        .text(d => d.label);
    // chart 主體下移 legendHeight
    const chartG = svg.append("g")
        .attr("transform", `translate(${margin.left},${margin.top + legendHeight})`);
    const tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("z-index", 9999);
    const metrics = data.map(d => d.Metric);
    const levels = Object.keys(data[0]).filter(k => k !== 'Metric');
    const x0 = d3.scaleBand()
        .domain(metrics)
        .rangeRound([0, width])
        .paddingInner(0.1);
    const x1 = d3.scaleBand()
        .domain(levels)
        .rangeRound([0, x0.bandwidth()])
        .padding(0.05);
    const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d3.max(levels, level => d[level]))]).nice()
        .rangeRound([height, 0]);
    chartG.append("g")
        .selectAll("g")
        .data(data)
        .join("g")
            .attr("transform", d => `translate(${x0(d.Metric)},0)`)
        .selectAll("rect")
        .data(d => levels.map(key => ({key, value: d[key]})))
        .join("rect")
            .attr("x", d => x1(d.key))
            .attr("y", d => y(d.value))
            .attr("width", x1.bandwidth())
            .attr("height", d => height - y(d.value))
            .attr("class", d => d.key === 'Junior' ? 'bar-junior' : 'bar-senior')
            .on("mouseover", (event, d) => {
                tooltip.transition().duration(200).style("opacity", .9);
                tooltip.html(`<strong>${d.key}</strong><br/>Salary: ${d3.format("$,.0f")(d.value)}`)
                    .style("left", (event.pageX + 5) + "px")
                    .style("top", (event.pageY - 28) + "px");
            })
            .on("mouseout", d => {
                tooltip.transition().duration(500).style("opacity", 0);
            });
    chartG.append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x0))
        .append("text")
        .attr("x", width / 2)
        .attr("y", margin.bottom - 5)
        .attr("fill", "black")
        .attr("font-weight", "bold")
        .attr("text-anchor", "middle")
        .attr("class", "axis-label")
        .text("Salary Metric (Low, Median, High)");
    chartG.append("g")
        .attr("class", "y-axis")
        .call(d3.axisLeft(y).ticks(null, "s"))
        .append("text")
        .attr("x", -margin.left)
        .attr("y", -10)
        .attr("fill", "black")
        .attr("font-weight", "bold")
        .attr("text-anchor", "start")
        .attr("class", "axis-label")
        .text("Salary (SGD)");
};
// city-profile.html 自動載入
if (document.getElementById('salary-chart')) {
    window.addEventListener('DOMContentLoaded', function() {
        setTimeout(window.createSalaryBarChart, 100);
    });
} 