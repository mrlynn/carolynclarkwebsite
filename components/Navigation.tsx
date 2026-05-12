'use client';

import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Divider,
  Menu,
  MenuItem,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { brandColors } from '@/lib/theme';
import Link from 'next/link';

const topLevelLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
] as const;

const serviceItems = [
  { label: 'Myofascial Release', href: '/mfr' },
  { label: 'Therapeutic Massage', href: '/massage' },
] as const;

const visitItems = [
  { label: 'What to Expect', href: '/what-to-expect' },
  { label: 'FAQ', href: '/faq' },
] as const;

const tailLinks = [
  { label: 'Resources', href: '/resources' },
  { label: 'Contact', href: '/contact' },
] as const;

const navButtonSx = {
  color: brandColors.inkSoft,
  fontSize: '0.95rem',
  fontWeight: 400,
  textTransform: 'none' as const,
  minWidth: 'auto',
  px: 0.75,
  py: 0.5,
  borderRadius: 1,
  position: 'relative' as const,
  '&:hover': {
    color: brandColors.terracotta,
    backgroundColor: 'transparent',
  },
};

function DesktopNavLink({ href, label }: { href: string; label: string }) {
  return (
    <Button
      variant="text"
      component={Link}
      href={href}
      sx={{
        ...navButtonSx,
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '0%',
          height: '2px',
          backgroundColor: brandColors.terracotta,
          transition: 'width 0.2s ease',
        },
        '&:hover::after': {
          width: '85%',
        },
      }}
    >
      {label}
    </Button>
  );
}

