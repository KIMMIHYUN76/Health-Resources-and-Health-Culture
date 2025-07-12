const FONT_COLOR = '#3F3C3A';
const BORDER_COLOR = '#EAE6E1';
const PALETTE = {
    coral: '#E3A0A0',
    sand: '#D4A98A',
    sage: '#A5B38B',
    slate: '#8E9B97',
    stone: '#BDB1A5'
};

function formatLabel(str, maxLen = 16) {
    if (typeof str !== 'string' || str.length <= maxLen) {
        return str;
    }
    const words = str.split(' ');
    const lines = [];
    let currentLine = '';
    for (const word of words) {
        if ((currentLine + ' ' + word).trim().length > maxLen && currentLine.length > 0) {
            lines.push(currentLine.trim());
            currentLine = word;
        } else {
            currentLine = (currentLine + ' ' + word).trim();
        }
    }
    if (currentLine) {
        lines.push(currentLine.trim());
    }
    return lines;
}

const defaultTooltipOptions = {
    plugins: {
        tooltip: {
            callbacks: {
                title: function(tooltipItems) {
                    const item = tooltipItems[0];
                    let label = item.chart.data.labels[item.dataIndex];
                    return Array.isArray(label) ? label.join(' ') : label;
                },
                bodyFont: {
                    family: 'Noto Sans KR'
                },
                titleFont: {
                    family: 'Noto Sans KR'
                }
            },
            backgroundColor: '#FFFFFF',
            titleColor: '#3F3C3A',
            bodyColor: '#3F3C3A',
            borderColor: '#EAE6E1',
            borderWidth: 1,
            padding: 10,
            boxPadding: 4
        }
    }
};

const donutChartData = {
    labels: ['감염병 대응', '질병 예방 및 관리', '식품의약품안전처', '질병관리청 R&D', '기타 보건복지'],
    datasets: [{
        label: '예산 분배 현황 (조 원)',
        data: [25, 20, 15, 10, 54.5],
        backgroundColor: [PALETTE.coral, PALETTE.sand, PALETTE.sage, PALETTE.slate, PALETTE.stone],
        borderColor: '#FFFFFF',
        borderWidth: 3,
        hoverOffset: 4
    }]
};

new Chart(document.getElementById('budgetDonutChart'), {
    type: 'doughnut',
    data: donutChartData,
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            ...defaultTooltipOptions.plugins,
            legend: {
                position: 'bottom',
                labels: {
                    color: FONT_COLOR,
                    font: { size: 12, family: 'Noto Sans KR' },
                    padding: 20
                }
            },
            title: { display: false }
        },
        cutout: '60%'
    }
});

const barChartData = {
    labels: ['감염병 대응: "신종 팬데믹 대비, 방역 체계 강화 시급"', '질병 예방 및 관리: "고령화 시대, 만성질환 관리 투자 확대 필요"', '식품의약품안전처: "국민 먹거리 안전, 첨단 분석 장비 도입"', '질병관리청 R&D: "미래 감염병 대비, 백신 개발 연구 지원"'].map(label => formatLabel(label, 25)),
    datasets: [{
        label: '추가 요구 예산 (억 원)',
        data: [8000, 9500, 5000, 7500],
        backgroundColor: [PALETTE.coral, PALETTE.sand, PALETTE.sage, PALETTE.slate],
        borderRadius: 4
    }]
};

new Chart(document.getElementById('budgetRequestBarChart'), {
    type: 'bar',
    data: barChartData,
    options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                grid: { color: BORDER_COLOR, drawOnChartArea: false },
                ticks: { color: FONT_COLOR, font: { family: 'Noto Sans KR' }, callback: function(value) { return (value / 10000).toFixed(1) + '조'; } }
            },
            y: {
                grid: { display: false },
                ticks: { color: FONT_COLOR, font: { size: 14, family: 'Noto Sans KR' } }
            }
        },
        plugins: {
            ...defaultTooltipOptions.plugins,
            legend: { display: false },
            title: { display: false }
        }
    }
});

const stackedBarChartData = {
    labels: ['감염병 대응', '질병 예방 및 관리', '식품의약품안전처', '질병관리청 R&D', '기타'],
    datasets: [
        { label: '최초 예산안', data: [25, 20, 15, 10, 54.5], backgroundColor: PALETTE.stone, barPercentage: 0.6, borderRadius: {topLeft: 6, topRight: 6}},
        { label: '최종 결정', data: [27, 25, 15.5, 13, 44], backgroundColor: PALETTE.coral, barPercentage: 0.6, borderRadius: {topLeft: 6, topRight: 6}}
    ]
};

new Chart(document.getElementById('finalBudgetStackedBarChart'), {
    type: 'bar',
    data: stackedBarChartData,
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: { stacked: false, grid: { display: false }, ticks: { color: FONT_COLOR, font: { family: 'Noto Sans KR' } } },
            y: { stacked: false, grid: { color: BORDER_COLOR }, ticks: { color: FONT_COLOR, font: { family: 'Noto Sans KR' }, callback: function(value) { return value + '조'; } } }
        },
        plugins: {
            ...defaultTooltipOptions.plugins,
            legend: {
                position: 'bottom',
                labels: { color: FONT_COLOR, font: { size: 12, family: 'Noto Sans KR' }, padding: 20 }
            },
            title: { display: false }
        }
    }
});