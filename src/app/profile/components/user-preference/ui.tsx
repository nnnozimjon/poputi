import { Button, Modal, Checkbox, Badge } from "@mantine/core";
import { LabeledContainer } from "../container";
import { FaCheckCircle } from "react-icons/fa";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { useCreateDriverPreferences, useGetDriverPreferences, usePreferences } from "@/hooks";

export const UserPreference = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedPreferences, setSelectedPreferences] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { data: preferences, isSuccess: isSuccessPreferences } = usePreferences();
  const { mutate: createDriverPreferences } = useCreateDriverPreferences();
  const { data: driverPreferences, refetch: refetchDriverPreferences } = useGetDriverPreferences();

  const handleSavePreferences = async () => {
    try {
      setIsLoading(true);
      createDriverPreferences(selectedPreferences, {
        onSuccess: () => {
          refetchDriverPreferences();
          close();
        },
        onError: (error) => {
          console.error('Failed to save preferences:', error);
        }
      });
      close();
    } catch (error) {
      console.error('Failed to save preferences:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isSuccessPreferences) {
      const preferencesIds = driverPreferences?.map((preference) => preference.id) || [];
      setSelectedPreferences(preferencesIds);
    }
  }, [isSuccessPreferences, driverPreferences]);  

  return (
    <LabeledContainer
      label={"Предпочтения"}
      className="col-span-full md:col-span-4 h-fit"
    >
      <div className="flex gap-2 flex-wrap">
        {driverPreferences?.map((preference) => (
          <Badge variant="light" color="gray" className="font-medium" key={preference.id}>{preference.name}</Badge>
        ))}
      </div>
      <Button
        leftSection={<FaCheckCircle />}
        variant="outline"
        className="w-full"
        onClick={open}
      >
        Укажите свои предпочтения
      </Button>

      <Modal
        opened={opened}
        onClose={close}
        title="Выберите предпочтения"
        centered
        size="md"
      >
        <div className="space-y-4">
          {preferences?.map((preference) => (
            <Checkbox
              key={preference.id}
              label={preference.name}
              checked={selectedPreferences.includes(preference.id)}
              onChange={(event) => {
                if (event.currentTarget.checked) {
                  setSelectedPreferences([...selectedPreferences, preference.id]);
                } else {
                  setSelectedPreferences(
                    selectedPreferences.filter((id) => id !== preference.id)
                  );
                }
              }}
            />
          ))}

          <Button
            fullWidth
            onClick={handleSavePreferences}
            loading={isLoading}
          >
            Сохранить
          </Button>
        </div>
      </Modal>
    </LabeledContainer>
  );
};
