import { Metadata } from "next";
import { MainRegisterPage } from "./register-page";

export const metadata: Metadata = {
    icons: './favicon.png',
    title: "Poputi.tj – Регистрация",
    description:
      "Зарегистрируйтесь на Poputi.tj для доступа к сервису совместных поездок. Создайте аккаунт и начните путешествовать по Таджикистану с комфортом.",
    keywords:
      "Poputi.tj, регистрация, создание аккаунта, совместные поездки, поездки по Таджикистану",
    openGraph: {
      title: "Poputi.tj – Регистрация нового пользователя",
      description:
        "Присоединяйтесь к Poputi.tj! Регистрация займет всего несколько минут. Создайте аккаунт и получите доступ к удобным поездкам по всему Таджикистану.",
    },
};

export default function Page() {
    return <MainRegisterPage />;
}
