export interface IUser {
  id: string;
  name: string;
  email: string;
  email_verified_at: string;
  profile_photo_url: string;
  about: string;
  country: string;
  city: string;
  unit: string;
  weight: number;
  age: number;
  height: number;
  roles: string[];
  permissions: string[];
  is_favorite: boolean;
  created_at: string;
  updated_at: string;
}

export interface IVideo {
  id: string;
  user_id: string;
  name: string;
  duration: number;
  size: number;
  thumbnail_url: string;
  playlist_url: string;
  orientation: string;
  aspect_ratio: string;
  attempts: number;
  attempts_exhausted: boolean;
  converted_percentage: number;
  converted_at: string;
  created_at: string;
  updated_at: string;
}

export interface IRoutine {
  id: string;
  exercise_id: string;
  set_id: string;
  position: number;
  name: string;
  repetitions: number;
  duration: number;
  rest: number;
  created_at: string;
  updated_at: string;
  video: IVideo;
}

export interface IVideoCover {
  id: string;
  user_id: string;
  name: string;
  duration: number;
  size: number;
  thumbnail_url: string;
  playlist_url: string;
  orientation: string;
  aspect_ratio: string;
  attempts: number;
  attempts_exhausted: boolean;
  converted_percentage: number;
  converted_at: string;
  created_at: string;
  updated_at: string;
}

export interface IWorkout {
  id: string;
  trainer_id: string;
  trainer_name: string;
  target_audience: string;
  type: string;
  status: string;
  name: string;
  description: string;
  difficulty: number;
  is_favorite: boolean;
  total_duration: number;
  approved_at: string;
  published_at: string;
  created_at: string;
  updated_at: string;
  user: IUser;
  video_cover: IVideoCover;
  routines: Array<IRoutine>;
}
