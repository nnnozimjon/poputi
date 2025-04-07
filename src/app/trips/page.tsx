import { Metadata } from "next";
import TripsPage from "./TripsPage";

export const metadata: Metadata = {
    icons: './favicon.png',
    title: "Poputi.tj – Поиск попутчиков",
    description: 
      "Найдите попутчиков для совместных поездок по Таджикистану на Poputi.tj. Экономичные поездки с проверенными водителями в любом направлении.",
    keywords:
      "Poputi.tj, поиск попутчиков, совместные поездки, поездки по Таджикистану, попутчики, водители",
    openGraph: {
      title: "Poputi.tj – Поиск попутчиков для совместных поездок",
      description:
        "Ищите попутчиков для комфортных и выгодных поездок по всему Таджикистану. Безопасные поездки с проверенными водителями на Poputi.tj.",
    },
};

export default function Page() {
    return <TripsPage />
}
