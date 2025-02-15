"use client";

import { Group, Text, Accordion } from "@mantine/core";
import { LuBadgeInfo } from "react-icons/lu";

const charactersList = [
    {
        id: "bender",
        image: <LuBadgeInfo />,
        label: "Как найти партнеров для поездок?",
        description: "Инфо",
        content: `Для поиска водителей или пассажиров, вернитесь на нашу платформу через приложение или сайт и перейдите в разделы ‘Предложить поездку’ или ‘Найти поездку’.`,
    },

    {
        id: "carol",
        image: <LuBadgeInfo />,
        label: "Где найти информацию о предстоящих поездках?",
        description: "Инфо",
        content:
            `Чтобы получить информацию о предстоящих поездках, нажмите кнопку ‘Найти поездку’ и выберите интересующую вас заявку, чтобы получить подробности о поездке.`,
    },

    {
        id: "homer",
        image: <LuBadgeInfo />,
        label: "Как забронировать место заранее?",
        description: "Инфо",
        content:
            `Для совершения предварительного бронирования заранее найдите нужное объявление, свяжитесь по указанному номеру и договоритесь с водителем или пассажиром.`,
    },

    {
        id: "sider",
        image: <LuBadgeInfo />,
        label: "Почему всё бесплатно? Разве такое возможно? ",
        description: "Инфо",
        content:
            `Мы действительно не альтруисты. Однако наш доход не зависит от клиентов. В будущем планируем ввести подписку для водителей на простых условиях. Сейчас никаких платных подписок нет.`,
    },
];

interface AccordionLabelProps {
    label: string;
    image: React.ReactNode;
    description: string;
}

function AccordionLabel({ label, image, description }: AccordionLabelProps) {
    return (
        <Group wrap="nowrap">
            <i className="text-2xl text-green">{image}</i>
            <div>
                <Text>{label}</Text>
                <Text size="sm" c="dimmed" fw={400}>
                    {description}
                </Text>
            </div>
        </Group>
    );
}

export const Faq = () => {
    const items = charactersList.map((item) => (
        <Accordion.Item value={item.id} key={item.label}>
            <Accordion.Control>
                <AccordionLabel {...item} />
            </Accordion.Control>
            <Accordion.Panel>
                <Text size="lg">{item.content}</Text>
            </Accordion.Panel>
        </Accordion.Item>
    ));
    return (
        <div>
            <Accordion className="bg-white" chevronPosition="right" variant="contained">
                {items}
            </Accordion>
        </div>
    );
};
