import { useAuth as useClerkAuth } from '@clerk/clerk-react';

export const useAuth = () => {
  const { isSignedIn, isLoaded, userId, signOut } = useClerkAuth();

  return {
    isAuthenticated: isSignedIn,
    isLoading: !isLoaded,
    userId,
    signOut,
  };
};
