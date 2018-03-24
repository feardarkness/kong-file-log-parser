'use strict';

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const colors = ['#3366CC', '#DC3912', '#FF9900', '#109618', '#990099', '#3B3EAC',
    '#0099C6', '#DD4477', '#66AA00', '#B82E2E', '#316395', '#994499', '#22AA99',
    '#AAAA11', '#6633CC', '#E67300', '#8B0707', '#329262', '#5574A6', '#3B3EAC'];
const years = Object.keys(data);
const yearSelect = document.getElementById('year')

years.forEach((year) => {
    const opt = document.createElement('option');
    opt.value = year;
    opt.innerHTML = year;
    yearSelect.appendChild(opt);
});

const selectedYear = 2018;
yearSelect.value = selectedYear;
const months = calculateMonths(selectedYear);
const datasets = getDatasets(selectedYear, months);

const ctx = document.getElementById("quantityByDate").getContext('2d');
const myChart = new Chart(ctx, {
    type: 'horizontalBar',
    data: {
        labels: months.map(month => monthNames[month]),
        datasets,
    },
    options: {
        maintainAspectRatio: false,
        scales: {
            yAxes: [{
                stacked: true,
                ticks: {
                    beginAtZero:true
                }
            }],
            xAxes: [{
                stacked: true,
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});

function showHelpDialog() {
    picoModal({
        content: `
        <ol>
            <li>Generate log data</li>
            <li>Choose the year</li>
            <li>Click consumer name to make it dissapear from the chart</li>
            <li>Enjoy!!!</li>
        </ol>
        `,
    }).show();
}

function updateChart (year) {
    const months = calculateMonths(year);
    const datasets = getDatasets(year, months);
    // myChart.data.labels.forEach(() => myChart.data.labels.pop());
    // months.forEach(month => myChart.data.labels.push(month));
    myChart.data = {
        labels: months.map(month => monthNames[month]),
        datasets,
    };
    myChart.update();
};

function calculateMonths(selectedYear) {
    return Object.keys(data[selectedYear]);
}

function getDatasets (selectedYear, months) {
    let consumers = [];
    months.forEach((month) => {
        consumers = _.uniq(consumers.concat(Object.keys(data[selectedYear][month])));
    });
    const datasets = [];
    consumers.forEach((consumer, index) => {
        datasets.push({
            label: consumer,
            data: months.map((month) => {
                return data[selectedYear][month][consumer] || 0;
            }),
            borderWidth: 1,
            backgroundColor: colors[index],
        });
    });

    return datasets;
}
