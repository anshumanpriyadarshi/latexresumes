import { observer } from 'mobx-react-lite';
import type { PersonalInfo } from '@resume-builder/shared';
import { useStores } from '../../../hooks/useStores';

export const PersonalForm = observer(() => {
  const { resumeStore } = useStores();
  const personal = resumeStore.content?.personal;

  if (!personal) return null;

  const setField = <K extends keyof PersonalInfo>(field: K, value: PersonalInfo[K]): void => {
    resumeStore.updatePersonal(field, value);
  };

  return (
    <div className="space-y-4 p-4">
      <h2 className="text-xl font-bold mb-4">Personal Information</h2>

      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="First Name"
          value={personal.firstName}
          onChange={e => setField('firstName', e.target.value)}
          className="border rounded px-3 py-2 dark:bg-slate-700 dark:text-white"
        />
        <input
          type="text"
          placeholder="Last Name"
          value={personal.lastName}
          onChange={e => setField('lastName', e.target.value)}
          className="border rounded px-3 py-2 dark:bg-slate-700 dark:text-white"
        />
      </div>

      <input
        type="email"
        placeholder="Email"
        value={personal.email as string}
        onChange={e => setField('email', e.target.value as PersonalInfo['email'])}
        className="w-full border rounded px-3 py-2 dark:bg-slate-700 dark:text-white"
      />

      <input
        type="tel"
        placeholder="Phone"
        value={personal.phone as string}
        onChange={e => setField('phone', e.target.value as PersonalInfo['phone'])}
        className="w-full border rounded px-3 py-2 dark:bg-slate-700 dark:text-white"
      />

      <input
        type="url"
        placeholder="LinkedIn URL"
        value={personal.linkedin as string}
        onChange={e => setField('linkedin', e.target.value as PersonalInfo['linkedin'])}
        className="w-full border rounded px-3 py-2 dark:bg-slate-700 dark:text-white"
      />

      <input
        type="url"
        placeholder="GitHub URL"
        value={personal.github as string}
        onChange={e => setField('github', e.target.value as PersonalInfo['github'])}
        className="w-full border rounded px-3 py-2 dark:bg-slate-700 dark:text-white"
      />

      <input
        type="url"
        placeholder="Website (optional)"
        value={(personal.website as string) || ''}
        onChange={e =>
          setField(
            'website',
            (e.target.value ? (e.target.value as PersonalInfo['website']) : undefined) as PersonalInfo['website']
          )
        }
        className="w-full border rounded px-3 py-2 dark:bg-slate-700 dark:text-white"
      />

      <input
        type="text"
        placeholder="Location"
        value={personal.location}
        onChange={e => setField('location', e.target.value)}
        className="w-full border rounded px-3 py-2 dark:bg-slate-700 dark:text-white"
      />
    </div>
  );
});

PersonalForm.displayName = 'PersonalForm';
