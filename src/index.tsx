import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@/app/providers/ThemeProvider';
import { StoreProvider } from '@/app/providers/StoreProvider';
import App from './app/App';
import '@/app/styles/index.scss';
import './shared/config/i18n/i18n';
import { ErrorBoundary } from './app/providers/ErrorBoundary';
import { createRoot } from 'react-dom/client';



const container = document.getElementById('root');
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(
        <BrowserRouter>
        <StoreProvider>
            <ErrorBoundary>
                <ThemeProvider>
                    <App />
                </ThemeProvider>
            </ErrorBoundary>
        </StoreProvider>
    </BrowserRouter>
);

// render(
//     <BrowserRouter>
//         <StoreProvider>
//             <ErrorBoundary>
//                 <ThemeProvider>
//                     <App />
//                 </ThemeProvider>
//             </ErrorBoundary>
//         </StoreProvider>
//     </BrowserRouter>,
//     document.getElementById('root'),
// );
