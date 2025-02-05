# Проект авторизации с поддержкой темы (светлая/тёмная) и сохранением состояния в localStorage

Это веб-приложение, реализующее страницу авторизации (Auth), страницу регистрации (Register) и страницу профиля (Profile). Проект использует тему, которая поддерживает переключение между светлой и тёмной темами, а также системную тему, определяемую предпочтениями пользователя (например, в зависимости от настроек ОС).

## Технологии
- **React** — библиотека для построения пользовательских интерфейсов.
- **TypeScript** — для статической типизации.
- **Material-UI (MUI)** — для стилизации компонентов.
- **React Router** — для маршрутизации.
- **React Context API** — для глобального управления состоянием темы.
- **Axios** — для отправки запросов на сервер (для работы с авторизацией).
- **localStorage** — для сохранения состояния темы между сессиями.
- **Prettier** — для внешнего вида кода.
- **ESlint** — для правильности составления кода.

## Структура проекта

Проект организован по принципам **Feature-Sliced Design (FSD)**, с разделением на компоненты и страницы:

- **`src/app`** — базовые файлы конфигурации, layout, роуты и управление темой.
- **`src/pages`** — страницы приложения: авторизация (`Auth.tsx`) и профиль (`Profile.tsx`).
- **`src/shared/ui`** — общие UI-компоненты, такие как кнопка переключения темы.
- **`src/shared/api`** — общая конфигурация api.
- **`src/shared/types`** — общие типы.

## Как запустить проект

### 1. Клонировать репозиторий

```bash
git clone https://github.com/Mister-Gallardo/Crypton_Auth_App.git
```

### 2. Установить зависимости

Перейдите в папку проекта и установите все необходимые зависимости:

```bash
cd Crypton_Auth_App
npm install
```

### 3. Запустить проект

Запустите проект в режиме разработки:

```bash
npm run dev
```

Приложение будет доступно по адресу [http://localhost:5173](http://localhost:5173).

## Описание работы

### Страница авторизации (Auth)
- Пользователь вводит свои данные для авторизации.
- Токен пользователя сохраняется в `localStorage`.
- Приложение сохраняет состояние темы и текущий режим (светлый/тёмный/системный) в `localStorage`.

### Страница регистрации (Register)
- Пользователь вводит данные для регистрации.
- Токен пользователя сохраняется в `localStorage`.
- Приложение сохраняет состояние темы и текущий режим (светлый/тёмный/системный) в `localStorage`.

### Страница профиля (Profile)
- При успешной авторизации пользователь перенаправляется на страницу профиля.
- Все настройки темы сохраняются и применяются, включая фон страницы и интерфейса.

### Переключение темы
- Кнопка для изменения темы доступна на обеих страницах.
- Тема может быть:
  - **Светлая**
  - **Тёмная**
  - **Системная** (выбирается в зависимости от предпочтений пользователя в системе)

## Важные компоненты

- **ThemeContext** — Контекст для управления текущей темой и сохранения её состояния.
- **PageWrapper** — Общий компонент обёртки для страниц авторизации и профиля с кастомными стилями.
- **ThemeToggleButton** — Кнопка для переключения между темами, доступная на всех страницах.

## Примечания

1. Тема сохраняется в `localStorage` и применяется на всех страницах.
2. Страница профиля доступна только после успешной авторизации.
3. Приложение использует систему тем, которая автоматически подстраивается под предпочтения операционной системы (системная тема).

## Особенности деплоя на GitHub Pages

### Решение проблемы с маршрутизацией при использовании BrowserRouter  

Для корректной работы приложения на GitHub Pages с `BrowserRouter` вместо `HashRouter` пришлось внести следующие изменения:  

1. **Файлы:**  
   - Добавлен `404.html` в корневую директорию для перенаправления запросов на главную страницу приложения. Данный файл на GitHub Pages открывается только в случае перехода по несуществующему пути. 
   - В `index.html` добавлен скрипт для корректной обработки маршрутов после перенаправления.  

2. **Библиотеки:**  
   - Установлен пакет `cpx` для копирования файлов:  
     ```bash
     npm install cpx --save-dev
     ```

3. **Скрипты:**  
   В `package.json` добавлен скрипт для копирования файла `404.html` при сборке:  
   ```json
   "build": "tsc -b && vite build && npx cpx 404.html dist/"
