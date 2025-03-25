import { ActionIcon, Alert, Button, Group, Modal, Text } from "@mantine/core";
import { Fragment, useState } from "react";
import { BsPlus } from "react-icons/bs";
import { PiSeatbeltFill } from "react-icons/pi";
import { GiCarKey } from "react-icons/gi";
import { useCreateCarSeats } from "@/hooks";

interface Props {
  opened: boolean;
  close: () => void;
}

export const AddCarSeats = (props: Props) => {
  const { mutate } = useCreateCarSeats();

  const seats = [
    [
      { id: 1, isDriver: true },
      { id: 2, isDriver: false },
    ],
    [
      { id: 3, isDriver: false },
      { id: 4, isDriver: false },
      { id: 5, isDriver: false },
    ],
  ];

  const [carSeats, setCarSeats] = useState(seats);

  const addSeatToRow = (groupIndex: number) => {
    setCarSeats((prev) => {
      const updatedSeats = prev.map((group, gIndex) => {
        if (gIndex === groupIndex) {
          // Check if the row already has 5 seats
          if (group.length >= 4) {
            return group; // Return the row unchanged
          }
          // Create a new seat object
          const newSeat = {
            id: group.length + 1, // Generate a unique ID
            isDriver: false,
          };
          // Add the new seat to the row
          return [...group, newSeat];
        }
        return group;
      });
      return updatedSeats;
    });
  };

  const removeSeatFromRow = (groupIndex: number) => {
    setCarSeats((prev) => {
      const updatedSeats = prev.map((group, gIndex) => {
        if (gIndex === groupIndex) {
          // Check if the row has at least one seat
          if (group.length === 0) {
            return group; // Return the row unchanged
          }
          // Remove the last seat from the row
          return group.slice(0, -1);
        }
        return group;
      });

      // Filter out empty groups
      const filteredSeats = updatedSeats.filter((group) => group.length > 0);

      return filteredSeats;
    });
  };

  const addNewRow = () => {
    setCarSeats((prev) => {
      // Create a new row with a single seat
      const newRow = [
        {
          id: prev.length + 1, // Generate a unique ID for the row
          isDriver: false,
        },
      ];
      // Append the new row to the existing carSeats
      return [...prev, newRow];
    });
  };

  const handleCreateSeats = () => {
    const mappedSeats = carSeats.flatMap((group, rowIndex) =>
      group.map((seat, columnIndex) => ({
        seat_row: rowIndex + 1,
        seat_column: columnIndex + 1,
        is_driver_seat: seat.isDriver,
      }))
    );

    mutate(
      { seats: mappedSeats },
      {
        onSuccess: (data) => {
          // !comment: new the token
          props.close();
        },
        onError: (err) => {
          console.log(err);
        },
      }
    );
  };

  return (
    <Modal
      centered
      opened={props.opened}
      onClose={props.close}
      title="Добавить автомобильные сиденья"
      size={"lg"}
      closeOnClickOutside={false}
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 3,
      }}
    >
      <Alert>
        Нажмите на значок плюса, чтобы добавить новые места, или нажмите на
        существующее место, чтобы удалить его. Пожалуйста, добавьте все места в
        вашем транспортном средстве.
      </Alert>
      <br />
      {carSeats?.map((group, groupIndex) => (
        <Fragment key={groupIndex}>
          <div className="flex items-center justify-between">
            <Text />
            <div className="flex gap-4 items-center">
              {group?.map((seat, seatIndex) => (
                <div
                  key={seatIndex}
                  onClick={() =>
                    seat.isDriver ? null : removeSeatFromRow(groupIndex)
                  }
                  className={`border border-solid p-2 rounded-md w-fit flex items-center cursor-pointer justify-center text-2xl border-main text-main`}
                >
                  {seat.isDriver ? <GiCarKey /> : <PiSeatbeltFill />}
                </div>
              ))}
              {group.length < 4 && (
                <ActionIcon
                  onClick={() => addSeatToRow(groupIndex)}
                  className={`p-2 rounded-md w-fit h-full flex items-center cursor-pointer justify-center text-2xl text-white bg-main hover:bg-main`}
                >
                  <BsPlus />
                </ActionIcon>
              )}
            </div>
            <Text />
          </div>
          <br />
        </Fragment>
      ))}
      <div className="flex items-center justify-center">
        <Button onClick={addNewRow}>Добавить новый ряд</Button>
      </div>

      <Group mt="lg" justify="flex-end">
        <Button onClick={props.close} variant="default">
          Отменить
        </Button>
        <Button
          onClick={handleCreateSeats}
          className="bg-dark-blue hover:bg-dark-blue"
        >
          Сохранить
        </Button>
      </Group>
    </Modal>
  );
};
