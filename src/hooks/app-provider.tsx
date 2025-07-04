import { AuthProvider } from './auth/authContext';

export default function AppProvider({ children }: { children: React.ReactElement }) {
  return (
    <AuthProvider>
      {/* <UtilsProvider> */}
      {children}
      {/* </UtilsProvider> */}
    </AuthProvider>
  )
}
