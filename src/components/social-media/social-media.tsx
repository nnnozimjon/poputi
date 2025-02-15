import { Button, Container, Flex, Text } from "@mantine/core";
import { BsInstagram } from "react-icons/bs";

export const SocialMedia = () => {
    return (
        <div className="mt-20 rounded-lg bg-white p-16">
            <Container>
                <Flex justify={'center'}>
                    <Text className="text-center text-green text-2xl mb-4 flex-wrap w-96">Вы можете помочь сделать наш сервис еще популярнее.</Text>
                </Flex>

                <Text size="lg" className="text-center">
                    Поделитесь ссылкой на наше приложение со своими друзьями и помогите
                    нам увеличить количество пассажиров и водителей. Ваша помощь сделает
                    нашу платформу более популярной.
                </Text>

                <Flex align={'center'} justify={'center'} gap={10} mt={30}>
                    <Button variant="default" leftSection={<BsInstagram className="text-2xl" />} className="text-green hover:text-green">
                        Инстаграм
                    </Button>
                    <Button variant="default" leftSection={<BsInstagram className="text-2xl" />} className="text-green hover:text-green">
                        Фейсбук
                    </Button>
                    <Button variant="default" leftSection={<BsInstagram className="text-2xl" />} className="text-green hover:text-green">
                        Инстаграм
                    </Button>
                    <Button variant="default" leftSection={<BsInstagram className="text-2xl" />} className="text-green hover:text-green">
                        Инстаграм
                    </Button>
                </Flex>
            </Container>
        </div>
    );
};
