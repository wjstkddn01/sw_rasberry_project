let ctx1 = null;
let chart1 = null;
let config1 = {
        type: 'line',
        data: {
            labels:[],
            datasets:[{
                label: '캐리어 내부 여유공간',
                backgroundColor:'black',
                borderColor:'red',
                borderWidth:2,
                data:[],
                fill:false,
            }]
        },
        options: {
            responsive:false,
            scales:{
                xAxes:[{
                    display:true,
                    scaleLabel:{display:true,labelString:'시간(초)'},
                }],
                yAxes:[{
                    display:true,
                    scaleLabel:{display:true,labelString:'캐리어 내부 여유공간(cm)'}
                }]
            }
        }
};

let ctx2 = null;
let chart2 = null;
let config2 = {
        type: 'line',
        data: {
            labels:[],
            datasets:[{
                label: '캐리어 내부 실시간 온도',
                backgroundColor:'black',
                borderColor:'red',
                borderWidth:2,
                data:[],
                fill:false,
            }]
        },
        options: {
            responsive:false,
            scales:{
                xAxes:[{
                    display:true,
                    scaleLabel:{display:true,labelString:'시간(초)'},
                }],
                yAxes:[{
                    display:true,
                    scaleLabel:{display:true,labelString:'온도(*C)'}
                }]
            }
        }
};

let ctx3 = null;
let chart3 = null;
let config3 = {
        type: 'line',
        data: {
            labels:[],
            datasets:[{
                label: '캐리어 내부 실시간 습도',
                backgroundColor:'black',
                borderColor:'red',
                borderWidth:2,
                data:[],
                fill:false,
            }]
        },
        options: {
            responsive:false,
            scales:{
                xAxes:[{
                    display:true,
                    scaleLabel:{display:true,labelString:'시간(초)'},
                }],
                yAxes:[{
                    display:true,
                    scaleLabel:{display:true,labelString:'습도(%)'}
                }]
            }
        }
};

let LABEL_SIZE1 = 20; // 차트에 그려지는 데이터의 개수
let tick1 = 0; // 도착한 데이터의 개수임, tick의 범위는 0에서 99까지만

let LABEL_SIZE2 = 20; // 차트에 그려지는 데이터의 개수
let tick2 = 0; // 도착한 데이터의 개수임, tick의 범위는 0에서 99까지만

let LABEL_SIZE3 = 20; // 차트에 그려지는 데이터의 개수
let tick3 = 0; // 도착한 데이터의 개수임, tick의 범위는 0에서 99까지만

function drawChart1() {
        ctx1 = document.getElementById('canvas1').getContext('2d');
        chart1 = new Chart(ctx1, config1);
        init1();
}

function drawChart2() {
        ctx2 = document.getElementById('canvas2').getContext('2d');
        chart2 = new Chart(ctx2, config2);
        init2();
}

function drawChart3() {
        ctx3 = document.getElementById('canvas3').getContext('2d');
        chart3 = new Chart(ctx3, config3);
        init3();
}


function init1() { // chart1.data.labels의 크기를 LABEL_SIZE로 만들고 0~19까지 레이블 붙이기
        for(let i=0; i<LABEL_SIZE1; i++) {
                chart1.data.labels[i] = i;
        }
        chart1.update();
}

function init2() { // chart2.data.labels의 크기를 LABEL_SIZE로 만들고 0~19까지 레이블 붙이기
        for(let i=0; i<LABEL_SIZE2; i++) {
                chart2.data.labels[i] = i;
        }
        chart2.update();
}

function init3() { // chart3.data.labels의 크기를 LABEL_SIZE로 만들고 0~19까지 레이블 붙이기
        for(let i=0; i<LABEL_SIZE3; i++) {
                chart3.data.labels[i] = i;
        }
        chart3.update();
}

