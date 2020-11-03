export interface Profile {
  user: {
    id: number;
    username: string;
    is_superuser: boolean;
  };
  acs: number;
  status: string;
  profilepicture: string;
  about: string;
  favourite_sports: { id: number; name: string }[];
}
export interface ACSHistory {
  delta: number;
  profile_id: number;
  date: string;
  source_type: string;
  acs: number;
  Sports_id: { id: number; name: string };
}

export type UpdateProfilePayload = Partial<
  Omit<Profile, 'user' | 'acs' | 'favourite_sports'> & {
    favourite_sports: number[];
  }
>;
