import { observer } from 'mobx-react-lite';
import type { CertExpiryDate, Certification } from '@resume-builder/shared';
import { useStores } from '../../../../shared/hooks/useStores';
import { EditorButton } from '../shared/EditorButton';
import { EditorSectionCard } from '../shared/EditorSectionCard';
import { getOptionalHttpUrlPatch, getOptionalTextPatch } from '../shared/helpers';

type CertificationCardProps = {
  certification: Certification;
};

export const CertificationCard = observer(({ certification }: CertificationCardProps) => {
  const { resumeStore } = useStores();

  const handleCredentialUrlChange = (value: string): void => {
    const patch = getOptionalHttpUrlPatch('url', value);
    if (patch === null) return;
    resumeStore.updateCertification(certification.id, patch);
  };

  return (
    <EditorSectionCard>
      <input
        type="text"
        placeholder="Certification Name"
        value={certification.name}
        onChange={event =>
          resumeStore.updateCertification(certification.id, { name: event.target.value })
        }
        className="w-full rounded border px-3 py-2 dark:bg-slate-700 dark:text-white"
      />

      <input
        type="text"
        placeholder="Issuing Organization"
        value={certification.issuer}
        onChange={event =>
          resumeStore.updateCertification(certification.id, { issuer: event.target.value })
        }
        className="w-full rounded border px-3 py-2 dark:bg-slate-700 dark:text-white"
      />

      <div className="grid grid-cols-2 gap-3">
        <input
          type="text"
          placeholder="Issue Date"
          value={certification.issueDate}
          onChange={event =>
            resumeStore.updateCertification(certification.id, { issueDate: event.target.value })
          }
          className="rounded border px-3 py-2 dark:bg-slate-700 dark:text-white"
        />
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Expiry Date"
            value={certification.expiryDate === 'never' ? '' : (certification.expiryDate as string)}
            onChange={event =>
              resumeStore.updateCertification(certification.id, {
                expiryDate: (event.target.value || 'never') as CertExpiryDate,
              })
            }
            className="flex-1 rounded border px-3 py-2 dark:bg-slate-700 dark:text-white"
            disabled={certification.expiryDate === 'never'}
          />
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={certification.expiryDate === 'never'}
              onChange={event =>
                resumeStore.updateCertification(certification.id, {
                  expiryDate: event.target.checked ? 'never' : '',
                })
              }
              className="cursor-pointer"
            />
            <span className="text-sm">Never Expires</span>
          </label>
        </div>
      </div>

      <input
        type="text"
        placeholder="Credential ID (optional)"
        value={certification.credentialId || ''}
        onChange={event =>
          resumeStore.updateCertification(
            certification.id,
            getOptionalTextPatch('credentialId', event.target.value)
          )
        }
        className="w-full rounded border px-3 py-2 dark:bg-slate-700 dark:text-white"
      />

      <input
        type="url"
        placeholder="Credential URL (optional)"
        value={(certification.url as string) || ''}
        onChange={event => handleCredentialUrlChange(event.target.value)}
        className="w-full rounded border px-3 py-2 dark:bg-slate-700 dark:text-white"
      />

      <EditorButton
        variant="danger"
        fullWidth
        onClick={() => resumeStore.removeCertification(certification.id)}
      >
        Remove Certification
      </EditorButton>
    </EditorSectionCard>
  );
});

CertificationCard.displayName = 'CertificationCard';
