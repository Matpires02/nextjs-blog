"use client";

import { Button } from "../Button";

type DialogProps = {
  title: string;
  isVisible?: boolean;
  content: React.ReactNode;
  onConfirm: () => void;
  onCancel: () => void;
  disabled?: boolean;
};

export function Dialog({
  isVisible = false,
  content,
  title,
  onCancel,
  onConfirm,
  disabled = false,
}: DialogProps) {
  if (!isVisible) return null;

  function handleCancel() {
    if (disabled) return;
    onCancel();
  }

  return (
    <div
      onClick={handleCancel}
      className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal={true}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
        className="bg-slate-100 shadow-lg shadow-black/30 dark:shadow-slate-100/25 dark:bg-slate-600 rounded-lg p-6 max-w-2xl mx-6 flex flex-col gap-6 text-center"
      >
        <h3 id="dialog-title" className="text-xl font-extrabold">
          {title}
        </h3>
        <div id="dialog-description">{content}</div>
        <div className="flex items-center justify-around">
          <Button
            onClick={handleCancel}
            disabled={disabled}
            autoFocus
            variant="ghost"
          >
            Cancelar
          </Button>
          <Button disabled={disabled} onClick={onConfirm}>
            OK
          </Button>
        </div>
      </div>
    </div>
  );
}
