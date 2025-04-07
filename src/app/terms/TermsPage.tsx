"use client";

import { Container, Title, Text, List } from "@mantine/core";

export default function TermsPage() {
  return (
    <Container size="lg" className="py-16">
      <Title order={1} className="text-3xl font-bold mb-8">
        Условия использования
      </Title>

      <div className="space-y-8">
        <section>
          <Title order={2} className="text-2xl font-semibold mb-4">
            1. Общие положения
          </Title>
          <Text className="text-gray-700 leading-relaxed mb-4">
            Добро пожаловать на платформу поиска попутчиков. Используя наш сервис, вы соглашаетесь с настоящими условиями использования. Пожалуйста, внимательно прочитайте их.
          </Text>
        </section>

        <section>
          <Title order={2} className="text-2xl font-semibold mb-4">
            2. Регистрация и использование сервиса
          </Title>
          <List className="list-disc space-y-2 text-gray-700 ml-6">
            <List.Item>Для использования сервиса необходимо создать учетную запись</List.Item>
            <List.Item>Вы обязуетесь предоставлять достоверную информацию при регистрации</List.Item>
            <List.Item>Вы несете ответственность за сохранность своих учетных данных</List.Item>
          </List>
        </section>

        <section>
          <Title order={2} className="text-2xl font-semibold mb-4">
            3. Правила поездок
          </Title>
          <List className="list-disc space-y-2 text-gray-700 ml-6">
            <List.Item>Водители должны иметь действующие водительские права и страховку</List.Item>
            <List.Item>Пассажиры обязаны соблюдать правила поведения в поездке</List.Item>
            <List.Item>Все участники должны прибыть в назначенное место вовремя</List.Item>
          </List>
        </section>

        <section>
          <Title order={2} className="text-2xl font-semibold mb-4">
            4. Оплата и комиссии
          </Title>
          <Text className="text-gray-700 leading-relaxed mb-4">
            Сервис взимает комиссию за использование платформы. Размер комиссии указывается при оформлении поездки. Оплата производится через безопасные платежные системы.
          </Text>
        </section>

        <section>
          <Title order={2} className="text-2xl font-semibold mb-4">
            5. Безопасность и конфиденциальность
          </Title>
          <Text className="text-gray-700 leading-relaxed mb-4">
            Мы принимаем все необходимые меры для защиты ваших персональных данных. Подробную информацию можно найти в нашей Политике конфиденциальности.
          </Text>
        </section>

        <section>
          <Title order={2} className="text-2xl font-semibold mb-4">
            6. Ответственность сторон
          </Title>
          <List className="list-disc space-y-2 text-gray-700 ml-6">
            <List.Item>Платформа не несет ответственности за действия пользователей</List.Item>
            <List.Item>Пользователи несут полную ответственность за свои действия</List.Item>
            <List.Item>В случае нарушения правил аккаунт может быть заблокирован</List.Item>
          </List>
        </section>

        <section>
          <Title order={2} className="text-2xl font-semibold mb-4">
            7. Изменение условий
          </Title>
          <Text className="text-gray-700 leading-relaxed mb-4">
            Мы оставляем за собой право изменять условия использования в любое время. Продолжая использовать сервис после внесения изменений, вы принимаете обновленные условия.
          </Text>
        </section>

        <section className="bg-gray-50 p-6 rounded-lg">
          <Title order={2} className="text-2xl font-semibold mb-4">
            Контакты
          </Title>
          <Text className="text-gray-700 leading-relaxed">
            Если у вас возникли вопросы относительно условий использования, пожалуйста, свяжитесь с нами:
          </Text>
          <List className="list-disc space-y-2 text-gray-700 ml-6 mt-4">
            <List.Item>Email: support@poputi.tj</List.Item>
            <List.Item>Telegram: @poputi</List.Item>
            <List.Item>WhatsApp: +992912345678</List.Item>
          </List>
        </section>  
      </div>
    </Container>
  );
}
