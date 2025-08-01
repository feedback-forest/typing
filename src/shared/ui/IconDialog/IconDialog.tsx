import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui";

interface IconDialogProps {
  dialogTriggerItem: JSX.Element;
  dialogTitle: string;
  dialogDescription: string;
  renderItem: JSX.Element;
}

const IconDialog = ({
  dialogTriggerItem,
  dialogTitle,
  dialogDescription,
  renderItem,
}: IconDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger>{dialogTriggerItem}</DialogTrigger>
      <DialogPortal>
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogDescription>{dialogDescription}</DialogDescription>
        </DialogHeader>
        <DialogContent>{renderItem}</DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export default IconDialog;
