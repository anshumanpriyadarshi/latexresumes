import { observer } from 'mobx-react-lite';
import { httpUrlSchema, type CertExpiryDate, type Certification } from '@resume-builder/shared';
import { useStores } from '../../../hooks/useStores';

export const CertificationsForm = observer(() => {
  const { resumeStore } = useStores();
  const certifications = resumeStore.content?.certifications;

  if (!certifications) return null;

  return (
    <div className="space-y-4 p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Certifications</h2>
        <button
          onClick={() => resumeStore.addCertification()}
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
        >
          Add Certification
        </button>
      </div>

      {certifications.map(cert => (
        <div key={cert.id} className="border rounded p-4 space-y-3 dark:border-slate-600">
          <input
            type="text"
            placeholder="Certification Name"
            value={cert.name}
            onChange={e => resumeStore.updateCertification(cert.id, { name: e.target.value })}
            className="w-full border rounded px-3 py-2 dark:bg-slate-700 dark:text-white"
          />

          <input
            type="text"
            placeholder="Issuing Organization"
            value={cert.issuer}
            onChange={e => resumeStore.updateCertification(cert.id, { issuer: e.target.value })}
            className="w-full border rounded px-3 py-2 dark:bg-slate-700 dark:text-white"
          />

          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Issue Date"
              value={cert.issueDate}
              onChange={e => resumeStore.updateCertification(cert.id, { issueDate: e.target.value })}
              className="border rounded px-3 py-2 dark:bg-slate-700 dark:text-white"
            />
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Expiry Date"
                value={cert.expiryDate === 'never' ? '' : (cert.expiryDate as string)}
                onChange={e => {
                  const value = e.target.value;
                  resumeStore.updateCertification(cert.id, {
                    expiryDate: (value || 'never') as CertExpiryDate,
                  });
                }}
                className="flex-1 border rounded px-3 py-2 dark:bg-slate-700 dark:text-white"
                disabled={cert.expiryDate === 'never'}
              />
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={cert.expiryDate === 'never'}
                  onChange={e => {
                    resumeStore.updateCertification(cert.id, {
                      expiryDate: e.target.checked ? 'never' : '',
                    });
                  }}
                  className="cursor-pointer"
                />
                <span className="text-sm">Never Expires</span>
              </label>
            </div>
          </div>

          <input
            type="text"
            placeholder="Credential ID (optional)"
            value={cert.credentialId || ''}
            onChange={e => {
              const value = e.target.value;
              const patch: Partial<Omit<Certification, 'id'>> = value ? { credentialId: value } : {};
              resumeStore.updateCertification(cert.id, patch);
            }}
            className="w-full border rounded px-3 py-2 dark:bg-slate-700 dark:text-white"
          />

          <input
            type="url"
            placeholder="Credential URL (optional)"
            value={(cert.url as string) || ''}
            onChange={e => {
              const value = e.target.value;
              let patch: Partial<Omit<Certification, 'id'>> = {};

              if (value) {
                const result = httpUrlSchema.safeParse(value);
                if (!result.success) return;
                patch = { url: result.data };
              }

              resumeStore.updateCertification(cert.id, patch);
            }}
            className="w-full border rounded px-3 py-2 dark:bg-slate-700 dark:text-white"
          />

          <button
            onClick={() => resumeStore.removeCertification(cert.id)}
            className="w-full bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600"
          >
            Remove Certification
          </button>
        </div>
      ))}
    </div>
  );
});

CertificationsForm.displayName = 'CertificationsForm';
