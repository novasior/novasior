export default function handler(_req: any, res: any) {
  res.status(200).json({
    ok: true,
    message: 'NOVASIOR API is ready.',
    environment: process.env.VERCEL ? 'vercel' : (process.env.NODE_ENV || 'development'),
  });
}
