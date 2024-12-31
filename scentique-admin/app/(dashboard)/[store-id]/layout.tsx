import prismadb from "@/lib/prismadb";
import { auth } from '@clerk/nextjs/server'
import { redirect } from "next/navigation";

export default async function DashboardLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: { storeId: string };
}) {
    const { userId, redirectToSignIn } = await auth()

    if (!userId) return redirectToSignIn()

    const store = await prismadb.store.findFirst({
        where: {
            id: params.storeId,
            userId
        },
    });

    if (!store) return redirect('/')
    
    return (
        <>
            <div>Navbar</div>
            {children}
        </>
    )
}