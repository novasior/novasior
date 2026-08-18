export async function getRequestBody(req: any) {
  if (req?.body && typeof req.body === 'object') {
    return req.body;
  }

  if (typeof req?.body === 'string') {
    try {
      return JSON.parse(req.body);
    } catch {
      return {};
    }
  }

  if (req && typeof req.read === 'function') {
    try {
      const chunks: Buffer[] = [];
      for await (const chunk of req) {
        chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
      }

      const raw = Buffer.concat(chunks).toString('utf8').trim();
      if (!raw) return {};

      try {
        return JSON.parse(raw);
      } catch {
        return {};
      }
    } catch {
      return {};
    }
  }

  return {};
}

export function jsonError(res: any, status: number, message: string, extra: Record<string, any> = {}) {
  return res.status(status).json({
    success: false,
    error: message,
    ...extra,
  });
}
