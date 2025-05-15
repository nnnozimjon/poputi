"use client";

import { Button, Group, Modal } from "@mantine/core";

interface Props {
    opened: boolean;
    close: () => void;
}

export const EditUserModal = (props: Props) => {
    return (
        <Modal
            centered
            opened={props.opened}
            onClose={props.close}
            title="Редактировать пользователя"
            size={"lg"}
            closeOnClickOutside={false}
            overlayProps={{
                backgroundOpacity: 0.55,
                blur: 3,
            }}
        >
            <div className="flex flex-col gap-4">

            </div>

            <Group mt="lg" justify="flex-end">
                <Button onClick={props.close} variant="default">
                    Отменить
                </Button>
                <Button
                    onClick={() => { }}
                    className="bg-dark-blue hover:bg-dark-blue"
                >
                    Сохранить
                </Button>
            </Group>
        </Modal>
    );
};
