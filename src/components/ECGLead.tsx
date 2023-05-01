//import Chart from "chart.js";
//import ChartDataLabels, { Context } from "chartjs-plugin-datalabels";

import { Line } from 'react-chartjs-2';
import { FC } from "react";


//Graph component for displaying mocked ECG data.
//takes a variable name from lead input
interface ECGLeadProps {
  lead: string;
  mockData: number[];
  sampleSize?: number;  //default sample size is 200 to enable smaller/larger graphs.
}

const ECGLead: FC<ECGLeadProps> = ({ lead, mockData, sampleSize }) => {



  const mockECGData = mockData;
  const TOTAL_SAMPLE_SIZE = mockData.length; //calculate Hz over 10 seconds.
  const SAMPLE_SIZE = sampleSize as number;

  const labelMap = {
    "i": "I",
    "ii": "II",
    "iii": "III",
    "v1": "V1",
    "v2": "V2",
    "v3": "V3",
    "v4": "V4",
    "v5": "V5",
    "v6": "V6",
    "avr": "aVR",
    "avl": "aVL",
    "avf": "aVL"
  }
  const leadKey = lead as keyof typeof labelMap;


  function range() {
    var arrToRet = [];
    for (let i = 1; i <= SAMPLE_SIZE; i++) {
      arrToRet.push(i);
    }

    return arrToRet;
  }


  const data = {
    responsive: true,
    parsing: true,
    animation: true,
    labels: range(),
    datasets: [{
      label: labelMap[leadKey],
      data: mockECGData.slice(0, SAMPLE_SIZE-1),
      fill: false,
      borderColor: 'rgb(0, 0, 0)'
    }]
  };

  const options = {
    //adding events to have chart.js add some listeners to drawing canvas => more touch-responsive
    events: ['mousemove', 'mouseout', 'click', 'touchstart', 'touchmove', 'touchend', 'touchcancel', 'touchleave'] as any,
    scales: {
      y: {
        ticks: {
          display: false,
          stepSize: 100  //honestly arbitrary, can be changed.
        },
        grid: {
          drawTicks: false,
          color: function (context: any) {
            if (context.tick.value === 0) return 'rgba(0,0,0,0.4)' //draw greyish line to show y==0
            if (!(context.tick.value % 500)) return 'rgba(255,0,0,0.8)'; // every 500, draw reddish
            return 'rgba(255,0,0,0.3)';                                 //else soft red every 100 (stepSize)
          }
        },
        min: -1500,  
        max: 2000
      },

      x: {
        ticks: {
          display: false,  //for clean chart, leaves no weird margins.
          callback: function (value: any, index: any, values: any) {  //leaves ticks every 10th sample point ==> every 0.2 seconds.
            if (!(index % 10) || values.length-1 === index) {
              return value; 
            }
          }

        },
        grid: {
          drawTicks: false,
          color: (context: any) => {
            if(context.index === 20) return 'rgba(0,0,0,1)'; //adds black vertical line at end of graph
            if (!(context.index % 5)) return 'rgba(255,0,0,0.8)';  
            return 'rgba(255,0,0,0.3)';
          }
        },
        min: 0,
        max: SAMPLE_SIZE
      }
    },

    elements: {
      point: {
        radius: 0, //removes points for smoother graph
        hoverRadius: 4,
        hitRadius: 8
      },
      line: {
        tension: 0,     //  smooths out surface, can be adjusted between 0 - 0.5 for best results with this data
        borderWidth: 1  //thinner lines for more detailed graph
      }
    },

    plugins: {
      datalabels: {
        display: false   //global graph-hackZ from other component dependencies
      },
      legend: {
        display: false,  //decided to remove in favour for className='label' below.
        //position: 'chartArea',   //not working with react-wrapper

        labels: {  //probably not necessary, TODO: Refactor removal
          boxWidth: 0,
          padding: 0
        }
      },
      tooltip: {
        callbacks: {
          title: function (context: any) {  //some tooltips for reading data from graph
            return context[0].dataset.label + "-värden";
          },
          label: function (context: any) {
            return context.parsed.x * 20 + " ms";
          },
          afterLabel: function (context: any) {
            return context.parsed.y / 10 + " mV"
          }
        },
        displayColors: false  //removes ugly data-color-box
        
      }
    }
  };

  //in separate var because i thought it would pre-compute some, but probably optimized away.
  var chartToRet = <>  
    <Line data={data} options={options} />
    <p className="label"> {labelMap[leadKey]} </p>
  </>;

  return chartToRet;

};

//default value for sampSize
ECGLead.defaultProps = {
  sampleSize: 200
}

export default ECGLead;