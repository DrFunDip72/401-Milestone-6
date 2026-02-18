import { toast as sonnerToast } from "sonner";

type ToastOptions = {
  title?: string;
  description?: string;
};

export function useToast() {
  const toast = (options: ToastOptions) => {
    sonnerToast(options.title ?? "Success", {
      description: options.description,
    });
  };

  return { toast };
}
