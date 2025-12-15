import { Side } from "@/data/enums/side.enum";

export enum ROLE {
  ROLE_SUPER_ADMIN = "ROLE_SUPER_ADMIN",
  ROLE_ADMIN = "ROLE_ADMIN",
  ROLE_USER = "ROLE_USER",
  ROLE_ANONYMOUS = "ROLE_ANONYMOUS",
}

export type UserResponse = {
  uuid: string;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  role: ROLE;
  createdAt: string;
  updatedAt: string;
  lastLoginAt: string;
};

export type LineupResponse = {
  uuid: string;
  title: string;
  mapId: string;
  throwFromX: number;
  throwFromY: number;
  destinationPoint: {
    id: string;
    label: string;
    x: number;
    y: number;
  };
  side: Side;
  imageUrl: string;
  videoUrl: string;
  thumbnailUrl: string;
  instructions: string;
  createdAt: string;
  updatedAt: string;
};

export type MapResponse = {
  id: string;
  displayName: string;
  imageUrl: string;
  radarUrl: string;
  radarUpUrl?: string;
  radarDownUrl?: string;
  iconUrl: string;
  active: boolean;
};
