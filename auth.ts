import { PrismaAdapter } from '@auth/prisma-adapter';
import { UserRole } from '@prisma/client';
import NextAuth, { type DefaultSession } from 'next-auth';
import authConfig from './auth.config';
import { getUserById } from './data/user';
import prisma from './lib/db';

// Extend the default session with custom properties
// source : https://authjs.dev/getting-started/typescript
declare module 'next-auth' {
    /**
     * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user: {
            /** The user's postal address. */
            role: UserRole;
            /**
             * By default, TypeScript merges new interface properties and overwrites existing ones.
             * In this case, the default session user properties will be overwritten,
             * with the new ones defined above. To keep the default session user properties,
             * you need to add them back into the newly declared interface.
             */
        } & DefaultSession['user'];
    }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
    callbacks: {
        // async signIn({ user }) {
        //     if (!user || !user.id) {
        //         return false;
        //     }

        //     const existingUser = await getUserById(user.id);

        //     if (!existingUser || !existingUser.emailVerified) {
        //         return false;
        //     }

        //     return true;
        // },
        async session({ token, session }) {
            // add the user id to the session (custom field)
            if (token.sub && session.user) {
                session.user.id = token.sub;
            }

            if (token.role && session.user) {
                session.user.role = token.role as UserRole;
            }

            return session;
        },
        async jwt({ token }) {
            if (!token.sub) return token;

            // Get any information we need for the user based on the token
            // and give it to extend the session upside
            const existingUser = await getUserById(token.sub);
            if (!existingUser) return token;

            token.role = existingUser.role;

            return token;
        },
    },
    adapter: PrismaAdapter(prisma),
    session: { strategy: 'jwt' },
    ...authConfig,
});
