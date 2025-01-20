from selenium import webdriver
from selenium.common.exceptions import WebDriverException, TimeoutException
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By


def get_html(form_url):
    driver = None
    try:
        # Initialize Chrome driver
        driver = webdriver.Chrome()

        # Get the page
        driver.get(form_url)

        # Wait for the body to be present (more reliable than sleep)
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.TAG_NAME, "body"))
        )

        # Get visible HTML
        visible_html = driver.execute_script("return document.body.innerHTML;")

        # Save HTML to file
        with open("form.html", "w", encoding="utf-8") as f:
            f.write(visible_html)

        return visible_html

    except WebDriverException as e:
        print(f"WebDriverException occurred: {e}")
        raise

    except TimeoutException as e:
        print(f"TimeoutException occurred: {e}")
        raise

    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        raise

    finally:
        # Ensure browser is closed even if an error occurs
        if driver:
            try:
                driver.quit()
            except Exception as e:
                print(f"Error while closing browser: {e}")