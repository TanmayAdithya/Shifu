# Shifu

<p align="center">
  <a href="https://github.com/TanmayAdithya/Shifu" target="_blank" rel="noopener noreferrer">
     <img width="150" src="https://i.postimg.cc/cJrd25dT/Shifu-Logo-1-modified.png" alt="Project Logo">
  </a>
</p>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![GitHub Issues](https://img.shields.io/github/issues/TanmayAdithya/Shifu.svg)](https://github.com/TanmayAdithya/Shifu/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/TanmayAdithya/Shifu)](https://github.com/TanmayAdithya/Shifu/pulls)

</div>

<p align="center">A productivity web app designed to create customizable virtual workspaces with immersive environments, time management tools, and focus-enhancing features to boost productivity and concentration.</p>

## 📋 Table of Contents

- [🌟 Overview](#-overview)
- [⚒️ Built Using](#️-built-using)
- [⚙️ Technical Decisions](#-technical-decisions)
- [🔍 User Research](#-user-research)
- [📄 License](#-license)

## 🌟 Overview

![Demo GIF](public/assets/Shifu-GIF.gif)

📺 Full demo video: [Link](https://youtu.be/QzZhcsWUKvg)

Shifu aims to enhance productivity and focus through customizable virtual environments. It is user-friendly and designed to help users achieve their goals with minimal clicks. Key features include:

- **Immersive Virtual Workspaces:** Personalize your workspace to fit your unique workflow.
- **Comprehensive Task Management:** Access tools like notes, to-do lists, a timer, and an Eisenhower Matrix for prioritization.

Shifu addresses the challenges of digital distraction and promotes effective time management in a seamless browser-based environment.

## ⚒️ Built Using

<div>
    <img src="https://skillicons.dev/icons?i=ts,next,tailwind,redux,mongo,redis" />
    <img href="https://ui.shadcn.com/" width="48" style="border: 0; border-radius: 8px; margin-left: 4px" src="https://i.postimg.cc/yxcWQsB6/shadcn-modified-1.png" alt="Shadcn" />
    <img href='https://tiptap.dev/' width="48" style="border: 0; border-radius: 8px; margin-left: 4px" src="https://i.postimg.cc/4N2jLtLd/tiptap-modified-1.png" alt="TipTap" />
    <img href='https://tiptap.dev/' width='137' style="border: 0; border-radius: 8px; margin-left: 4px" src="https://dndkit.com/dnd-kit-logo.svg" alt="DnDKit" />
</div>

<kbd>TypeScript</kbd> <kbd>Next.js</kbd> <kbd>Tailwind</kbd> <kbd>Redux</kbd> <kbd>MongoDB</kbd> <kbd>Redis</kbd> <kbd>Shadcn UI</kbd> <kbd>TipTap</kbd> <kbd>DnD Kit</kbd>

## ⚙️ Technical Decisions

In developing this app, I made several key technical decisions to enhance performance and user experience:

- **Debounce Search:**  
  I implemented a debounce search function with a 1 ms delay after typing the last letter. This significantly reduces the number of API calls, leading to around an 80% reduction in network requests based on average typing speed.

- **Redis Caching:**  
  To prevent exhausting the rate limit of the Unsplash API, I used Redis for caching default background images. This not only speeds up loading times but also minimizes unnecessary API calls.

- **MongoDB Singleton Instance:**  
  I employed a singleton instance for MongoDB to avoid creating multiple connections, which helps prevent exceeding the limit of 500 concurrent connections.

- **Placeholder Data:**  
  When the rate limit is exhausted, I use placeholder data for videos and images. This ensures users can still access backgrounds while waiting for the API limit to reset.

## 🔍 User Research

I looked at LifeAt.io to improve user experience by making navigation easier. I found that users want to reach their goals with as few clicks as possible. To help with this, I created a clear layout, added tooltips for guidance, and included easy-to-use controls for exploring data.

### 👤 User-Centered Design

This project uses feedback from LifeAt users on [canny.io](https://lifeat.canny.io/), which shaped many features and design choices in this app. Here are some key insights:

- **Minimalistic Interface:**  
  Users wanted to clear their workspace to reduce distractions:

  > _"The ability to empty the screen completely is central to why I use LifeAt."_

  In response, the app automatically hides the navigation bar after 5 seconds of inactivity.

- **Navigation Preferences:**  
  I found a nearly equal split in preference between a side and a bottom navigation bar. I chose the bottom navigation to improve visual clarity, reduce clutter, and allow quick access to essential functions.

- **Timer:**  
  I added a stopwatch with the Pomodoro timer based on user suggestions:

  > _"Add a stopwatch option along with the Pomodoro timer. It encourages me to see how long I have stayed focused and sort of challenges me to stay focused for even a longer time."_

- **Widget Layout & Movability:**  
  Users were frustrated with overlapping widgets:
  > _"Noticing that when I have multiple widgets open at once that are left aligned, they overlap and I can't move them."_

## 📄 License

Licensed under the GNU Affero General Public License Version 3.0.

<p align="right"><a href="#top">⬆️</a></p>
