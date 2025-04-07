import { Metadata } from "next";
import AuthPage from "./AuthPage";

export const metadata: Metadata = {
    icons: './favicon.png',
    title: "Poputi.tj – Авторизация",
    description:
      "Войдите в свой аккаунт Poputi.tj для доступа к сервису поиска попутчиков и автомобилей в Таджикистане.",
    keywords:
      "Poputi.tj, вход, авторизация, логин, аккаунт попутчика, регистрация в сервисе",
    openGraph: {
      title: "Poputi.tj – Авторизация в сервисе поиска попутчиков",
      description:
        "Войдите или зарегистрируйтесь в Poputi.tj для поиска попутчиков и автомобилей по всему Таджикистану.",
    },
};

export default function Page() {
    return <AuthPage />
}
