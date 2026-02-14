export interface UserStory {
  title: string;
  description: string;
}

export interface EngineeringTask {
  group: 'Frontend' | 'Backend' | 'DevOps' | 'Testing';
  task: string;
}

export interface SpecOutput {
  overview: string;
  user_stories: UserStory[];
  engineering_tasks: EngineeringTask[];
  risks: string[];
  unknowns: string[];
}

export interface Spec {
  _id?: string;
  title: string;
  goal: string;
  users: string;
  constraints: string;
  templateType: 'Web App' | 'Mobile App' | 'Internal Tool';
  output: SpecOutput;
  createdAt: Date;
}

export interface FeatureFormData {
  title: string;
  goal: string;
  users: string;
  constraints: string;
  templateType: 'Web App' | 'Mobile App' | 'Internal Tool';
}

export interface StatusResponse {
  backend: 'ok' | 'error';
  database: 'connected' | 'disconnected' | 'error';
  gemini: 'connected' | 'disconnected' | 'error';
}
