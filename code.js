let storage = localStorage;

// Get Current Month and Year
const date = new Date();
let month = date.getMonth();
let year = date.getFullYear();

// This sets the current Date and Year in the Header
let mainDate = document.querySelector('.main-date');
let monthString;
switch (month) {
  case 0:
    monthString = 'January';
    break;
  case 1:
    monthString = 'February';
    break;
  case 2:
    monthString = 'March';
    break;
  case 3:
    monthString = 'April';
    break;
  case 4:
    monthString = 'May';
    break;
  case 5:
    monthString = 'June';
    break;
  case 6:
    monthString = 'July';
    break;
  case 7:
    monthString = 'August';
    break;
  case 8:
    monthString = 'September';
    break;
  case 9:
    monthString = 'Oktober';
    break;
  case 10:
    monthString = 'November';
    break;
  case 11:
    monthString = 'December';
    break;
}
mainDate.innerHTML = monthString + ' ' + year;

// Data Arrays for Amount of Funds
let dataBank = [];
let dataStocks = [];
let dataPillar3a = [];
let dataWealth = [];

function setData() {
  if (storage.getItem('dataBank') === null) {
    storage.setItem('dataBank', []);
  }
  if (storage.getItem('dataStocks') === null) {
    storage.setItem('dataStocks', []);
  }
  if (storage.getItem('dataPillar3a') === null) {
    storage.setItem('dataPillar3a', []);
  }

  dataBank = storage.getItem('dataBank').split(',');
  dataStocks = storage.getItem('dataStocks').split(',');
  dataPillar3a = storage.getItem('dataPillar3a').split(',');

  setDataWealth();
}

function setDataWealth() {
  dataWealth = [
    Number(dataBank[0]) + Number(dataStocks[0]) + Number(dataPillar3a[0]),
    Number(dataBank[1]) + Number(dataStocks[1]) + Number(dataPillar3a[1]),
    Number(dataBank[2]) + Number(dataStocks[2]) + Number(dataPillar3a[2]),
    Number(dataBank[3]) + Number(dataStocks[3]) + Number(dataPillar3a[3]),
    Number(dataBank[4]) + Number(dataStocks[4]) + Number(dataPillar3a[4]),
    Number(dataBank[5]) + Number(dataStocks[5]) + Number(dataPillar3a[5]),
    Number(dataBank[6]) + Number(dataStocks[6]) + Number(dataPillar3a[6]),
    Number(dataBank[7]) + Number(dataStocks[7]) + Number(dataPillar3a[7]),
    Number(dataBank[8]) + Number(dataStocks[8]) + Number(dataPillar3a[8]),
    Number(dataBank[9]) + Number(dataStocks[9]) + Number(dataPillar3a[9]),
    Number(dataBank[10]) + Number(dataStocks[10]) + Number(dataPillar3a[10]),
    Number(dataBank[11]) + Number(dataStocks[11]) + Number(dataPillar3a[11]),
  ];
}

// Sidebar: Current Amount of Funds
let valueWealthDiv = document.getElementById('valueWealth');
let valueBankDiv = document.getElementById('valueBank');
let valueStocksDiv = document.getElementById('valueStocks');
let valuePillar3aDiv = document.getElementById('valuePillar3a');

function updateFunds() {
  valueWealthDiv.innerHTML =
    Number(dataBank[dataBank.length - 1]) +
    Number(dataStocks[dataStocks.length - 1]) +
    Number(dataPillar3a[dataPillar3a.length - 1]);
  valueBankDiv.innerHTML = dataBank[dataBank.length - 1];
  valueStocksDiv.innerHTML = dataStocks[dataStocks.length - 1];
  valuePillar3aDiv.innerHTML = dataPillar3a[dataPillar3a.length - 1];
}

// Sidebar Card Buttons for setting new Values of Funds
function updateBank() {
  let input;
  let month;
  month = prompt('Enter Month (1-12)', '');
  input = prompt('Enter the current Bank Funds', '');
  if (input === null || month === null) {
    return;
  } else if (Number(input) > 0 && Number(month) > 0 && Number(month) < 13) {
    let temp = storage.getItem('dataBank');
    let tempArray = temp.split(',');
    tempArray[month - 1] = input;
    storage.setItem('dataBank', tempArray);
  }

  setData();
  updateFunds();
  setTrend();
  displayLine();
}

