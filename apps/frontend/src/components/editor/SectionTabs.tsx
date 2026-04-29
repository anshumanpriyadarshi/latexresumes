import { useState } from 'react';
import { PersonalForm } from './sections/PersonalForm';
import { ExperienceForm } from './sections/ExperienceForm';
import { EducationForm } from './sections/EducationForm';
import { SkillsForm } from './sections/SkillsForm';
import { ProjectsForm } from './sections/ProjectsForm';
import { CertificationsForm } from './sections/CertificationsForm';

type TabKey = 'personal' | 'experience' | 'education' | 'skills' | 'projects' | 'certifications';

const TABS: { key: TabKey; label: string }[] = [
  { key: 'personal', label: 'Personal' },
  { key: 'experience', label: 'Experience' },
  { key: 'education', label: 'Education' },
  { key: 'skills', label: 'Skills' },
  { key: 'projects', label: 'Projects' },
  { key: 'certifications', label: 'Certifications' },
];

export function SectionTabs() {
  const [activeTab, setActiveTab] = useState<TabKey>('personal');

  return (
    <div className="h-full flex flex-col">
      <div className="flex gap-2 border-b dark:border-slate-600 bg-gray-50 dark:bg-slate-800 px-4 py-2">
        {TABS.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 font-medium rounded-t transition-colors ${
              activeTab === tab.key
                ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto dark:bg-slate-900">
        {activeTab === 'personal' && <PersonalForm />}
        {activeTab === 'experience' && <ExperienceForm />}
        {activeTab === 'education' && <EducationForm />}
        {activeTab === 'skills' && <SkillsForm />}
        {activeTab === 'projects' && <ProjectsForm />}
        {activeTab === 'certifications' && <CertificationsForm />}
      </div>
    </div>
  );
}
