import { Button, Container, Group } from "@mantine/core";
import { Logo } from "../logo/logo";

export const AppHeader = () => {
  return (
    <Container size={"xl"}>
      <header className="px-2">
        <Group justify="space-between" h="100%">
          <svg width={64} height={64} viewBox="0 0 380 317" className="text-green">
            <Logo />
          </svg>
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
    </Container>
  );
};
