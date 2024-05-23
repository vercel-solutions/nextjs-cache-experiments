'use client';

export function RevalidateButton() {
  return (
    <button
      className="mt-4 px-4 py-2 border rounded-md"
      onClick={async () => {
        const res = await fetch('/revalidate-route/api');
        console.log('revalidate response', await res.json());
      }}
    >
      Revalidate this path
    </button>
  );
}
