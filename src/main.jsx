import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@assets/common/_reset.scss';
import '@assets/all.scss';
import { store } from '@/store.js';
import router from '@routes';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </StrictMode>
);
