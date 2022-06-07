declare module 'time-number' {
    export function timeFromInt(timeNumber: number, options?: { validate: boolean, format: 12|24, leadingZero: boolean });
}