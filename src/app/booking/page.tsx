import { Metadata } from "next";
import BookingPage from "./BookingPage";

export const metadata: Metadata = {
    icons: './favicon.png',
    title: "Poputi.tj – Бронирование поездки",
    description:
      "Забронируйте места в автомобиле для вашей поездки через Poputi.tj. Выбирайте удобные места и путешествуйте с комфортом по Таджикистану.",
    keywords:
      "Poputi.tj, бронирование поездки, заказ мест, выбор сидений, совместные поездки, поездки по Таджикистану",
    openGraph: {
      title: "Poputi.tj – Бронирование мест для поездки",
      description:
        "Забронируйте места в автомобиле через Poputi.tj. Простое бронирование, удобный выбор мест и комфортные поездки по всему Таджикистану.",
    },
};

export default function Page() {
    return <BookingPage />
}
