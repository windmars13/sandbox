# 這是一個簡單的網頁爬蟲範例，使用 requests 和 BeautifulSoup 來抓取 https://httpbin.org/html 網頁的標題和段落內容。
import requests
from bs4 import BeautifulSoup

def scrape_example():
    url = 'https://www.w3schools.com/'
    
    # 提示 1：讓你知道程式開始動了
    print(f"🚀 正在嘗試連線至：{url}...")
    
    try:
        response = requests.get(url)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # 提取title標題
        title_tag = soup.find('title')
        title = title_tag.text.strip() if title_tag else '找不到標題'
        print(f"\n✅ 抓取成功！")
        print(f"📌 [網頁標題]: {title}")
        
        # 提取所有段落
        paragraphs = soup.find_all('p')
        print(f"📄 [內容摘要]: 找到 {len(paragraphs)} 個段落\n")
        
        for i, p in enumerate(paragraphs, 1):
            # 使用 .strip() 讓印出來的文字更整齊，不會有奇怪的換行
            content = p.text.strip()
            print(f"   段落 {i}: {content[:50]}..." if len(content) > 50 else f"   段落 {i}: {content}")
            
        # 提示 2：明確告知任務結束
        print("\n✨ --- 所有資料抓取完畢 ---")

    except requests.RequestException as e:
        print(f"\n❌ 發生錯誤！無法抓取資料。")
        print(f"錯誤原因: {e}")

if __name__ == "__main__":
    scrape_example()