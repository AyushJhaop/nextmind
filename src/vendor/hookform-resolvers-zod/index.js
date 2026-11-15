function zodResolver(schema) {
  return async (values) => {
    const parsed = await schema.safeParseAsync(values);
    if (parsed.success) {
      return {
        values: parsed.data,
        errors: {},
      };
    }

    const fieldErrors = {};
    const issues = parsed.error?.issues || parsed.error?.errors || [];
    for (const issue of issues) {
      const key = Array.isArray(issue.path) && issue.path.length > 0 ? issue.path.join(".") : "_form";
      if (!fieldErrors[key]) {
        fieldErrors[key] = {
          type: issue.code || "validation",
          message: issue.message || "Invalid field value",
        };
      }
    }

    return {
      values: {},
      errors: fieldErrors,
    };
  };
}

module.exports = { zodResolver };

