import { Metadata } from "next";
import PrivacyPage from "./PrivacyPage";

export const metadata: Metadata = {
  icons: './favicon.png',
  title: "Политика конфиденциальности | Poputi.tj",
  description: "Ознакомьтесь с политикой конфиденциальности Poputi.tj. Узнайте, как мы собираем, используем и защищаем ваши персональные данные при использовании нашего сервиса поиска попутчиков.",
  keywords: "политика конфиденциальности, защита данных, персональные данные, Poputi.tj, конфиденциальность",
  openGraph: {
    title: "Политика конфиденциальности Poputi.tj",
    description: "Узнайте, как Poputi.tj защищает ваши персональные данные и обеспечивает конфиденциальность при использовании сервиса поиска попутчиков.",
  },
};

export default function Page() {
  return <PrivacyPage />;
}
