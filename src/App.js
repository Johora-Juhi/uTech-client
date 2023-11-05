import './App.css';
import { Toaster } from 'react-hot-toast';
import { RouterProvider } from 'react-router-dom';
import routes from './routes/routes';

function App() {
  return (
    <div className="App">
       <Toaster />
        <RouterProvider router={routes}></RouterProvider>
    </div>
  );
}

export default App;
