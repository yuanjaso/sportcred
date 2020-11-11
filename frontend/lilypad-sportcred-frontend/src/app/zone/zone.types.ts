export interface Team {
  id: number;
  full_name: string;
  short_name: string;
  plays_sport: Sport;
}
export interface Sport {
  id: number;
  name: string;
}

export interface Player {
  id: number;
  first_name: string;
  last_name: string;
  plays_on: Team[];
}

export interface UserSearch {
  id: number;
  username: string;
  profilepicture: string;
  acs: number;
  status: string;
}

export interface PostSearch {
  id: number;
  title: string;
  author: {
    id: number;
    username: string;
  };
}

export interface SearchResults {
  users: UserSearch[];
  posts: PostSearch[]
}
