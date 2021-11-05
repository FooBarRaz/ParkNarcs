export type NarcRequest = {
    comment: string;
    location: string;
    state: string;
    licensePlate: string;
}

export type NarcReport = NarcRequest & {
    postedBy: string;
    date: string;
}
