type ResumeCardHeaderProps = {
  name: string;
  updatedAt: string;
  isActive: boolean;
};

export function ResumeCardHeader({ name, updatedAt, isActive }: ResumeCardHeaderProps) {
  return (
    <div className="flex items-start justify-between gap-3">
      <div>
        <h3 className="text-sm font-semibold text-slate-900 dark:text-white">{name}</h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Updated {new Date(updatedAt).toLocaleString()}
        </p>
      </div>
      {isActive ? (
        <span className="rounded-full bg-emerald-100 px-2 py-1 text-[11px] font-medium text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300">
          Active
        </span>
      ) : null}
    </div>
  );
}

ResumeCardHeader.displayName = 'ResumeCardHeader';
