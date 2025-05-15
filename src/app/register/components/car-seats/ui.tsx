import { Fragment } from "react";
import { ActionIcon, Alert, Button, Text } from "@mantine/core";
import { BsPlus } from "react-icons/bs";
import { GiCarKey } from "react-icons/gi";
import { PiSeatbeltFill } from "react-icons/pi";

export const CarSeats = ({ carSeats, setCarSeats }: any) => {
  const addSeatToRow = (groupIndex: number) => {
    setCarSeats((prev: any) => {
      const updatedSeats = prev.map((group: any, gIndex: number) => {
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
    setCarSeats((prev: any) => {
      const updatedSeats = prev.map((group: any, gIndex: number) => {
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
      const filteredSeats = updatedSeats.filter(
        (group: any) => group.length > 0
      );

      return filteredSeats;
    });
  };

  const addNewRow = () => {
    setCarSeats((prev: any) => {
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

  return (
    <div>
      <Alert className="w-full md:w-[400px]">
        Нажмите на значок плюса, чтобы добавить новые места, или нажмите на
        существующее место, чтобы удалить его. Пожалуйста, добавьте все места в
        вашем транспортном средстве.
      </Alert>
      <br />
      {carSeats?.map((group: any, groupIndex: number) => (
        <Fragment key={groupIndex}>
          <div className="flex items-center justify-between">
            <Text />
            <div className="flex gap-4 items-center">
              {group?.map((seat: any, seatIndex: number) => (
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
    </div>
  );
};
