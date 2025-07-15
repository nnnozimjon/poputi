import {
  Button,
  Text,
  Card,
  Group,
  Badge,
  Stack,
  Box,
} from "@mantine/core";
import { IoCalendar, IoPeople } from "react-icons/io5";
import { IoLocation } from "react-icons/io5";
import dayjs from "dayjs";
import { useState } from "react";
import { TripDetailsModal } from "@/modals";

export function TripPurchaseCard({ trip }: { trip: any }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Group align="flex-start" justify="space-between" wrap="nowrap" visibleFrom="md">
          <Stack gap={4}>
            <Group gap={6}>
              <IoCalendar size={16} color="#8E9BAE" />
              <Text size="xs" color="dimmed">
                {dayjs(trip.departure_date).format("MMM D, YYYY [at] hh:mm A")}
              </Text>
            </Group>
            <Box>
              <Group gap={6}>
                <IoLocation size={16} color="#228be6" />
                <Text size="sm" fw={500}>
                  {trip.from}
                </Text>
              </Group>
              <Group gap={6} mt={2}>
                <IoLocation size={16} color="#228be6" style={{ opacity: 0.7 }} />
                <Text size="sm" color="dimmed">
                  {trip.to}
                </Text>
              </Group>
            </Box>
            <Group gap={6} mt={2}>
              <IoPeople size={16} color="#8E9BAE" />
              <Text size="xs" color="dimmed">
                {trip.seats} мест
              </Text>
            </Group>
          </Stack>
          <Stack gap={8} align="end">
            <Badge color={trip.status === "paid" ? "green" : "gray"} variant="light" size="sm">
              {trip.status === "paid" ? "Оплачено" : "В ожидании"}
            </Badge>
            <Text size="lg" fw={700} color="blue">
              {trip.price?.toFixed(2) || "0.00"} TJS
            </Text>
            <Button
              variant="subtle"
              size="xs"
              onClick={() => setIsModalOpen(true)}
              style={{ padding: 0, height: 24 }}
            >
              Подробнее
            </Button>
          </Stack>
        </Group>

        <Stack gap="md" hiddenFrom="md">
          <Group justify="space-between" align="center">
            <Group gap={6}>
              <IoCalendar size={16} color="#8E9BAE" />
              <Text size="xs" color="dimmed">
                {dayjs(trip.departure_date).format("MMM D, YYYY [at] hh:mm A")}
              </Text>
            </Group>
            <Badge color={trip.status === "paid" ? "green" : "gray"} variant="light" size="sm">
              {trip.status === "paid" ? "Оплачено" : "В ожидании"}
            </Badge>
          </Group>

          <Box>
            <Group gap={6}>
              <IoLocation size={16} color="#228be6" />
              <Text size="sm" fw={500}>
                {trip.from}
              </Text>
            </Group>
            <Group gap={6} mt={2}>
              <IoLocation size={16} color="#228be6" style={{ opacity: 0.7 }} />
              <Text size="sm" color="dimmed">
                {trip.to}
              </Text>
            </Group>
          </Box>
          <Group justify="space-between" align="center">
            <Group gap={6}>
              <IoPeople size={16} color="#8E9BAE" />
              <Text size="xs" color="dimmed">
                {trip.seats} мест
              </Text>
            </Group>
            <Text size="lg" fw={700} color="blue">
              {trip.price?.toFixed(2) || "0.00"} TJS
            </Text>
          </Group>

          <Button
            variant="subtle"
            size="sm"
            onClick={() => setIsModalOpen(true)}
            fullWidth
          >
            Подробнее
          </Button>
        </Stack>
      </Card>

      <TripDetailsModal
        opened={isModalOpen}
        close={() => setIsModalOpen(false)}
        trip={trip}
      />
    </>
  );
}