import type { Resume } from '@resume-builder/shared';

export function cloneSerializable<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

export function findResumeById(resumes: Resume[], id: string): Resume | undefined {
  return resumes.find(resume => resume.id === id);
}
