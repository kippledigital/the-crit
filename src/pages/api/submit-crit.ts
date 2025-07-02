import type { NextApiRequest, NextApiResponse } from 'next';
import formidable, { File } from 'formidable';
import fs from 'fs';

export const config = { api: { bodyParser: false } };

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Debug log for env variable
  console.log("N8N_WEBHOOK_URL from process.env:", process.env.N8N_WEBHOOK_URL);

  if (req.method !== 'POST') return res.status(405).end();

  const form = formidable();
  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Formidable error:', err);
      return res.status(500).json({ error: 'Form parse error' });
    }

    // Safely get files array
    let fileArr: File[] = [];
    if (files.files) {
      fileArr = Array.isArray(files.files) ? files.files : [files.files];
    }
    console.log('Received files:', fileArr);

    // Read files as base64, only if present and filepath exists
    const filesBase64 = await Promise.all(
      fileArr.map(async (file) => {
        if (!file.filepath) return null;
        const buffer = await fs.promises.readFile(file.filepath);
        return {
          filename: file.originalFilename || null,
          mimetype: file.mimetype || null,
          base64: buffer.toString('base64'),
        };
      })
    );

    // Remove any nulls (in case of missing filepaths)
    const filesBase64Clean = filesBase64.filter(Boolean);

    // Flatten fields from arrays → single values
    const flattenedFields: Record<string, any> = {};
    for (const [key, value] of Object.entries(fields)) {
      if (Array.isArray(value)) {
        flattenedFields[key] = value[0];
      } else {
        flattenedFields[key] = value;
      }
    }

    // Build payload
    const payload = {
      ...flattenedFields,
      files: filesBase64Clean,
    };
    console.log('Payload to webhook:', payload);

    // POST to n8n webhook
    const webhookUrl = process.env.N8N_WEBHOOK_URL;
    if (!webhookUrl) {
      res.status(500).json({ error: 'N8N_WEBHOOK_URL not set' });
      return;
    }

    try {
      const n8nRes = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      console.log('Webhook response status:', n8nRes.status);
      if (!n8nRes.ok) {
        const text = await n8nRes.text();
        console.error('Webhook error:', text);
        res.status(500).json({ error: 'Failed to send to n8n', webhookStatus: n8nRes.status, webhookError: text });
        return;
      }
      res.status(200).json({ success: true });
    } catch (error) {
      console.error('API error:', error);
      res.status(500).json({ error: 'Failed to send to n8n' });
    }
  });
}