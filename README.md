# 老爸的私房錢
一個使用 Node.js + Express + Handlebars + mongoose打造的個人記帳個人記帳本，此專案提供使用者紀錄、查看、修改與刪除個人日常記帳。

## 網站功能
* 查看所有消費記錄(by 月份 & 種類)
* 依照消費進行分類
* 增加新的消費記錄
* 編輯消費記錄
* 刪除消費記錄
  
## 環境建置與需求
* bcryptjs: v2.4.3
* body-parser: v1.19.0
* connect-flash: v0.1.1
* dotenv: v8.2.0
* express: v4.17.1
* express-handlebars: v5.1.0
* express-session: v1.17.1
* handlebars-helpers: v0.10.0
* method-override: v3.0.0
* mongoose: v5.10.0
* passport: v0.4.1
* passport-facebook: v3.0.0
* passport-local: v1.0.0

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

* 測試帳號：
| Account          | Password |
| ---------------- | -------- |
| root@example.com | 12345678 |

