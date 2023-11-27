// 전역 변수 선언
var canvas;
var context;
var img;

// load 이벤트 리스너 등록. 웹페이지가 로딩된 후 실행
window.addEventListener("load", function() {
        canvas = document.getElementById("myCanvas");
        context = canvas.getContext("2d");

        img = new Image();
        img.onload = function () {
                context.drawImage(img, 0, 0, canvas.width, canvas.height); // (0,0) 위치에 img의 크기로 그리기
        }
});

function bytes2base64( bytes ) {
        var binary = '';
        var bytes = new Uint8Array( bytes );
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
                binary += String.fromCharCode( bytes[ i ] );
        }
        return window.btoa( binary );
}

// drawImage()는 "image' 토픽이 도착하였을 때 onMessageArrived()에 의해 호출된다.
function drawImage(bytes) { // imgUrl은 이미지의 url
        img.src = "data:image/jpg;base64," + bytes2base64(bytes);
}

var isImageSubscribed = false;
function startCamera() {
        if(!isImageSubscribed) {
                subscribe('image'); // 토픽 image 등록
                isImageSubscribed = true;
        }
        publish('camera', 'start'); // 토픽: facerecognition, start 메시지 전송
        img.src = null
}
function stopCamera() {
        if(!isImageSubscribed) {
                unsubscribe('image'); // 토픽 image 등록
                isImageSubscribed = true;
        }
        publish('camera', 'stop'); // 토픽: facerecognition, start 메시지 전송
}

