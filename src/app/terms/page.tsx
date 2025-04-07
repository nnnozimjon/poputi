import { Metadata } from "next";
import TermsPage from './TermsPage';

export const metadata: Metadata = {
  icons: './favicon.png',
  title: "Условия использования | Poputi.tj",
  description: "Ознакомьтесь с условиями использования нашей платформы поиска попутчиков. Правила регистрации, поездок, оплаты и другая важная информация для пользователей сервиса.",
  keywords: "условия использования, правила сервиса, регистрация, поездки, оплата, Poputi.tj",
  openGraph: {
    title: "Условия использования Poputi.tj",
    description: "Ознакомьтесь с правилами и условиями использования сервиса поиска попутчиков Poputi.tj.",
  },
};

export default function Page() {
  return <TermsPage />;
}
