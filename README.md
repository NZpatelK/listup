# 📋 ListUp

**ListUp** is a smart and flexible list management app — perfect for managing to-dos, shopping lists, or any kind of list you need to keep track of. You can create multiple lists, add items, organize them by priority, and even move items between different lists.

## ✨ Features

* ✅ Add, edit, and delete list items
* 🗂️ Create, rename, and delete multiple lists
* ↕️ Sort items inside a list by priority (drag & drop)
* 🔄 Move items between lists
* 📑 Sort entire lists
* ⚡ Built with full client/server functionality using **Next.js**

## 🛠️ Tech Stack

* **Next.js** – React framework for both frontend and backend (App Router)
* **TypeScript** – Type safety for reliable development
* **Tailwind CSS** – For modern, responsive UI
* **Firebase Firestore** – Realtime NoSQL database for storing lists and items

## 🚧 Why Firebase?

Originally, this project was planned to use **AWS DynamoDB**. However, after finishing my student status, I found that AWS requires a **credit card** to sign up, even for free-tier usage. Since there's no option to use AWS without this requirement, I decided to switch to **Firebase Firestore**.

Even though I switched to Firebase, I'm still very interested in learning AWS in the future — as it’s one of the most widely used cloud platforms in the industry.

## 📦 Setup & Run Locally

```bash
git clone https://github.com/your-username/listup.git
cd listup
npm install
npm run dev
```

> You’ll need to set up a Firebase project and add your Firestore credentials in an `.env.local` file.

## 🙋‍♂️ Author

Built by Karan Patel — a self-learner passionate about building full-stack web apps.