function updateStocks() {
  let input;
  let month;
  month = prompt('Enter Month (1-12)', '');
  input = prompt('Enter the current Stocks Funds', '');
  if (input === null || month === null) {
    return;
  } else if (Number(input) > 0 && Number(month) > 0 && Number(month) < 13) {
    let temp = storage.getItem('dataStocks');
    let tempArray = temp.split(',');
    tempArray[month - 1] = input;
    storage.setItem('dataStocks', tempArray);
  }

  setData();
  updateFunds();
  setTrend();
  displayLine();
}

function updatePillar3a() {
  let input;
  let month;
  month = prompt('Enter Month (1-12)', '');
  input = prompt('Enter the current Pillar 3a Funds', '');
  if (input === null || month === null) {
    return;
  } else if (Number(input) > 0 && Number(month) > 0 && Number(month) < 13) {
    let temp = storage.getItem('dataPillar3a');
    let tempArray = temp.split(',');
    tempArray[month - 1] = input;
    storage.setItem('dataPillar3a', tempArray);
  }

  setData();
  updateFunds();
  setTrend();
  displayLine();
}

// Bar Chart
function displayBar() {
  document.getElementById('myChart').remove();
  var main = document.querySelector('.main');
  var canvas = document.createElement('canvas');
  canvas.setAttribute('id', 'myChart');
  main.appendChild(canvas);
  var ctx = document.getElementById('myChart').getContext('2d');

  var barDiv = document.querySelector('.btn-bar');
  barDiv.classList.add('active');
  var lineDiv = document.querySelector('.btn-line');
  lineDiv.classList.remove('active');
  var pieDiv = document.querySelector('.btn-pie');
  pieDiv.classList.remove('active');

  var chart = new Chart(ctx, {
    type: 'bar',

    // The data for the dataset
    data: {
      labels: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'Oktober',
        'November',
        'December',
      ],

      datasets: [
        {
          label: 'Pillar 3a',
          backgroundColor: 'hsl(227, 62%, 50%)',
          borderColor: 'hsl(227, 62%, 50%)',
          data: dataPillar3a,
        },
        {
          label: 'Stocks',
          backgroundColor: 'hsl(276, 69%, 47%)',
          borderColor: 'hsl(276, 69%, 47%)',
          data: dataStocks,
        },
        {
          label: 'Bank Account',
          backgroundColor: 'hsl(320, 76%, 45%)',
          borderColor: 'hsl(320, 76%, 45%)',
          data: dataBank,
        },
      ],
    },

    // Configuration options go here
    options: {
      legend: {
        position: 'right',
      },
      scales: {
        xAxes: [
          {
            stacked: true,
          },
        ],
        yAxes: [
          {
            stacked: true,
          },
        ],
      },
    },
  });
}

// Line Chart
function displayLine() {
  document.getElementById('myChart').remove();
  var main = document.querySelector('.main');
  var canvas = document.createElement('canvas');
  canvas.setAttribute('id', 'myChart');
  main.appendChild(canvas);
  var ctx = document.getElementById('myChart').getContext('2d');

  var barDiv = document.querySelector('.btn-bar');
  barDiv.classList.remove('active');
  var lineDiv = document.querySelector('.btn-line');
  lineDiv.classList.add('active');
  var pieDiv = document.querySelector('.btn-pie');
  pieDiv.classList.remove('active');

  var chart = new Chart(ctx, {
    type: 'line',

    // The data for the dataset
    data: {
      labels: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'Oktober',
        'November',
        'December',
      ],

      datasets: [
        {
          label: 'Pillar 3a',
          backgroundColor: 'hsl(227, 62%, 50%)',
          borderColor: 'hsl(227, 62%, 50%)',
          data: dataPillar3a,
          fill: 'false',
        },
        {
          label: 'Stocks',
          backgroundColor: 'hsl(276, 69%, 47%)',
          borderColor: 'hsl(276, 69%, 47%)',
          data: dataStocks,
          fill: 'false',
        },
        {
          label: 'Bank Account',
          backgroundColor: 'hsl(320, 76%, 45%)',
          borderColor: 'hsl(320, 76%, 45%)',
          data: dataBank,
          fill: 'false',
        },
        {
          label: 'Wealth',
          backgroundColor: 'hsl(354, 72%, 58%)',
          borderColor: 'hsl(354, 72%, 58%)',
          data: dataWealth,
          fill: 'false',
        },
      ],
    },

    // Configuration options go here
    options: {
      legend: {
        position: 'right',
      },
      scales: {
        xAxes: [
          {
            stacked: false,
          },
        ],
        yAxes: [
          {
            stacked: false,
          },
        ],
      },
    },
  });
}

