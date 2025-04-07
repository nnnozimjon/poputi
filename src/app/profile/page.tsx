import { Metadata } from "next";
import ProfilePage from "./ProfilePage";

export const metadata: Metadata = {
    icons: './favicon.png',
    title: "Poputi.tj – Личный профиль",
    description:
      "Управляйте своим профилем на Poputi.tj. Обновляйте личную информацию, просматривайте историю поездок и настраивайте предпочтения для поездок по Таджикистану.",
    keywords:
      "Poputi.tj, личный кабинет, профиль пользователя, настройки аккаунта, история поездок, предпочтения поездок",
    openGraph: {
      title: "Poputi.tj – Управление личным профилем",
      description:
        "Настройте свой профиль на Poputi.tj. Управляйте личной информацией, автомобилями и предпочтениями для комфортных поездок по Таджикистану.",
    },
};

export default function Page() {
    return <ProfilePage />
}
