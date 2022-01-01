export interface CreateProfileIndexRequest {
  id: string;
  userName: string;
  lastName: string;
  firstName: string;
}

export const PROFILE_INDEX = 'profiles';