// Pie Chart
function displayPie() {
  document.getElementById('myChart').remove();
  var main = document.querySelector('.main');
  var canvas = document.createElement('canvas');
  canvas.setAttribute('id', 'myChart');
  main.appendChild(canvas);
  var ctx = document.getElementById('myChart').getContext('2d');

  var barDiv = document.querySelector('.btn-bar');
  barDiv.classList.remove('active');
  var lineDiv = document.querySelector('.btn-line');
  lineDiv.classList.remove('active');
  var pieDiv = document.querySelector('.btn-pie');
  pieDiv.classList.add('active');

  var chart = new Chart(ctx, {
    type: 'doughnut',

    // The data for the dataset
    data: {
      labels: ['Bank Account', 'Stocks', 'Pillar 3a'],

      datasets: [
        {
          data: [dataBank[month], dataStocks[month], dataPillar3a[month]],

          backgroundColor: [
            'hsl(320, 76%, 45%)',
            'hsl(276, 69%, 47%)',
            'hsl(227, 62%, 50%)',
          ],
        },
      ],
    },

    // Configuration options go here
    options: {
      legend: {
        position: 'right',
      },
    },
  });
}

// set Trend of Funds in Percent
let trendWealth = document.getElementById('trendWealth');
let iconWealth = document.getElementById('iconWealth');
let trendBank = document.getElementById('trendBank');
let iconBank = document.getElementById('iconBank');
let trendStocks = document.getElementById('trendStocks');
let iconStocks = document.getElementById('iconStocks');
let trendPillar3a = document.getElementById('trendPillar3a');
let iconPillar3a = document.getElementById('iconPillar3a');

function setTrendWealth() {
  let dataLast = dataWealth[month - 1];
  let temp = (100 / dataLast) * dataWealth[month] - 100;
  if (temp < 0) {
    temp *= -1;
    iconWealth.innerHTML =
      '<svg fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M14.707 12.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l2.293-2.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>';
  } else {
    iconWealth.innerHTML =
      '<svg fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>';
  }
  trendWealth.innerHTML = temp.toFixed(1) + '%';
}

function setTrendBank() {
  let dataLast = dataBank[month - 1];
  let temp = (100 / dataLast) * dataBank[month] - 100;
  if (temp < 0) {
    temp *= -1;
    iconBank.innerHTML =
      '<svg fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M14.707 12.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l2.293-2.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>';
  } else {
    iconBank.innerHTML =
      '<svg fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>';
  }
  trendBank.innerHTML = temp.toFixed(1) + '%';
}

function setTrendStocks() {
  let dataLast = dataStocks[month - 1];
  let temp = (100 / dataLast) * dataStocks[month] - 100;
  if (temp < 0) {
    temp *= -1;
    iconStocks.innerHTML =
      '<svg fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M14.707 12.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l2.293-2.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>';
  } else {
    iconStocks.innerHTML =
      '<svg fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>';
  }
  trendStocks.innerHTML = temp.toFixed(1) + '%';
}

function setTrendPillar3a() {
  let dataLast = dataPillar3a[month - 1];
  let temp = (100 / dataLast) * dataPillar3a[month] - 100;
  if (temp < 0) {
    temp *= -1;
    iconPillar3a.innerHTML =
      '<svg fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M14.707 12.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l2.293-2.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>';
  } else {
    iconPillar3a.innerHTML =
      '<svg fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>';
  }
  trendPillar3a.innerHTML = temp.toFixed(1) + '%';
}

function setTrend() {
  setTrendWealth();
  setTrendBank();
  setTrendStocks();
  setTrendPillar3a();
}

function main() {
  setData();
  updateFunds();
  setTrend();
  displayLine();
}

main();
