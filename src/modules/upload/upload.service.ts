import { Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';
import { randomUUID } from 'crypto';
import { environment } from 'src/config';

@Injectable()
export class UploadService {
  async upload(file: Express.Multer.File, path: string) {
    const supabase = createClient(
      environment.SUPABASE_URL,
      environment.SUPABASE_KEY,
      { auth: { persistSession: false } },
    );

    path = `${path}/${Date.now()}-${randomUUID()}.${
      file.mimetype.split('/')[1]
    }`;

    await supabase.storage.from('images').upload(path, file.buffer, {
      upsert: true,
      contentType: 'File',
    });

    return supabase.storage.from('images').getPublicUrl(path);
  }
}
