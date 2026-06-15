export const logoutResolvers = {
    Mutation: {
        logout: async (_: any, __: any, context: any) => {
            context.res.clearCookie("token", {
                httpOnly: true,
                secure: false,
                sameSite: "lax"
            });
            return "Successfully logged out!"
        },
    }
}
