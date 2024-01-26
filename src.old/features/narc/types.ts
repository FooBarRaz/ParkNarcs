export type NarcRequest = {
    comment: string;
    location: string;
    state: string;
    licensePlate: string;
    image: string;
}

export type NarcReport = NarcRequest & {
    postedBy: string;
    date: string;
}

export type NarcReportEntity = NarcReport & {
    id: string;
}
