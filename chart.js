export function chartRender(data, cName){
    let stockChart = new CanvasJS.StockChart("chart", {
        backgroundColor: "transparent",
        rangeSelector: {
            enabled: false, //change
        },
        navigator: {
            enabled: false, //Change
        },
        charts: [{
            axisX: {
                lineThickness: 0,
                tickLength: 0,
                margin: 0,
                labelFormatter: function (e) {
                    return "";
                },
                crosshair: {
                    enabled: true,
                    snapToDataPoint: true,
                    lineDashType: "solid",
                    color: "#FFFFF6",
                    valueFormatString: "D/M/YYYY",
                    labelBackgroundColor: 'transparent',
                    labelFontColor: 'gray',
                    // labelFontSize: '25px'
                }
            },
            toolTip: {
                backgroundColor: "#010145",
                shared: true,
                contentFormatter: function (e) {
                    let content = " ";
                    for (let i = 0; i < e.entries.length; i++) {
                        content += e.entries[i].dataSeries.name + ": " + "<strong>" + e.entries[i].dataPoint.y.toFixed(2) + "</strong>";
                    }
                    return content;
                },
                fontColor: 'white',
                borderThickness: 0
            },
            axisY: {
                lineThickness: 0,
                margin: 0,
                tickLength: 0,
                labelFormatter: function (e) {
                    return "";
                },
                gridThickness: 0,
            },
            data: [{
                type: "line",
                lineColor: '#30D81C',
                name:cName,
                markerColor: '#30D81C',
                xValueFormatString: " ",
                yValueFormatString: " ",
                dataPoints: data
            }],
        }],
    });

    stockChart.render();
 }
