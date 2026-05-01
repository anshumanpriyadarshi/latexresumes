import { observer } from 'mobx-react-lite';
import { useStores } from '../../../shared/hooks/useStores';
import { CertificationCard } from './certifications/CertificationCard';
import { EditorButton } from './shared/EditorButton';
import { EditorSectionHeader } from './shared/EditorSectionHeader';

export const CertificationsForm = observer(() => {
  const { resumeStore } = useStores();
  const certifications = resumeStore.content?.certifications;

  if (!certifications) return null;

  return (
    <div className="space-y-4 p-4">
      <EditorSectionHeader
        title="Certifications"
        action={
          <EditorButton compact onClick={() => resumeStore.addCertification()}>
            Add Certification
          </EditorButton>
        }
      />

      {certifications.map(certification => (
        <CertificationCard key={certification.id} certification={certification} />
      ))}
    </div>
  );
});

CertificationsForm.displayName = 'CertificationsForm';
