export function getRequestBody(req: any) {
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

  return {};
}

export function jsonError(res: any, status: number, message: string, extra: Record<string, any> = {}) {
  return res.status(status).json({
    success: false,
    error: message,
    ...extra,
  });
}
