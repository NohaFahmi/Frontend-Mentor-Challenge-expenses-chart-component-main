console.log("HERE")
 const  creating_chart = (get_wrapper, type_of_chart, labels_of_chart, data_of_charts, bg_chart_bars, hoverBg_chart_bars) => {
    var ctx = document.getElementById(get_wrapper).getContext('2d');
    const data = {
        labels: labels_of_chart,
        datasets: [{
           data: data_of_charts,
           backgroundColor: bg_chart_bars,
           hoverBackgroundColor: hoverBg_chart_bars,
           borderRadius: 10,
        }]
     }
    const myChart = new Chart(ctx, {
       type: type_of_chart,
       data: data,
       options: {
        responsive: true,
        scales: {
           xAxes: {
              grid: {
                 display: false,
                 drawBorder: false
              },
           },
           yAxes: {
              display: false
           }
        },
        
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                mode: 'index',
                callbacks: {
                    label: function(context) {
                        return `$${context.formattedValue}`
                    },
                    title: (context) => {
                        return ''
                    }
                }
            }
        }
       }
    });
    console.log(myChart)
 };
 
fetch('./data.json')
  .then(response => response.json())
  .then(result => {
      let chartValues = result.map((item) => item.amount);
      let chartLabels = result.map((item) => item.day);
    let setChartBarsBg = () => {
        return chartValues.map((item, index) => {
            if(index === chartValues.indexOf(Math.max(...chartValues))) {
                return 'hsl(186, 34%, 60%)'
            } else {
                return 'hsl(10, 79%, 65%)'
            }
        });
    }
    let setChartBarHoverBg = () => {
        return chartValues.map((item, index) => {
            if(index === chartValues.indexOf(Math.max(...chartValues))) {
                return 'hsl(186, 34%, 70%)'
            } else {
                return 'hsl(10, 79%, 75%)'
            }
        });
    }
    creating_chart(
        'myChart',
         'bar',
         chartLabels,
         chartValues,
         setChartBarsBg(),
         setChartBarHoverBg()

     );
    //  const data = {
    //     labels: chartLabels,
    //     datasets: [{
    //       label: 'My First dataset',
    //       backgroundColor: setChartBarsBg(),
    //       hoverBackgroundColor: setChartBarHoverBg(),
    //       borderRadius: 10,
    //       data: chartValues,
    //     }]
    //   };
    //   const config = {
    //     type: 'bar',
    //     data: data,
    //     options: {
    //         scales: {
    //             xAxes: [{
    //                gridLines: {
    //                   display: false
    //                }
    //             }],
    //             yAxes: [{
    //                gridLines: {
    //                   display: false
    //                }
    //             }]
    //          }
    //     },
        
    //   };
    //   const myChart = new Chart(
    //     document.getElementById('myChart'),
    //     config
    //   );

  });

  