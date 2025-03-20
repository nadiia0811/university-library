import { auth } from "@/auth";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";
import "@/styles/admin.css";
import Sidebar from "@/components/admin/Sidebar";
import Header from "@/components/admin/Header";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";

interface Props {
  children: ReactNode;
}

const Layout = async ({ children }: Props) => {
  const session = await auth();

  //returns object with key = table name, value = "ADMIN" | "USER"
  //create alias with isAdmin key
  const isAdmin = await db.select({isAdmin: users.role}) 
                          .from(users)
                          .where(eq(users.id, session.user.id))
                          .limit(1)
                          .then((res) => res[0]?.isAdmin === "ADMIN");
  
  if (!isAdmin) redirect("/");

  if (!session?.user?.id) {
    redirect("/sign-in");
  }
  return (
    <main className="flex min-h-screen w-full flex-row">
      <Sidebar session={session} />

      <div className="admin-container">
        <Header session={session}/>
        {children}
      </div>
    </main>
  );
};

export default Layout;
