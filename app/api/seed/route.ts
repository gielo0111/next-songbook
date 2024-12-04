// import { db, products } from 'lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  return Response.json({
    message: 'Uncomment to seed data after DB is set up.'
  });
}
