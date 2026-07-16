# Sandbox Project

![Code Coverage](https://img.shields.io/badge/coverage-29.03%25-red)

## 📌 專案簡介

這是一個全端練習專案，整合 **Python 後端** 與 **前端技術**，並採用精簡化的業界常用套件。

## 🚀 環境安裝

### 套件管理

本專案用 `pyproject.toml` 管理 Python 依賴（未使用 `requirements.in/.txt`）。

```bash
git clone https://github.com/windmars13/sandbox.git
cd sandbox

# 建立虛擬環境
python -m venv .venv
# Windows: .venv\Scripts\activate
# macOS/Linux: source .venv/bin/activate

# 安裝專案（editable 模式，src-layout 需要）
python -m pip install -e ".[dev]"

# 前端依賴
npm ci
```

> 更現代做法：用 [`uv`](https://github.com/astral-sh/uv) 取代 `venv + pip`，
> `uv sync` 一行搞定虛擬環境建立 + 安裝 + lockfile，速度快非常多。

## 🧪 測試

使用 pytest 作為測試框架，並整合 coverage 進行覆蓋率檢查。

```
python -m pytest -v
```

測試結果會顯示通過情況與覆蓋率報告。

## 🛠 工具

本專案使用以下工具與平台，符合業界常見開發環境：

Python 3.12 → 後端程式語言（版本以 `pyproject.toml` 的 `requires-python` 為準）

VS Code → 主流 IDE

GitHub Actions (CI/CD) → 自動化測試與部署

pytest / coverage / ruff → 測試與程式碼品質工具（Ruff 取代 black + flake8 + isort，設定見 `pyproject.toml`）

## 📂 專案結構

```text
sandbox/
├── backend/          # 後端程式碼 (Python, PHP)
├── frontend/         # 前端程式碼 (HTML, CSS, JS, Vue)
├── src/              # 核心模組
├── tests/            # 測試案例
├── .github/          # GitHub Actions CI/CD 設定
├── requirements.in   # 開發需求清單 (不鎖版本)
├── requirements.txt  # 部署需求清單 (鎖版本)
├── README.md         # 專案說明文件
├── pytest.ini        # 測試設定
├── .editorconfig     # 編碼與縮排規範
└── .gitignore        # 忽略檔案設定
```

## 🎯 專案特色

- ✅ 精簡化套件清單 → 保留業界常用套件，避免冗餘依賴
- ✅ 雙檔案管理 → `requirements.in` + `requirements.txt`，兼顧開發彈性與部署穩定性
- ✅ 測試驅動開發 (TDD) → 使用 pytest 與 coverage 確保程式品質
- ✅ 跨語言支援 → Python、PHP、JS、SQL，符合全端開發需求
- ✅ CI/CD 整合 → GitHub Actions 自動化測試與部署

## 📌 未來規劃

- 整合 Docker，提升跨平台部署能力
- 增加更多測試案例，提升覆蓋率
- 強化前端框架（Vue/React）與後端 API 整合
- 導入 lint 工具（flake8, eslint）確保程式碼一致性
- 建立 CI/CD pipeline，模擬業界團隊合作流程

## 👤 作者

- Kai
- 全端工程師培訓中，專注於 Python 後端與前端整合
- 專案目的：作為學習與職場作品集的一部分

```

```
