import { revalidatePath } from 'next/cache';

export async function GET() {
  revalidatePath('/revalidate-route');
  return Response.json({ revalidated: true, now: Date.now() });
}
