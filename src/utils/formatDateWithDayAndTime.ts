export const formatDateWithDayAndTime = (date: Date) => {
    if (!date) return '';
    
    const options: any = {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    };
    
    return new Date(date).toLocaleString('en-US', options);
} 