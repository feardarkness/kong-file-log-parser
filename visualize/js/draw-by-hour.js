'use strict';

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const colors = ['#3366CC', '#DC3912', '#FF9900', '#109618', '#990099', '#3B3EAC',
    '#0099C6', '#DD4477', '#66AA00', '#B82E2E', '#316395', '#994499', '#22AA99',
    '#AAAA11', '#6633CC', '#E67300', '#8B0707', '#329262', '#5574A6', '#3B3EAC',
    '#4C0000', '#8C4646', '#E55039', '#806460', '#FFD0BF', '#732E00', '#F2853D'];
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
            <li>Click hour name to make it dissapear from the chart</li>
            <li>Enjoy!!!</li>
        </ol>
        `,
    }).show();
}

function updateChart (year) {
    const months = calculateMonths(year);
    const datasets = getDatasets(year, months);
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
    let hours = [];
    months.forEach((month) => {
        hours = _.uniq(hours.concat(Object.keys(data[selectedYear][month])));
    });
    const datasets = [];
    hours.forEach((hour, index) => {
        datasets.push({
            label: hour,
            data: months.map((month) => {
                let suma = 0;
                if (data[selectedYear][month][hour] !== undefined) {
                    Object.keys(data[selectedYear][month][hour]).forEach((consumer) => {
                        suma += data[selectedYear][month][hour][consumer];
                    });
                }
                return suma;
            }),
            borderWidth: 1,
            backgroundColor: colors[index],
        });
    });

    return datasets;
}
