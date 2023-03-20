from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.common.exceptions import TimeoutException

import time
import random
import os
import numpy as np
import pandas as pd

CHROMEDRIVER_PATH = "./chromedriver"
URL = "https://www.sephora.com"

class SeleniumScrapper:

    def __init__(self):
        self.set_chrome_options()
        # self.driver.get(url=URL)

    def set_chrome_options(self):
        chrome_options = Options()
        prefs = {"profile.default_content_setting_values.notifications" : 2}
        chrome_options.add_experimental_option("prefs",prefs)
        chrome_options.add_argument('--headless')
        chrome_options.add_argument('--no-sandbox')
        chrome_options.add_argument('--disable-dev-shm-usage')
        self.driver = webdriver.Chrome(CHROMEDRIVER_PATH,options=chrome_options)

    def search_image_url(self, query):
        query = query.replace(" ", "%20")
        self.driver.get(URL + "/search?keyword=" + query)

        # # Find the input element using XPath
        # input_element = self.driver.find_element(By.XPATH, value='//input[@type="search"]')

        # # Clear the input field (optional, if there's any default value)
        # input_element.clear()

        # # Fill the input field with the desired value
        # input_element.send_keys(query + "\n")

        # Close login
        try:
            close_button = self.driver.find_element(By.XPATH, value='//button[@data-at="close_button"]')
            close_button.click()
        except:
            pass

        try:
            close_button = self.driver.find_element(By.XPATH, value='//button[@data-at="modal_close"]')
            close_button.click()
        except:
            pass

        # Get the first product image
        is_done = 0
        try:
            img_element = self.driver.find_element(By.XPATH, value='//div[@style="order: 0;"]//img')
            is_done = 1
        except:
            pass

        h1 = self.driver.find_element(by=By.TAG_NAME, value="h1")
        if "no search results" in h1.text.lower():
            return ''

        if not is_done:
            try:
                img_element = self.driver.find_element(
                    By.XPATH,
                    value='//button[@data-comp="ProductImage StyledComponent BaseComponent "]//picture/img'
                )
            except:
                pass


        # Get link
        try:
            url = img_element.get_attribute("srcset").split(", ")[0].split(" ")[0]
        except:
            url = ''

        return url
    
    def search_image_url_from_url(self, url):
        self.driver.get(url)

        # Close login
        try:
            close_button = self.driver.find_element(By.XPATH, value='//button[@data-at="close_button"]')
            close_button.click()
        except:
            pass

        try:
            close_button = self.driver.find_element(By.XPATH, value='//button[@data-at="modal_close"]')
            close_button.click()
        except:
            pass

        # Get the first product image
        img_element = self.driver.find_element(
            By.XPATH,
            value='//button[@data-comp="ProductImage StyledComponent BaseComponent "]//picture/img'
        )

        # Get link
        url = img_element.get_attribute("srcset").split(", ")[0].split(" ")[0]

        return url

if __name__ == "__main__":


    scrapper = SeleniumScrapper()
    df = pd.read_csv("preprocessed_estee_lauder.csv")
    n = df.shape[0]
    # ctr = 0
    # for i in range(n):
    #     print(f"Working on {i+1}/{n} product", end="\r")
    #     if df.iloc[i, -1] is not np.nan:
    #         continue
    #     time.sleep(random.randint(5, 8))
    #     subset = df.iloc[i,:]
    #     url = subset["URL"]
    #     query = subset["search_name"]
    #     try:
    #         df.iloc[i,-1] = scrapper.search_image_url(query=query)
    #     except:
    #         pass
    #     ctr += 1
    #     if ctr % 10 == 0:
    #         df.to_csv("preprocessed_estee_lauder.csv", index=False)

    for i in range(n):
        idx = df["index"][i]
        print(f"Working on product {idx}/{n}", end='\r')
        filepath = f"imgs/{idx}.png"
        if os.path.exists(filepath):
            continue
        if df["image_url"][i] is np.nan:
            continue
        time.sleep(random.randint(5, 7))
        image_url = df["image_url"][i]
        scrapper.driver.get(image_url)
        scrapper.driver.save_screenshot(filename=filepath)