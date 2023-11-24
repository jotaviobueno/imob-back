import { Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';
import { environment } from 'src/config';

@Injectable()
export class UploadService {
  async upload(file: Express.Multer.File) {
    const supabase = createClient(
      environment.SUPABASE_URL,
      environment.SUPABASE_KEY,
      { auth: { persistSession: false } },
    );

    const path = `user/avatar/${Date.now()}.${file.mimetype.split('/')[1]}`;

    await supabase.storage.from('images').upload(path, file.buffer, {
      upsert: true,
      contentType: 'File',
    });

    const image = await supabase.storage.from('images').getPublicUrl(path);

    return image.data.publicUrl;
  }
}
