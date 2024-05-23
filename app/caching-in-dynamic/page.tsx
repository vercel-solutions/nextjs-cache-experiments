import { unstable_cache } from 'next/cache';

let globalCount = 0;
let liveCount = 0;

const getCount = unstable_cache(
  async () => {
    globalCount += 1;
    return globalCount;
  },
  ['count'],
  { revalidate: 5 }
);

async function CachedCount() {
  const count = await getCount();
  return <h1 className="text-2xl">Cached Count: {count}</h1>;
}

export const dynamic = 'force-dynamic';

export default async function Page() {
  const count = (liveCount += 1);
  return (
    <main>
      <h1 className="text-2xl">Live Count: {count}</h1>
      <CachedCount />
      <ul className="mt-4 *:px-4 list-disc list-inside">
        Some notes:
        <li>
          In next dev you will see both counts being updated at the same time,
          with next start the cached count revalidates every 5 seconds
        </li>
      </ul>
    </main>
  );
}
