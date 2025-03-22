export const mapToSelectOptions = <T extends Record<string, any>>(
  data: T[],
  valueKey: keyof T,
  labelKey: keyof T
): { value: string; label: string }[] => {
  return (
    data?.map((item) => ({
      value: String(item[valueKey]),
      label: String(item[labelKey]),
    })) || []
  );
};
