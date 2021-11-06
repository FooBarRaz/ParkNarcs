import {createNarc} from "../../../graphql/mutations";
import {API, graphqlOperation} from 'aws-amplify';
import {listNarcs} from "../../../graphql/queries";
import {NarcReport, NarcReportEntity} from "../types";
import faker from 'faker';

interface INarcService {
    narc(input: NarcReport): void;

    fetchReports(): Promise<Array<NarcReportEntity>>;
}

class NarcService implements INarcService {
    narc(input: NarcReport): void {
        API.graphql(graphqlOperation(createNarc, {input}))
    }

    async fetchReports(): Promise<Array<NarcReportEntity>> {
        const narcs = await API.graphql({query: listNarcs, authMode: 'API_KEY'});
        return (narcs as any).data.listNarcs.items;
    }
}

class FakeNarcService implements INarcService  {
    narc(input: NarcReport) {
        console.log('created fake report');
    }

    fetchReports(): Promise<Array<NarcReportEntity>> {
        return Promise.resolve(Array(10).fill(null).map(this.generateFakeReport))
    }

    private generateFakeReport(): NarcReportEntity {
        return {
            id: faker.datatype.uuid(),
            location: `${faker.address.streetAddress(true)} ${faker.address.city()} ${faker.address.stateAbbr()} ${faker.address.zipCode()}`,
            state: faker.address.stateAbbr(),
            licensePlate: faker.random.alphaNumeric(6).toUpperCase(),
            comment: faker.lorem.sentence(6),
            date: new Date().toISOString(),
            postedBy: faker.animal.dog()
        }

    }
}

const instance = new NarcService();
// const instance = new FakeNarcService();
export default instance;
