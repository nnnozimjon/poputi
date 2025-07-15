"use client";

import { useState } from "react";
import {
  Container,
  Paper,
  Title,
  Text,
  Button,
  Stack,
  Group,
  Center,
  Card,
  rem,
} from "@mantine/core";
import { IconPlus, IconCreditCard, IconCheck } from "@tabler/icons-react";

const initialPayoutMethods: Array<{
  id: string;
  bank: string;
  account: string;
  addedAt: string;
}> = [];

function PayoutMethodCard({
  method,
}: {
  method: { id: string; bank: string; account: string; addedAt: string };
}) {
  return (
    <Card
      withBorder
      radius="md"
      shadow="sm"
      p="lg"
      mb="md"
      style={{ width: "100%" }}
    >
      <Group align="center" gap="md">
        <IconCreditCard size={32} color="var(--mantine-color-blue-6)" />
        <Stack gap={0} style={{ flex: 1 }}>
          <Text fw={500}>{method.bank}</Text>
          <Text size="sm" c="dimmed">
            {method.account}
          </Text>
        </Stack>
        <IconCheck size={20} color="var(--mantine-color-green-6)" />
      </Group>
    </Card>
  );
}

export default function Page() {
  const [payoutMethods, setPayoutMethods] = useState(initialPayoutMethods);

  const handleAddPayout = () => {
    setPayoutMethods((prev) => [
      ...prev,
      {
        id: Math.random().toString(36).slice(2),
        bank: "Alif Bank",
        account: "+992 90 123 45 67",
        addedAt: new Date().toLocaleDateString(),
      },
    ]);
  };

  return (
    <Container size="xl" py={64}>
      <Stack align="center" gap={48}>
        <Title order={2} size="h3" ta="left" w="100%">
          Ваш метод вывода
        </Title>

        {payoutMethods.length === 0 ? (
          <Paper
            withBorder
            radius="md"
            p="xl"
            w="100%"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              minHeight: rem(260),
              justifyContent: "center",
              background: "var(--mantine-color-body)",
            }}
          >
            <Center mb="md">
              <Paper
                radius="xl"
                p={16}
                style={{
                  background: "var(--mantine-color-blue-0)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <IconCreditCard size={40} color="var(--mantine-color-blue-5)" />
              </Paper>
            </Center>
            <Text fw={500} size="lg" ta="center" mb={4}>
              Нет методов вывода
            </Text>
            <Text c="dimmed" size="sm" ta="center" mb="md">
              Добавьте свой первый метод вывода для получения платежей
            </Text>
            <Button
              leftSection={<IconPlus size="1.1rem" />}
              size="md"
              fullWidth
              mt="lg"
              style={{ maxWidth: 400 }}
              onClick={handleAddPayout}
            >
              Добавить метод вывода
            </Button>
          </Paper>
        ) : (
          <Stack w="100%" align="center" gap="xl">
            {payoutMethods.map((method) => (
              <PayoutMethodCard key={method.id} method={method} />
            ))}
            <Button
              leftSection={<IconPlus size="1.1rem" />}
              size="md"
              fullWidth
              style={{ maxWidth: 400 }}
              onClick={handleAddPayout}
            >
              Добавить метод вывода
            </Button>
          </Stack>
        )}
      </Stack>
    </Container>
  );
}