import {createNarc} from "../../../graphql/mutations";
import {API, graphqlOperation} from 'aws-amplify';
import {listNarcs} from "../../../graphql/queries";
import {NarcReport} from "../types";

class NarcService {
    narc(input: NarcReport) {
        API.graphql(graphqlOperation(createNarc, { input }))
    }

    async fetchReports() {
        const narcs = await API.graphql(graphqlOperation(listNarcs));
        return (narcs as any).data.listNarcs.items;
    }
}

const instance = new NarcService();
export default instance;
