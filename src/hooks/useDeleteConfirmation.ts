import { useState } from 'react';

interface UseDeleteConfirmationProps<T> {
  onDelete: (item: T) => Promise<void> | void;
  getMessage: (item: T) => string;
  getTitle: (item: T) => string;
}

export const useDeleteConfirmation = <T>({
  onDelete,
  getMessage,
  getTitle,
}: UseDeleteConfirmationProps<T>) => {
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<T | null>(null);

  const handleOpen = (item: T) => {
    setSelectedItem(item);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedItem(null);
  };

  const handleConfirm = async () => {
    if (selectedItem) {
      await onDelete(selectedItem);
      handleClose();
    }
  };

  return {
    open,
    selectedItem,
    dialogProps: {
      open,
      title: selectedItem ? getTitle(selectedItem) : '',
      content: selectedItem ? getMessage(selectedItem) : '',
      onClose: handleClose,
      onConfirm: handleConfirm,
    },
    handleOpen,
  };
}; 