import { format, isSameDay, isToday, isYesterday } from "date-fns";

export function formatMessageTime(date) {
    return new Date(date).toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    });
};

export function formatDateSeparator(date) {
    const d = new Date(date);
    if (isToday(d)) return "Today";
    if (isYesterday(d)) return "Yesterday";

    return format(d, "dd/MMM/yyyy");
};

export const hasDateSeparator = (messages, i) => {
    const currDate = new Date(messages[i].createdAt);
    if (i === 0) return true;
    const prevMessageDate = new Date(messages[i - 1].createdAt);

    return !isSameDay(currDate, prevMessageDate);
};