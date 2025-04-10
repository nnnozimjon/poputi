import { Metadata } from "next";
import HomePage from "./HomePage";

export const metadata: Metadata = {
    icons: './favicon.png',
    title: "Poputi.tj – Поиск попутчиков и автомобилей в Таджикистане",
    description:
      "Poputi.tj – удобный сервис для поиска попутчиков и автомобилей для поездок по Таджикистану. Экономьте на транспорте, находите надежных водителей и путешествуйте комфортно.",
    keywords:
      "Poputi.tj, поиск попутчиков, совместные поездки, автомобили для поездок, поездки по Таджикистану, карпулинг, дешевые поездки, удобные маршруты, сервис попутчиков",
    openGraph: {
      title: "Poputi.tj – Найдите попутчиков и автомобили в Таджикистане",
      description:
        "Присоединяйтесь к Poputi.tj – сервису для поиска попутчиков и автомобилей по всему Таджикистану. Забронируйте поездку или найдите пассажиров легко и быстро!",
    },
  };
  

export default function Page() {
    return <HomePage /> 
}