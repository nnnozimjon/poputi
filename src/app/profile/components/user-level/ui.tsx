import { LabeledContainer } from "../container";
import { Stepper } from "@mantine/core";

export const UserLevel = () => {
  return (
    <LabeledContainer
      label={"Ваш уровень"}
      className="col-span-auto md:col-span-8 h-fit"
    >
      <Stepper
        classNames={{
          stepCompletedIcon: "bg-main rounded-full",
          stepIcon: "border-main",
          separator: "bg-main",
        }}
        size="sm"
        active={1}
      >
        <Stepper.Step description="Новичок" />
        <Stepper.Step description="Уверенный" />
        <Stepper.Step description="Опытный" />
        <Stepper.Step description="Эксперт" />
        <Stepper.Step description="Амбассадор" />
      </Stepper>
    </LabeledContainer>
  );
};
