import { Post } from "../posts/Post";

export interface Profile {
    profile: {
      active: boolean;
      banner: string;
      bio: string;
      civil_status: string;
      email: string;
      followers: any[]; 
      following: any[];
      friends: any[];
      friendsOf: any[];
      gender: string;
      id: number;
      job: string;
      native_city: string;
      password: string;
      posts: Post[];
      private: boolean;
      profilePicture: string;
      receivedRequests: any[];
      sentRequests: any[];
      tag: string;
      ubication: string;
      updatedAt: string;
      username: string;
      users_blocked_me: any[];
      verified: boolean;
    };
  };
  