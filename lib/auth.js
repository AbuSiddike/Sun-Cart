import { betterAuth } from 'better-auth';

export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET,

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },

  baseURL: process.env.NEXT_PUBLIC_APP_URL,
});
