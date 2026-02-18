import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

try {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} catch (error) {
  console.error("Application failed to mount:", error);
  // Fallback UI in case of critical error
  rootElement.innerHTML = `<div style="padding: 20px; color: #ef4444; font-family: sans-serif;">
    <h1 style="font-size: 1.5rem; font-weight: bold; margin-bottom: 10px;">Application Error</h1>
    <p>The app failed to load. This is usually due to a configuration issue.</p>
    <pre style="background: #f3f4f6; padding: 10px; border-radius: 4px; overflow: auto;">${error instanceof Error ? error.message : String(error)}</pre>
  </div>`;
}