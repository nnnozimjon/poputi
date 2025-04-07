import { Metadata } from "next";
import CookiesPage from "./CookiesPage";

export const metadata: Metadata = {
  icons: './favicon.png',
  title: "Политика использования cookie | Poputi.tj",
  description: "Узнайте, как Poputi.tj использует файлы cookie для улучшения работы сервиса. Информация о типах cookie, сроках хранения и настройках управления файлами cookie.",
  keywords: "cookie, файлы cookie, политика cookie, настройки cookie, Poputi.tj",
  openGraph: {
    title: "Политика использования cookie Poputi.tj",
    description: "Информация об использовании файлов cookie на платформе поиска попутчиков Poputi.tj.",
  },
};

export default function Page() {
  return <CookiesPage />;
}
