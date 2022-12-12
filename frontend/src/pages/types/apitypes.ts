type ReleaseToggle = {
  id: number;
  name: string;
  description: string;
  releaseAt: string;
  createdAt: string;
  updatedAt: string;
  userId: number | null;
  segments: [];
  user: User | null;
};

type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};

type Segment = {
  id: string;
  title: string;
  description: string;
};

export type { ReleaseToggle, User, Segment };