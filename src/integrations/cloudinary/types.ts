import {ResourceApiResponse} from 'cloudinary';

export interface CloudinaryResponse extends ResourceApiResponse {
  next_cursor: string;
  rate_limit_remaining: number;
  rate_limit_reset_at: Date;
}
