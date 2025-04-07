"use client";

import { Container, Title, Text, List } from "@mantine/core";

export default function PrivacyPage() {
  return (
    <Container size="lg" className="py-16">
      <Title order={1} className="text-3xl font-bold mb-8">
        Политика конфиденциальности
      </Title>

      <div className="space-y-8">
        <section>
          <Title order={2} className="text-2xl font-semibold mb-4">
            1. Сбор информации
          </Title>
          <Text className="text-gray-700 leading-relaxed mb-4">
            Мы собираем информацию, которую вы предоставляете при использовании нашего сервиса. Это может включать:
          </Text>
          <List className="list-disc space-y-2 text-gray-700 ml-6">
            <List.Item>Контактные данные (имя, email, телефон)</List.Item>
            <List.Item>Информацию о поездках и маршрутах</List.Item>
            <List.Item>Данные профиля и фотографии</List.Item>
            <List.Item>Платежную информацию</List.Item>
          </List>
        </section>

        <section>
          <Title order={2} className="text-2xl font-semibold mb-4">
            2. Использование информации
          </Title>
          <Text className="text-gray-700 leading-relaxed mb-4">
            Собранная информация используется для:
          </Text>
          <List className="list-disc space-y-2 text-gray-700 ml-6">
            <List.Item>Предоставления и улучшения наших услуг</List.Item>
            <List.Item>Обеспечения безопасности пользователей</List.Item>
            <List.Item>Связи с пользователями</List.Item>
            <List.Item>Обработки платежей</List.Item>
          </List>
        </section>

        <section>
          <Title order={2} className="text-2xl font-semibold mb-4">
            3. Защита информации
          </Title>
          <Text className="text-gray-700 leading-relaxed mb-4">
            Мы принимаем все необходимые меры для защиты ваших персональных данных:
          </Text>
          <List className="list-disc space-y-2 text-gray-700 ml-6">
            <List.Item>Используем шифрование данных</List.Item>
            <List.Item>Регулярно обновляем системы безопасности</List.Item>
            <List.Item>Ограничиваем доступ к персональным данным</List.Item>
          </List>
        </section>

        <section>
          <Title order={2} className="text-2xl font-semibold mb-4">
            4. Передача данных третьим лицам
          </Title>
          <Text className="text-gray-700 leading-relaxed mb-4">
            Мы не продаем и не передаем ваши персональные данные третьим лицам, за исключением случаев:
          </Text>
          <List className="list-disc space-y-2 text-gray-700 ml-6">
            <List.Item>Когда это необходимо для оказания услуг</List.Item>
            <List.Item>По требованию законодательства</List.Item>
            <List.Item>С вашего явного согласия</List.Item>
          </List>
        </section>

        <section>
          <Title order={2} className="text-2xl font-semibold mb-4">
            5. Файлы cookie
          </Title>
          <Text className="text-gray-700 leading-relaxed mb-4">
            Мы используем файлы cookie для улучшения работы сервиса. Вы можете отключить использование cookie в настройках браузера, но это может повлиять на функциональность сайта.
          </Text>
        </section>

        <section>
          <Title order={2} className="text-2xl font-semibold mb-4">
            6. Права пользователей
          </Title>
          <Text className="text-gray-700 leading-relaxed mb-4">
            Вы имеете право:
          </Text>
          <List className="list-disc space-y-2 text-gray-700 ml-6">
            <List.Item>Получить доступ к своим персональным данным</List.Item>
            <List.Item>Исправить неточные данные</List.Item>
            <List.Item>Удалить свои данные</List.Item>
            <List.Item>Отозвать согласие на обработку данных</List.Item>
          </List>
        </section>

        <section className="bg-gray-50 p-6 rounded-lg">
          <Title order={2} className="text-2xl font-semibold mb-4">
            Связаться с нами
          </Title>
          <Text className="text-gray-700 leading-relaxed">
            Если у вас есть вопросы о нашей политике конфиденциальности, пожалуйста, свяжитесь с нами:
          </Text>
          <List className="list-disc space-y-2 text-gray-700 ml-6 mt-4">
            <List.Item>Email: privacy@poputi.tj</List.Item>
            <List.Item>Telegram: @poputi</List.Item>
            <List.Item>WhatsApp: +992912345678</List.Item>
          </List>
        </section>
      </div>
    </Container>
  );
}
