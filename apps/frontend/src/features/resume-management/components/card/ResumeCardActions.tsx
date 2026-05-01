import { ResumeCardActionButton } from './ResumeCardActionButton';

type ResumeCardActionsProps = {
  onOpen: () => void;
  onDuplicate: () => void;
  onExport: () => void;
  onDelete: () => void;
};

export function ResumeCardActions({
  onOpen,
  onDuplicate,
  onExport,
  onDelete,
}: ResumeCardActionsProps) {
  return (
    <div className="grid grid-cols-2 gap-2 pt-2">
      <ResumeCardActionButton onClick={onOpen}>Open</ResumeCardActionButton>
      <ResumeCardActionButton variant="primary" onClick={onDuplicate}>
        Duplicate
      </ResumeCardActionButton>
      <ResumeCardActionButton variant="success" onClick={onExport}>
        Export
      </ResumeCardActionButton>
      <ResumeCardActionButton variant="danger" onClick={onDelete}>
        Delete
      </ResumeCardActionButton>
    </div>
  );
}

ResumeCardActions.displayName = 'ResumeCardActions';
