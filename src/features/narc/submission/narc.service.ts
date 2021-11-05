import {createNarc} from "../../../graphql/mutations";
import {API, graphqlOperation} from 'aws-amplify';

type NarcRequest = {
    comment: string;
    location: string;
    state: string;
    licensePlate: string;
}

class NarcService {
    narc(request: NarcRequest) {
        API.graphql(graphqlOperation(createNarc, {
            input: {
                comment: request.comment,
                date: new Date().toISOString(),
                state: request.state,
                licensePlate: request.licensePlate,
                location: request.location,
                postedBy: 'me'
            }
        }))
    }
}

const instance = new NarcService();
export default instance;
