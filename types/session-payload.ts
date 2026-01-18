

export type Role = "user" | "admin" | "manager"; 

export type SessionPayload = {
  sub: string;        // user id
  email: string;
  roles: Role[];

};
