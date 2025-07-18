/**
 * ========================================
 * FILE: global-tech-env.js
 * PURPOSE: 全球創新樞紐分析頁面專用 JavaScript
 * FEATURES: 數據表格、圖表初始化、數據處理
 * AUTHOR: Voyage Compass Team
 * LAST UPDATED: 2024-12-19
 * DEPENDENCIES: Chart.js
 * ========================================
 */

// 城市數據
const cityData = [
    { city: "舊金山", gser: 1, blink: 1, vc: 607, unicorns: 268, startups: 15030, vc_adj: 607 },
    { city: "紐約市", gser: 2, blink: 2, vc: 1795, unicorns: 150, startups: 8750, vc_adj: 400 },
    { city: "倫敦", gser: 3, blink: 3, vc: 108, unicorns: 103, startups: 7567, vc_adj: 108 },
    { city: "首爾", gser: 8, blink: 20, vc: 16.5, unicorns: 32, startups: 9567, vc_adj: 16.5 },
    { city: "新加坡", gser: 9, blink: 12, vc: 86, unicorns: 34, startups: 4600, vc_adj: 86 },
    { city: "東京", gser: 11, blink: 13, vc: 130, unicorns: 12, startups: 3000, vc_adj: 130 },
    { city: "雪梨", gser: 25, blink: 21, vc: 50, unicorns: 7, startups: 2500, vc_adj: 50 },
    { city: "香港", gser: 27, blink: 37, vc: 7, unicorns: 12, startups: 856, vc_adj: 7 },
    { city: "溫哥華", gser: 36, blink: 39, vc: 22, unicorns: 1, startups: 1500, vc_adj: 22 },
    { city: "臺北", gser: 100, blink: 54, vc: 63, unicorns: 2, startups: 4694, vc_adj: 63 },
    { city: "曼谷", gser: 100, blink: 81, vc: 330, unicorns: 5, startups: 1200, vc_adj: 25 },
];

// 顏色配置
const colors = {
    blue: '#4A90E2',
    teal: '#50E3C2',
    orange: '#F5A623',
    red: '#D0021B',
    purple: '#BD10E0'
};

const colorPalette = [colors.blue, colors.teal, colors.orange, colors.red, colors.purple];

// 通用插件配置
const universalPlugins = {
    tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleFont: { size: 14, weight: 'bold', family: 'Noto Sans TC' },
        bodyFont: { size: 12, family: 'Noto Sans TC' },
        padding: 10,
        cornerRadius: 4,
        callbacks: { 
            title: (tooltipItems) => {
                const item = tooltipItems[0];
                let label = item.chart.data.labels[item.dataIndex];
                return Array.isArray(label) ? label.join(' ') : label;
            }
        }
    }
};

/**
 * 初始化數據表格
 * @function initializeDataTable
 */
function initializeDataTable() {
    const tableBody = document.getElementById('data-table-body');
    if (!tableBody) return;
    
    cityData.forEach(c => {
        let row = tableBody.insertRow();
        row.innerHTML = `
            <td class="py-3 px-4 font-medium text-gray-900 whitespace-nowrap">${c.city}</td>
            <td class="py-3 px-4">${c.gser}</td>
            <td class="py-3 px-4">${c.blink}</td>
            <td class="py-3 px-4">${c.vc.toLocaleString()}</td>
            <td class="py-3 px-4">${c.unicorns}</td>
            <td class="py-3 px-4">${c.startups.toLocaleString()}</td>
        `;
    });
}

/**
 * 初始化頂級梯隊氣泡圖
 * @function initializeTopTierBubbleChart
 */
function initializeTopTierBubbleChart() {
    const ctx = document.getElementById('topTierBubbleChart');
    if (!ctx) return;
    
    const topTierCities = cityData.filter(c => ['舊金山', '紐約市', '倫敦'].includes(c.city));
    
    new Chart(ctx.getContext('2d'), {
        type: 'bubble',
        data: {
            datasets: topTierCities.map((c, i) => ({
                label: c.city,
                data: [{
                    x: c.vc_adj,
                    y: c.unicorns,
                    r: c.startups / 500 // Scale radius for visibility
                }],
                backgroundColor: colorPalette[i] + 'BF', // Add alpha
                borderColor: colorPalette[i],
                borderWidth: 2,
            }))
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                ...universalPlugins,
                legend: { display: true, position: 'bottom' },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const d = context.dataset.data[0];
                            const label = context.dataset.label || '';
                            const startups = d.r * 500;
                            return `${label}: (VC: ${d.x}億, 獨角獸: ${d.y}, 新創: ${startups})`;
                        }
                    }
                }
            },
            scales: {
                x: { title: { display: true, text: 'VC總額 (億美元)' } },
                y: { title: { display: true, text: '獨角獸數量' } }
            }
        }
    });
}

