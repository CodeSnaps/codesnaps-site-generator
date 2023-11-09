import Link from 'next/link';

const PostCTA: React.FC<{}> = () => {
  return (
    <div className="mt-10">
      <hr />
      <Link href="/">
        <div className="py-8 px-10 border-2 border-primary-500 dark:border-primary-400 rounded-xl my-14 text-lg leading-relaxed bg-primary-400/10">
          <div>👋 Hi there!</div>
          Wanna accelerate your app development with React and Tailwind CSS?
          Explore the library I&apos;m crafting to build faster and better with
          React and Tailwind CSS.
          <div className="mt-4">
            <span className="underline">Learn more</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PostCTA;
