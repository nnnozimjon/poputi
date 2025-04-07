"use client";

import { Container, Title, Text, List } from "@mantine/core";

export default function CookiesPage() {
  return (
    <Container size="lg" className="py-16">
      <Title order={1} className="text-3xl font-bold mb-8">
        Политика использования файлов cookie
      </Title>

      <div className="space-y-8">
        <section>
          <Title order={2} className="text-2xl font-semibold mb-4">
            Что такое файлы cookie?
          </Title>
          <Text className="text-gray-700 leading-relaxed mb-4">
            Файлы cookie - это небольшие текстовые файлы, которые сохраняются на вашем устройстве при посещении нашего сайта. Они помогают нам улучшить работу сервиса и сделать его более удобным для вас.
          </Text>
        </section>

        <section>
          <Title order={2} className="text-2xl font-semibold mb-4">
            Какие cookie мы используем?
          </Title>
          <List className="list-disc space-y-2 text-gray-700 ml-6">
            <List.Item>
              <span className="font-semibold">Необходимые cookie:</span> Обеспечивают работу основных функций сайта и сохранение ваших настроек
            </List.Item>
            <List.Item>
              <span className="font-semibold">Аналитические cookie:</span> Помогают нам понять, как посетители взаимодействуют с сайтом
            </List.Item>
            <List.Item>
              <span className="font-semibold">Функциональные cookie:</span> Улучшают работу сайта и персонализируют его под ваши предпочтения
            </List.Item>
          </List>
        </section>

        <section>
          <Title order={2} className="text-2xl font-semibold mb-4">
            Управление файлами cookie
          </Title>
          <Text className="text-gray-700 leading-relaxed mb-4">
            Вы можете управлять использованием файлов cookie через настройки вашего браузера:
          </Text>
          <List className="list-disc space-y-2 text-gray-700 ml-6">
            <List.Item>Отключить все файлы cookie</List.Item>
            <List.Item>Получать уведомления об использовании cookie</List.Item>
            <List.Item>Выборочно разрешать использование cookie</List.Item>
          </List>
          <Text className="text-gray-700 leading-relaxed mt-4">
            Обратите внимание, что отключение некоторых типов cookie может повлиять на функциональность сайта.
          </Text>
        </section>

        <section>
          <Title order={2} className="text-2xl font-semibold mb-4">
            Срок хранения cookie
          </Title>
          <Text className="text-gray-700 leading-relaxed mb-4">
            Различные типы cookie имеют разные сроки хранения:
          </Text>
          <List className="list-disc space-y-2 text-gray-700 ml-6">
            <List.Item>Сессионные cookie удаляются после закрытия браузера</List.Item>
            <List.Item>Постоянные cookie могут храниться до 2 лет</List.Item>
            <List.Item>Маркетинговые cookie обычно хранятся до 30 дней</List.Item>
          </List>
        </section>

        <section className="bg-gray-50 p-6 rounded-lg">
          <Title order={2} className="text-2xl font-semibold mb-4">
            Дополнительная информация
          </Title>
          <Text className="text-gray-700 leading-relaxed mb-4">
            Если у вас есть вопросы об использовании файлов cookie на нашем сайте, пожалуйста, свяжитесь с нами:
          </Text>
          <List className="list-disc space-y-2 text-gray-700 ml-6">
            <List.Item>Email: privacy@poputi.tj</List.Item>
            <List.Item>Telegram: @poputi</List.Item>
            <List.Item>WhatsApp: +992912345678</List.Item>
          </List>
        </section>
      </div>
    </Container>
  );
}
