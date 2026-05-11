import { redirect } from 'next/navigation';
import { Box, AppBar, Toolbar, Typography, Container } from '@mui/material';
import { getSession } from '@/lib/auth';
import { LogoutButton } from '@/components/admin/LogoutButton';
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
      <AppBar
        position="static"
        color="inherit"
        elevation={0}
        sx={{
          backgroundColor: brandColors.creamDeep,
          color: brandColors.ink,
          boxShadow: '0 1px 0 rgba(43, 36, 32, 0.08)',
          borderBottom: `1px solid rgba(43, 36, 32, 0.06)`,
        }}
      >
        <Toolbar sx={{ color: brandColors.ink }}>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              fontWeight: 600,
              color: brandColors.ink,
            }}
          >
            Carolyn Clark - Admin Dashboard
          </Typography>
          {session && (
            <Typography
              variant="body2"
              component="span"
              sx={{
                marginRight: 2,
                color: brandColors.inkSoft,
              }}
            >
              {session.email}
            </Typography>
          )}
          <LogoutButton />
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ paddingY: 4 }}>
        {children}
      </Container>
    </Box>
  );
}
