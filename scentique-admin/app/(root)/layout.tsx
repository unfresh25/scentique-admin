import prismadb from "@/lib/prismadb";

import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation";

export default async function SetupLayout({ 
    children
}: {
    children: React.ReactNode
}) {
    const { userId, redirectToSignIn } = await auth()
    
    if (!userId) return redirectToSignIn()

    const store = await prismadb.store.findFirst({
        where: {
            userId
        },
    });

    if (store) {
        return redirect(`/${store.id}`)
    }

    return (
        <>
            {children}
        </>
    )
}