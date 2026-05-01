import { CertificationsForm } from '../sections/CertificationsForm';
import { EducationForm } from '../sections/EducationForm';
import { ExperienceForm } from '../sections/ExperienceForm';
import { PersonalForm } from '../sections/PersonalForm';
import { ProjectsForm } from '../sections/ProjectsForm';
import { SkillsForm } from '../sections/SkillsForm';
import type { SectionTabKey } from './constants';

type SectionTabContentProps = {
  activeTab: SectionTabKey;
};

export function SectionTabContent({ activeTab }: SectionTabContentProps) {
  return (
    <div className="flex-1 overflow-y-auto dark:bg-slate-900">
      {activeTab === 'personal' && <PersonalForm />}
      {activeTab === 'experience' && <ExperienceForm />}
      {activeTab === 'education' && <EducationForm />}
      {activeTab === 'skills' && <SkillsForm />}
      {activeTab === 'projects' && <ProjectsForm />}
      {activeTab === 'certifications' && <CertificationsForm />}
    </div>
  );
}

SectionTabContent.displayName = 'SectionTabContent';
