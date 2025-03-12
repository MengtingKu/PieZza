# PieZza - 義大利美食網站

PieZza 是一個使用 React、Vite 以及 JavaScript 語言建構的義大利美食網站，旨在展示義大利美食的資訊與圖片。

本專案僅作為個人作品展示，並不涉及任何營利行為。

## Demo

https://mengtingku.github.io/PieZza/

## 功能介紹

-   **互動式界面**：使用 Swiper.js 實現圖片輪播，並運用 Bootstrap5.3 和 SCSS 提供現代化的響應式設計。
-   **美食瀏覽**：展示多種義大利美食，包含圖片、簡介與詳細內容。
-   **動畫效果**：利用 Animate.css 和 SweetAlert2 為網站增添動態效果和互動提示，例如，收藏喜歡的商品。
-   **購物車結帳流程**：使用者可以進入購物車頁面一系列的按照指示完成結帳流程。
-   **抽獎系統**：進入結帳流程前有一個一天一抽的翻牌活動，增加結帳驚喜體驗。

## 技術架構

-   **React**：構建網站的用戶介面。
-   **Vite**：作為開發伺服器，提供快速的即時更新。
-   **React Router**：用於網站路由管理。
-   **Redux Toolkit (RTK)**：用於狀態管理。
-   **Bootstrap 5.3**：提供現成的 UI 組件和響應式設計。
-   **SCSS**：自定義樣式和主題。
-   **Axios**：處理 HTTP 請求，連接 RESTful API。
-   **Font Awesome**：因應全域需求，另切元件統一管理圖示字型來增強視覺效果。

1. 前台：

    - **Swiper.js**：除了首頁，產品說明頁也使用不同的輪播效果，達到多項商品展示功能。
    - **React Modal Image**：因應小尺寸畫面圖片無法全展示，所以使用模態框可以放大圖片。

2. 後台：
    - **ECharts.js**：用於展示圖表數據。
    - **React-datepicker**：優惠券到期日，但已經套用 BootStrap UI 所以使用僅有提供日期選擇器功能的輕量型套件。

## 安裝與使用

```
git clone https://github.com/MengtingKu/PieZza.git

cd PieZza

npm install

npm run dev
```

## 致謝

先感謝過去幫助過我的人，因為有你們才有今天的我！

專案主要使用 React 框架，也結合過去實戰中的前端任務加入應用，例如：api 封裝、Echart.js 圖表實例話封裝成 hook 的方法、以及把表格、頁碼這類的元件以套件的概念設計，讓各種需求可以一次套用，減少重工和開發異常。

感謝有身邊的伙伴讓我完成這個電商任務，過程中出現很多問題，有些目前尚未解掉，至少大部分邏輯功能是正常的，感謝你們！

以下是專案從規劃 -> 開發 -> 前端手動測試的旅程紀錄，感謝自己的堅持，也感謝身邊有一堆夥伴的幫忙！

https://icy-exhaust-dd3.notion.site/19db543aa3fc80828317f14056d8a555?pvs=74
