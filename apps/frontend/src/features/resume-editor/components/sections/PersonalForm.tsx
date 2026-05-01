import { observer } from 'mobx-react-lite';
import type { PersonalInfo } from '@resume-builder/shared';
import { useStores } from '../../../shared/hooks/useStores';
import { EditorSectionHeader } from './shared/EditorSectionHeader';
import { getOptionalTextValue } from './shared/helpers';

export const PersonalForm = observer(() => {
  const { resumeStore } = useStores();
  const personal = resumeStore.content?.personal;

  if (!personal) return null;

  const setField = <K extends keyof PersonalInfo>(field: K, value: PersonalInfo[K]): void => {
    resumeStore.updatePersonal(field, value);
  };

  return (
    <div className="space-y-4 p-4">
      <EditorSectionHeader title="Personal Information" />

      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="First Name"
          value={personal.firstName}
          onChange={event => setField('firstName', event.target.value)}
          className="rounded border px-3 py-2 dark:bg-slate-700 dark:text-white"
        />
        <input
          type="text"
          placeholder="Last Name"
          value={personal.lastName}
          onChange={event => setField('lastName', event.target.value)}
          className="rounded border px-3 py-2 dark:bg-slate-700 dark:text-white"
        />
      </div>

      <input
        type="email"
        placeholder="Email"
        value={personal.email as string}
        onChange={event => setField('email', event.target.value as PersonalInfo['email'])}
        className="w-full rounded border px-3 py-2 dark:bg-slate-700 dark:text-white"
      />

      <input
        type="tel"
        placeholder="Phone"
        value={personal.phone as string}
        onChange={event => setField('phone', event.target.value as PersonalInfo['phone'])}
        className="w-full rounded border px-3 py-2 dark:bg-slate-700 dark:text-white"
      />

      <input
        type="url"
        placeholder="LinkedIn URL"
        value={personal.linkedin as string}
        onChange={event => setField('linkedin', event.target.value as PersonalInfo['linkedin'])}
        className="w-full rounded border px-3 py-2 dark:bg-slate-700 dark:text-white"
      />

      <input
        type="url"
        placeholder="GitHub URL"
        value={personal.github as string}
        onChange={event => setField('github', event.target.value as PersonalInfo['github'])}
        className="w-full rounded border px-3 py-2 dark:bg-slate-700 dark:text-white"
      />

      <input
        type="url"
        placeholder="Website (optional)"
        value={(personal.website as string) || ''}
        onChange={event =>
          setField('website', getOptionalTextValue(event.target.value) as PersonalInfo['website'])
        }
        className="w-full rounded border px-3 py-2 dark:bg-slate-700 dark:text-white"
      />

      <input
        type="text"
        placeholder="Location"
        value={personal.location}
        onChange={event => setField('location', event.target.value)}
        className="w-full rounded border px-3 py-2 dark:bg-slate-700 dark:text-white"
      />
    </div>
  );
});

PersonalForm.displayName = 'PersonalForm';
