#Libraries
import RPi.GPIO as GPIO
import requests
import time
 
#GPIO Mode (BOARD / BCM)
GPIO.setmode(GPIO.BCM)
GPIO.setmode(GPIO.BCM)

 
#set GPIO Pins
GPIO_TRIGGER = 18
GPIO_ECHO = 24

BASE_URL = 'http://localhost:3005/machine/'
 
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
		timeoutDiff = 15
		srTime = time.time()
		spTime = time.time()
		while True:
			dist = distance()
			time.sleep(0.05)
			if dist <= distLimit:
				count = count + 1
				print(count)
				res = requests.get(BASE_URL +'count/' + str(count))
				time.sleep(0.05)
				res.json()
				while dist < distLimit:
					dist = distance()
					time.sleep(0.05)
				srTime = time.time()
			spTime = time.time()
			if count > 0 :
				diff = spTime - srTime
				if diff > timeoutDiff :
					print('your Times up Thank you ')
					res = requests.get(BASE_URL +'timeout')
					time.sleep(0.05)
					res.json()
					
					count = 0 
        # Reset by pressing CTRL + C
	except KeyboardInterrupt:
		print("Measurement stopped by User")
		GPIO.cleanup()
	except Exception:
		print('error')
		GPIO.cleanup()
