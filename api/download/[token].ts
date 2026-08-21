import { resolveDownloadLink, sendDownload } from '../../server/download-links.js';

export default async function handler(req: any, res: any) {
  if (String(req?.method || 'GET').toUpperCase() !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ success: false, error: 'Method not allowed.' });
  }

  const token = typeof req?.query?.token === 'string' ? req.query.token : '';
  if (!token) {
    return res.status(404).json({ success: false, error: 'Download link is invalid or expired.' });
  }

  try {
    const result = await resolveDownloadLink(token);
    if (result.status === 302) {
      const sent = await sendDownload(res, result.url, result.fileName);
      if (!sent) return res.status(404).json({ success: false, error: 'The purchased file is unavailable.' });
      return;
    }
    return res.status(result.status).json({ success: false, error: result.error });
  } catch (error: any) {
    console.error('Download resolution error:', error?.message || error);
    return res.status(500).json({ success: false, error: 'Download could not be started.' });
  }
}
