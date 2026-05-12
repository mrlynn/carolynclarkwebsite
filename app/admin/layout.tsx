import { redirect } from 'next/navigation';
import { Box, Container } from '@mui/material';
import { getSession } from '@/lib/auth';
import { AdminToolbar } from '@/components/admin/AdminToolbar';
import { brandColors } from '@/lib/theme';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let session = null;
  try {
    session = await getSession();

    // Redirect to login if not authenticated
    if (!session) {
      redirect('/login');
    }
  } catch (error) {
    // If there's any error getting the session, redirect to login
    redirect('/login');
  }

  return (
    <Box sx={{ minHeight: '100vh', background: brandColors.cream }}>
      <AdminToolbar userEmail={session?.email ?? null} />

      <Container maxWidth="lg" sx={{ paddingY: 4 }}>
        {children}
      </Container>
    </Box>
  );
}
