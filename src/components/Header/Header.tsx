import React from "react";
import { Box, Button, Group } from "@mantine/core";

export const Header = () => {
  return (
    <Box className="border border-b border-solid">
      <header className="p-2">
        <Group justify="space-between" h="100%">
          <i>Logo</i>

          <Group h="100%" gap={0} visibleFrom="sm">
            <a href="#" className="pr-2 pl-2 text-gray-dark no-underline">Home</a>
            <a href="#" className="pr-2 pl-2 text-gray-dark no-underline">Home</a>
            <a href="#" className="pr-2 pl-2 text-gray-dark no-underline">Home</a>
          </Group>

          <Group visibleFrom="sm">
            <Button variant="default">Вход</Button>
            <Button className="bg-green hover:bg-green">Регистрация</Button>
          </Group>
        </Group>
      </header>
    </Box>
  );
};
