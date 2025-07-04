import { TUserLogin, UserLoginSchema } from '@/components/types/models/user-login.model';
import { FormInput } from '@/components/ui/input';
import { useAuth } from '@/hooks/auth/useAuth';
import { zodResolver } from '@hookform/resolvers/zod';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { Box, Button, Card, CardContent, Divider, Paper, Stack, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';

export function SignIn() {
  const { login, loginState } = useAuth();
  const signInForm = useForm<TUserLogin>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(UserLoginSchema),
    mode: 'onSubmit',
  });

  // Light blue accent color
  const accent = '#60a5fa'; // light blue
  const accentLight = '#bae6fd'; // even lighter blue

  return (
    <Box
      minHeight="100vh"
      sx={{
        background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Card
        elevation={8}
        sx={{
          width: { xs: '95vw', sm: 400 },
          borderRadius: 4,
          overflow: 'hidden',
          boxShadow: '0 8px 32px 0 rgba(96,165,250,0.10)',
          position: 'relative',
        }}
      >
        <Box
          sx={{
            width: '100%',
            height: 8,
            background: `linear-gradient(90deg, ${accent} 0%, ${accentLight} 100%)`,
          }}
        />
        <CardContent>
          <Stack spacing={3} alignItems="center" justifyContent="center" sx={{ mt: 2 }}>
            <Paper
              elevation={0}
              sx={{
                background: `linear-gradient(135deg, ${accent} 0%, ${accentLight} 100%)`,
                borderRadius: '50%',
                width: 72,
                height: 72,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 24px 0 #60a5fa22',
                mb: 1,
              }}
            >
              <PersonOutlineIcon sx={{ color: '#fff', fontSize: 40 }} />
            </Paper>
            <Typography
              variant="h4"
              fontWeight={700}
              sx={{ color: accent, letterSpacing: 1.5, fontFamily: 'Inter, Arial, sans-serif', mb: 0.5 }}
            >
              Campaign Manager
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Sign in to your account
            </Typography>
          </Stack>
          <Divider sx={{ my: 2 }} />
          <Box
            component="form"
            onSubmit={signInForm.handleSubmit((data) => {
              login(data);
            })}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              mt: 1,
            }}
          >
            <Controller
              name="email"
              control={signInForm.control}
              render={({ field }) => (
                <FormInput
                  {...field}
                  label="Email"
                  error={!!signInForm.formState.errors.email}
                  helperText={signInForm.formState.errors.email?.message}
                />
              )}
            />
            <Controller
              name="password"
              control={signInForm.control}
              render={({ field }) => (
                <FormInput
                  {...field}
                  label="Password"
                  type="password"
                  error={!!signInForm.formState.errors.password}
                  helperText={signInForm.formState.errors.password?.message}
                />
              )}
            />
            <Button type="submit" fullWidth loading={loginState?.isPending} color="primary" variant="contained">
              Sign In
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}