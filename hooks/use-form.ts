import { useCallback, useState } from "react";
import { z } from "zod";

type UseFormOptions<T extends z.ZodObject<any>> = {
  schema: T;
  initialValues: z.infer<T>;
};

export function useForm<T extends z.ZodObject<any>>({ schema, initialValues }: UseFormOptions<T>) {
  type FormData = z.infer<T>;
  type FormErrors = Partial<Record<keyof FormData, string>>;

  const [form, setForm] = useState<FormData>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});

  const update = useCallback(<K extends keyof FormData>(key: K, value: FormData[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  }, []);

  const validate = useCallback((): boolean => {
    const result = schema.safeParse(form);
    if (!result.success) {
      const flattened = z.flattenError(result.error);
      const fieldErrors: FormErrors = {};

      for (const key of Object.keys(flattened.fieldErrors) as (keyof FormData)[]) {
        const errorMessages = flattened.fieldErrors[key as string];
        if (errorMessages && errorMessages.length > 0) {
          fieldErrors[key] = errorMessages[0];
        }
      }

      setErrors(fieldErrors);
      return false;
    }

    setErrors({});
    return true;
  }, [form, schema]);

  return {
    form,
    errors,
    update,
    setForm,
    setErrors,
    validate,
  };
}
