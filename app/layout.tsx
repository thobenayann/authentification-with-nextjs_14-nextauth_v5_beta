import { Toaster } from '@/components/ui/sonner';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Wine store management',
    description: 'Application for managing a wine store',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='fr'>
            <body className={inter.className}>
                <main>{children}</main>
                <Toaster />
            </body>
        </html>
    );
}
