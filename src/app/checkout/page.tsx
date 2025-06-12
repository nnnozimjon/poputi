import { Metadata } from "next";
import CheckoutPage from "./CheckoutPage";

export const metadata: Metadata = {
    icons: './favicon.png',
    title: "Poputi.tj – Оплата поездки",
    description:
        "Оплатите вашу поездку через Poputi.tj. Выбирайте удобные места и путешествуйте с комфортом по Таджикистану.",
    keywords:
        "Poputi.tj, оплата поездки, заказ мест, выбор сидений, совместные поездки, поездки по Таджикистану",
    openGraph: {
        title: "Poputi.tj – Оплата поездки",
        description:
            "Оплатите вашу поездку через Poputi.tj. Простое бронирование, удобный выбор мест и комфортные поездки по всему Таджикистану.",
    },
};

export default function Page() {
    return <CheckoutPage />
}
