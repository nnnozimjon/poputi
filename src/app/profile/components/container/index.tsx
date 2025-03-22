interface Props {
  label: string;
  children?: React.ReactNode;
  className?: string;
  labelStyle?: string
}
export const LabeledContainer = ({ label, className, children, labelStyle = '' }: Props) => {
  return (
    <div className={`border-2 border-solid border-white-highlight ${className}`}>
      <div className={`py-3 text-center bg-secondary text-gray-dark text-xl font-semibold ${labelStyle}`}>{label}</div>
      <div className="p-4">{children}</div>
    </div>
  );
};
