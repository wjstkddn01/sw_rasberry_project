import RPi.GPIO as GPIO
import time


GPIO.setmode(GPIO.BCM) # BCM 모드로 작동
GPIO.setwarnings(False) # 경고글이 출력되지 않게 설정
GPIO.setup(6, GPIO.OUT)
GPIO.setup(19, GPIO.OUT)
GPIO.setup(26, GPIO.OUT)


# LED를 켜고 끄는 함수
def controlLED(on_off): # led 번호의 핀에 on_off(0/1) 값 출력하는 함수
        GPIO.output(6, on_off)
        GPIO.output(19, on_off)
        GPIO.output(26, on_off)

if __name__ == "__main__":
    init()
    on_off = 1  # 1은 디지털 출력 값. 1 = 5V
    led_pin = int(input("GPIO PIN을 입력하세요:"))
    setInOut(led_pin, "out")

    print("LED를 지켜 보세요.")

    # 5번 LED를 깜빡임
    for i in range(10):
        led_on_off(led_pin, on_off)  # led가 연결된 핀에 1또는 0 값 출력
        time.sleep(1)  # 1초 동안 잠자기
        print(i, end=' ', flush=True)
        on_off = 0 if on_off == 1 else 1  # 0과 1의 토글링

    print()
    GPIO.cleanup()

