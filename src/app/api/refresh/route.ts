import { revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

export async function POST() {
  revalidateTag('sheet-data');
  return NextResponse.json({ revalidated: true, now: Date.now() });
}