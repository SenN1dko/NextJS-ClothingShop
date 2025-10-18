import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import ReactRouterProvider from './providers/ReactRouterProvider.jsx';
import TanstackQueryProvider from './providers/TanstackQueryProvider.jsx';

createRoot(document.getElementById('root')).render(
  <ReactRouterProvider>
    <TanstackQueryProvider>
      <App />
    </TanstackQueryProvider>
  </ReactRouterProvider>
);
