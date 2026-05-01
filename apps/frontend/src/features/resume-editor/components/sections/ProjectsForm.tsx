import { observer } from 'mobx-react-lite';
import { useStores } from '../../../shared/hooks/useStores';
import { ProjectEntryCard } from './projects/ProjectEntryCard';
import { EditorButton } from './shared/EditorButton';
import { EditorSectionHeader } from './shared/EditorSectionHeader';

export const ProjectsForm = observer(() => {
  const { resumeStore } = useStores();
  const projects = resumeStore.content?.projects;

  if (!projects) return null;

  return (
    <div className="space-y-4 p-4">
      <EditorSectionHeader
        title="Projects"
        action={
          <EditorButton compact onClick={() => resumeStore.addProject()}>
            Add Project
          </EditorButton>
        }
      />

      {projects.map(project => (
        <ProjectEntryCard key={project.id} project={project} />
      ))}
    </div>
  );
});

ProjectsForm.displayName = 'ProjectsForm';
