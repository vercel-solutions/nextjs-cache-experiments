import { unstable_cache } from 'next/cache';

let globalCount = 0;
let globalInnerCount = 0;

const getCount = unstable_cache(
  async () => {
    globalCount += 1;
    if (globalCount % 3 === 0) {
      throw new Error('Data fetching error');
    }
    return globalCount;
  },
  ['count'],
  { revalidate: 1 }
);

const getInnerCount = unstable_cache(
  async () => {
    globalInnerCount += 1;
    return globalInnerCount;
  },
  ['innerCount'],
  { revalidate: 1 }
);

async function InnerCount() {
  const count = await getInnerCount();
  return <h1 className="text-2xl">Inner Count: {count}</h1>;
}

export default async function Page() {
  const count = await getCount();
  return (
    <main>
      <h1 className="text-2xl">Count: {count}</h1>
      <InnerCount />
      <ul className="mt-4 *:px-4 list-disc list-inside">
        Some notes:
        <li>
          The first count never shows a multiple of 3, it always throws an error
          when that happens.
        </li>
        <li>
          It also grows slighty faster than the inner count because when a
          revalidation fails it will keep revalidating as you refresh,
          increasing the timer more times.
        </li>
        <li>The UI never breaks if a revalidation fails</li>
      </ul>
    </main>
  );
}
