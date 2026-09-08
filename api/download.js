export default async function handler(req, res) {
  const { url, filename } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  // Security: SSRF Protection
  try {
    const parsedUrl = new URL(url);
    if (parsedUrl.hostname !== 'firebasestorage.googleapis.com') {
      return res.status(403).json({ error: 'Unauthorized domain' });
    }
  } catch (err) {
    return res.status(400).json({ error: 'Invalid URL format' });
  }

  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error('Failed to fetch file: ' + response.statusText);
    }

    const contentType = response.headers.get('content-type') || 'application/octet-stream';
    const downloadName = filename || 'Brochure.pdf';

    res.setHeader('Content-Type', contentType);
    res.setHeader('Content-Disposition', 'attachment; filename="' + downloadName + '"');

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    res.status(200).send(buffer);
  } catch (error) {
    console.error('Download error:', error);
    res.status(500).json({ error: 'Failed to download file' });
  }
}
