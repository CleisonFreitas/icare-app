type ValidationError = {
  key: string;
  value: string;
};

const setValueByPath = (obj: any, path: string, value: string) => {
  const arrayPath = path.replace(/\]/g, "").split(/\.|\[/);
  let current = obj;

  for (let i = 0; i < arrayPath.length; i += 1) {
    const partial = arrayPath[i];

    if (i === arrayPath.length - 1) {
      current[partial] = value;
      return;
    }

    if (current[partial] === undefined || current[partial] === null) {
      const nextKey = arrayPath[i + 1];
      current[partial] = Number.isInteger(Number(nextKey)) ? [] : {};
    }

    current = current[partial];
  }
};

export const mapValidationErrors = <T extends Record<string, any>>(
  initial: T,
  errors: ValidationError[]
): T => {
  const formatted = JSON.parse(JSON.stringify(initial)) as T;

  errors.forEach(error => {
    if (error.key.includes(".") || error.key.includes("[")) {
      setValueByPath(formatted, error.key, error.value);
      return;
    }

    if (error.key in formatted) {
      (formatted as any)[error.key] = error.value;
    }
  });

  return formatted;
};