/**
 * 初始化均衡領導者長條圖
 * @function initializeBalancedLeadersBarChart
 */
function initializeBalancedLeadersBarChart() {
    const ctx = document.getElementById('balancedLeadersBarChart');
    if (!ctx) return;
    
    const balancedLeadersData = {
        labels: ['全球綜合排名', '資本規模', '獨角獸產出', '新創公司規模'],
        datasets: [
            {
                label: '舊金山',
                data: [10, 10, 10, 10], // Normalized scores out of 10
                backgroundColor: colors.blue,
            },
            {
                label: '倫敦',
                data: [9, 7, 8, 8], // Normalized scores out of 10
                backgroundColor: colors.teal,
            }
        ]
    };
    
    new Chart(ctx.getContext('2d'), {
        type: 'bar',
        data: balancedLeadersData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { ...universalPlugins, legend: { display: true, position: 'top' } },
            scales: {
                y: {
                    suggestedMax: 10,
                    title: { display: true, text: '標準化分數 (滿分10分)' }
                }
            }
        }
    });
}

/**
 * 初始化企業潛力圓餅圖
 * @function initializeCorporatePotentialChart
 */
function initializeCorporatePotentialChart() {
    const ctx = document.getElementById('corporatePotentialChart');
    if (!ctx) return;
    
    const seoul = cityData.find(c => c.city === '首爾');
    const tokyo = cityData.find(c => c.city === '東京');
    
    new Chart(ctx.getContext('2d'), {
        type: 'doughnut',
        data: {
            labels: ['首爾 - 新創數量', '東京 - 新創數量'],
            datasets: [{
                label: '新創數量',
                data: [seoul.startups, tokyo.startups],
                backgroundColor: [colors.blue, colors.teal],
                borderColor: '#FFFFFF',
                borderWidth: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { ...universalPlugins, legend: { display: true, position: 'bottom' } },
            cutout: '60%'
        }
    });
}

/**
 * 初始化資本效率圖表
 * @function initializeEfficiencyChart
 */
function initializeEfficiencyChart() {
    const ctx = document.getElementById('efficiencyChart');
    if (!ctx) return;
    
    const efficiencyData = cityData.map(c => ({
        city: c.city,
        value: c.unicorns > 0 ? (c.vc_adj / c.unicorns) : null
    })).filter(c => c.value !== null).sort((a, b) => a.value - b.value);
    
    new Chart(ctx.getContext('2d'), {
        type: 'bar',
        data: {
            labels: efficiencyData.map(c => c.city),
            datasets: [{
                label: '億美元 / 獨角獸',
                data: efficiencyData.map(c => c.value.toFixed(2)),
                backgroundColor: colorPalette[0]
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: { ...universalPlugins, legend: { display: false } },
            scales: { x: { title: { display: true, text: '億美元 (越低越好)' } } }
        }
    });
}

/**
 * 初始化漏斗散點圖
 * @function initializeFunnelScatterChart
 */
function initializeFunnelScatterChart() {
    const ctx = document.getElementById('funnelScatterChart');
    if (!ctx) return;
    
    const funnelData = cityData.filter(c => c.unicorns > 0);
    
    new Chart(ctx.getContext('2d'), {
        type: 'scatter',
        data: {
            datasets: [{
                label: '創新生態系統',
                data: funnelData.map(c => ({ x: c.startups, y: c.unicorns, label: c.city })),
                backgroundColor: colors.blue + 'BF',
                borderColor: colors.blue,
                pointRadius: 6,
                pointHoverRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                ...universalPlugins,
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const d = context.raw;
                            return `${d.label}: (新創: ${d.x}, 獨角獸: ${d.y})`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    type: 'logarithmic',
                    title: { display: true, text: '新創公司總數 (對數刻度)' }
                },
                y: {
                    type: 'logarithmic',
                    title: { display: true, text: '獨角獸數量 (對數刻度)' }
                }
            }
        }
    });
}

/**
 * 初始化所有圖表
 * @function initializeAllCharts
 */
function initializeAllCharts() {
    initializeDataTable();
    initializeTopTierBubbleChart();
    initializeBalancedLeadersBarChart();
    initializeCorporatePotentialChart();
    initializeEfficiencyChart();
    initializeFunnelScatterChart();
}

// 頁面載入完成後初始化
document.addEventListener('DOMContentLoaded', function() {
    console.log('全球創新樞紐分析頁面初始化開始');
    initializeAllCharts();
    console.log('全球創新樞紐分析頁面初始化完成');
}); 