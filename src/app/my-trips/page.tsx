import { Metadata } from "next";
import { MyTripsPage } from "./MyTripsPage";

export const metadata: Metadata = {
  icons: './favicon.png',
  title: "Мои поездки | Poputi.tj",
  description: "Просмотрите и управляйте своими поездками на платформе поиска попутчиков Poputi.tj. Удобный интерфейс для отслеживания ваших поездок.",
  keywords: "мои поездки, управление поездками, Poputi.tj, поиск попутчиков, путешествия",
  openGraph: {
    title: "Мои поездки | Poputi.tj",
    description: "Управляйте своими поездками на платформе Poputi.tj. Просмотр, редактирование и управление вашими поездками в одном месте.",
  },
};

export default function Page() {
  return <MyTripsPage />; 
}
