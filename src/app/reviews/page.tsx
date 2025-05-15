import { Badge, Container, Input, Select } from "@mantine/core";
import { EmptyReviewPage } from "./empty-data";
import { ReviewCard } from "./card";

export default function ReviewsPage() {
  const data = [];
  const isAvailable = data?.length > 0;

  return (
    <Container size={"xl"} className="my-40">
      {/* <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Select placeholder="Сортировать по: Дате" />
          <Input placeholder="Поиск по маршруту" />
        </div>
        <Badge variant="light" color="dark">
          Все отзывы
        </Badge>
      </div> */}
      {isAvailable && (
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <ReviewCard />
          <ReviewCard />
          <ReviewCard />
          <ReviewCard />
        </div>
      )}

      {/* <h1 className="text-2xl font-bold">Отзывы</h1>
      <p className="text-gray-600">
        Здесь будут отзывы пользователей о нашем сервисе.
      </p> */}

      {!isAvailable && <EmptyReviewPage />}
    </Container>
  );
}
