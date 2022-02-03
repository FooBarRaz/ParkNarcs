import {createNarc} from "../../../graphql/mutations";
import {API, graphqlOperation, Storage} from 'aws-amplify';
import {listNarcs} from "../../../graphql/queries";
import {NarcReport, NarcReportEntity} from "../types";
import faker from 'faker';
import {nanoid} from "nanoid";

interface INarcService {
    narc(input: NarcReport): void;

    fetchReports(): Promise<Array<NarcReportEntity>>;

    fetchImage(imageKey: string): Promise<any>;
}

class NarcService implements INarcService {
    narc(input: NarcReport): void {
        let key = nanoid();
        const buf = Buffer.from(input.image.replace(/^data:image\/\w+;base64,/, ""),'base64')
        Storage.put(key, input.image, {
            contentEncoding: 'base64',
            contentType: "image/webp", // contentType is optional
        }).then((result) => {
            console.log('file upload result: ', result);
            input.image = result.key;
            API.graphql(graphqlOperation(createNarc, {input}))
        }).catch((error) => console.log("Error uploading file: ", error));
    }

    async fetchReports(): Promise<Array<NarcReportEntity>> {
        const narcs = await API.graphql({query: listNarcs, authMode: 'API_KEY'});
        return (narcs as any
        ).data.listNarcs.items;
    }

    fetchImage(imageKey: string):
        Promise<any> {
        return Storage.get(imageKey, {download: true, level: 'public'})
            .then(file => URL.createObjectURL(file.Body))
            .catch(e => console.error('error fetching ' + imageKey, e)); // get key from Storage.list
    }
}

class FakeNarcService
    implements INarcService {
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
            image: faker.datatype.uuid(),
            postedBy: faker.animal.dog()
        }

    }

    fetchImage(imageKey: string): Promise<any> {
        return Promise.resolve(faker.image.transport());
    }
}

const instance = new NarcService();
// const instance = new FakeNarcService();
export default instance;
