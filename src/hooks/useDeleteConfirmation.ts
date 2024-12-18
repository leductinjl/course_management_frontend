import { useState } from 'react';

interface DeleteConfirmationConfig<T> {
  onDelete: (item: T) => Promise<void>;
  getMessage: (item: T) => React.ReactNode;
  getTitle: (item?: T) => string;
}

export const useDeleteConfirmation = <T extends any>(config: DeleteConfirmationConfig<T>) => {
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
      await config.onDelete(selectedItem);
      handleClose();
    }
  };

  const dialogProps = {
    open,
    onClose: handleClose,
    onConfirm: handleConfirm,
    title: config.getTitle(selectedItem || undefined),
    message: selectedItem ? config.getMessage(selectedItem) : '',
    item: selectedItem
  };

  return {
    dialogProps,
    handleOpen
  };
}; 