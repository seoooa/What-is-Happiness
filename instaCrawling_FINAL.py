# 20211511 SEOA KIM
# 2024-01 Data Visualization

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
import time
from urllib.request import urlretrieve
import requests
from bs4 import BeautifulSoup;

# Crawling Image Name
img_name = "crawling_img"

#------------- login END --------------------
print("LOGIN START **************************** ")
driver = webdriver.Chrome()
login_url = "https://www.instagram.com"
driver.get(login_url);
time.sleep(3)

driver.implicitly_wait(10)
login_id = driver.find_element(By.CSS_SELECTOR, 'input[name="username"]')
# ID
login_id.send_keys('본인의 인스타 아이디를 입력')
login_pwd = driver.find_element(By.CSS_SELECTOR, 'input[name="password"]')
# PASSWORD
login_pwd.send_keys('본인의 인스타 비밀번호를 입력')
driver.implicitly_wait(10)
login_id.send_keys(Keys.ENTER)
#------------- login END --------------------

# TAG
print("What TAG you want to search? **************************** ")
tag_word = input("");
tag_url = "https://www.instagram.com/explore/tags/" + tag_word +"/";
driver.get(tag_url);

time.sleep(10)
html = driver.page_source
soup = BeautifulSoup(html)

#insta = soup.select("a[class*='x1i10hfl']");

# href 들어있는 a tag 가져오기
insta = soup.select("article[class*='_aao7'] > div[class*='x1qjc9v5'] a")

n = 1
cell_line = []
for i in insta:
    href_url = "https://www.instagram.com" + i.get_attribute_list('href')[0]
    print("POST ADDRESS")
    print(href_url)
    cell_line.append(href_url)

    # n += 1
    # continue
    driver.get(href_url);
    time.sleep(3);

    try :
        image = driver.find_element(By.CSS_SELECTOR, "div[class*='x1i10hfl'] img[class*='x5yr21d']").get_attribute('src')
        urlretrieve(image, img_name + str(n) + '.jpg')
        n += 1
    except:
        print("It's not a photo")
        continue

print(cell_line)
print("# of data: ")
print(n)

driver.get(tag_url);

SCROLL_PAUASE_TIME = 1.5
time.sleep(SCROLL_PAUASE_TIME)

#스크롤을 내려준다
last_height = driver.execute_script("return document.body.scrollHeight")
driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
time.sleep(SCROLL_PAUASE_TIME)
new_height = driver.execute_script("return document.body.scrollHeight")

if new_height == last_height:
    driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
    time.sleep(SCROLL_PAUASE_TIME)
    new_height = driver.execute_script("return document.body.scrollHeight")
    if new_height == last_height:
        print("THE END")
    else:
        print("scrolling")
        last_height = new_height
        # continue
time.sleep(SCROLL_PAUASE_TIME)


print(cell_line)
print("Done!")
driver.close()