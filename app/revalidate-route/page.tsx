import { unstable_cache } from 'next/cache';
import { RevalidateButton } from './revalidate-button';

let globalCount = 0;
let pageCount = 0;

const getCount = unstable_cache(async () => {
  globalCount += 1;
  return globalCount;
});

async function CachedCount() {
  const count = await getCount();
  return <h1 className="text-2xl">Cached Count: {count}</h1>;
}

export default async function Page() {
  const count = (pageCount += 1);
  return (
    <main>
      <h1 className="text-2xl">Page Count: {count}</h1>
      <CachedCount />
      <RevalidateButton />
      <ul className="mt-4 *:px-4 list-disc list-inside">
        Some notes:
        <li>
          The page and the counters are cached forever until you hit the
          revalidate button.
        </li>
        <li>The cached counter also revalidates.</li>
      </ul>
    </main>
  );
}
