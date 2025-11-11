import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './firebaseConfig'
import reportWebVitals from './reportWebVitals';
import {Container} from "./Container";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {persistQueryClient} from "@tanstack/react-query-persist-client";
import {createAsyncStoragePersister} from "@tanstack/query-async-storage-persister";

const root = ReactDOM.createRoot(document.getElementById('root'));

const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 1000 * 60 * 60 * 12,
                cacheTime: 1000 * 60 * 60 * 24,
                refetchOnWindowFocus: false,
            },
        },
    }
);

const localStoragePersister = createAsyncStoragePersister({
    storage: window.localStorage,
});

persistQueryClient({
    queryClient,
    persister: localStoragePersister,
});

root.render(
    <QueryClientProvider client={queryClient}>
        <Container/>
    </QueryClientProvider>
);

reportWebVitals();
