const ctx = document.getElementById("quantityByDate").getContext('2d');
const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ["1", "1", "2", "3", "4", "5"],
        datasets: [{
            label: 'Usuario uno',
            data: [11, 12, 13, 15, 12, 13],
            backgroundColor: [
                'rgba(55, 99, 132, 0.2)',
                'rgba(55, 99, 132, 0.2)',
                'rgba(55, 99, 132, 0.2)',
                'rgba(55, 99, 132, 0.2)',
                'rgba(55, 99, 132, 0.2)',
                'rgba(55, 99, 132, 0.2)'
            ],
            borderColor: [
                'rgba(155,99,132,1)',
                'rgba(155,99,132,1)',
                'rgba(155,99,132,1)',
                'rgba(155,99,132,1)',
                'rgba(155,99,132,1)',
                'rgba(155,99,132,1)'
            ],
            borderWidth: 1
        }, {
            label: 'Usuario2',
            data: [1, 2, 3, 5, 2, 3],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1
        }]
    },
    options: {
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