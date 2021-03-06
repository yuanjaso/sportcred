export interface Profile {
  user: {
    id: number;
    username: string;
    is_superuser: boolean;
  };
  ACS: ACSProfile;
  status: string;
  profilepicture: string;
  about: string;
  favourite_sports: { id: number; name: string }[];
}
export interface ACSHistory {
  delta: number;
  profile_id: number;
  date: string;
  score: number;
  source_type: string;
  sport: number;
}

export type UpdateProfilePayload = Partial<
  Omit<Profile, 'user' | 'acs' | 'favourite_sports'> & {
    favourite_sports: number[];
  }
>;

export interface ACSProfile {
  average: number;
  [sport: string]: number;
}

export interface ACS {
  average: { score__avg: number };
  [sport: string]: any;
}

export interface RadarUser {
  id: number;
  username: string;
}

export interface RadarList {
  id: number;
  followers: RadarUser[];
  following: RadarUser[];
}
