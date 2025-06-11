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

export const formatTimeOnly = (date: Date) => {
    if (!date) return '';
    
    const options: any = {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    };
    
    return new Date(date).toLocaleString('en-US', options);
}

export const calculateDuration = (departureTime: Date, arrivalTime: Date) => {
    if (!departureTime || !arrivalTime) return '';
    
    const diffInMs = arrivalTime.getTime() - departureTime.getTime();
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInMinutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${diffInHours}h ${diffInMinutes}m`;
}
