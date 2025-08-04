$(document).ready(function(){
  $(".ct_menu_bar").click(function(){
    $("main").addClass("ct_active");
  })
  $(".ct_close_sidebar").click(function(){
    $(main).removeClass("ct_active");
  })
})
 $(window).on("load", function () {
    $(".ct_loader_main").fadeOut();
  });

 var options = {
      chart: {
        type: 'bar',
        height: 350
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          endingShape: 'rounded'
        },
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
      },
      series: [
        {
          name: 'Dataset 1',
          data: [30, 40, 25, 45, 35, 20, 30, 0] // purple bars
        },
        {
          name: 'Dataset 2',
          data: [0, 50, 0, 50, 0, 60, 0, 70] // green bars
        }
      ],
      colors: ['#6A5ACD', '#32CD32'], // purple and green
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug'],
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val;
          }
        }
      }
    };

    var chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();