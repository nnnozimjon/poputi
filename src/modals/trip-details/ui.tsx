import {
  Modal,
  Text,
  Group,
  Stack,
  Avatar,
  Rating,
  Badge,
  Divider,
  Box,
} from "@mantine/core";
import { IoCalendar, IoPeople, IoCar, IoLocation } from "react-icons/io5";
import dayjs from "dayjs";

interface TripDetailsModalProps {
  opened: boolean;
  close: () => void;
  trip: any;
}

export function TripDetailsModal({ opened, close, trip }: TripDetailsModalProps) {
  if (!trip) return null;

  return (
    <Modal
      centered
      opened={opened}
      onClose={close}
      title="Подробнее о поездке"
      size="md"
      closeOnClickOutside={true}
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 3,
      }}
    >
      <Stack gap="lg">
        {/* Trip Information */}
        <Box>
          <Text size="lg" fw={600} mb="md">
            Информация о поездке
          </Text>
          <Stack gap="sm">
            <Group gap={8}>
              <IoCalendar size={16} color="#8E9BAE" />
              <Text size="sm" color="dimmed">
                {dayjs(trip.departure_date).format("MMM D, YYYY [at] hh:mm A")}
              </Text>
            </Group>
            <Group gap={8}>
              <IoLocation size={16} color="#228be6" />
              <Text size="sm" fw={500}>
                {trip.from}
              </Text>
            </Group>
            <Group gap={8}>
              <IoLocation size={16} color="#228be6" style={{ opacity: 0.7 }} />
              <Text size="sm" color="dimmed">
                {trip.to}
              </Text>
            </Group>
            <Group gap={8}>
              <IoPeople size={16} color="#8E9BAE" />
              <Text size="sm" color="dimmed">
                {trip.seats} мест
              </Text>
            </Group>
          </Stack>
        </Box>

        <Divider />

        {/* Driver Information */}
        <Box>
          <Text size="lg" fw={600} mb="md">
            Информация о водителе
          </Text>
          <Group gap="md" align="flex-start">
            <Avatar size={60} src={trip.driver?.avatar} radius="xl" />
            <Stack gap="xs" style={{ flex: 1 }}>
              <Text size="md" fw={600}>
                {trip.driver?.name || "Имя водителя"}
              </Text>
              <Group gap={8}>
                <Rating 
                  value={trip.driver?.rating || 0} 
                  fractions={2} 
                  readOnly 
                  size="sm" 
                />
                <Text size="sm" color="dimmed">
                  {trip.driver?.rating || 0} рейтинг
                </Text>
              </Group>
              <Group gap={8}>
                <IoCar size={16} color="#8E9BAE" />
                <Text size="sm" color="dimmed">
                  {trip.driver?.car || "Информация о машине не доступна"}
                </Text>
              </Group>
            </Stack>
          </Group>
        </Box>

        <Divider />

        {/* Trip Status and Price */}
        <Box>
          <Text size="lg" fw={600} mb="md">
            Статус поездки
          </Text>
          <Group justify="space-between" align="center">
            <Badge 
              color={trip.status === "paid" ? "green" : "gray"} 
              variant="light" 
              size="md"
            >
              {trip.status === "paid" ? "Оплачено" : "В ожидании"}
            </Badge>
            <Text size="xl" fw={700} color="blue">
              {trip.price?.toFixed(2) || "0.00"} TJS
            </Text>
          </Group>
        </Box>

        {/* Bought Seats Information */}
        {trip.boughtSeats && (
          <>
            <Divider />
            <Box>
              <Text size="lg" fw={600} mb="md">
                Купленные места
              </Text>
              <Stack gap="sm">
                {trip.boughtSeats.map((seat: any, index: number) => (
                  <Group key={index} justify="space-between" p="sm" bg="gray.0" style={{ borderRadius: 8 }}>
                    <Group gap={8}>
                      <IoPeople size={16} color="#8E9BAE" />
                      <Text size="sm" fw={500}>
                        Место {seat.seatNumber || index + 1}
                      </Text>
                    </Group>
                    <Text size="sm" fw={600} color="blue">
                      {seat.price?.toFixed(2) || "0.00"} TJS
                    </Text>
                  </Group>
                ))}
              </Stack>
            </Box>
          </>
        )}
      </Stack>
    </Modal>
  );
} 