import { chartRender } from './chart.js';
import { listData, summaryData, chartData as chartDataObj } from './getData.js';

window.onload = function () {
// Initial value for rendering chart
    let cName = 'AAPL';
    let time = '5y';
// Displaying list data from json.
    function displayList(cName, bookValue, profit) {
        let ele;
       profit=profit.toFixed(2);
        if (profit <= 0) {
            ele = $(` <div class="list">
    <button class="list-btn">${cName}</button>
    <div class="price">$${bookValue}</div>
    <div class="percent" style="color:red">${profit}%</div>
</div>`)
        }
        else {
            ele = $(` <div class="list">
        <button class="list-btn">${cName}</button>
        <div class="price">$${bookValue}</div>
        <div class="percent">${profit}%</div>
    </div>`)
        }

        $('#stock-list').append(ele)
    }
    listData.then(data => {
        $.each(data.stocksStatsData, function (i, abc) {
            $.each(abc, function (key, val) {
                if (val.bookValue !== undefined) {
                    displayList(key, val.bookValue, val.profit);
                }
            });
        });
    })

// Function to return Date from given Timestamp
    function convertToDate(timestamp) {
        return new Date(new Date(timestamp * 1000).toLocaleDateString());
    }

// Chart data passing
  function chartData(cName, time) {
    let dataPoints = [];
        chartDataObj.then(data => {
            $.each(data.stocksData, function (i, dataEntry) {
                $.each(dataEntry, function (key, newObj) {
                    if (key === cName) {
                        $.each(newObj, function (Time, finalObj) {
                            if (Time === time) {
                                let timestampArray  = finalObj.timeStamp;
                                let valArray  = finalObj.value;
                                findMaxMin(valArray);
                                for (let i = 0; i < timestampArray.length - 1; i++) {
                                    dataPoints.push({ x: convertToDate(timestampArray[i]), y: Number(valArray[i]) });
                                }
                                // Rendering chart here
                                chartRender(dataPoints, cName);
                            }
                        });
                    }
                })
            })
        })
    }

// Initial call for render chart
    chartData(cName, time);

// Update on button click by time
    function timeBtn(id, time) {
        $(`#${id}`).click(() => {
            chartData(cName, time);
            // stockChart.render();
        })
    }

    timeBtn('btn-1-m', '1mo');
    timeBtn('btn-3-m', '3mo');
    timeBtn('btn-1-y', '1y');
    timeBtn('btn-5-y', '5y');

// Get summary from Json by provided symbol(name).
    function getSummary(name = 'AAPL') {
        summaryData.then(data => {
            function detail(name) {
                $.each(data.stocksProfileData, function (i, abc) {
                    $.each(abc, function (key, val) {
                        if (key === name)
                            $('#summary').text(val.summary);
                    });
                });
            }
            detail(name)
        })
    }

// Display details
    function detailDynamic(name, percent, profit) {
        $('#name').text(name);
        $('#percent').text(`${percent}`);
        $('#profit').text(`${profit}`);
        let per = parseFloat(percent);
        if (per <= 0) {
            $('#percent').addClass('red');
        }
        else {
            $('#percent').removeClass('red');
        }
    }

// Get summary initially.
    getSummary();

// List btn click event.
$(document).on("click", ".list-btn", function (event) {
    //Update details
        detailDynamic($(this).text(), $(this).siblings(":last").text(), $(this).siblings(":first").text())

    // Update summary
        getSummary($(this).text());

    // Update chart
     cName=$(this).text();
     chartData(cName, time);
     console.log(cName);
    });

function findMaxMin(arr){
    let min=arr[0];
    let max=0;
    $.each(arr,(ind,val)=>{
        if(min>val)
           min=val;
        if(max<val)
          max=val;
    })
    // console.log('Min :-' +min +" max :- "+max);
    $('#max').text('Max - '+max.toFixed(3));
    $('#min').text('Min - '+min.toFixed(3));

}

}
