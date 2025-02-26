import { Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router';
import { Slide, ToastContainer } from 'react-toastify';

export function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html lang='en'>
            <head>
                <meta charSet='utf-8' />
                <meta name='viewport' content='width=device-width, initial-scale=1' />
                <Meta />
                <Links />
                <link rel='stylesheet' href='/app/app.css' />
            </head>
            <body>
                {children}
                <ScrollRestoration />
                <Scripts />
                <div>
                    <ToastContainer position='top-right' autoClose={3400} hideProgressBar newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme='dark' transition={Slide} />
                </div>
            </body>
        </html>
    );
}

export default function App() {
    return <Outlet />;
}
