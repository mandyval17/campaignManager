import {
  Dialog,
  DialogActions,
  DialogActionsProps,
  DialogContent,
  DialogContentProps,
  DialogProps,
  DialogTitle,
  DialogTitleProps
} from "@mui/material";


export function MyDialog({ children, ...props }: DialogProps) {
  return (
    <Dialog maxWidth='md' fullWidth={true} {...props}>
      {children}
    </Dialog>
  )
}

export function MyDialogActions({ children, ...props }: DialogActionsProps) {
  return (
    <DialogActions {...props}>
      {children}
    </DialogActions>
  )
}

export function MyDialogContent({ children, ...props }: DialogContentProps) {
  return (
    <DialogContent {...props}>
      {children}
    </DialogContent>
  )
}

export function MyDialogTitle({ children, ...props }: DialogTitleProps) {
  return (
    <DialogTitle {...props}>
      {children}
    </DialogTitle>
  )
}