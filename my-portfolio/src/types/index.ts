export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  highlight: string;
}

export interface Skill {
  id: string;
  name: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  description: string;
  skills: Skill[];
}
