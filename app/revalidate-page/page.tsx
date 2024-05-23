import { unstable_cache } from 'next/cache';

let globalCount = 0;
let pageCount = 0;

const getCount = unstable_cache(async () => {
  globalCount += 1;
  return globalCount;
}, ['count']);

async function CachedCount() {
  const count = await getCount();
  return <h1 className="text-2xl">Cached Count: {count}</h1>;
}

export const revalidate = 1;

export default async function Page() {
  const count = (pageCount += 1);
  return (
    <main>
      <h1 className="text-2xl">Page Count: {count}</h1>
      <CachedCount />
      <ul className="mt-4 *:px-4 list-disc list-inside">
        Some notes:
        <li>
          The page is cached with a 1 second revalidation time. When a
          revalidation happens the counter is increased twice.
        </li>
        <li>
          The cached count is never increased after the first time it is cached
          because it does not have a revalidation time, even if the page
          revalidates
        </li>
      </ul>
    </main>
  );
}
