import BookList from "@/components/BookList";
import BookOverview from "@/components/BookOverview";
import { sampleBooks } from "@/constants";
import { auth } from "@/auth";
import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { desc } from "drizzle-orm";


const Home = async () => {
  const session = await auth();
  
  const latestBooks = (await db
    .select()
    .from(books)
    .limit(10)
    .orderBy(desc(books.createdAt))) as Book[];
  
  const userId = session?.user?.id as string;

  return (
    <>
      <BookOverview {...latestBooks[0] ?? sampleBooks[0]} userId={userId} />

      <BookList
        title="Latest Books"
        allBooks={latestBooks.slice(1) ?? sampleBooks}
        containerClassName="mt-28"
      />
    </>
  );
};

export default Home;
