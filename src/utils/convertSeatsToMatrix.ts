type Seat = {
    id: number;
    seat_row: number;
    seat_column: number;
    is_driver_seat: boolean;
    is_booked: boolean;
    price: number;
};


type Trip = {
    id: number;
    is_driver: boolean;
    isBooked: boolean;
    price: number;
};

export function convertSeatsToMatrix(car_seats: Seat[]): Trip[][] {
    const seatMap: { [row: number]: { [col: number]: Trip } } = {};

    for (const seat of car_seats) {
        if (!seatMap[seat.seat_row]) {
            seatMap[seat.seat_row] = {};
        }
        seatMap[seat.seat_row][seat.seat_column] = {
            id: seat.id,
            is_driver: seat.is_driver_seat,
            isBooked: seat.is_booked,
            price: Number(seat.price),
        };
    }

    // Sort and transform into a 2D array
    const result: Trip[][] = [];

    const sortedRows = Object.keys(seatMap)
        .map(Number)
        .sort((a, b) => a - b);

    for (const row of sortedRows) {
        const columns = seatMap[row];
        const sortedCols = Object.keys(columns)
            .map(Number)
            .sort((a, b) => a - b);
        result.push(sortedCols.map(col => columns[col]));
    }

    return result;
}
