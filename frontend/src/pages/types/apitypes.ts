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

type Country = {
  id: string;
  name: string;
};

type Subscription = {
  id: string;
  title: string;
};

export type { ReleaseToggle, User, Segment, Subscription, Country };
