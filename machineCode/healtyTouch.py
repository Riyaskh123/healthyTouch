#Libraries
import RPi.GPIO as GPIO
import requests
import time


#GPIO Mode (BOARD / BCM)
GPIO.setmode(GPIO.BCM)


#set GPIO Pins
GPIO_TRIGGER = 18
GPIO_ECHO = 24


#BASE_URL = 'http://localhost:3005/'
BASE_URL = 'http://192.168.1.47:3005/'


#set GPIO direction (IN / OUT)
GPIO.setup(GPIO_TRIGGER, GPIO.OUT)
GPIO.setup(GPIO_ECHO, GPIO.IN)


def distance():
	# set Trigger to HIGH
 
	GPIO.output(GPIO_TRIGGER, True)
	# set Trigger after 0.01ms to LOW
	time.sleep(0.00001)
	GPIO.output(GPIO_TRIGGER, False)
	StartTime = time.time()
	StopTime = time.time()
	# save StartTime
	while GPIO.input(GPIO_ECHO) == 0:
		StartTime = time.time()
	# save time of arrival
	while GPIO.input(GPIO_ECHO) == 1:
		StopTime = time.time()
	# time difference between start and arrival
	TimeElapsed = StopTime - StartTime
	# multiply with the sonic speed (34300 cm/s)
	# and divide by 2, because there and back
	distance = (TimeElapsed * 34300) / 2
	return distance

if __name__ == '__main__':
	try:
		count=0
		distLimit = 50
		timeoutDiff = 14
		while True:
			status = False
			res = requests.get(BASE_URL + 'api/check-login-status')
			time.sleep(1)
			data = res.json()
			print(data["isUserLoggedIn"])
			status = data["isUserLoggedIn"]
			srTime = time.time()
			spTime = time.time()
			while status:
				dist = distance()
				time.sleep(0.05)
				if dist <= distLimit:
					count = count + 1
					print(count)
					res = requests.get(BASE_URL +'machine/count/' + str(count))
					time.sleep(0.05)
					while dist < distLimit:
						dist = distance()
						time.sleep(0.05)
					srTime = time.time()
				spTime = time.time()
				diff = spTime - srTime
				if (diff > timeoutDiff) and status :
					print('your Times up Thank you ')
					res = requests.get(BASE_URL +'machine/timeout')
					time.sleep(10)
					count = 0
					break
	# Reset by pressing CTRL + C
	except KeyboardInterrupt:
		print("Measurement stopped by User")
		GPIO.cleanup()
	except Exception as err:
		print(err)
		GPIO.cleanup()
