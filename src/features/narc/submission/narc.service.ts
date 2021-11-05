import {createNarc} from "../../../graphql/mutations";
import {API, graphqlOperation} from 'aws-amplify';

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

class NarcService {
    narc(input: NarcReport) {
        API.graphql(graphqlOperation(createNarc, { input }))
    }
}

const instance = new NarcService();
export default instance;
