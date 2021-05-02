from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import time

driver = webdriver.Chrome('chromedriver.exe')
driver.get('https://instagram.com')

time.sleep(1.5)

e = driver.find_elements_by_class_name('KPnG0')[0]
e.click()

time.sleep(2.5)

e = driver.find_elements_by_class_name('_55r1')[0]
e.send_keys('01051153154')

e = driver.find_elements_by_class_name('_55r1')[1]
e.send_keys('p18870')

e = driver.find_elements_by_class_name('_42ft')[3]
e.send_keys(Keys.ENTER)

print('Wait_Start')
driver.implicitly_wait(10)
if(driver.find_element_by_class_name('HoLwm')):
    e = driver.find_element_by_class_name('HoLwm')
    e.click()

time.sleep(1)
driver.refresh()
driver.implicitly_wait(5)

# 이미지 파싱 해오는 기능
e = driver.find_elements_by_class_name('FFVAD')
for i in e:
    if(i.get_attribute('alt').find('이유나')):
        print(i.get_attribute('src'))
    driver.implicitly_wait(1)


# 댓글 파싱해오는 기능
#e = driver.find_elements_by_class_name('QzzMF')[0].text

#e = driver.find_elements_by_class_name('QzzMF')
# for i in e:
    print(i.text)


# 댓글 자동 입력 기능
#e = driver.find_elements_by_class_name('Ypffh')[1]
# e.send_keys('너무좋은데')
# e.send_keys(Keys.ENTER)
