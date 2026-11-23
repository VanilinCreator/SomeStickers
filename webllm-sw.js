import { ServiceWorkerMLCEngineHandler } from "https://esm.run/@mlc-ai/web-llm";

// Активуємо нову версію одразу та дозволяємо їй керувати поточною вкладкою.
self.addEventListener("install", event => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", event => {
  event.waitUntil(self.clients.claim());
});

// Обробник WebLLM має створюватися на верхньому рівні Service Worker.
new ServiceWorkerMLCEngineHandler();
