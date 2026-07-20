<div align="center">
  <!-- Dynamic Modern Waving Header -->
  <img src="https://capsule-render.vercel.app/api?type=waving&color=timeAuto&height=220&section=header&text=NEXUS%20AI&fontSize=80&fontAlignY=35&animation=fadeIn&fontColor=ffffff" width="100%"/>

  <!-- Animated Typing Subtitle -->
  <a href="#">
    <img src="https://readme-typing-svg.demolab.com?font=Inter&weight=500&size=20&pause=2000&color=8B5CF6&center=true&vCenter=true&width=800&lines=Ultra-Professional+DeepAI+Reverse-Engineering+Client;Bypass+Token+Limitations+Dynamically;Unlock+HD+Image+Generation+%26+Vision+AI;Seamless+Integration+for+CLI+%26+REST+API;Full-Stack+AI+Weaponized+Framework" alt="Typing SVG" />
  </a>

  <!-- Animated Badges -->
  <p align="center">
    <img src="https://img.shields.io/badge/Runtime-Node.js%20v16+-8B5CF6.svg?style=for-the-badge&logo=node.js&logoColor=black">
    <img src="https://img.shields.io/badge/Architecture-CLI%20%26%20REST%20Daemon-111111.svg?style=for-the-badge">
    <img src="https://img.shields.io/badge/Status-Fully%20Weaponized-8B5CF6.svg?style=for-the-badge">
  </p>
  
  <br>

  <!-- Sleek Modern Tech GIF -->
  <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNWRhNTFhMjI5YTg4NDNjNWEzNmNjMWJkNjJiZjM1YmI3ODU4YWM4YiZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/2IudUHdI075HL02Pkk/giphy.gif" width="600" style="border-radius:12px; box-shadow: 0px 0px 25px rgba(139, 92, 246, 0.4);" alt="Modern AI Cyber Animation">
</div>

<!-- Animated Glowing Line Separator -->
<p align="center">
  <img src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png" width="100%">
</p>

<details open>
  <summary><b>📑 Table of Contents</b></summary>
  <ol>
    <li><a href="#-system-overview">System Overview</a></li>
    <li><a href="#-core-architecture--features">Core Architecture & Features</a></li>
    <li><a href="#-supported-models-matrix">Supported Models Matrix</a></li>
    <li><a href="#-deployment--usage">Deployment & Usage</a></li>
    <li><a href="#-disclaimer">Disclaimer</a></li>
  </ol>
</details>

<p align="center">
  <img src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png" width="100%">
</p>

## 🔮 System Overview

**NEXUS AI** (`dp.js`) represents the pinnacle of unofficial AI clients. Engineered with a dynamic token-generation algorithm, it seamlessly bypasses standard platform limitations. This allows developers to effortlessly scale and access **Premium AI Models**, **High-Definition Image Synthesis**, and native **Vision AI capabilities**. 

Operates natively in two professional environments:
- 💻 **Interactive CLI:** Sleek terminal-based interface with graceful rendering.
- 🌐 **REST API Daemon:** Headless backend service designed for enterprise integration.

---

## ⚡ Core Architecture & Features

| Capability | Technical Description | Status |
| :--- | :--- | :---: |
| 🛡️ **Dynamic Signature** | Reverse-engineered `generateIslandKey` payload executing fresh cryptographic token generation per request. | `✅ Active` |
| 🖼️ **HD Synthesis** | Programmatic access to High-Definition Text-to-Image pipeline with `Negative Prompt` processing. | `✅ Active` |
| 🧠 **Neural Chat Bypass** | Intercepts and unlocks 10 world-class LLMs (including DeepSeek V3.2 & GPT-5 Nano) retaining history context. | `✅ Active` |
| 👁️ **Vision Analysis** | Native binary file-upload integration securely linked to Vision-capable LLMs. | `✅ Active` |
| 🔌 **API Daemon** | Embedded Express.js engine translating CLI execution into standard JSON HTTP routes. | `✅ Active` |

---

## 📦 Supported Models Matrix

Models augmented with the **Vision** protocol natively parse image attachments.

| Model ID | Provider / Engine | Vision Capability |
| :--- | :--- | :---: |
| `standard` | DeepAI Engine | ❌ |
| `deepseek-v3.2` | DeepSeek | ❌ |
| `gpt-oss-120b` | Open Source | ❌ |
| `llama-4-scout` | Meta | 👁️ `Supported` |
| `llama-3.3-70b-instruct`| Meta | ❌ |
| `llama-3.1-8b-instant` | Meta | ❌ |
| `gemini-2.5-flash-lite` | Google | 👁️ `Supported` |
| `gemma-4` | Google | 👁️ `Supported` |
| `gpt-4.1-nano` | OpenAI | ❌ |
| `gpt-5-nano` | OpenAI | 👁️ `Supported` |

---

## 🚀 Deployment & Usage

### 1️⃣ Command Line Interface
Launch the unified CLI matrix natively:

```bash
node dp.js
```

> **💡 Integrating Vision in CLI:** 
> Prepend `[image]` alongside the absolute path to inject visual data into supported models:
> ```text
> USER  > [image] "C:\Path\To\Your\Image.png" Please analyze this document.
> ```

<br>

### 2️⃣ REST API Daemon
Deploy the engine as a headless HTTP service (`http://localhost:3000`):

```bash
node dp.js --api
```

#### Vision + Chat Route (`POST /api/chat`)
```json
{
  "model": "gemma-4",
  "messages": [
    { 
      "role": "user", 
      "content": "Describe the attached data.",
      "attachment_uuids": ["df99118c-8bdb-4bd9-8bb5-f783e27db59a"]
    }
  ]
}
```

<p align="center">
  <img src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png" width="100%">
</p>

## ⚠️ Disclaimer

> *"Hackers become a little stinkier every time they hack."*

This repository is built strictly for **Educational and Research Purposes**. The author assumes no liability for misuse. Use responsibly.

<div align="center">
  <br>
  <!-- Animated Creator Title -->
  <img src="https://readme-typing-svg.demolab.com?font=Inter&weight=800&size=25&pause=3000&color=8B5CF6&center=true&vCenter=true&width=800&lines=Designed+%26+Engineered+by+lanncodex;Open+Source+Excellence" alt="Creator" />
  
  <br>
  <!-- Animated Waving Footer -->
  <img src="https://capsule-render.vercel.app/api?type=waving&color=timeAuto&height=150&section=footer&animation=twinkling" width="100%"/>
</div>
