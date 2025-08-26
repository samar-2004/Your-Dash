import Layout from './components/Layout.jsx';
import { ThemeProvider } from './context/ThemeProvider.jsx';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Overview from './pages/Overview.jsx';
import Tasks from './pages/Tasks.jsx';
import Settings from './pages/Settings.jsx';

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Overview />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
          <Route path="*" element={<div>Not found</div>} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