function DesktopNavGroup({
  title,
  items,
  menuId,
}: {
  title: string;
  items: readonly { label: string; href: string }[];
  menuId: string;
}) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  return (
    <>
      <Button
        variant="text"
        id={`${menuId}-button`}
        aria-controls={open ? `${menuId}-menu` : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        endIcon={
          <ExpandMoreIcon
            sx={{
              fontSize: 20,
              transition: 'transform 0.2s',
              transform: open ? 'rotate(180deg)' : 'none',
            }}
          />
        }
        onClick={(e) => setAnchorEl(e.currentTarget)}
        sx={{
          ...navButtonSx,
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: open ? '85%' : '0%',
            height: '2px',
            backgroundColor: brandColors.terracotta,
            transition: 'width 0.2s ease',
          },
          '&:hover::after': {
            width: '85%',
          },
        }}
      >
        {title}
      </Button>
      <Menu
        id={`${menuId}-menu`}
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        slotProps={{
          paper: {
            sx: {
              mt: 1,
              minWidth: 220,
              borderRadius: 2,
              border: `1px solid ${brandColors.creamDeep}`,
              boxShadow: '0 8px 24px rgba(43, 36, 32, 0.08)',
            },
          },
          list: {
            'aria-labelledby': `${menuId}-button`,
            dense: true,
          },
        }}
        transformOrigin={{ horizontal: 'left', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
      >
        {items.map((item) => (
          <MenuItem
            key={item.href}
            component={Link}
            href={item.href}
            onClick={() => setAnchorEl(null)}
            sx={{
              py: 1.25,
              fontSize: '0.95rem',
              color: brandColors.ink,
              '&:hover': { backgroundColor: `${brandColors.terracotta}12` },
            }}
          >
            {item.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

const subheaderSx = {
  bgcolor: brandColors.cream,
  color: brandColors.inkMute,
  fontSize: '0.7rem',
  fontWeight: 700,
  letterSpacing: '0.08em',
  lineHeight: 2.5,
  textTransform: 'uppercase' as const,
};

export function Navigation() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const closeDrawer = () => setDrawerOpen(false);

  return (
    <Box
      component="nav"
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backgroundColor: `${brandColors.cream}f0`,
        borderBottom: `1px solid ${brandColors.creamDeep}`,
        backdropFilter: 'blur(10px)',
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: { xs: '1rem 0', md: '1.5rem 0' },
            gap: { xs: 1, md: 2 },
            flexWrap: 'nowrap',
            minHeight: { xs: 56, md: 'auto' },
          }}
        >
          <Link href="/" style={{ textDecoration: 'none', minWidth: 0 }} onClick={closeDrawer}>
            <Typography
              sx={{
                fontSize: { xs: '1.05rem', sm: '1.25rem' },
                fontWeight: 600,
                color: brandColors.ink,
                cursor: 'pointer',
                transition: 'color 0.3s ease',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                maxWidth: { xs: '42vw', sm: 'none' },
                '&:hover': {
                  color: brandColors.terracotta,
                },
              }}
            >
              Carolyn Clark
            </Typography>
          </Link>

          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              gap: { md: 1, lg: 2 },
              alignItems: 'center',
              flexShrink: 1,
              minWidth: 0,
              justifyContent: 'flex-end',
            }}
          >
            {topLevelLinks.map((link) => (
              <DesktopNavLink key={link.href} href={link.href} label={link.label} />
            ))}
            <DesktopNavGroup title="Services" items={serviceItems} menuId="nav-services" />
            <DesktopNavGroup title="Your visit" items={visitItems} menuId="nav-visit" />
            {tailLinks.map((link) => (
              <DesktopNavLink key={link.href} href={link.href} label={link.label} />
            ))}
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, sm: 1 }, flexShrink: 0 }}>
            <IconButton
              color="inherit"
              aria-label="Open menu"
              edge="end"
              onClick={() => setDrawerOpen(true)}
              sx={{
                display: { xs: 'inline-flex', md: 'none' },
                color: brandColors.ink,
                minWidth: 44,
                minHeight: 44,
              }}
            >
              <MenuIcon />
            </IconButton>

            <Button
              variant="contained"
              href="/booking/service"
              onClick={closeDrawer}
              sx={{
                backgroundColor: brandColors.terracotta,
                color: brandColors.cream,
                padding: { xs: '8px 12px', sm: '10px 20px', md: '10px 24px' },
                fontSize: { xs: '0.8rem', sm: '0.9rem' },
                fontWeight: 600,
                textTransform: 'none',
                borderRadius: '999px',
                whiteSpace: 'nowrap',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: brandColors.terracottaDeep,
                  transform: 'translateY(-2px)',
                },
              }}
            >
              <Box component="span" sx={{ display: { xs: 'inline', sm: 'none' } }}>
                Book
              </Box>
              <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
                Book Now
              </Box>
            </Button>
          </Box>
        </Box>
      </Container>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={closeDrawer}
        slotProps={{
          paper: {
            sx: {
              width: 'min(100%, 320px)',
              backgroundColor: brandColors.cream,
              pt: 1,
            },
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: 2,
            py: 1,
            borderBottom: `1px solid ${brandColors.creamDeep}`,
          }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: 600, color: brandColors.ink }}>
            Menu
          </Typography>
          <IconButton aria-label="Close menu" onClick={closeDrawer} sx={{ color: brandColors.ink }}>
            <CloseIcon />
          </IconButton>
        </Box>

        <List sx={{ py: 0 }} disablePadding>
          <ListSubheader disableSticky sx={subheaderSx}>
            Main
          </ListSubheader>
          {topLevelLinks.map((link) => (
            <ListItemButton
              key={link.href}
              component={Link}
              href={link.href}
              onClick={closeDrawer}
              sx={{
                py: 1.5,
                px: 2,
                minHeight: 48,
                '&:hover': { backgroundColor: `${brandColors.terracotta}12` },
              }}
            >
              <ListItemText
                primary={
                  <Typography sx={{ fontSize: '1rem', color: brandColors.ink, fontWeight: 500 }}>
                    {link.label}
                  </Typography>
                }
              />
            </ListItemButton>
          ))}

          <ListSubheader disableSticky sx={subheaderSx}>
            Services
          </ListSubheader>
          {serviceItems.map((link) => (
            <ListItemButton
              key={link.href}
              component={Link}
              href={link.href}
              onClick={closeDrawer}
              sx={{
                py: 1.5,
                px: 2,
                minHeight: 48,
                pl: 3,
                '&:hover': { backgroundColor: `${brandColors.terracotta}12` },
              }}
            >
              <ListItemText
                primary={
                  <Typography sx={{ fontSize: '1rem', color: brandColors.ink, fontWeight: 500 }}>
                    {link.label}
                  </Typography>
                }
              />
            </ListItemButton>
          ))}

          <ListSubheader disableSticky sx={subheaderSx}>
            Your visit
          </ListSubheader>
          {visitItems.map((link) => (
            <ListItemButton
              key={link.href}
              component={Link}
              href={link.href}
              onClick={closeDrawer}
              sx={{
                py: 1.5,
                px: 2,
                minHeight: 48,
                pl: 3,
                '&:hover': { backgroundColor: `${brandColors.terracotta}12` },
              }}
            >
              <ListItemText
                primary={
                  <Typography sx={{ fontSize: '1rem', color: brandColors.ink, fontWeight: 500 }}>
                    {link.label}
                  </Typography>
                }
              />
            </ListItemButton>
          ))}

          <ListSubheader disableSticky sx={subheaderSx}>
            More
          </ListSubheader>
          {tailLinks.map((link) => (
            <ListItemButton
              key={link.href}
              component={Link}
              href={link.href}
              onClick={closeDrawer}
              sx={{
                py: 1.5,
                px: 2,
                minHeight: 48,
                '&:hover': { backgroundColor: `${brandColors.terracotta}12` },
              }}
            >
              <ListItemText
                primary={
                  <Typography sx={{ fontSize: '1rem', color: brandColors.ink, fontWeight: 500 }}>
                    {link.label}
                  </Typography>
                }
              />
            </ListItemButton>
          ))}
        </List>

        <Divider sx={{ borderColor: brandColors.creamDeep }} />
        <Box sx={{ p: 2 }}>
          <Button
            fullWidth
            variant="contained"
            href="/booking/service"
            onClick={closeDrawer}
            sx={{
              backgroundColor: brandColors.terracotta,
              color: brandColors.cream,
              py: 1.5,
              textTransform: 'none',
              fontWeight: 600,
              borderRadius: '12px',
              '&:hover': { backgroundColor: brandColors.terracottaDeep },
            }}
          >
            Book an appointment
          </Button>
        </Box>
      </Drawer>
    </Box>
  );
}
