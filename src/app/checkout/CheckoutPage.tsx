"use client"

import { AlifLogo, DcLogo } from "@/assets";
import { Button, Checkbox, Container, Input, Select } from "@mantine/core";
import { Radio } from "@mantine/core";
import { Text } from "@mantine/core";
import Image from "next/image";
import { useCreateOrder } from "@/hooks/useAlifPayment";

export default function CheckoutPage() {
    const { mutate: createOrder } = useCreateOrder();

    const handleCreateOrder = () => {
        createOrder(undefined, {
            onSuccess: (data) => {
                // Create a new window/tab with the HTML response
                const newWindow = window.open('alifPayWindow', '_blank');
                if (newWindow) {
                    newWindow.document.write(data);
                    newWindow.document.close();
                }
            },
            onError: (error) => {
                console.error('Error creating order:', error);
            }
        });
    }
   

    return <Container size="xl" className="mt-5 md:mt-10 px-0 md:px-10">
        <div className="px-4 md:px-6">
            <div className="grid grid-cols-12 gap-6 mt-5">
                <div className="col-span-12 md:col-span-8 bg-white">
                    <div className="shadow-[0_0_3px_rgba(0,0,0,0.1)] rounded-lg p-4 mb-6">
                        <h2 className="text-lg font-bold mb-2">Детали пассажира</h2>
                        <div className="font-semibold mb-3">Пассажир 1</div>
                        <div className="flex flex-col items-baseline md:flex-row gap-3 mb-3">
                            <Input
                                type="text"
                                placeholder="Имя*"
                                className="border border-gray-light rounded-md focus:outline-none focus:border-main w-full md:w-1/3"
                                classNames={{
                                    input: 'px-3 py-6 text-lg text-blue-600',
                                }}
                            />
                            <Input
                                type="text"
                                placeholder="Фамилия*"
                                className="border border-gray-light rounded-md focus:outline-none focus:border-main w-full md:w-1/3"
                                classNames={{
                                    input: 'px-3 py-6 text-lg text-blue-600',
                                }}
                            />
                            <Select
                                className="border border-gray-light rounded-md focus:outline-none focus:border-main w-full w-full md:w-1/3"
                                defaultValue="adult"
                                data={[
                                    { label: 'Взрослый (16 - 99 лет)', value: 'adult' },
                                    { label: 'Детский (2 - 15 лет)', value: 'child' },
                                    { label: 'Детский (0 - 1 год)', value: 'infant' },
                                ]}
                                classNames={{
                                    input: 'px-3 py-6 text-lg text-blue-600',
                                }}
                            />
                        </div>
                        <Button
                            type="button"
                            className="flex items-center font-medium text-sm mt-1 hover:underline h-[48px]"
                        >
                            Добавить еще одного пассажира
                        </Button>
                    </div>

                    <div className="shadow-[0_0_3px_rgba(0,0,0,0.1)] rounded-lg p-4 mb-6">
                        <h2 className="text-lg font-bold mb-2">Контакт</h2>
                        <div className="mb-2 text-gray-700">Мы отправим ваши билеты на этот номер телефона.</div>
                        <Input
                            type="tel"
                            placeholder="Телефон*"
                            className="border border-gray-light rounded-md border-solid focus:outline-none focus:border-main w-full md:w-1/2"
                            classNames={{
                                input: 'px-3 py-6 text-lg text-blue-600',
                            }}
                        />
                    </div>

                    <div className="shadow-[0_0_3px_rgba(0,0,0,0.1)] rounded-lg p-4">
                        <h2 className="text-lg font-bold mb-4">Способ оплаты</h2>

                        <div className="flex items-center gap-2">
                            <div onClick={handleCreateOrder} className="border border-gray-light border-solid rounded-md p-2 w-full flex items-center justify-center hover:border-main cursor-pointer">
                                <Image src={AlifLogo} width={100} height={100} alt="Alif" />
                            </div>
                            <div className="border border-gray-light border-solid rounded-md p-2 w-full flex items-center justify-center hover:border-main cursor-pointer">
                                <Image src={DcLogo} width={100} height={100} alt="DC" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-12 md:col-span-4 h-fit">
                    <div className="bg-white rounded-lg p-4 shadow-[0_0_3px_rgba(0,0,0,0.1)]">
                        <h2 className="text-lg font-bold mb-2 text-blue-600">Детали бронирования</h2>
                        <div className="font-semibold mb-2">Чт, 12 Июнь</div>
                        <div className="mb-3">
                            <div className="flex items-start gap-2">
                                <div className="flex flex-col items-center mr-2">
                                    <span className="w-2 h-2 bg-main rounded-full mt-1"></span>
                                    <span className="w-0.5 h-6 bg-gray-300 my-1"></span>
                                    <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="font-semibold text-sm">18:52</span>
                                        <span className="text-sm">Душанбе</span>
                                    </div>
                                    <div className="flex items-center gap-2 mt-2">
                                        <span className="font-semibold text-sm">22:40</span>
                                        <span className="text-sm">Хучанд</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mb-2">
                            <span className="font-semibold">1 пассажир:</span> <span className="text-gray-700">1 взрослый</span>
                        </div>
                        <div className="flex justify-between mb-1">
                            <span>Билеты x1</span>
                            <span className="font-semibold">37.50 TJS</span>
                        </div>
                        <div className="flex justify-between mb-3">
                            <span>Комиссия бронирования</span>
                            <span>1.50 TJS</span>
                        </div>
                        <div className="flex justify-between items-center font-bold text-lg mb-1">
                            <span>Итого</span>
                            <span>37.50 TJS</span>
                        </div>
                    </div>

                </div>
            </div>
            <div className="mb-96" />
        </div>
    </Container>
}