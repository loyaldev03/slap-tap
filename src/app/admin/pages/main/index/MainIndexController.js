(function() {

    angular
        .module('adminapp.pages.main')
        .controller('AdminMainIndexController', AdminMainIndexController);

    AdminMainIndexController.$inject = ['$scope', '$timeout', 'pageService', 'adminStatisticService'];

    function AdminMainIndexController($scope, $timeout, pageService, adminStatisticService, allUsers) {
        pageService
            .setShowBC(true)
            .addCrumb({name: 'Dashboard', path: 'home'})
            .setPageTitle('Dashboard');

        $scope.data = {};
        $timeout(activate);
        function activate() {
            loadStatistic();
        };

        function loadStatistic() {
            adminStatisticService.getStatisticalData().then(function(revenues) {
                $scope.data = revenues.data[0]
                var trendingLineChart;
                var data = {
                    labels : ["Apple","Samsung","SONY","Motorola","Nokia","Microsoft","Xiaomi"],
                    datasets : [
                        {
                            label: "First dataset",
                            fillColor : "rgba(128, 222, 234, 0.6)",
                            strokeColor : "#ffffff",
                            pointColor : "#00bcd4",
                            pointStrokeColor : "#ffffff",
                            pointHighlightFill : "#ffffff",
                            pointHighlightStroke : "#ffffff",
                            data: [100, 50, 20, 40, 80, 50, 80]
                        },
                        {
                            label: "Second dataset",
                            fillColor : "rgba(128, 222, 234, 0.3)",
                            strokeColor : "#80deea",
                            pointColor : "#00bcd4",
                            pointStrokeColor : "#80deea",
                            pointHighlightFill : "#80deea",
                            pointHighlightStroke : "#80deea",
                            data: [60, 20, 90, 80, 50, 85, 40]
                        }
                    ]
                };


                var doughnutData = [
                    {
                        label: 'selfSLAP',
                        color:"#249587",
                        highlight: "#FF5A5E",
                        value: $scope.data.slapsters_by_program['selfSLAP']
                    },
                    {
                        label: 'groupSLAP',
                        color: "#3f51b5",
                        highlight: "#5AD3D1",
                        value: $scope.data.slapsters_by_program['groupSLAP']
                    },
                    {
                        label: 'monthlySLAP',
                        color: "#e91e62",
                        highlight: "#FFC870",
                        value: $scope.data.slapsters_by_program['monthlySLAP']
                    },
                    {
                        label: 'seriousSLAP',
                        color: "#db4437",
                        highlight: "#FFC870",
                        value: $scope.data.slapsters_by_program['seriousSLAP']
                    },
                    {
                        label: 'masterSLAP',
                        color: "#fa9800",
                        highlight: "#FFC870",
                        value: $scope.data.slapsters_by_program['masterSLAP']
                    },
                    {
                        label: 'teamSLAP',
                        color: "#673ab7",
                        highlight: "#FFC870",
                        value: $scope.data.slapsters_by_program['teamSLAP']
                    },
                    {
                        label: 'accessSLAP',
                        color: "#db4437",
                        highlight: "#FFC870",
                        value: $scope.data.slapsters_by_program['accessSLAP']
                    }                   
                ];

                /*
                Trending Bar Chart
                */

                var labels = ["JAN", "FEB", "MAR", "APR", "MAY", "JUNE", "JULY", "AUG", "SEP", "OCT", "NOV", "DEC"]
                var current_month = (new Date()).getMonth();
                var ordered_labels = [];
                for (var i = 0; i < 12; i++) {
                    ordered_labels.push(labels[(current_month + i + 1)%12]);
                }
                console.log("----------------order labels----------------", ordered_labels);
                var dataBarChart = {
                    labels : ordered_labels,
                    datasets: [
                        {
                            label: "Bar dataset",
                            fillColor: "#46BFBD",
                            strokeColor: "#46BFBD",
                            highlightFill: "rgba(70, 191, 189, 0.4)",
                            highlightStroke: "rgba(70, 191, 189, 0.9)",
                            data: $scope.data.total_number_of_slapsters
                        }
                    ]
                };

                /*
                Trending Bar Chart
                */
                var radarChartData = {
                    labels: ["Chrome", "Mozilla", "Safari", "IE10", "iPhone"],
                    datasets: [
                        {
                            label: "First dataset",
                            fillColor: "rgba(255,255,255,0.2)",
                            strokeColor: "#fff",
                            pointColor: "#00796b",
                            pointStrokeColor: "#fff",
                            pointHighlightFill: "#fff",
                            pointHighlightStroke: "#fff",
                            data: [5,6,7,8,6]
                        }
                    ],
                };
                    
                /*
                Pie chart 
                */
                var pieData = [
                        {
                            value: 300,
                            color:"#F7464A",
                            highlight: "#FF5A5E",
                            label: "America"
                        },
                        {
                            value: 50,
                            color: "#46BFBD",
                            highlight: "#5AD3D1",
                            label: "Canada"
                        },
                        {
                            value: 100,
                            color: "#FDB45C",
                            highlight: "#FFC870",
                            label: "UK"
                        },
                        {
                            value: 40,
                            color: "#949FB1",
                            highlight: "#A8B3C5",
                            label: "Europe"
                        },
                        {
                            value: 120,
                            color: "#4D5360",
                            highlight: "#616774",
                            label: "Australia"
                        }

                    ];
                /*
                Line Chart
                */
                var lineChartData = {
                    labels : ["USA","UK","UAE","AUS","IN","SA"],
                    datasets : [
                        {
                            label: "My dataset",
                            fillColor : "rgba(255,255,255,0)",
                            strokeColor : "#fff",
                            pointColor : "#00796b ",
                            pointStrokeColor : "#fff",
                            pointHighlightFill : "#fff",
                            pointHighlightStroke : "rgba(220,220,220,1)",
                            data: [65, 45, 50, 30, 63, 45]
                        }
                    ]

                }

                var polarData = [
                    {
                        value: 4800,
                        color:"#f44336",
                        highlight: "#FF5A5E",
                        label: "USA"
                    },
                    {
                        value: 6000,
                        color: "#9c27b0",
                        highlight: "#ce93d8",
                        label: "UK"
                    },
                    {
                        value: 1800,
                        color: "#3f51b5",
                        highlight: "#7986cb",
                        label: "Canada"
                    },
                    {
                        value: 4000,
                        color: "#2196f3 ",
                        highlight: "#90caf9",
                        label: "Austrelia"
                    },
                    {
                        value: 5500,
                        color: "#ff9800",
                        highlight: "#ffb74d",
                        label: "India"
                    },
                    {
                        value: 2100,
                        color: "#009688",
                        highlight: "#80cbc4",
                        label: "Brazil"
                    },
                    {
                        value: 5000,
                        color: "#00acc1",
                        highlight: "#4dd0e1",
                        label: "China"
                    },
                    {
                        value: 3500,
                        color: "#4caf50",
                        highlight: "#81c784",
                        label: "Germany"
                    }
                ];  
                
                var doughnutChart = document.getElementById("doughnut-chart").getContext("2d");
                window.myDoughnut = new Chart(doughnutChart).Doughnut(doughnutData, {
                    segmentStrokeColor : "#fff",
                    tooltipTitleFontFamily: "'Roboto','Helvetica Neue', 'Helvetica', 'Arial', sans-serif",// String - Tooltip title font declaration for the scale label        
                    percentageInnerCutout : 50,
                    animationSteps : 15,
                    segmentStrokeWidth : 4,
                    animateScale: true,
                    responsive : true
                });

                var trendingBarChart = document.getElementById("trending-bar-chart").getContext("2d");
                window.trendingBarChart = new Chart(trendingBarChart).Bar(dataBarChart,{
                    scaleShowGridLines : false,///Boolean - Whether grid lines are shown across the chart
                    showScale: true,
                    animationSteps:15,
                    tooltipTitleFontFamily: "'Roboto','Helvetica Neue', 'Helvetica', 'Arial', sans-serif",// String - Tooltip title font declaration for the scale label        
                    responsive : true
                });

                // window.trendingRadarChart = new Chart(document.getElementById("trending-radar-chart").getContext("2d")).Radar(radarChartData, {
                    
                //     angleLineColor : "rgba(255,255,255,0.5)",//String - Colour of the angle line         
                //     pointLabelFontFamily : "'Roboto','Helvetica Neue', 'Helvetica', 'Arial', sans-serif",// String - Tooltip title font declaration for the scale label  
                //     pointLabelFontColor : "#fff",//String - Point label font colour
                //     pointDotRadius : 4,
                //     animationSteps:15,
                //     pointDotStrokeWidth : 2,
                //     pointLabelFontSize : 12,
                //  responsive: true
                // });

                // var pieChartArea = document.getElementById("pie-chart-area").getContext("2d");
                // window.pieChartArea = new Chart(pieChartArea).Pie(pieData,{
                //  responsive: true        
                // });

                // var lineChart = document.getElementById("line-chart").getContext("2d");
                // window.lineChart = new Chart(lineChart).Line(lineChartData, {
                //  scaleShowGridLines : false,
                //  bezierCurve : false,
                //  scaleFontSize: 12,
                //  scaleFontStyle: "normal",
                //  scaleFontColor: "#fff",
                //  responsive: true,           
                // });

                
                if (typeof getContext != "undefined") {
                    var polarChartCountry = document.getElementById("polar-chart-country").getContext("2d");
                    window.polarChartCountry = new Chart(polarChartCountry).PolarArea(polarData, {
                        segmentStrokeWidth : 1,         
                        responsive:true
                    });
                }






                // Bar chart ( New Clients)

                $("#clients-bar").sparkline($scope.data.new_slapsters, {
                    type: 'bar',
                    height: '25',
                    barWidth: 7,
                    barSpacing: 4,
                    barColor: '#C7FCC9',
                    negBarColor: '#81d4fa',
                    zeroColor: '#81d4fa',
                });

                //clientsBar.setOptions({chartArea: {width: 100}});


                // Line chart ( New Invoice)
                $("#invoice-line").sparkline($scope.data.renewed_slapsters, {
                    type: 'line',
                    width: '100%',
                    height: '25',
                    lineWidth: 2,
                    lineColor: '#E1D0FF',
                    fillColor: 'rgba(233, 30, 99, 0.4)',
                    highlightSpotColor: '#E1D0FF',
                    highlightLineColor: '#E1D0FF',
                    minSpotColor: '#f44336',
                    maxSpotColor: '#4caf50',
                    spotColor: '#E1D0FF',
                    spotRadius: 4,
                    
                // //tooltipFormat: $.spformat('{{value}}', 'tooltip-class')
                });


                // Tristate chart (Today Profit)
                $("#profit-tristate").sparkline([2, 3, 0, 4, -5, -6, 7, -2, 3, 0, 2, 3, -1, 0, 2, 3, 3, -1, 0, 2, 3], {
                    type: 'tristate',
                    width: '100%',
                    height: '25',
                    posBarColor: '#B9DBEC',
                    negBarColor: '#C7EBFC',
                    barWidth: 7,
                    barSpacing: 4,
                    zeroAxis: false,
                    //tooltipFormat: $.spformat('{{value}}', 'tooltip-class')
                });

                // Bar + line composite charts (Total Sales)
                $('#sales-compositebar').sparkline($scope.data.total_monthly_recurring_revenue, {
                    type: 'bar',
                    barColor: '#F6CAFD',
                    height: '25',
                    width: '100%',
                    barWidth: '15',
                    barSpacing: 2,
                    tooltipFormat: $.spformat('{{value}}', 'tooltip-class')
                });
                $('#sales-compositebar').sparkline($scope.data.total_monthly_recurring_revenue, {
                    composite: true,
                    type: 'line',
                    width: '100%',
                    lineWidth: 2,
                    lineColor: '#fff3e0',
                    fillColor: 'rgba(153,114,181,0.3)',
                    highlightSpotColor: '#fff3e0',
                    highlightLineColor: '#fff3e0',
                    minSpotColor: '#f44336',
                    maxSpotColor: '#4caf50',
                    spotColor: '#fff3e0',
                    spotRadius: 4,
                    tooltipFormat: $.spformat('{{value}}', 'tooltip-class')
                });


                // Project Line chart ( Project Box )
                $("#project-line-1").sparkline([5, 6, 7, 9, 9, 5, 3, 2, 2, 4, 6, 7, 5, 6, 7, 9, 9, 5, 3, 2, 2, 4, 6, 7], {
                    type: 'line',
                    width: '100%',
                    height: '30',
                    lineWidth: 2,
                    lineColor: '#00bcd4',
                    fillColor: 'rgba(0, 188, 212, 0.5)',
                });

                $("#project-line-2").sparkline([6, 7, 5, 6, 7, 9, 9, 5, 3, 2, 2, 4, 6, 7, 5, 6, 7, 9, 9, 5, 3, 2, 2, 4], {
                    type: 'line',
                    width: '100%',
                    height: '30',
                    lineWidth: 2,
                    lineColor: '#00bcd4',
                    fillColor: 'rgba(0, 188, 212, 0.5)',
                    //tooltipFormat: $.spformat('{{value}}', 'tooltip-class')
                });

                $("#project-line-3").sparkline([2, 4, 6, 7, 5, 6, 7, 9, 5, 6, 7, 9, 9, 5, 3, 2, 9, 5, 3, 2, 2, 4, 6, 7], {
                    type: 'line',
                    width: '100%',
                    height: '30',
                    lineWidth: 2,
                    lineColor: '#00bcd4',
                    fillColor: 'rgba(0, 188, 212, 0.5)',
                    //tooltipFormat: $.spformat('{{value}}', 'tooltip-class')
                });

                $("#project-line-4").sparkline([9, 5, 3, 2, 2, 4, 6, 7, 5, 6, 7, 9, 5, 6, 7, 9, 9, 5, 3, 2, 2, 4, 6, 7], {
                    type: 'line',
                    width: '100%',
                    height: '30',
                    lineWidth: 2,
                    lineColor: '#00bcd4',
                    fillColor: 'rgba(0, 188, 212, 0.5)',
                    //tooltipFormat: $.spformat('{{value}}', 'tooltip-class')
                });




                // Sales chart (Sider Bar Chat)
                $("#sales-line-1").sparkline([5, 6, 7, 9, 9, 5, 3, 2, 2, 4, 6], {
                    type: 'line',
                    height: '30',
                    lineWidth: 2,
                    lineColor: '#00bcd4',
                    fillColor: 'rgba(0, 188, 212, 0.5)',
                    //tooltipFormat: $.spformat('{{value}}', 'tooltip-class')
                });

                $("#sales-line-2").sparkline([6, 7, 5, 6, 7, 9, 9, 5, 3, 2, 2], {
                    type: 'line',
                    height: '30',
                    lineWidth: 2,
                    lineColor: '#00bcd4',
                    fillColor: 'rgba(0, 188, 212, 0.5)',
                    //tooltipFormat: $.spformat('{{value}}', 'tooltip-class')
                });

                $("#sales-bar-1").sparkline([2, 4, 6, 7, 5, 6, 7, 9, 5, 6, 7], {
                    type: 'bar',
                    height: '25',
                    barWidth: 2,
                    barSpacing: 1,
                    barColor: '#4CAF50',
                    //tooltipFormat: $.spformat('{{value}}', 'tooltip-class')
                });

                $("#sales-bar-2").sparkline([9, 5, 3, 2, 2, 4, 6, 7, 5, 6, 7], {
                    type: 'bar',
                    height: '25',
                    barWidth: 2,
                    barSpacing: 1,
                    barColor: '#FF4081',
                    //tooltipFormat: $.spformat('{{value}}', 'tooltip-class')
                });


                /*
                Sparkline sample charts
                */


                $("#bar-chart-sample").sparkline([70, 80, 65, 78, 58, 80, 78, 80, 70, 50, 75, 65, 80, 70], {
                    type: 'bar',
                    height: '100',
                    width: '50%',
                    barWidth: 20,
                    barSpacing: 10,
                    barColor: '#00BCD4',
                    //tooltipFormat: $.spformat('{{value}}', 'tooltip-class')
                });


                $("#line-chart-sample").sparkline([5, 6, 7, 9, 9, 5, 3, 2, 2, 4, 6, 7, 5, 6, 7, 9, 9], {
                    type: 'line',
                    width: '50%',
                    height: '100',
                    lineWidth: 2,
                    lineColor: '#ffcc80',
                    fillColor: 'rgba(255, 152, 0, 0.5)',
                    highlightSpotColor: '#ffcc80',
                    highlightLineColor: '#ffcc80',
                    minSpotColor: '#f44336',
                    maxSpotColor: '#4caf50',
                    spotColor: '#ffcc80',
                    spotRadius: 4,
                    //tooltipFormat: $.spformat('{{value}}', 'tooltip-class')
                });


                $("#pie-chart-sample").sparkline([50,60,80,110], {
                    type: 'pie',
                    width: '150',
                    height: '150',
                    //tooltipFormat: $.spformat('{{value}}', 'tooltip-class'),
                    sliceColors: ['#f4511e','#ffea00','#c6ff00','#00e676','#1de9b6','#00e5ff','#651fff','#f50057']
                });                
            })
        }

        $scope.calcPercentForMonthlyRecurringRevenue = function() {
            if ($scope.data.total_monthly_recurring_revenue && $scope.data.total_monthly_recurring_revenue[10] != 0) {
                var percent = $scope.data.total_monthly_recurring_revenue[11] / $scope.data.total_monthly_recurring_revenue[10] * 100;
                return (percent - 100); 
            }            
            return 0;                
        }

        $scope.calcPercentForNewSlapsters = function() {
            if ($scope.data.new_slapsters && $scope.data.new_slapsters[10] != 0) {
                var percent = $scope.data.new_slapsters[11] / $scope.data.new_slapsters[10] * 100;
                return (percent - 100); 
            }            
            return 0;                
        }

        $scope.calcPercentForRenewedSlapsters = function() {
            if ($scope.data.renewed_slapsters && $scope.data.renewed_slapsters[10] != 0) {
                var percent = $scope.data.renewed_slapsters[11] / $scope.data.renewed_slapsters[10] * 100;
                return (percent - 100); 
            }            
            return 0;                
        }        

    }






}());