import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@/lib/theme';
import { ReactNode } from 'react';
import { MobilePhoneBar } from '@/components/MobilePhoneBar';

export const metadata = {
  title: 'Carolyn Clark | Myofascial Release & Therapeutic Massage',
  description: 'Licensed massage therapist specializing in John F. Barnes Myofascial Release in Phoenixville, PA.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
            <MobilePhoneBar />
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
