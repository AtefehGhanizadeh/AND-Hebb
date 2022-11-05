const vectors=[
    {x1:1,x2:1,b:1,y:1,dw1:0,dw2:0,db:0,w1:0,w2:0,newB:0},
    {x1:1,x2:-1,b:1,y:-1,dw1:0,dw2:0,db:0,w1:0,w2:0,newB:0},
    {x1:-1,x2:1,b:1,y:-1,dw1:0,dw2:0,db:0,w1:0,w2:0,newB:0},
    {x1:-1,x2:-1,b:1,y:-1,dw1:0,dw2:0,db:0,w1:0,w2:0,newB:0}
]

//global w1,w2,b variable

let uw1=0;
let uw2=0;
let ub=0;


//calculate w1(new),w2(new),b(new),dw1,dw2,db


function calculate(tx1,tx2,ty){

    let tdw1=tx1*ty;
    let tdw2=tx2*ty;
    let tdb=ty;
    let nW1=uw1+tdw1
    let nW2=uw2+tdw2
    let nb=ub+tdb

    const vector={x1:tx1,x2:tx2,b:1,y:ty,dw1:tdw1,dw2:tdw2,w1:nW1,w2:nW2,newB:nb}

    return vector;
}

//for each vector 1-calculate,2-restore, 3-update w1,w2,b

for(i=0;i<4;i++){

  //calculate and restore
    vectors[i]=calculate(vectors[i].x1,vectors[i].x2,vectors[i].y)

  //draw chart
    const xyValues = [
        {x:vectors[0].x1, y:vectors[0].x2},
        {x:vectors[1].x1, y:vectors[1].x2},
        {x:vectors[2].x1, y:vectors[2].x2},
        {x:vectors[3].x1, y:vectors[3].x2},
    ];
    
    
    function generateData(value, i1, i2, step = 1) {
        for (let x = i1; x <= i2; x += step) {
          yValues.push(eval(value));
          xValues.push(x);
        }
      }
    
    let xValues = [];
    let yValues = [];
    generateData("((-vectors[i].w1)/vectors[i].w2)*x-(vectors[i].newB/vectors[i].w2)", -3, 3, 1);
      
    new Chart(`myChart${i+1}`, {
        
        data: {
          datasets: [{
            type: "scatter",
            pointRadius: 4,
            pointBackgroundColor: "rgba(0,0,255,1)",
            data: xyValues
          },
            {
                type: "line",
                fill: false,
                lineTension: 0,
                backgroundColor: "rgb(216, 29, 29)",
                borderColor: "rgb(216, 29, 29)",
                data: yValues
                
            }],
            labels:[-3,-2,-1,0,1,2,3]
        },
        options:{legend: {display: false},
        scales: {
          xAxes: [{ticks: {min: -2, max:2}}],
          yAxes: [{ticks: {min: -2, max:2}}],
        },
        title: {
            display: true,
            text:`${i+1}`,
            fontSize: 16
          }
    }
    });
    
    //update global variables
    uw1=vectors[i].w1
    uw2=vectors[i].w2
    ub=vectors[i].newB

}


