"use client";

const React = require("react");

function useForm({ resolver, defaultValues = {}, mode = "onSubmit" } = {}) {
  const [values, setValues] = React.useState(() => ({ ...defaultValues }));
  const valuesRef = React.useRef({ ...defaultValues });
  const [errors, setErrors] = React.useState({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isDirty, setIsDirty] = React.useState(false);
  const fieldsRef = React.useRef({});

  const runValidation = React.useCallback(
    async (candidateValues, fieldNames) => {
      if (!resolver) return { values: candidateValues, errors: {} };
      const result = await resolver(candidateValues);
      if (fieldNames && Array.isArray(fieldNames)) {
        const filteredErrors = { ...errors };
        for (const name of fieldNames) {
          if (result.errors && result.errors[name]) {
            filteredErrors[name] = result.errors[name];
          } else {
            delete filteredErrors[name];
          }
        }
        setErrors(filteredErrors);
        const hasSubsetError = fieldNames.some((n) => Boolean(result.errors?.[n]));
        return {
          valid: !hasSubsetError,
          values: result.values,
          errors: filteredErrors,
        };
      }
      setErrors(result.errors || {});
      const hasAnyError = Object.keys(result.errors || {}).length > 0;
      return {
        valid: !hasAnyError,
        values: result.values,
        errors: result.errors || {},
      };
    },
    [resolver, errors]
  );

  const setValue = React.useCallback((name, value, options = {}) => {
    valuesRef.current = { ...valuesRef.current, [name]: value };
    setValues((prev) => ({ ...prev, [name]: value }));
    if (options.shouldDirty !== false) setIsDirty(true);
    const el = fieldsRef.current[name];
    if (el && el.value !== undefined && el.value !== value) {
      el.value = value ?? "";
    }
    if (options.shouldValidate) {
      runValidation(valuesRef.current, [name]);
    } else {
      setErrors((prev) => {
        if (!prev[name]) return prev;
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  }, [runValidation]);

  const register = React.useCallback(
    (name) => {
      return {
        name,
        defaultValue: valuesRef.current[name] ?? "",
        ref: (el) => {
          if (el) {
            fieldsRef.current[name] = el;
            if (valuesRef.current[name] !== undefined && el.value !== String(valuesRef.current[name])) {
              el.value = valuesRef.current[name];
            }
          }
        },
        onChange: (e) => {
          const val = e && e.target ? e.target.value : e;
          valuesRef.current = { ...valuesRef.current, [name]: val };
          setValues((prev) => ({ ...prev, [name]: val }));
          setIsDirty(true);
          setErrors((prev) => {
            if (!prev[name]) return prev;
            const next = { ...prev };
            delete next[name];
            return next;
          });
          if (mode === "onChange") {
            runValidation(valuesRef.current, [name]);
          }
        },
        onBlur: () => {
          if (mode === "onBlur" || mode === "onTouched") {
            runValidation(valuesRef.current, [name]);
          }
        },
      };
    },
    [mode, runValidation]
  );

  const trigger = React.useCallback(
    async (fieldNames) => {
      const names = Array.isArray(fieldNames)
        ? fieldNames
        : fieldNames
        ? [fieldNames]
        : undefined;
      const res = await runValidation(valuesRef.current, names);
      return res.valid;
    },
    [runValidation]
  );

  const watch = React.useCallback(
    (name) => {
      if (!name) return values;
      if (Array.isArray(name)) {
        return name.map((n) => values[n]);
      }
      return values[name];
    },
    [values]
  );

  const getValues = React.useCallback((name) => {
    if (!name) return valuesRef.current;
    return valuesRef.current[name];
  }, []);

  const reset = React.useCallback(
    (nextDefaults = defaultValues) => {
      const merged = { ...defaultValues, ...nextDefaults };
      valuesRef.current = merged;
      setValues(merged);
      setErrors({});
      setIsDirty(false);
      Object.entries(fieldsRef.current).forEach(([key, el]) => {
        if (el && el.value !== undefined) {
          el.value = merged[key] ?? "";
        }
      });
    },
    [defaultValues]
  );

  const clearErrors = React.useCallback((name) => {
    if (!name) {
      setErrors({});
      return;
    }
    setErrors((prev) => {
      const next = { ...prev };
      delete next[name];
      return next;
    });
  }, []);

  const handleSubmit = React.useCallback(
    (onValid, onInvalid) => async (e) => {
      if (e && typeof e.preventDefault === "function") {
        e.preventDefault();
      }
      setIsSubmitting(true);
      try {
        const res = await runValidation(valuesRef.current);
        if (res.valid) {
          await onValid(res.values || valuesRef.current, e);
        } else if (onInvalid) {
          await onInvalid(res.errors, e);
        }
      } finally {
        setIsSubmitting(false);
      }
    },
    [runValidation]
  );

  return {
    register,
    handleSubmit,
    watch,
    getValues,
    setValue,
    reset,
    trigger,
    clearErrors,
    formState: {
      errors,
      isSubmitting,
      isDirty,
      isValid: Object.keys(errors).length === 0,
    },
  };
}

module.exports = { useForm };

