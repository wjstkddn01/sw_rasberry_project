import io, time
import cv2
import camera
import base64
from PIL import Image, ImageFilter
import paho.mqtt.client as mqtt
import led
import cds
import htu
import ultrasonic


isStart  = False


def on_connect(client, userdata, flag, rc):
	client.subscribe("camera")
def on_message(client, userdata,msg) :
	global isStart
	if msg.payload.decode('utf-8') == 'start':
		isStart = True
		led.controlLED(1)	
		print("Start Camera")
	else:
		isStart = False
		led.controlLED(0)	
	pass

ip = "localhost" # 현재 브로커는 이 컴퓨터에 설치되어 있음
client = mqtt.Client()
client.on_connect = on_connect
client.on_message = on_message
client.connect(ip, 1883) # 브로커에 연결
client.loop_start() # 메시지 루프를 실행하는 스레드 생성
camera.init()
stream = io.BytesIO()    #카메라


# 도착하는 메시지는 on_message() 함수에 의해 처리되어 LED를 켜거나 끄는 작업과
# 병렬적으로 1초 단위로 초음파 센서로부터 거리를 읽어 전송하는 무한 루프 실행
while True:
	if isStart == True:
		frame = camera.take_picture()
		stream.seek(0) # stream 파일의 커서를 맨 앞으로 이동한다
		image = Image.fromarray(frame) # numpy array 데이터를 PILLOW의 image 데이터 포맷으로 변환
		image.save(stream, format='JPEG') #이미지 변환후 JPEG 형식으로 이미지를 저장

		client.publish("image", stream.getvalue(), qos=0) # image토픽으로 이미지 데이터 전송
		stream.truncate() # stream 파일에 있는 모든 내용을 지운다
	else:
		distance = ultrasonic.measureDistance() # 초음파 센서로부터 거리 읽기
		client.publish("ultrasonic", distance, qos=0) # “ultrasonic” 토픽으로 거리 전송
		temperature = htu.getTemperature(htu.sensor)
		client.publish("temperature", temperature, qos=0)
		humidity = htu.getHumidity(htu.sensor)
		client.publish("humidity",  humidity, qos=0)
		zodo = cds.getcds()
		client.publish("zodo", zodo , qos=0)	
		time.sleep(1)
client.loop_stop() # 메시지 루프를 실행하는 스레드 종료
client.disconnect()

