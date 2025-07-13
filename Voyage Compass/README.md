# Voyage Compass 專案說明書與使用手冊

## 📋 目錄
1. [專案概述](#專案概述)
2. [技術架構](#技術架構)
3. [目錄結構](#目錄結構)
4. [頁面功能說明](#頁面功能說明)
5. [API 整合指南](#api-整合指南)
6. [部署說明](#部署說明)
7. [開發指南](#開發指南)

---

## 🎯 專案概述

### 專案名稱
**Voyage Compass - 跨國職涯導航儀**

### 專案目標
為想出國工作的專業人士提供城市選擇指南，透過角色情境分析、城市比較、薪資支出計算等功能，協助用戶做出最佳職涯決策。

### 核心功能
- **角色情境分析**：4種不同職涯發展模式
- **城市探索**：10個主要國際城市詳細資訊
- **視覺化數據**：雷達圖、薪資比較、生活成本分析
- **響應式設計**：支援桌面與行動裝置

---

## 🏗️ 技術架構

### 前端技術
- **HTML5**：語義化標籤，無障礙設計
- **CSS3**：Flexbox/Grid 佈局，響應式設計
- **JavaScript (ES6+)**：動態內容載入，隨機圖片顯示
- **Font Awesome**：圖示庫
- **Tailwind CSS**：實用優先的 CSS 框架

### 設計特色
- **左側導航選單**：固定式側邊欄，支援折疊
- **全螢幕 Banner**：動態背景圖片，隨機顯示
- **卡片式佈局**：角色與城市資訊展示
- **雷達圖視覺化**：技能與城市評分展示

---

## 📁 目錄結構

```
Voyage Compass/
├── assets/
│   ├── css/
│   │   ├── main.css              # 主要樣式
│   │   ├── custom.css            # 自定義樣式
│   │   ├── index-custom.css      # 首頁專用樣式
│   │   ├── fontawesome-all.min.css
│   │   └── noscript.css
│   ├── js/
│   │   ├── main.js               # 主要 JavaScript
│   │   ├── index-custom.js       # 首頁專用 JS
│   │   ├── jquery.min.js
│   │   └── util.js
│   ├── images/
│   │   ├── large/                # 大圖檔案 (49個)
│   │   └── *.png                 # 一般圖檔 (52個)
│   ├── sass/                     # Sass 原始檔
│   └── webfonts/                 # 字型檔案
├── sample assets/                # 設計資源 (27個)
├── labor_data/                   # 勞動數據資料
├── index.html                    # 首頁
├── character1.html               # 角色情境頁面
├── [城市名稱].html               # 10個城市頁面
└── [角色名稱].html               # 4個角色頁面
```

---

## 📄 頁面功能說明

### 1. 首頁 (index.html)
**功能**：專案入口，展示核心概念與導航
- **隨機 Banner**：每次載入隨機顯示 `assets/images/large/` 中的城市圖片
- **角色情境區塊**：4種職涯發展模式介紹
- **城市探索區塊**：10個城市縮圖與簡介

**關鍵元素**：
```html
<!-- 隨機 Banner 實作 -->
<section class="hero-section" id="index-banner">
<script>
const bannerImages = ['bangkok1.jpg', 'london1.jpg', ...];
const randomImg = bannerImages[Math.floor(Math.random() * bannerImages.length)];
// 設定背景圖片
</script>
```

### 2. 角色情境頁面
**頁面**：`rocket-dev.html`, `steady-pro.html`, `nomad-coder.html`, `startup-maverick.html`

**功能**：
- 角色詳細介紹
- 適合的城市推薦
- 職涯發展建議

### 3. 城市頁面
**頁面**：`new-york-city.html`, `london.html`, `singapore.html` 等

**功能**：
- 城市背景介紹
- 就業市場分析
- 生活成本比較
- 雷達圖視覺化

**關鍵結構**：
```html
<div class="city-profile-header" data-city="city-name">
    <!-- 動態背景圖片 -->
</div>
<section class="employment-section">
    <div class="radar-chart">
        <!-- SVG 雷達圖 -->
    </div>
    <div class="data-section">
        <!-- 數據表格 -->
    </div>
</section>
```

---

## 🔌 API 整合指南

### 1. 數據結構建議

#### 城市數據格式
```json
{
  "city_id": "new-york",
  "name": "New York",
  "name_zh": "紐約",
  "description": "全球金融中心，無限可能的職涯發展機會",
  "banner_image": "assets/images/large/new_york_1.jpeg",
  "thumbnail": "assets/images/New York.png",
  "employment_data": {
    "average_salary": 85000,
    "currency": "USD",
    "job_market_score": 95,
    "cost_of_living": 85,
    "quality_of_life": 80,
    "tech_ecosystem": 90
  },
  "radar_chart_data": {
    "salary_growth": 9,
    "job_opportunities": 10,
    "work_life_balance": 7,
    "cost_of_living": 6,
    "cultural_diversity": 10,
    "innovation": 9
  }
}
```

#### 角色數據格式
```json
{
  "role_id": "rocket-dev",
  "name": "Rocket Dev",
  "name_zh": "火箭升薪衝履歷",
  "description": "專為追求快速職涯成長的開發者設計",
  "icon": "sample assets/radar.gif",
  "suitable_cities": ["san-francisco", "new-york", "london"],
  "career_advice": [
    "專注於高成長技術領域",
    "積極參與開源專案",
    "建立個人品牌"
  ]
}
```

### 2. Flask API 整合建議

#### 主要端點設計
```python
# Flask 路由建議
@app.route('/api/cities')
def get_cities():
    """獲取所有城市列表"""
    pass

@app.route('/api/cities/<city_id>')
def get_city_detail(city_id):
    """獲取特定城市詳細資訊"""
    pass

@app.route('/api/roles')
def get_roles():
    """獲取所有角色列表"""
    pass

@app.route('/api/roles/<role_id>')
def get_role_detail(role_id):
    """獲取特定角色詳細資訊"""
    pass

@app.route('/api/recommendations/<role_id>')
def get_recommendations(role_id):
    """根據角色獲取推薦城市"""
    pass
```

#### 前端整合方式
```javascript
// 動態載入城市數據
async function loadCityData(cityId) {
    const response = await fetch(`/api/cities/${cityId}`);
    const cityData = await response.json();
    
    // 更新頁面內容
    updateCityPage(cityData);
}

// 更新雷達圖
function updateRadarChart(data) {
    // 使用現有的 SVG 結構更新數據
    const radarChart = document.querySelector('.radar-chart svg');
    // 更新路徑數據
}
```

### 3. 數據更新機制

#### 靜態數據更新
- 城市資訊：修改 JSON 檔案或資料庫
- 圖片資源：替換 `assets/images/` 中的檔案
- 樣式調整：修改 CSS 檔案

#### 動態數據整合
- 薪資數據：從外部 API 獲取實時數據
- 匯率資訊：整合外匯 API
- 就業市場：連接招聘平台 API

---

## 🚀 部署說明

### 1. 靜態檔案部署
```bash
# 直接部署到 Web 伺服器
cp -r "Voyage Compass/" /var/www/html/

# 或使用 Python 簡單伺服器
cd "Voyage Compass"
python3 -m http.server 8000
```

### 2. Flask 整合部署
```python
# app.py
from flask import Flask, render_template, jsonify
import os

app = Flask(__name__)

# 靜態檔案路徑設定
app.static_folder = 'assets'
app.static_url_path = '/assets'

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/city/<city_name>')
def city_page(city_name):
    return render_template(f'{city_name}.html')

if __name__ == '__main__':
    app.run(debug=True)
```

### 3. 環境需求
- **Web 伺服器**：Apache, Nginx, 或 Python SimpleHTTPServer
- **瀏覽器支援**：Chrome 60+, Firefox 55+, Safari 12+
- **檔案權限**：確保圖片檔案可讀取

---

## 👨‍💻 開發指南

### 1. 新增城市頁面
1. 複製現有城市頁面模板
2. 修改 `data-city` 屬性
3. 更新城市特定內容
4. 在 CSS 中新增背景圖片設定
5. 更新導航選單

### 2. 修改樣式
- **主要樣式**：`assets/css/main.css`
- **自定義樣式**：`assets/css/custom.css`
- **首頁專用**：`assets/css/index-custom.css`

### 3. 圖片管理
- **大圖**：`assets/images/large/` (banner 背景)
- **縮圖**：`assets/images/` (城市卡片)
- **圖示**：`sample assets/` (角色圖示)

### 4. 響應式設計
- 使用 CSS Grid 和 Flexbox
- 媒體查詢斷點：768px, 1024px
- 行動裝置優先設計

---

## 📊 數據來源與維護

### 1. 勞動數據 (labor_data/)
- 首爾勞動市場數據
- 薪資統計資訊
- 就業趨勢分析

### 2. 圖片資源
- 城市景觀照片
- 角色圖示 (GIF/PNG)
- Logo 與品牌元素

### 3. 內容更新流程
1. 更新數據檔案
2. 修改對應 HTML 頁面
3. 測試響應式顯示
4. 部署到伺服器

---

## 🔧 故障排除

### 常見問題
1. **圖片無法顯示**：檢查檔案路徑與權限
2. **樣式未載入**：確認 CSS 檔案路徑正確
3. **響應式問題**：檢查媒體查詢設定
4. **JavaScript 錯誤**：查看瀏覽器開發者工具

### 除錯工具
- 瀏覽器開發者工具
- 網路標籤檢查檔案載入
- 控制台查看 JavaScript 錯誤

---

## 📞 聯絡資訊

如有技術問題或需要進一步協助，請聯繫開發團隊。

---

*最後更新：2024年7月8日* 