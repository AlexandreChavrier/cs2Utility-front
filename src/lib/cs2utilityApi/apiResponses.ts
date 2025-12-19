import { Side } from "@/data/side/side.enum";

export enum ROLE {
  ROLE_SUPER_ADMIN = "ROLE_SUPER_ADMIN",
  ROLE_ADMIN = "ROLE_ADMIN",
  ROLE_USER = "ROLE_USER",
  ROLE_ANONYMOUS = "ROLE_ANONYMOUS",
}

export type DestinationPoint = {
  uuid: string;
  label: string;
  x: number;
  y: number;
};

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
  destinationPoint: DestinationPoint;
  side: Side;
  imageUrl: string;
  videoUrl: string;
  thumbnailUrl: string;
  instructions: string;
  createdAt: string;
  updatedAt: string;
};

export type ActionResponse = {};

export type ActionTypeResponse = {
  id: string;
  name: string;
  iconUrl: string;
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
