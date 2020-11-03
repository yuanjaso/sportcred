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
  //idk yet
}

export type UpdateProfilePayload = Partial<
  Omit<Profile, 'user' | 'acs' | 'favourite_sports'> & {
    favourite_sports: number[];
  }
>;
