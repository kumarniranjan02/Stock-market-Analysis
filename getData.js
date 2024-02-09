
// API fetching for List Data
 const listData = fetch('https://stocks3.onrender.com/api/stocks/getstockstatsdata')
 .then(response=> response.json());

 // API fetching for List Data
 const summaryData = fetch('https://stocks3.onrender.com/api/stocks/getstocksprofiledata')
 .then(response=> response.json());

 //API fetching for chart Data
 const chartData = fetch('https://stocks3.onrender.com/api/stocks/getstocksdata')
 .then(response=> response.json());


export{listData,summaryData,chartData};
