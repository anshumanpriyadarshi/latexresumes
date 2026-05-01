import type { Resume } from '@resume-builder/shared';
import { ResumeCard } from '../ResumeCard';

type ResumeListProps = {
  resumes: Resume[];
};

export function ResumeList({ resumes }: ResumeListProps) {
  return (
    <div className="flex-1 overflow-y-auto p-4">
      <div className="grid gap-3">
        {resumes.map(resume => (
          <ResumeCard key={resume.id} resume={resume} />
        ))}
      </div>
    </div>
  );
}

ResumeList.displayName = 'ResumeList';
