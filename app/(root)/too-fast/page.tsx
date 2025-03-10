import React from "react";

const Page = () => {
  return (
    <main className="root-container flex items-center justify-center">
      <h1 className="font-bebas-neue text-5xl font-bold text-light-100">
        Whoa, Slow Down There!
      </h1>
      <p className="mt-3 max-w-xl text-center text-light-400">
        You are sending too many requests in a short period of time. Please slow
        down and try again later. Thank you for your patience!
      </p>
    </main>
  );
};

export default Page;