function addChart1Data(value) {
        tick1++; // 도착한 데이터의 개수 증가
        tick1 %= 100; // tick의 범위는 0에서 99까지만. 100보다 크면 다시 0부터 시작
        let n1 = chart1.data.datasets[0].data.length; // 현재 데이터의 개수
        if(n1 < LABEL_SIZE1) // 현재 데이터 개수가 LABEL_SIZE보다 작은 경우
                chart1.data.datasets[0].data.push(value);
        else { // 현재 데이터 개수가 LABEL_SIZE를 넘어서는 경우
                // 새 데이터 value 삽입
                chart1.data.datasets[0].data.push(value); // value를 data[]의 맨 끝에 추가
                chart1.data.datasets[0].data.shift(); // data[]의 맨 앞에 있는 데이터 제거

                // 레이블 삽입
                chart1.data.labels.push(tick1); // tick 값을 labels[]의 맨 끝에 추가
                chart1.data.labels.shift(); // labels[]의 맨 앞에 있는 값 제거
        }
        chart1.update();
}

function addChart2Data(value) {
        tick2++; // 도착한 데이터의 개수 증가
        tick2 %= 100; // tick의 범위는 0에서 99까지만. 100보다 크면 다시 0부터 시작
        let n2 = chart2.data.datasets[0].data.length; // 현재 데이터의 개수
        if(n2 < LABEL_SIZE2) // 현재 데이터 개수가 LABEL_SIZE보다 작은 경우
                chart2.data.datasets[0].data.push(value);
        else { // 현재 데이터 개수가 LABEL_SIZE를 넘어서는 경우
                // 새 데이터 value 삽입
                chart2.data.datasets[0].data.push(value); // value를 data[]의 맨 끝에 추가
                chart2.data.datasets[0].data.shift(); // data[]의 맨 앞에 있는 데이터 제거

                // 레이블 삽입
                chart2.data.labels.push(tick2); // tick 값을 labels[]의 맨 끝에 추가
                chart2.data.labels.shift(); // labels[]의 맨 앞에 있는 값 제거
        }
        chart2.update();
}

function addChart3Data(value) {
        tick3++; // 도착한 데이터의 개수 증가
        tick3 %= 100; // tick의 범위는 0에서 99까지만. 100보다 크면 다시 0부터 시작
        let n3 = chart3.data.datasets[0].data.length; // 현재 데이터의 개수
        if(n3 < LABEL_SIZE3) // 현재 데이터 개수가 LABEL_SIZE보다 작은 경우
                chart3.data.datasets[0].data.push(value);
        else { // 현재 데이터 개수가 LABEL_SIZE를 넘어서는 경우
                // 새 데이터 value 삽입
                chart3.data.datasets[0].data.push(value); // value를 data[]의 맨 끝에 추가
                chart3.data.datasets[0].data.shift(); // data[]의 맨 앞에 있는 데이터 제거

                // 레이블 삽입
                chart3.data.labels.push(tick3); // tick 값을 labels[]의 맨 끝에 추가
                chart3.data.labels.shift(); // labels[]의 맨 앞에 있는 값 제거
        }
        chart3.update();
}


function hideshow() { // 캔버스 보이기 숨기기
        let canvas1 = document.getElementById("canvas1"); //canvas DOM 객체 알아내기
        if(canvas1.style.display == "none") // canvas 객체가 보이지 않는다면
                canvas1.style.display = "inline-block"; // canvas 객체를 보이게 배치
        else
                canvas1.style.display = "none" ;  // canvas 객체를 보이지 않게 배치

        let canvas2 = document.getElementById("canvas2"); //canvas DOM 객체 알아내기
        if(canvas2.style.display == "none") // canvas 객체가 보이지 않는다면
                canvas2.style.display = "inline-block"; // canvas 객체를 보이게 배치
        else
                canvas2.style.display = "none" ;  // canvas 객체를 보이지 않게 배치

        let canvas3 = document.getElementById("canvas3"); //canvas DOM 객체 알아내기
        if(canvas3.style.display == "none") // canvas 객체가 보이지 않는다면
                canvas3.style.display = "inline-block"; // canvas 객체를 보이게 배치
        else
                canvas3.style.display = "none" ;  // canvas 객체를 보이지 않게 배치
}
window.addEventListener("load", drawChart1); // load 이벤트가 발생하면 drawChart() 호출하도록 등록
window.addEventListener("load", drawChart2); // load 이벤트가 발생하면 drawChart() 호출하도록 등록
window.addEventListener("load", drawChart3); // load 이벤트가 발생하면 drawChart() 호출하도록 등록

