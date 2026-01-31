import { memo } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

interface SuccessDialogProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
  closeLabel?: string;
}

function SuccessDialogInner({
  open,
  onClose,
  title = "Compra realizada!",
  message = "Obrigado pela sua compra. Em breve você receberá as instruções de acesso por e-mail.",
  closeLabel = "Fechar",
}: SuccessDialogProps) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{message}</DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained">
          {closeLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export const SuccessDialog = memo(SuccessDialogInner);
