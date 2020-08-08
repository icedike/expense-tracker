# 老爸的私房錢
一個使用 Node.js + Express + Handlebars + mongoose打造的個人記帳個人記帳本，此專案提供使用者紀錄、查看、修改與刪除個人日常記帳。

## 網站功能
* 查看所有消費記錄
* 依照消費進行分類
* 增加新的消費記錄
* 編輯消費記錄
* 刪除消費記錄
  
## 環境建置與需求
* Node.js v13.12.0
* Express v4.17.1
* Express-Handlebars v5.1.0
* Body-parser v1.19.0"
* Mongoose v5.9.25

## 啟動方式
* 將專案clone到本地端

```
git clone https://github.com/icedike/expense-tracker.git
```

* 切至專案資料夾
```
cd expense-tracker
```

* 安裝套件

```
npm install
```

* 創造DB資料

```
npm run seed
```

* 開啟程式

```
npm run start
```

* 請至 <http://localhost:3000> 開始使用