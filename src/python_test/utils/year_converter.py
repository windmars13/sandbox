def convert_roc_to_ad(roc_year):
    """將民國年份轉換為西元年份"""
    return roc_year + 1911

def main():
    print("--- 民國轉西元年份轉換器 ---")
    
    while True:
        user_input = input("請輸入民國年份 (輸入 'q' 離開): ")
        
        # 允許使用者隨時退出
        if user_input.lower() == 'q':
            print("程式結束，謝謝使用。")
            break
            
        # 防呆機制：確保輸入的是數字
        try:
            roc_year = int(user_input)
            ad_year = convert_roc_to_ad(roc_year)
            print(f"結果：民國 {roc_year} 年 對應西元 {ad_year} 年\n")
        except ValueError:
            print("錯誤：輸入無效，請確保您輸入的是數字！\n")

if __name__ == "__main__":
    main()