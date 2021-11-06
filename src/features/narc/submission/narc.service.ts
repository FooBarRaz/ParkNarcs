import {createNarc} from "../../../graphql/mutations";
import {API, graphqlOperation} from 'aws-amplify';
import {listNarcs} from "../../../graphql/queries";
import {NarcReport} from "../types";
import faker from 'faker';

class NarcService {
    narc(input: NarcReport): void {
        API.graphql(graphqlOperation(createNarc, { input }))
    }

    async fetchReports(): Promise<Array<NarcReport>> {
        const narcs = await API.graphql(graphqlOperation(listNarcs));
        return (narcs as any).data.listNarcs.items;
    }
}

class FakeNarcService {
    narc(input: NarcReport) {
        console.log('created fake report');
    }

    fetchReports(): Promise<Array<NarcReport>> {
        return Promise.resolve(Array(10).fill(null).map(this.generateFakeReport))
    }

    private generateFakeReport(): NarcReport {
        return {
            location: faker.address.streetAddress(true),
            state: faker.address.state(true),
            licensePlate: faker.random.alphaNumeric(6),
            comment: faker.lorem.sentence(6),
            date: new Date().toISOString(),
            postedBy: faker.animal.dog()
        }

    }
}

// const instance = new NarcService();
const instance = new FakeNarcService();
export default instance;
