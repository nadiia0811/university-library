import { auth } from "@/auth";
import BookList from "@/components/BookList";
import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { redirect } from "next/navigation";

const Library = async () => {
  const allBooks = await db.select().from(books);
  const session = await auth();
  const user = session?.user;

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <div className="library">
      <h2 className="library-title">{user.name}, welcome to Library!</h2>
      
      <ul className="bool-list">
        <BookList 
          title="All Books"
          allBooks={allBooks} 
        />
      </ul>     
    </div>
  )
}

export default Library;