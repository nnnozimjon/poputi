import { Text } from "@mantine/core";

interface Props {
  label: string;
  children?: React.ReactNode;
  className?: string;
  labelStyle?: string;
  icon?: JSX.Element;
}

export const LabeledContainer = ({
  label,
  className,
  children,
  labelStyle = "",
  icon,
}: Props) => {
  return (
    <div className={`${className}`}>
      <div
        className={`flex justify-between ${labelStyle}`}
      >
        <Text className="text-xl font-semibold">{label}</Text>
        {icon}
      </div>
      <div className="py-2">{children}</div>
    </div>
  );
};
