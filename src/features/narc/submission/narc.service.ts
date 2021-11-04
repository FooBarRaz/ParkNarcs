import {createNarc} from "../../../graphql/mutations";
import { API, graphqlOperation } from 'aws-amplify';
import {CreateNarcInput} from "../../../API";

type NarcRequest = {
    comment: string;
    location: string;
    state: string;
    licensePlate: string;
}
class NarcService {
    narc(request: NarcRequest) {
        API.graphql(graphqlOperation(createNarc, {
           comment : request.comment,
            date: new Date().toISOString(),
            state: request.state,
            licensePlate: request.licensePlate,
            location: request.location,
            postedBy: 'me'
        } as CreateNarcInput))
    }
}

const instance = new NarcService();
export default instance;
